import express from "express";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import connectdb from "./Config/Db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authrouter from "./Routes/Auth.routes.js";
import videorouter from "./Routes/Video.Routes.js";
import usserrouter from "./Routes/User.Routes.js";
import playlistrouter from "./Routes/Playlist.Routes.js";
import commentrouter from "./Routes/Comment.Routes.js";
import likerouter from "./Routes/Like.Routes.js";
import subscriptionrouter from "./Routes/Subscription.Routes.js";

import cluster from "cluster";
import os from "os";
import process from "process";

dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;
const MAX_WORKERS = 4; // you can also use os.cpus().length

if (cluster.isPrimary) {
  console.log(`🚀 Forking ${MAX_WORKERS} workers...\n`);

  for (let i = 0; i < MAX_WORKERS; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`❌ Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });

} else {
  const app = express();

  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
  });

  connectdb().catch((err) => {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  });

  // Middlewares
  app.use(cors({
    origin: "https://videohub-fr.onrender.com",
    credentials: true
  }));

  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 100,
    message: "Too many requests, please try again later"
  });

  app.use(limiter);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    "/streams",
    express.static(path.join(process.cwd(), "hls-output"))
  );

  app.get("/", (req, res) => {
    res.send("Backend API running");
  });

  app.use("/api/v1/auth", authrouter);
  app.use("/api/v1/videos", videorouter);
  app.use("/api/v1/users", usserrouter);
  app.use("/api/v1/playlists", playlistrouter);
  app.use("/api/v1/likes", likerouter);
  app.use("/api/v1/comments", commentrouter);
  app.use("/api/v1/subscriptions", subscriptionrouter);

  app.listen(port, () => {
    console.log(`✅ Worker ${process.pid} running on port ${port}`);
  });
}

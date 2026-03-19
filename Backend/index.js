import express from "express";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import connectdb from "./Config/Db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

// Routes
import authrouter from "./Routes/Auth.routes.js";
import videorouter from "./Routes/Video.Routes.js";
import usserrouter from "./Routes/User.Routes.js";
import playlistrouter from "./Routes/Playlist.Routes.js";
import commentrouter from "./Routes/Comment.Routes.js";
import likerouter from "./Routes/Like.Routes.js";
import subscriptionrouter from "./Routes/Subscription.Routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ FIX FOR RENDER (VERY IMPORTANT)
app.set("trust proxy", 1);

// ✅ Error Handling (Global)
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
});

// ✅ Connect DB
connectdb()
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err);
    process.exit(1);
  });

// ✅ CORS (Update frontend URL here)
app.use(cors({ origin: "https://youtube-frontend-tp0q.onrender.com", credentials: true }));

// ✅ Security
app.use(helmet());

// ✅ Rate Limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 100,
  message: "Too many requests, please try again later",
});

app.use(limiter);

// ✅ Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Static folder (for HLS streams)
app.use(
  "/streams",
  express.static(path.join(process.cwd(),"streams"))
);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 Backend API running");
});

// ✅ Routes
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/videos", videorouter);
app.use("/api/v1/users", usserrouter);
app.use("/api/v1/playlists", playlistrouter);
app.use("/api/v1/likes", likerouter);
app.use("/api/v1/comments", commentrouter);
app.use("/api/v1/subscriptions", subscriptionrouter);

// ✅ Start Server
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

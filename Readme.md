🎬 VideHub
VideHub is a full-stack video sharing platform inspired by modern streaming applications like YouTube.
It provides a seamless experience for users to upload, discover, and engage with video content while managing their own creator channels.
________________________________________
📌 Overview
VideHub is designed with scalability and real-world application architecture in mind.
It integrates secure authentication, media handling, and dynamic UI to deliver a responsive and interactive user experience.
________________________________________
✨ Key Features
🔐 Authentication & Security
•	JWT-based authentication with HTTP-only cookies
•	Secure login, signup, and logout
•	OTP-based password reset flow
•	Persistent session handling
•	Request rate limiting implemented to prevent brute-force attacks
________________________________________
🎥 Video Management
•	Upload videos with Cloudinary integration
•	Optimized media storage and delivery
•	Video playback with dynamic routing
•	View tracking system
•	FFmpeg integrated for video processing and enhanced playback support
•	Multi-processing system implemented for efficient video traffic management
________________________________________
👤 User & Channel System
•	User profile management (avatar, username, email)
•	Channel pages with:
o	Uploaded videos
o	Subscriber count
•	Watch history tracking
________________________________________
📡 Subscription System
•	Subscribe / Unsubscribe to channels
•	Sidebar integration for subscribed channels
•	Real-time subscriber count updates
________________________________________
🔍 Search & Discovery
•	Keyword-based video search
•	Voice search integration using Web Speech API
________________________________________
📁 Playlist System
•	Create and manage playlists
•	Add/remove videos from playlists
________________________________________
🎨 UI/UX Design
•	Responsive layout inspired by YouTube
•	Collapsible sidebar navigation
•	Dynamic navbar with profile dropdown
•	Sticky footer and adaptive layout
________________________________________
🏗️ Architecture
VideHub follows a modular full-stack architecture:
•	Frontend: SPA built with React (Vite)
•	Backend: RESTful API using Express.js
•	Database: MongoDB with Mongoose ORM
•	Media Storage: Cloudinary CDN
•	Processing Layer: Multi-processing system for handling concurrent video workloads
________________________________________
🛠️ Tech Stack
Frontend
•	React.js (Vite)
•	Tailwind CSS
•	React Router DOM
•	Material UI Icons
Backend
•	Node.js
•	Express.js
•	MongoDB (Mongoose)
Dev & Tools
•	Cloudinary (media storage & optimization)
•	Multer (file uploads)
•	JSON Web Tokens (JWT)
•	dotenv (environment management)
•	FFmpeg (video processing and playback support)
________________________________________
🔗 Core API Endpoints
Authentication
•	POST /api/v1/auth/login
•	POST /api/v1/auth/signup
•	POST /api/v1/auth/logout
User
•	GET /api/v1/users/current
•	PUT /api/v1/users/updateaccount
•	GET /api/v1/users/channel/:username
•	GET /api/v1/users/channel-stats
Video
•	GET /api/v1/videos/all
•	POST /api/v1/videos/upload
________________________________________
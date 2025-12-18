import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import userRoutes from "./routes/userRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import equipmentBookingRoutes from "./routes/equipmentBookingsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import http from "http";
import { Server } from "socket.io";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();

    const app = express();

    // CORS configuration
    const corsOptions = {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    };
    app.use(cors(corsOptions));

    app.use(express.json());

    // Serve static files (uploads)
    app.use(
      '/uploads',
      express.static(path.join(__dirname, 'uploads'), {
        setHeaders: (res) => {
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        },
      })
    );

    // Routes
    app.use("/api/users", userRoutes);
    app.use("/api/staff", staffRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/gallery", galleryRoutes);
    app.use("/api/quotes", quoteRoutes);
    app.use("/api/messages", messageRoutes);
    app.use("/api/equipment", equipmentRoutes);
    app.use("/api/equipment-bookings", equipmentBookingRoutes);
    app.use("/api/reports", reportRoutes);

    // HTTP & Socket.IO setup
    const server = http.createServer(app);
    const io = new Server(server, {
      cors: { origin: "http://localhost:3000", credentials: true },
    });

    // Socket.IO connection
    io.on("connection", (socket) => {
      console.log("Admin connected:", socket.id);
    });

    // Make io accessible in routes
    app.set("socketio", io);

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
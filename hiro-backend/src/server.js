import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./config/database.js";
import { initializeAssociations } from "./models/index.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import equipmentBookingRoutes from "./routes/equipmentBookingsRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startServer = async () => {
  try {
    // =========================
    // DATABASE
    // =========================
    await connectDB();
    initializeAssociations();

    const app = express();

    // =========================
    // CORS (PRODUCTION SAFE)
    // =========================
    const allowedOrigins = [
      "http://localhost:3000",
      "https://hirocateringandequipment.co.ke",
      "https://www.hirocateringandequipment.co.ke",
    ];

    const corsOptions = {
      origin: function (origin, callback) {
        // Allow server-to-server, Postman, etc.
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // =========================
    // STATIC FILES
    // =========================
    app.use(
      "/uploads",
      express.static(path.join(__dirname, "uploads"), {
        setHeaders: (res) => {
          res.setHeader("Cache-Control", "public, max-age=31536000");
        },
      })
    );

    // =========================
    // API ROUTES
    // =========================
    app.use("/api/users", userRoutes);
    app.use("/api/staff", staffRoutes);
    app.use("/api/bookings", bookingRoutes);
    app.use("/api/gallery", galleryRoutes);
    app.use("/api/quotes", quoteRoutes);
    app.use("/api/messages", messageRoutes);
    app.use("/api/equipment", equipmentRoutes);
    app.use("/api/equipment-bookings", equipmentBookingRoutes);
    app.use("/api/reports", reportRoutes);

    // =========================
    // HEALTH CHECK
    // =========================
    app.get("/health", (req, res) => {
      res.status(200).json({ status: "OK", uptime: process.uptime() });
    });

    // =========================
    // HTTP + SOCKET.IO
    // =========================
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: allowedOrigins,
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("🔌 Socket connected:", socket.id);

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);
      });
    });

    app.set("socketio", io);

    // =========================
    // START SERVER
    // =========================
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import connectDB from "./config/db.js";
import { connectRedis } from "./config/redis.js";
import userRoutes from "./routes/userRoutes.js"
import staffRoutes from "./routes/staffRoutes.js"
// import toolRoutes from "./routes/toolRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"

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

    // Serve static files
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
    // app.use("/api/tools", toolRoutes);
    app.use("/api/bookings", bookingRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();

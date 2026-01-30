import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ["password"] },
    });

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Admin-only access
export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access only" });
};
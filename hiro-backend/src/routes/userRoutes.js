import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser, } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// protected routes for logout
router.post("/logout", protect, logoutUser);

// protected admin-only route
router.get("/admin", protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome, admin!" });
});

export default router

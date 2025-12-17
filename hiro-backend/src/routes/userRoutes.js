import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// -------------------- Public routes --------------------
router.post("/register", registerUser);
router.post("/login", loginUser);

// -------------------- Protected routes --------------------
router.post("/logout", protect, logoutUser);
router.get("/me", protect, getCurrentUser);
router.put("/me", protect, updateCurrentUser); // ✅ Update profile & password

// -------------------- Admin test route --------------------
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome admin" });
});

export default router;
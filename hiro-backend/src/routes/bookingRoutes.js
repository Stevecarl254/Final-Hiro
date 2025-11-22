import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { createStaffBooking, getAllBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createStaffBooking); // user booking
router.get("/", protect, adminOnly, getAllBookings); // admin only

export default router;

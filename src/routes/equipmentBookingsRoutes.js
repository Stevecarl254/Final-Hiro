import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// In-memory bookings "database"
let bookings = [];

// --- GET all bookings ---
router.get("/", (req, res) => {
  res.json({ success: true, data: bookings });
});

// --- POST create new booking ---
router.post("/", (req, res) => {
  const { fullName, phone, location, date, selectedEquipments, status } = req.body;

  // Validate inputs
  if (!fullName || !phone || !location || !date || !selectedEquipments || selectedEquipments.length === 0) {
    return res.status(400).json({
      success: false,
      message: "All fields are required and at least one equipment must be selected.",
    });
  }

  // Validate date
  const bookingDate = new Date(date);
  if (isNaN(bookingDate.getTime())) {
    return res.status(400).json({ success: false, message: "Invalid date format." });
  }

  const newBooking = {
    id: uuidv4(),
    fullName,
    phone,
    location,
    date: bookingDate.toISOString().split("T")[0], // YYYY-MM-DD
    selectedEquipments,
    status: status || "pending",
  };

  bookings.push(newBooking);
  res.json({ success: true, data: newBooking });
});

// --- PUT approve booking ---
router.put("/approve/:id", (req, res) => {
  const { id } = req.params;
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });

  booking.status = "approved";
  res.json({ success: true, data: booking });
});

// --- PUT reject booking ---
router.put("/reject/:id", (req, res) => {
  const { id } = req.params;
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return res.status(404).json({ success: false, message: "Booking not found." });

  booking.status = "rejected";
  res.json({ success: true, data: booking });
});

// --- DELETE booking ---
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return res.status(404).json({ success: false, message: "Booking not found." });

  const removed = bookings.splice(index, 1)[0];
  res.json({ success: true, data: removed });
});

export default router;
import express from "express";
import EquipmentBooking from "../models/EquipmentBooking.js";

const router = express.Router();

// --- Get all bookings ---
router.get("/", async (req, res) => {
  try {
    const bookings = await EquipmentBooking.find().sort({ createdAt: -1 });
    res.json({ success: true, data: bookings });
  } catch (err) {
    console.error("Fetch bookings error:", err);
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
});

// --- Create a new booking ---
router.post("/", async (req, res) => {
  try {
    const { fullName, phone, location, date, selectedEquipments } = req.body;

    // Validation
    if (
      !fullName?.trim() ||
      !phone?.trim() ||
      !location?.trim() ||
      !date ||
      !Array.isArray(selectedEquipments) ||
      selectedEquipments.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required and at least one equipment must be selected",
      });
    }

    // Validate each selected equipment
    const invalidItem = selectedEquipments.find(
      (eq) => !eq.id || !eq.name || typeof eq.quantity !== "number" || eq.quantity < 1
    );
    if (invalidItem) {
      return res.status(400).json({
        success: false,
        message: "Each equipment must have an id, name, and quantity >= 1",
      });
    }

    // Map to items array
    const items = selectedEquipments.map((eq) => ({
      id: eq.id,
      name: eq.name,
      quantity: eq.quantity,
    }));

    const newBooking = new EquipmentBooking({
      fullName: fullName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      date,
      items,
      status: "pending",
    });

    await newBooking.save();

    // Emit real-time event to admin
    const io = req.app.get("socketio");
    if (io) io.emit("newBooking", newBooking);

    res.json({ success: true, data: newBooking });
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({
      success: false,
      message: "Server error. Failed to create booking",
    });
  }
});

// --- Update booking status ---
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    const booking = await EquipmentBooking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const io = req.app.get("socketio");
    if (io) io.emit("updateBookingStatus", booking);

    res.json({ success: true, data: booking });
  } catch (err) {
    console.error("Update booking status error:", err);
    res.status(500).json({ success: false, message: "Failed to update booking status" });
  }
});

// --- Delete booking ---
router.delete("/:id", async (req, res) => {
  try {
    const booking = await EquipmentBooking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const io = req.app.get("socketio");
    if (io) io.emit("deleteBooking", req.params.id);

    res.json({ success: true, message: "Booking deleted successfully" });
  } catch (err) {
    console.error("Delete booking error:", err);
    res.status(500).json({ success: false, message: "Failed to delete booking" });
  }
});

export default router;
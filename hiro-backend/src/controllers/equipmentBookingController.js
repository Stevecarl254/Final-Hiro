import EquipmentBooking from "../models/EquipmentBooking.js";

/* ===============================
   CREATE BOOKING (USER)
================================ */
export const createEquipmentBooking = async (req, res) => {
  try {
    const { fullName, phone, location, eventDate, equipments } = req.body;

    if (!equipments || equipments.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one equipment must be selected",
      });
    }

    const booking = await EquipmentBooking.create({
      fullName,
      phone,
      location,
      eventDate,
      equipments,
    });

    // OPTIONAL: emit socket event
    req.io?.emit("newEquipmentBooking", booking);

    res.status(201).json({
      success: true,
      message: "Equipment booking submitted successfully",
      data: booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit booking",
    });
  }
};

/* ===============================
   GET ALL BOOKINGS (ADMIN)
================================ */
export const getAllEquipmentBookings = async (req, res) => {
  try {
    const bookings = await EquipmentBooking.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
    });
  }
};

/* ===============================
   UPDATE BOOKING STATUS (ADMIN)
================================ */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status, notes } = req.body;

    const booking = await EquipmentBooking.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update booking",
    });
  }
};

/* ===============================
   DELETE BOOKING (ADMIN)
================================ */
export const deleteBooking = async (req, res) => {
  try {
    await EquipmentBooking.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
    });
  }
};
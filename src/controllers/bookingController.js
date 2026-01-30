import Booking from "../models/Booking.js";
import Staff from "../models/Staff.js";
import User from "../models/User.js";
import Service from "../models/Service.js";

// @desc User creates a new booking and marks staff unavailable for the date
export const createStaffBooking = async (req, res) => {
  try {
    const { staffId, serviceId, date, notes } = req.body;

    const staff = await Staff.findByPk(staffId);
    if (!staff)
      return res.status(404).json({
        error: "Staff not found",
      });

    // Check if already unavailable for that date
    const dateBooked = staff.unavailableDates.some(
      (d) =>
        new Date(d).toDateString() === new Date(date).toDateString()
    );
    if (dateBooked) {
      return res.status(400).json({
        error: `Sorry, ${staff.name} is unavailable for that date.`,
        staff: { id: staff.id, name: staff.name, role: staff.role },
      });
    }
    // Create booking
    const booking = await Booking.create({
      userId: req.user.id,
      staffId: staffId,
      serviceId: serviceId,
      date,
      notes,
    });
    // Mark staff unavailable
    staff.unavailableDates.push(date);
    staff.isAvailable = false;
    await staff.save();

    res.status(201).json({
      message: `Booking successful — ${staff.name} has been reserved for your event.`,
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Admin gets all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, as: "user", attributes: ["name", "email"] },
        { model: Staff, as: "staff", attributes: ["name", "role"] },
        { model: Service, as: "service", attributes: ["name"] },
      ],
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

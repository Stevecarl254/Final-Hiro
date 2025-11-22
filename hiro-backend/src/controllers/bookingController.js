import Booking from "../models/Booking.js";
import Staff from "../models/Staff.js";

// @desc User creates a new booking and marks staff unavailable for te date
export const createStaffBooking = async (req, res) => {
    try {
	const { staffId, serviceId, date, notes } = req.body;

	const staff = await Staff.findById(staffId);
	if (!staff) return res.status(404).json({
	    error: "Staff not found"
	});

	// Check if already unavailable for that date
	const dateBooked = staff.unavailableDates.some(
	    (d) => new Date(d).toDateString() === new Date(date).toDateString());
	if (dateBooked) {
	    return res.status(400).json({ error: `Sorry, ${staff.name} is unavailable for that date.`, staff: { id: staff._id, name: staff.name, role: staff. role},});
	}
	// Create booking
	const booking = await Booking.create({
	    user: req.user._id,
	    staff: staffId,
	    service: serviceId,
	    date,
	    notes,
	});
	// Mark staff unavailable
	staff.unavailableDates.push(date);
	staff.isAvailable = false;
	await staff.save();

	res.status(201).json({ message: `Booking successful — ${staff.name} has been reserved for your event.`,
      booking, });
    } catch (error) {
	res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Admin gets all bookings
export const getAllBookings = async (req, res) => {
    try {
	const bookings = await Booking.find()
	      .populate("user", "name email")
	      .populate("staff", "name role")
	      .populate("service", "name");
	res.status(200).json(bookings);
    } catch (error) {
	res.status(500).json({ message: "Server error", error: error.message });
    }
};

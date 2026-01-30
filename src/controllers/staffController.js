import Staff from "../models/Staff.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";

// get or see all staff public route
export const getStaff = async (req, res) => {
  try {
    const staffList = await Staff.findAll({
      attributes: { exclude: ["addedById", "createdAt", "updatedAt"] },
    });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all staff (admin only, include addedBy details)
export const getStaffAdmin = async (req, res) => {
  try {
    const staffList = await Staff.findAll({
      include: {
        model: User,
        as: "addedBy",
        attributes: ["name", "role"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// add new team member (admin only)
export const addStaff = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { name, role, specialty, experience, image_url, bio } = req.body;
    if (!name || !role)
      return res.status(400).json({ error: "Name and role are required" });

    const newStaff = await Staff.create({
      name,
      role,
      specialty,
      experience,
      image_url,
      bio,
      addedById: req.user?.id || null, // know who added the caterer
    });

    res.status(201).json({
      message: "New team member added successfully",
      staff: newStaff,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc functon for staff to update their profile
// @route PUT /api/staff/self
// @access Staff (authenticated user)
export const updateProfile = async (req, res) => {
  try {
    const { name, role, specialty, experience, image_url, bio } = req.body;
    // Disallow changes to name and role
    if (name || role) {
      return res.status(403).json({
        error: "You are not allowed to change name or role fields",
      });
    }
    // Find staff profile by addedById (the current user)
    const staff = await Staff.findOne({ where: { addedById: req.user.id } });
    if (!staff) {
      return res
        .status(404)
        .json({ error: "Profile not found for this user" });
    }
    // update allowed fields
    if (specialty !== undefined) staff.specialty = specialty;
    if (experience !== undefined) staff.experience = experience;
    if (image_url !== undefined) staff.image_url = image_url;
    if (bio !== undefined) staff.bio = bio;

    await staff.save();

    res.status(200).json({
      message: "Profile updated successfully",
      staff,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const setStaffAvailability = async (req, res) => {
  try {
    const { staffId } = req.params;
    const { unavailableDates, isAvailable } = req.body;

    const staff = await Staff.findByPk(staffId);
    if (!staff)
      return res.status(404).json({
        error: "Staff not found",
      });

    if (unavailableDates && Array.isArray(unavailableDates)) {
      staff.unavailableDates = unavailableDates;
    }
    if (typeof isAvailable === "boolean") {
      staff.isAvailable = isAvailable;
    }

    await staff.save();
    res
      .status(200)
      .json({ message: "Availability set successfully", staff });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Example: Free staff after event
export const releaseStaff = async (bookingId) => {
  const booking = await Booking.findByPk(bookingId);
  if (!booking) return;

  const staff = await Staff.findByPk(booking.staffId);
  if (!staff) return;

  // Remove that date from unavailableDates
  staff.unavailableDates = staff.unavailableDates.filter(
    (d) =>
      new Date(d).toDateString() !== new Date(booking.date).toDateString()
  );
  // If staff is free and no other unavailable dates, mark available again
  if (staff.unavailableDates.length === 0) staff.isAvailable = true;

  await staff.save();
};

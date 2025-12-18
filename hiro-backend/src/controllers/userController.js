import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// Email validation helper
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const user = new User({ name, email, password, phoneNumber, role: "user" });
    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Ensure role exists
    if (!user.role) user.role = "user";

    const token = generateToken(user._id, user.role);

    // Send **full name** in the response for frontend
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name, // <-- full name returned
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= GET PROFILE ================= */
export const getCurrentUser = async (req, res) => {
  // Ensure we return full name
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name, // <-- full name included
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      address: req.user.address || "",
      role: req.user.role,
    },
  });
};

/* ================= UPDATE PROFILE & PASSWORD ================= */
export const updateCurrentUser = async (req, res) => {
  try {
    const { name, phoneNumber, address, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let updated = false;

    if (name && name !== user.name) {
      user.name = name;
      updated = true;
    }
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      user.phoneNumber = phoneNumber;
      updated = true;
    }
    if (address && address !== user.address) {
      user.address = address;
      updated = true;
    }

    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message:
            "Both current and new passwords are required to change password.",
        });
      }

      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch)
        return res.status(401).json({ message: "Current password is incorrect." });

      if (newPassword.length < 8)
        return res.status(400).json({
          message: "New password must be at least 8 characters.",
        });

      const isSameAsCurrent = await user.comparePassword(newPassword);
      if (isSameAsCurrent)
        return res.status(400).json({
          message: "New password cannot be the same as current password.",
        });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);

      updated = true;
    }

    if (!updated) {
      return res.status(200).json({ message: "No changes detected." });
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address || "",
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

/* ================= LOGOUT ================= */
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
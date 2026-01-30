import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";

// Email validation helper
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/* ================= REGISTER ================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, role } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!isValidEmail(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 8)
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });

    // Check if email already exists
    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    // Let the User model hook handle password hashing. Pass the plain password
    const user = await User.create({
      name,
      email,
      password: password,
      phoneNumber,
      role: role && role.toLowerCase() === "admin" ? "admin" : "user", // allow admin creation
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Ensure role exists
    if (!user.role) user.role = "user";

    // Generate JWT
    const token = generateToken(user.id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= GET PROFILE ================= */
export const getCurrentUser = async (req, res) => {
  try {
    res.status(200).json({
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        phoneNumber: req.user.phoneNumber,
        address: req.user.address || "",
        role: req.user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/* ================= UPDATE PROFILE & PASSWORD ================= */
export const updateCurrentUser = async (req, res) => {
  try {
    const { name, phoneNumber, address, currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
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

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Current password is incorrect." });

      if (newPassword.length < 8)
        return res.status(400).json({
          message: "New password must be at least 8 characters.",
        });

      const isSameAsCurrent = await bcrypt.compare(newPassword, user.password);
      if (isSameAsCurrent)
        return res.status(400).json({
          message: "New password cannot be the same as current password.",
        });

      // Assign plain password; the model's beforeUpdate hook will hash it
      user.password = newPassword;
      updated = true;
    }

    if (!updated) {
      return res.status(200).json({ message: "No changes detected." });
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully!",
      user: {
        id: user.id,
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
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Email validation helper
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ================= JWT COOKIE HELPER =================
const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,       // ✅ required on Render (HTTPS)
    sameSite: "none",   // ✅ required for cross-domain
    maxAge: 24 * 60 * 60 * 1000,
  });
};

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

    const existing = await User.findOne({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role: role?.toLowerCase() === "admin" ? "admin" : "user",
    });

    // ✅ Auto-login after register
    setTokenCookie(res, user);

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
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // ✅ SET COOKIE (this fixes auto-logout)
    setTokenCookie(res, user);

    res.status(200).json({
      message: "Login successful",
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
    res.status(500).json({ message: "Server error" });
  }
};

/* ================= GET PROFILE ================= */
export const getCurrentUser = async (req, res) => {
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
};

/* ================= UPDATE PROFILE ================= */
export const updateCurrentUser = async (req, res) => {
  try {
    const { name, phoneNumber, address, currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(401).json({ message: "Current password incorrect" });

      if (newPassword.length < 8)
        return res.status(400).json({ message: "Password too short" });

      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated",
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
    res.status(500).json({ message: "Update failed" });
  }
};

/* ================= LOGOUT ================= */
export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout successful" });
};

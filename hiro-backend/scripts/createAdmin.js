import dotenv from "dotenv";
import { connectDB } from "../src/config/database.js";
import User from "../src/models/User.js";

dotenv.config();

async function createAdmin() {
  try {
    // Connect to PostgreSQL database
    await connectDB();
    console.log("Connected to PostgreSQL");

    // Check if admin already exists
    const existing = await User.findOne({
      where: { email: "admin@hiro.co.ke" }
    });
    
    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    // Create new admin user
    const admin = await User.create({
      name: "Admin",
      email: "admin@hiro.co.ke",
      password: "hirocateringservices",
      phoneNumber: "0712345678", // you can change this
      role: "admin"
    });

    console.log("✔ Super admin created successfully");
    console.log("Email:", admin.email);
    process.exit(0);

  } catch (err) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  }
}

createAdmin();
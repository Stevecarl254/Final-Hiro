import dotenv from "dotenv";

// Use the Sequelize models so the admin is created in the same DB/tables
import { connectDB } from "../src/config/database.js";
import User from "../src/models/User.js";

dotenv.config(); // Load .env variables

async function createAdmin() {
  try {
    // Ensure DB connection
    await connectDB();

    const adminEmail = "admin@hiro.co.ke";
    const plainPassword = "hirocateringservices";

    // Check if admin already exists (Sequelize)
    const existing = await User.findOne({ where: { email: adminEmail } });

    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    // Create new admin user. The User model has a beforeCreate hook that will
    // hash the password, so we can pass the plain password here.
    const admin = await User.create({
      name: "Admin",
      email: adminEmail,
      password: plainPassword,
      phoneNumber: "0712345678",
      role: "admin", // matches Sequelize enum: 'user' | 'admin'
    });

    console.log("✔ Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Password:", plainPassword);
    process.exit(0);
  } catch (err) {
    console.error("Error creating admin:", err.message || err);
    process.exit(1);
  }
}

createAdmin();

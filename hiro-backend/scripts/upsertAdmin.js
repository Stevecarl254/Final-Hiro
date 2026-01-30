// Script to create or update the admin user using the backend's Sequelize models.
// Run this on the server (where env vars point to the hosted database) or
// locally after setting DB env vars to point at the hosted DB.

import dotenv from "dotenv";
import { connectDB } from "../src/config/database.js";
import User from "../src/models/User.js";

dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@hiro.co.ke";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hirocateringservices";

const upsertAdmin = async () => {
  try {
    await connectDB();

    let admin = await User.findOne({ where: { email: ADMIN_EMAIL } });

    if (!admin) {
      admin = await User.create({
        name: "Site Admin",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD, // model hook will hash
        phoneNumber: "0000000000",
        role: "admin",
      });
      console.log(`Created admin: ${ADMIN_EMAIL}`);
    } else {
      // Update password and role just in case
      admin.password = ADMIN_PASSWORD; // beforeUpdate hook will hash
      admin.role = "admin";
      await admin.save();
      console.log(`Updated admin password and role for: ${ADMIN_EMAIL}`);
    }

    process.exit(0);
  } catch (err) {
    console.error("Failed to upsert admin:", err.message);
    process.exit(1);
  }
};

upsertAdmin();

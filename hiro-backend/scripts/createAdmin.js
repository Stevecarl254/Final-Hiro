import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/User.js";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const existing = await User.findOne({ email: "admin@hiro.com" });
    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    const admin = new User({
      name: "Steve",
      email: "mediakenyahome@gmail.com",
      password: "Stephenmaisiba11",
      phoneNumber: "0796273218",
      role: "admin"
    });

    await admin.save();

    console.log("✔ Super admin created successfully");
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();

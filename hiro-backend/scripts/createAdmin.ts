// createAdmin.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existing = await prisma.user.findUnique({
      where: { email: "admin@hiro.co.ke" },
    });

    if (existing) {
      console.log("Admin already exists:", existing.email);
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("hirocateringservices", 10);

    // Create new admin user
    const admin = await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@hiro.co.ke",
        password: hashedPassword,
        phone: "0712345678",
        role: "ADMIN", // Must match Prisma enum
      },
    });

    console.log("✔ Admin created successfully");
    console.log("Email:", admin.email);
    console.log("Password: hirocateringservices"); // plain password for reference
    process.exit(0);
  } catch (err: any) {
    console.error("Error creating admin:", err.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
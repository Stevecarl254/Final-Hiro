// pages/api/users/login.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

type Data = {
  message: string;
  token?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    // If user not found OR password invalid, respond with same structure
    if (!user) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(200).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const role = user.role || "USER";
    const token = jwt.sign(
      { userId: user.id, role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    // Send response
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone || "",
        role: role.toLowerCase(), // "user" or "admin"
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  } finally {
    await prisma.$disconnect();
  }
}
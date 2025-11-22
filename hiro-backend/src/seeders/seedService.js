// src/scripts/serviceSeeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Service from "../models/Service.js";

dotenv.config();

const services = [
  {
    name: "Wedding Catering",
    description: "Full-service catering for weddings with menu customization.",
    base_price: 80000,
  },
  {
    name: "Corporate Event",
    description: "Professional catering for company events, conferences, and galas.",
    base_price: 60000,
  },
  {
    name: "Birthday Party",
    description: "Fun catering options for birthday celebrations.",
    base_price: 30000,
  },
  {
    name: "Private Dinner",
    description: "Exclusive fine dining experiences at home or private venues.",
    base_price: 20000,
  },
];

const seedServices = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Service.deleteMany();
    await Service.insertMany(services);
    console.log("✅ Services seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    process.exit(1);
  }
};

seedServices();

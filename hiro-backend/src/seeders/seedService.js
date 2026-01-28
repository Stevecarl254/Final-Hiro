// src/seeders/seedService.js
import dotenv from "dotenv";
import { connectDB } from "../config/database.js";
import Service from "../models/Service.js";

dotenv.config();

const services = [
  {
    name: "Wedding Catering",
    description: "Full-service catering for weddings with menu customization.",
    basePrice: 80000,
  },
  {
    name: "Corporate Event",
    description: "Professional catering for company events, conferences, and galas.",
    basePrice: 60000,
  },
  {
    name: "Birthday Party",
    description: "Fun catering options for birthday celebrations.",
    basePrice: 30000,
  },
  {
    name: "Private Dinner",
    description: "Exclusive fine dining experiences at home or private venues.",
    basePrice: 20000,
  },
];

const seedServices = async () => {
  try {
    // Connect to PostgreSQL database
    await connectDB();
    
    // Delete all existing services
    await Service.destroy({ where: {} });
    
    // Create new services
    await Service.bulkCreate(services);
    
    console.log("✅ Services seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding services:", error.message);
    process.exit(1);
  }
};

seedServices();

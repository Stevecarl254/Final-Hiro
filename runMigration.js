// runMigration.js

import "dotenv/config"; // load .env variables
import sequelize from "./config/database.js";
import {
  initializeAssociations,
  User,
  Staff,
  Service,
  Booking,
  EquipmentBooking,
  Gallery,
  Quote,
  Message,
} from "./src/models/index.js";

// Initialize associations
initializeAssociations();

async function migrate() {
  try {
    // Sync all models
    await sequelize.sync({ alter: true }); // use { force: true } to drop & recreate tables
    console.log("Database synced successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error syncing database:", error);
    process.exit(1);
  }
}

// Run migration
migrate();
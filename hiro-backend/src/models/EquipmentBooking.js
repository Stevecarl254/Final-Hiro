import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EquipmentBooking = sequelize.define(
  "EquipmentBooking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      validate: {
        isArray(value) {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error("At least one equipment item is required");
          }
        },
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
    },
  },
  { timestamps: true }
);

export default EquipmentBooking;
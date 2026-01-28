import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Quote = sequelize.define(
  "Quote",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    /* ================= USER INFO ================= */
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    /* ================= QUOTE TYPE ================= */
    quoteType: {
      type: DataTypes.ENUM(
        "Event",
        "Equipment",
        "EquipmentRepair",
        "Staff"
      ),
      allowNull: false,
    },

    /* ================= EVENT FIELDS ================= */
    eventType: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    guests: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    /* ================= EQUIPMENT FIELDS ================= */
    equipmentType: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    equipmentQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    rentalDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    /* ================= STAFF FIELDS ================= */
    staffType: {
      type: DataTypes.STRING, // Production, Cook, Waiter, Bartender, Hostess
      allowNull: true,
    },

    /* ================= COMMON ================= */
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    /* ================= ADMIN ================= */
    status: {
      type: DataTypes.ENUM("Pending", "Contacted", "Completed"),
      defaultValue: "Pending",
    },

    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    tableName: "quotes",
  }
);

export default Quote;
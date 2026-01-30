import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Staff = sequelize.define(
  "Staff",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM(
        "Chef",
        "Head Waiter",
        "Mixologist",
        "Photographer",
        "Decorator",
        "MC",
        "DJ",
        "Head Cleaner"
      ),
      allowNull: false,
    },
    specialty: { type: DataTypes.STRING },
    experience: { type: DataTypes.STRING },
    image_url: { type: DataTypes.STRING },
    bio: { type: DataTypes.TEXT },
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
    unavailableDates: { type: DataTypes.ARRAY(DataTypes.DATE), defaultValue: [] },
    addedById: { type: DataTypes.UUID, allowNull: true }, // no references needed here
  },
  { timestamps: true }
);

export default Staff;
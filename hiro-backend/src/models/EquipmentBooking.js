import mongoose from "mongoose";

// --- Equipment Item Subschema ---
const EquipmentItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// --- Main Equipment Booking Schema ---
const EquipmentBookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    items: {
      type: [EquipmentItemSchema],
      required: true,
      validate: [(val) => val.length > 0, "At least one equipment item is required"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const EquipmentBooking = mongoose.model(
  "EquipmentBooking",
  EquipmentBookingSchema
);

export default EquipmentBooking;
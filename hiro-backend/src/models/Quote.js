import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  eventType: { type: String, required: true },
  eventDate: { type: Date, required: true },
  guests: { type: Number, required: true },
  location: String,
  details: String,
  read: { type: Boolean, default: false }, // ✅ New field to track read/unread
}, { timestamps: true });

export default mongoose.model("Quote", quoteSchema);
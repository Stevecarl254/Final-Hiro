import express from "express";
import Quote from "../models/Quote.js";

const router = express.Router();

// POST a new quote
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phoneNumber, eventType, eventDate, guests, location, details } = req.body;

    if (!fullName || !email || !phoneNumber || !eventType || !eventDate || !guests) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const quote = new Quote({ fullName, email, phoneNumber, eventType, eventDate, guests, location: location || "", details: details || "" });
    await quote.save();

    // Emit new quote event to admin via Socket.IO
    const io = req.app.get("socketio");
    if (io) io.emit("newQuote", quote);

    res.status(201).json({ message: "Quote submitted successfully", data: quote });
  } catch (err) {
    console.error("Error creating quote:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// GET all quotes (for admin)
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Quotes fetched successfully", data: quotes });
  } catch (err) {
    console.error("Error fetching quotes:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// DELETE a quote
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) return res.status(404).json({ message: "Quote not found" });

    // Emit delete event to update frontend in real-time
    const io = req.app.get("socketio");
    if (io) io.emit("deleteQuote", id);

    res.status(200).json({ message: "Quote deleted successfully", id });
  } catch (err) {
    console.error("Error deleting quote:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

export default router;
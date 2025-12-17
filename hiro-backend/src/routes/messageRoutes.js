import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

/* POST – user sends message */
router.post("/", async (req, res) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = await Message.create({
      fullName,
      email,
      subject,
      message,
    });

    // 🔔 notify admin
    const io = req.app.get("socketio");
    if (io) io.emit("newMessage", newMessage);

    res.status(201).json({ message: "Message sent", data: newMessage });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* GET – admin fetch messages */
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json({ data: messages });
  } catch {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

/* DELETE – admin delete */
router.delete("/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
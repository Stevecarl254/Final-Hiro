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

    // notify admin
    const io = req.app.get("socketio");
    if (io) io.emit("newMessage", newMessage);

    res.status(201).json({ data: newMessage });
  } catch (err) {
    console.error("CREATE MESSAGE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/* GET – admin fetch messages */
router.get("/", async (req, res) => {
  try {
    const messages = await Message.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({ data: messages });
  } catch (err) {
    console.error("FETCH MESSAGES ERROR:", err);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

/* DELETE – admin delete */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Message.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error("DELETE MESSAGE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});

export default router;
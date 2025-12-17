import express from "express";
import Gallery from "../models/gallery.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// GET all gallery items
router.get("/", async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new gallery item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    const newItem = new Gallery({ title, description, imageUrl });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a gallery item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Gallery item not found" });

    // Remove the image file safely
    try {
      const imagePath = path.join(__dirname, "../uploads", path.basename(item.imageUrl));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    } catch (fileErr) {
      console.error("Failed to delete image file:", fileErr.message);
    }

    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    console.error("Delete gallery error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
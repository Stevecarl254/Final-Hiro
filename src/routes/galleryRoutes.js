import express from "express";
import Gallery from "../models/Gallery.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// GET all gallery items
router.get("/", async (req, res) => {
  try {
    const items = await Gallery.findAll({ order: [["createdAt", "DESC"]] });
    res.json(items);
  } catch (err) {
    console.error("Fetch gallery error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST a new gallery item
router.post("/", (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    try {
      const { title, description } = req.body;

      if (!title || !req.file) {
        return res.status(400).json({ message: "Title and image are required" });
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      const newItem = await Gallery.create({ title, description, imageUrl });

      res.status(201).json(newItem);
    } catch (err) {
      console.error("Create gallery item error:", err.message);
      res.status(500).json({ message: err.message });
    }
  });
});

// DELETE a gallery item
router.delete("/:id", async (req, res) => {
  try {
    const item = await Gallery.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: "Gallery item not found" });

    // Remove the image file
    try {
      const imagePath = path.join(uploadsDir, path.basename(item.imageUrl));
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    } catch (fileErr) {
      console.error("Failed to delete image file:", fileErr.message);
    }

    await item.destroy();
    res.json({ message: "Gallery item deleted" });
  } catch (err) {
    console.error("Delete gallery error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
// equipmentRoutes.js
import express from "express";
const router = express.Router();

// In-memory DB for demo (replace with your actual DB)
let equipment = [];

// GET all equipment
router.get("/", (req, res) => {
  res.json({ data: equipment });
});

// POST new equipment (Admin adds)
router.post("/", (req, res) => {
  const { name, type, category, size } = req.body;
  if (!name || !type || !category) {
    return res.status(400).json({ error: "Name, Type & Category required" });
  }

  const newEquipment = {
    _id: Date.now().toString(),
    name,
    type,
    category,
    size: size || "", // optional
  };

  equipment.push(newEquipment);

  // Emit event to clients via Socket.IO
  req.app.get("io")?.emit("newEquipmentAdded", newEquipment);

  res.status(201).json(newEquipment);
});

// DELETE equipment by ID
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = equipment.findIndex((eq) => eq._id === id);

  if (index === -1) return res.status(404).json({ error: "Equipment not found" });

  const deleted = equipment.splice(index, 1)[0];

  // Emit event to clients if needed
  req.app.get("io")?.emit("equipmentDeleted", deleted);

  res.json({ data: deleted });
});

// UPDATE equipment by ID
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, type, category, size } = req.body;

  const eq = equipment.find((eq) => eq._id === id);
  if (!eq) return res.status(404).json({ error: "Equipment not found" });

  if (name) eq.name = name;
  if (type) eq.type = type;
  if (category) eq.category = category;
  if (size !== undefined) eq.size = size;

  req.app.get("io")?.emit("equipmentUpdated", eq);

  res.json({ data: eq });
});

export default router;
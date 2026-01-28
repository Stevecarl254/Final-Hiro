import express from "express";
import Quote from "../models/Quote.js";

const router = express.Router();

/* ============================
   CREATE QUOTE (PUBLIC)
============================ */
router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      quoteType,

      // Event
      eventType,
      eventDate,
      guests,

      // Equipment / Repair
      equipmentType,
      equipmentQuantity,
      rentalDate,

      // Staff
      staffType,

      location,
      details,
    } = req.body;

    /* -------- BASIC VALIDATION -------- */
    if (!fullName || !email || !phoneNumber || !quoteType) {
      return res.status(400).json({
        message: "Missing required fields.",
      });
    }

    /* -------- CONDITIONAL VALIDATION -------- */
    if (quoteType === "Event") {
      if (!eventType || !eventDate || !guests) {
        return res.status(400).json({
          message: "Event type, date and guests are required for event quotes.",
        });
      }
    }

    if (quoteType === "Equipment" || quoteType === "EquipmentRepair") {
      if (!equipmentType || !equipmentQuantity || !rentalDate) {
        return res.status(400).json({
          message:
            "Equipment type, quantity and rental date are required for equipment quotes.",
        });
      }
    }

    if (quoteType === "Staff") {
      if (!staffType) {
        return res.status(400).json({
          message: "Staff type is required for staff quotes.",
        });
      }
    }

    /* -------- CREATE QUOTE -------- */
    const quote = await Quote.create({
      fullName,
      email,
      phoneNumber,
      quoteType,

      // Event
      eventType: quoteType === "Event" ? eventType : null,
      eventDate: quoteType === "Event" ? eventDate : null,
      guests: quoteType === "Event" ? guests : null,

      // Equipment / Repair
      equipmentType:
        quoteType === "Equipment" || quoteType === "EquipmentRepair"
          ? equipmentType
          : null,
      equipmentQuantity:
        quoteType === "Equipment" || quoteType === "EquipmentRepair"
          ? equipmentQuantity
          : null,
      rentalDate:
        quoteType === "Equipment" || quoteType === "EquipmentRepair"
          ? rentalDate
          : null,

      // Staff
      staffType: quoteType === "Staff" ? staffType : null,

      location,
      details,
    });

    /* -------- SOCKET EVENT -------- */
    const io = req.app.get("socketio");
    if (io) io.emit("newQuote", quote);

    res.status(201).json({
      message: "Quote submitted successfully",
      data: quote,
    });
  } catch (error) {
    console.error("Error creating quote:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

/* ============================
   GET ALL QUOTES (ADMIN)
============================ */
router.get("/", async (req, res) => {
  try {
    const quotes = await Quote.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      message: "Quotes fetched successfully",
      data: quotes,
    });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    res.status(500).json({
      message: "Server error. Please try again later.",
    });
  }
});

/* ============================
   MARK AS READ (ADMIN)
============================ */
router.patch("/:id/read", async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.isRead = true;
    await quote.save();

    res.status(200).json({
      message: "Quote marked as read",
      data: quote,
    });
  } catch (error) {
    console.error("Error marking quote as read:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* ============================
   UPDATE STATUS (ADMIN)
============================ */
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const quote = await Quote.findByPk(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    quote.status = status;
    await quote.save();

    res.status(200).json({
      message: "Quote status updated",
      data: quote,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* ============================
   DELETE QUOTE (ADMIN)
============================ */
router.delete("/:id", async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    await quote.destroy();

    /* -------- SOCKET EVENT -------- */
    const io = req.app.get("socketio");
    if (io) io.emit("deleteQuote", req.params.id);

    res.status(200).json({
      message: "Quote deleted successfully",
      id: req.params.id,
    });
  } catch (error) {
    console.error("Error deleting quote:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;
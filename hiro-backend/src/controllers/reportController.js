// controllers/reportController.js
import Booking from "../models/Booking.js";
import Quote from "../models/Quote.js";
import Equipment from "../models/EquipmentBooking.js";

/* ==========================
   Helper: format date to YYYY-MM-DD
========================== */
const formatDate = (date) => {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
};

/* ==========================
   GET /api/reports/bookings
========================== */
export const getBookingsReport = async (req, res) => {
  try {
    const { start, end } = req.query;
    const filter = {};

    if (start || end) {
      filter.createdAt = {};
      if (start) filter.createdAt.$gte = new Date(start);
      if (end) filter.createdAt.$lte = new Date(end);
    }

    const bookings = await Booking.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(bookings.map(b => ({ date: b._id, count: b.count })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookings report" });
  }
};

/* ==========================
   GET /api/reports/quotes
========================== */
export const getQuotesReport = async (req, res) => {
  try {
    const { start, end } = req.query;
    const filter = {};

    if (start || end) {
      filter.createdAt = {};
      if (start) filter.createdAt.$gte = new Date(start);
      if (end) filter.createdAt.$lte = new Date(end);
    }

    const quotes = await Quote.aggregate([
      { $match: filter },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(quotes.map(q => ({ date: q._id, count: q.count })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch quotes report" });
  }
};

/* ==========================
   GET /api/reports/equipment-usage
========================== */
export const getEquipmentUsageReport = async (req, res) => {
  try {
    const { start, end } = req.query;
    const filter = {};

    if (start || end) {
      filter.createdAt = {};
      if (start) filter.createdAt.$gte = new Date(start);
      if (end) filter.createdAt.$lte = new Date(end);
    }

    const equipmentUsage = await Equipment.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$name",
          usageCount: { $sum: "$usageCount" }, // make sure your Equipment model has usageCount
        },
      },
      { $sort: { usageCount: -1 } },
    ]);

    res.json(equipmentUsage.map(e => ({ equipment: e._id, usageCount: e.usageCount })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch equipment usage report" });
  }
};
// controllers/reportController.js
import Booking from "../models/Booking.js";
import Quote from "../models/Quote.js";
import EquipmentBooking from "../models/EquipmentBooking.js";
import { Op } from "sequelize";
import sequelize from "../config/database.js";

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
    const where = {};

    if (start || end) {
      where.createdAt = {};
      if (start) where.createdAt[Op.gte] = new Date(start);
      if (end) where.createdAt[Op.lte] = new Date(end);
    }

    const bookings = await Booking.findAll({
      attributes: [
        [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where,
      group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
      order: [["date", "ASC"]],
      raw: true,
      subQuery: false,
    });

    res.json(bookings.map((b) => ({ date: formatDate(b.date), count: parseInt(b.count) })));
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
    const where = {};

    if (start || end) {
      where.createdAt = {};
      if (start) where.createdAt[Op.gte] = new Date(start);
      if (end) where.createdAt[Op.lte] = new Date(end);
    }

    const quotes = await Quote.findAll({
      attributes: [
        [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      where,
      group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
      order: [["date", "ASC"]],
      raw: true,
      subQuery: false,
    });

    res.json(quotes.map((q) => ({ date: formatDate(q.date), count: parseInt(q.count) })));
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
    const where = {};

    if (start || end) {
      where.createdAt = {};
      if (start) where.createdAt[Op.gte] = new Date(start);
      if (end) where.createdAt[Op.lte] = new Date(end);
    }

    // Get all equipment bookings and aggregate by items
    const equipmentBookings = await EquipmentBooking.findAll({
      attributes: ["items"],
      where,
      raw: true,
    });

    // Aggregate items
    const itemsMap = {};
    equipmentBookings.forEach((booking) => {
      if (booking.items && Array.isArray(booking.items)) {
        booking.items.forEach((item) => {
          itemsMap[item.name] = (itemsMap[item.name] || 0) + item.quantity;
        });
      }
    });

    const equipmentUsage = Object.entries(itemsMap)
      .map(([name, count]) => ({ equipment: name, usageCount: count }))
      .sort((a, b) => b.usageCount - a.usageCount);

    res.json(equipmentUsage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch equipment usage report" });
  }
};
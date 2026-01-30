// routes/reportRoutes.js
import express from "express";
import {
  getBookingsReport,
  getQuotesReport,
  getEquipmentUsageReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/bookings", getBookingsReport);
router.get("/quotes", getQuotesReport);
router.get("/equipment-usage", getEquipmentUsageReport);

export default router;
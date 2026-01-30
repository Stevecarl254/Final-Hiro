import express from "express"
import {
    getStaff,
    getStaffAdmin,
    addStaff,
    updateProfile,
    setStaffAvailability,
    releaseStaff,
} from "../controllers/staffController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public - anyone can view staff list
router.get("/", getStaff);

// Staff - update their own profile (cannot change name/role)
router.post("/self", protect, updateProfile);

// admin-only route to add staff
router.post("/newmember", protect, adminOnly, addStaff);

// Admin - view all staff with addedBy metadata
router.get("/admin", protect, adminOnly, getStaffAdmin);

// Admin updates staff availability
router.post("/:staffId/availability", protect, adminOnly, setStaffAvailability);
// admin manually sets staff as available
router.post("/:staffId/free", protect, adminOnly, async (req, res) => {
  try {
    await releaseStaff(req.params.staffId);
    res.status(200).json({ message: "Staff set as available" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;

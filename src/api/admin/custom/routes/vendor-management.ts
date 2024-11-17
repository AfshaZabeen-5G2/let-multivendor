import { Router } from "express";
import { authenticateUser, authorizeAdmin } from "../../../middlewares/authentication";
import { Vendor } from "F:/letmultivendor/src/api/admin/models/vendor";

const router = Router();

// Fetch all vendors
router.get("/vendors", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors", error });
  }
});

// Approve a vendor
router.put("/vendors/:id/approve", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const result = await Vendor.update(req.params.id, { status: "approved" });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor approved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error approving vendor", error });
  }
});

// Suspend a vendor
router.put("/vendors/:id/suspend", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const result = await Vendor.update(req.params.id, { status: "suspended" });
    if (result.affected === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor suspended successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error suspending vendor", error });
  }
});

// Delete a vendor
router.delete("/vendors/:id", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const result = await Vendor.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vendor", error });
  }
});

export default router;
import { Request, Response, NextFunction } from "express";
import { Vendor } from "../admin/custom/models/vendor";

export const checkVendorStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const vendor = await Vendor.findOne({ where: { id: req.user.vendorId } }); // Assuming req.user.vendorId contains vendor ID

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (vendor.status !== "approved") {
      return res.status(403).json({ message: "Action not allowed for vendors with current status" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error validating vendor status", error });
  }
};

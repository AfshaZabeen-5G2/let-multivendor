import express from "express";
import bcrypt from "bcryptjs";
import { Vendor } from "../../models/vendor";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, businessName, businessAddress, phoneNumber } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = await Vendor.create({
      name,
      email,
      password: hashedPassword,
      businessName,
      businessAddress,
      phoneNumber,
      status: "pending", // Default status for new vendors
    });

    res.status(201).json({ message: "Vendor created successfully", vendor: newVendor });
  } catch (error) {
    console.error("Error creating vendor:", error);
    res.status(500).json({ error: "Error creating vendor" });
  }
});

export default router;

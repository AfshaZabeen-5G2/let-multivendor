import { Router } from "express";
import vendorManagementRoutes from "./custom/routes/vendor-management";

const router = Router();

// Add vendor management routes
router.use(vendorManagementRoutes);

export default router;

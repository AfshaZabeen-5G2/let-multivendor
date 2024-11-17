import { User } from "F:/letmultivendor/src/api/admin/models/user";
import bcrypt from "bcryptjs";

(async () => {
  const admin = new User();
  admin.email = "admin@example.com";
  admin.password = await bcrypt.hash("adminpassword", 10); // Hash password
  admin.isAdmin = true;

  await admin.save();
  console.log("Admin user created successfully.");
})();

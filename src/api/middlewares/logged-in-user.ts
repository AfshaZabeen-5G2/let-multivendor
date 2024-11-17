import { Request, Response, NextFunction } from "express";
import { User } from "../admin/models/user";

export const loggedInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id; // Assuming `req.user` contains the authenticated user
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    res.status(500).json({ message: "Error verifying user", error });
  }
};

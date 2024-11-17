import { NextFunction, Request, Response } from "express";

// Middleware to authenticate all users
export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Middleware to authorize only admins
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

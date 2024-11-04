import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./auth";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).json({ error: "A token is required for authentication" });

    return;
  }

  try {
    const decoded = verifyToken(token.split(" ")[1]);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid Token" });
    return;
  }
};

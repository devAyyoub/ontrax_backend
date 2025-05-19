import { type Request, type Response, type NextFunction, json } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    const error = new Error("No autorizado");
    res.status(401).json({ error: error.message });
    return;
  }

  const token = bearer.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded === "object" && decoded.id) {
      const user = await User.findById(decoded.id);
      console.log(user);
    }
  } catch (error) {
    res.status(500).json({ error: "Token no válido" });
  }

  next();
};

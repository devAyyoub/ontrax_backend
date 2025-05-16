import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";

export class AuthController {
  static createAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, email } = req.body;

      // Prevent duplicated email's
      const userExists = await User.findOne({ email });
      if (userExists) {
        const error = new Error("El usuario ya está registrado");
        res.status(409).json({ error: error.message });
        return;
      }
      // Create a user
      const user = new User(req.body);
      user.password = await hashPassword(password);
      await user.save();
      res.send("Cuenta creada, revista tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}

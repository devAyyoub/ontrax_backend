import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import Token from "../models/Token";
import { transporter } from "../config/nodemailer";

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

      // Hash password
      user.password = await hashPassword(password);

      // Generate token
      const token = new Token();
      token.token = generateToken();
      token.user = user.id;

      // Send the email
      await transporter.sendMail({
        from: "Ontrax <admin@ontrax.com>",
        to: user.email,
        subject: "Ontrax - Confirma tu cuenta",
        text: "Ontrax - Confirma tu cuenta",
        html: `<p>Probando email</p>`,
      });

      await Promise.allSettled([user.save(), token.save()]);
      res.send("Cuenta creada, revista tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" + error });
    }
  };
}

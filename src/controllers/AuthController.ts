import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { generateToken } from "../utils/token";
import Token from "../models/Token";
import { AuthEmail } from "../emails/AuthEmail";
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
      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token: token.token,
      });

      await Promise.allSettled([user.save(), token.save()]);
      res.send("Cuenta creada, revista tu email para confirmarla");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" + error });
    }
  };

  static confirmAccount = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { token } = req.body;

      const tokenExists = await Token.findOne({ token });
      if (!tokenExists) {
        const error = new Error("Token incorrecto o expirado");
        res.status(404).send({ error: error.message });
        return;
      }
      const user = await User.findById(tokenExists.user);
      user.confirmed = true;
      await Promise.allSettled([user.save(), tokenExists.deleteOne()]);
      res.send("Cuenta confirmada");
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };

  static login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        const error = new Error("Usuario no encontrado");
        res.status(404).send({ error: error.message });
        return;
      }
      if (!user.confirmed) {
        const token = new Token();
        token.token = generateToken();
        token.user = user.id;
        await token.save();

        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token: token.token,
        });

        const error = new Error("Cuenta no confirmada, hemos enviado un correo de confirmación");
        res.status(401).send({ error: error.message });
        return;
      }
    } catch (error) {
      res.status(500).json({ error: "Hubo un error" });
    }
  };
}

import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.post(
  "/create-account",
  body("email").isEmail().withMessage("Email no válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener mínimo 8 caracteres"),
  body("password-confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    } else {
      return true;
    }
  }),
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  body("password-confirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    } else {
      return true;
    }
  }),
  body("token").notEmpty().withMessage("El token no puede ir vacío"),
  handleInputErrors, AuthController.confirmAccount
);

export default router;

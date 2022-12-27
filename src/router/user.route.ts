import { Router } from "express";
import { AuthController } from "../services/core/controllers/Auth.controller";

const authController = new AuthController();
const authRoutes = Router();

authRoutes.post("/login", authController.login);

authRoutes.post("/register", authController.register);

export { authRoutes };

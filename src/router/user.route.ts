import { Router } from "express";
import { AuthController } from "../Services/core/controllers/Auth.controller";
import {
  assertRequiredRegisterFieldsIsNotEmpty,
  assertRequiredLoginFieldsIsNotEmpty,
} from "../Services/core/controllers/utils";

const authController = new AuthController();
const authRoutes = Router();

authRoutes.post("/login", assertRequiredLoginFieldsIsNotEmpty, authController.login);

authRoutes.post("/register", assertRequiredRegisterFieldsIsNotEmpty, authController.register);

export { authRoutes };

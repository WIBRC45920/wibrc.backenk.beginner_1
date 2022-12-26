import express, { Request, Response } from "express";
import cors from "cors";
import { UserController } from "../services/core/controllers/User.controller";

const Routes = express();

Routes.use(cors());
Routes.use(express.urlencoded({ extended: true }))

Routes.get("/", (request: Request, response: Response) => {
  response.send("Hello there");
});


//Users
const userController  = new UserController()
Routes.post("/user/register", userController.register);


export { Routes };

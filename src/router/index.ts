import express, { Request, Response } from "express";
import cors from "cors";

const Routes = express();

Routes.use(cors());

Routes.get("/", (request: Request, response: Response) => {
  response.send("Hello there");
});

export { Routes };

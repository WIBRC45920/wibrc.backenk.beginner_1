import { Request, Response } from "express";
import { UserService } from "../services/User.service";

export class UserController {
  constructor(private userService?: UserService) {}

  register(request: Request, response: Response) {
    console.log(request.body);
    // console.log(response);
    response.send("Creation processing ...");
  }
}

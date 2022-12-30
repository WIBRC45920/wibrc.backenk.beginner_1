import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User } from "../../models";
import { UserDTO, UserStatusDTO } from "../../types";
import { UserService } from "../services/user/User.service";
import { UserError, ServerError } from "./errors";
import { USER_FIELDS_TO_EXTRACT } from "../extractCode/User.extractCode";
import { hashPassword, comparePassword, generateToken } from "./utils";

export class AuthController {
  useUserService: UserService;

  constructor() {
    this.useUserService = new UserService();
  }

  async register(request: Request<UserDTO>, response: Response) {
    const validator = validationResult(request);
    if (!validator.isEmpty()) {
      return response.status(400).send(validator.array({ onlyFirstError: true }).map((error) => error.msg)[0]);
    }

    const status = request.body.status ? request.body.status : UserStatusDTO.USER;
    if (![UserStatusDTO.ADMIN, UserStatusDTO.USER].includes(status)) {
      return response.status(400).send("Wrong user status");
    }

    try {
      const myUserByEmail = await new UserService().findByEmail(request.body.email, USER_FIELDS_TO_EXTRACT.CODE_1);
      if (!myUserByEmail) {
        const myUserByUsername = await new UserService().findByUserName(
          request.body.username,
          USER_FIELDS_TO_EXTRACT.CODE_1
        );
        if (!myUserByUsername) {
          const saltPassword: string = await hashPassword(request.body.password);
          if ([UserStatusDTO.ADMIN, UserStatusDTO.USER].includes(status)) {
            const newUser = await User.create({
              ...request.body,
              password: saltPassword,
              status,
            });
            response.status(201).send({
              id: newUser.getDataValue("uid"),
            });
          }
        } else response.status(409).send(UserError.USER_409);
      } else response.status(409).send(UserError.USER_409);
    } catch (error) {
      response.status(500).send(ServerError.SERVER_500);
    }
  }

  async login(request: Request, response: Response) {
    const loginValidator = validationResult(request);
    if (!loginValidator.isEmpty()) {
      return response.status(400).send(loginValidator.array({ onlyFirstError: true }).map((error) => error.msg)[0]);
    }

    try {
      const user = await new UserService().findByEmail(request.body.email, USER_FIELDS_TO_EXTRACT.CODE_2);
      if (user) {
        const isSame: boolean = await comparePassword(request.body.password, user.getDataValue("password"));
        if (isSame) {
          const token = generateToken({
            id: user.getDataValue("uid"),
            profile: {
              email: user.getDataValue("email"),
              username: user.getDataValue("username"),
              role: user.getDataValue("status"),
            },
          });
          response.status(200).cookie("token", token).send(user.setAttributes("password", null));
        } else response.status(401).send(UserError.USER_401);
      } else response.status(404).send(UserError.USER_404);
    } catch (error) {
      response.status(500).send(ServerError.SERVER_500);
    }
  }
}
//use alias to reduce path
//Document the error messages
//update login and make some research to see id we need to send `id` or all information

//Research: make some research about inheritance of abstract class in typescript (I encountered an error whe i tried to make it in djangui)

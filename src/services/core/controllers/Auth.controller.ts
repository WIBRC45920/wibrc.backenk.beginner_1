import { Request, Response } from "express";

import { User } from "../../models";
import { UserDTO, UserStatusDTO } from "../../types";
import { UserService } from "../services/user/User.service";
import { UserError, ServerError } from "./errors";
import { USER_FIELDS_TO_EXTRACT } from "../extractCode/User.extractCode";
import { hashPassword, comparePassword, generateToken } from "../services/user/utils";

export class AuthController {
  useUserService: UserService;

  constructor() {
    this.useUserService = new UserService();
  }

  // eslint-disable-next-line max-lines-per-function
  async register(request: Request<UserDTO>, response: Response) {
    try {
      const myUserByEmail = await new UserService().findByEmail(request.body.email, USER_FIELDS_TO_EXTRACT.CODE_1);
      if (!myUserByEmail) {
        const myUserByUsername = await new UserService().findByUserName(
          request.body.username,
          USER_FIELDS_TO_EXTRACT.CODE_1
        );
        if (!myUserByUsername) {
          const saltPassword: string = await hashPassword(request.body.password);
          const status = request.body.status ? request.body.status : UserStatusDTO.USER;
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
          response.status(200).setHeader("token", token).send(user.setAttributes("password", null));
        } else response.status(401).send(UserError.USER_401);
      } else response.status(404).send(UserError.USER_404);
    } catch (error) {
      response.status(500).send(ServerError.SERVER_500);
    }
  }
}

import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

import { User } from "../../models";
import { UserDTO } from "../../types";
import { UserService } from "../services/user/User.service";
import { UserError, ServerError } from "./errors";
import { USER_FIELDS_TO_EXTRACT_CODE } from "../extractCode/User.extractCode";
import { hashPassword, comparePassword } from "../services/user/utils";

const JWT_KEY = "49U3Z16Plt$VoG2JZkm^9O*$wEBDeQt|@XK1_La/eE]Wt-[tnclANZ";
export class AuthController {
  useUserService: UserService;

  constructor() {
    this.useUserService = new UserService();
  }

  // eslint-disable-next-line max-lines-per-function
  async register(request: Request<UserDTO>, response: Response) {
    try {
      const myUserByEmail = await this.useUserService.findByEmail(
        request.body.email,
        USER_FIELDS_TO_EXTRACT_CODE.CODE_1
      );
      if (!myUserByEmail) {
        const myUserByUsername = await this.useUserService.findByUserName(
          request.body.username,
          USER_FIELDS_TO_EXTRACT_CODE.CODE_1
        );
        if (!myUserByUsername) {
          const saltPassword: string = await hashPassword(request.body.password);
          const newUser = await User.create({
            ...request.body,
            password: saltPassword,
          });
          response.status(201).send({
            id: newUser.getDataValue("id"),
          });
        } else response.status(409).send(UserError.USER_409);
      } else response.status(409).send(UserError.USER_409);
    } catch (error) {
      response.status(500).send(ServerError.SERVER_500);
    }
  }

  async login(request: Request, response: Response) {
    try {
      const user = await this.useUserService.findByEmail(request.body.email, USER_FIELDS_TO_EXTRACT_CODE.CODE_2);
      if (user) {
        const isSame = await comparePassword(request.body.password, user.getDataValue("password"));
        if (isSame) {
          const token = sign(
            {
              userId: user.getDataValue("password"),
              email: user.getDataValue("email"),
            },
            process.env.JWT_KEY || JWT_KEY,
            {
              algorithm: "RS256",
              expiresIn: "1h",
            }
          );
          response.status(200).setHeader("token", token).send(user.setAttributes("password", null));
        } else response.status(401).send(UserError.USER_401);
      } else response.status(404).send(UserError.USER_404);
    } catch (error) {
      response.status(500).send(ServerError.SERVER_500);
    }
  }
}

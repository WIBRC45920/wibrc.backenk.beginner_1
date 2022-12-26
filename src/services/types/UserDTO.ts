import { Blob } from "buffer";
import { Optional } from "sequelize";

export type UserDTO = {
  id?: string;
  username: string;
  dateNaiss: Date;
  email: string;
  password: string;
  status: UserStatusDTO;
  image?: Blob;
};
export enum UserStatusDTO {
  ADMIN = "ADMIN",
  USER = "USER",
}

export type UserOuput = Optional<UserDTO, "image">;
export type UserInput = Required<UserDTO>;

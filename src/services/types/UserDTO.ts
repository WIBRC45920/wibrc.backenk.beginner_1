import { Blob } from "buffer";
import { Optional } from "sequelize";

export type UserDTO = {
  id: string;
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

export interface UserOuput extends Optional<UserDTO, "image"> {}
export interface UserInput extends Required<UserDTO> {}
export type UserDTO = {
  id: string;
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  status?: UserStatusDTO;
};
export enum UserStatusDTO {
  ADMIN = "ADMIN",
  USER = "USER",
}

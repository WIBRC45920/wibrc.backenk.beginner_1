import { USER_FIELDS_TO_EXTRACT } from "../../extractCode/User.extractCode";
import { UserDTO } from "../../../types";

type USER_KEYS = keyof UserDTO;

export const getFieldsByFieldToExtractBy = (code: USER_FIELDS_TO_EXTRACT): USER_KEYS[] => {
  if (code === USER_FIELDS_TO_EXTRACT.CODE_1) return ["email", "username"];
  if (code === USER_FIELDS_TO_EXTRACT.CODE_2)
    return ["uid", "email", "username", "dateNaiss", "status", "image", "password"];
  return ["status"];
};

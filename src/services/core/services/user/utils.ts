import { USER_FIELDS_TO_EXTRACT_CODE } from "../../extractCode/User.extractCode";
import { hash, compare } from "bcrypt";

const SALBOUND = 20;

export const fieldsToExtractCorresponding = (field: USER_FIELDS_TO_EXTRACT_CODE): string[] => {
  if (field === USER_FIELDS_TO_EXTRACT_CODE.CODE_1) return ["email", "username"];
  if (field === USER_FIELDS_TO_EXTRACT_CODE.CODE_2)
    return ["email", "username", "dateNaiss", "status", "image", "password"];
  return [""];
};

export const hashPassword = async (password: string): Promise<string> => await hash(password, SALBOUND);
export const comparePassword = async (passwordToCompared: string, password: string): Promise<boolean> =>
  await compare(passwordToCompared, password);

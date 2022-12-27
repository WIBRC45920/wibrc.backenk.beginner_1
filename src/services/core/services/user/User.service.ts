import { User } from "../../../models";
import { USER_FIELDS_TO_EXTRACT_CODE } from "../../extractCode/User.extractCode";
import { fieldsToExtractCorresponding } from "./utils";

export class UserService {
  constructor() {
    console.log("User Service");
  }

  public async findByEmail(email: string, fieldToExtract: USER_FIELDS_TO_EXTRACT_CODE): Promise<User | null> {
    return await User.findOne({
      attributes: fieldsToExtractCorresponding(fieldToExtract),
      where: { email },
    });
  }

  public async findByUserName(username: string, fieldToExtract: USER_FIELDS_TO_EXTRACT_CODE): Promise<User | null> {
    return await User.findOne({
      attributes: fieldsToExtractCorresponding(fieldToExtract),
      where: { username },
    });
  }
}

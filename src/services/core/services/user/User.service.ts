import { User } from "../../../models";
import { USER_FIELDS_TO_EXTRACT } from "../../extractCode/User.extractCode";
import { getFieldsByFieldToExtractBy } from "./utils";

export class UserService {
  constructor() {
    console.log("User Service");
  }

  public async findByEmail(email: string, code: USER_FIELDS_TO_EXTRACT): Promise<User | null> {
    return await User.findOne({
      attributes: getFieldsByFieldToExtractBy(code),
      where: { email },
    });
  }

  public async findByUserName(username: string, code: USER_FIELDS_TO_EXTRACT): Promise<User | null> {
    return await User.findOne({
      attributes: getFieldsByFieldToExtractBy(code),
      where: { username },
    });
  }
}

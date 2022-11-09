import { sequelizeInstance } from "./config/db.config";
import { User } from "./models/User"

console.log(sequelizeInstance.models.User === User);

import { sequelizeInstance } from "./config/db.config";
import { User } from "./services/models/User";

console.log(sequelizeInstance.models.User === User);

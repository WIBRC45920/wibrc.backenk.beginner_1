import { sequelizeInstance } from "../config/db.config";
import { User, Message, Group } from "./models/index";

const isDev = process.env.NODE_ENV === 'development';

console.log(sequelizeInstance.models.User === User);

export const dbInit = (): void => {
    Message.sync({ alter: isDev })
    Group.sync({ alter: isDev })
    User.sync({ alter: isDev })

    //USER
    User.hasMany(Message);
    User.belongsToMany(Group, { through: User });

    //MESSAGE
    Message.belongsTo(User);
    Message.belongsTo(Group);

    //GROUP
    Group.hasMany(User);
    Group.hasMany(Message);
  }
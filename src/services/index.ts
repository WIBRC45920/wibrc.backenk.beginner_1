import { User, Message, Group } from "./models/index";

const isDev = process.env.NODE_ENV === "development";

export const dbInit = (): void => {
  Message.sync({ alter: isDev });
  Group.sync({ alter: isDev });
  User.sync({ alter: isDev });

  //USER
  User.hasMany(Message, { foreignKey: "user_pk" });
  User.belongsToMany(Group, 
    { 
     through: User, 
     foreignKey: "group_pk"
   });

  //MESSAGE
  Message.belongsTo(User, { foreignKey: "user_pk" });
  Message.belongsTo(Group, { foreignKey: "group_pk" });

  //GROUP
  Group.hasMany(User, { foreignKey: "user_pk" });
  Group.hasMany(Message, { foreignKey: "group_pk" });
};

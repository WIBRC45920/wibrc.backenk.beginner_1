import { User, Message, Group } from "./models/index";

const isDev = process.env.NODE_ENV === "development";

export const dbInit = (): void => {
  Message.sync({ alter: isDev });
  Group.sync({ alter: isDev });
  User.sync({ alter: isDev });

  //USER
  User.hasMany(Message);
  User.belongsToMany(Group, { through: User });

  //MESSAGE
  Message.belongsTo(User);
  Message.belongsTo(Group);

  //GROUP
  Group.hasMany(User);
  Group.hasMany(Message);

  //BUG: mamage the generation problem (relation at User level)
};

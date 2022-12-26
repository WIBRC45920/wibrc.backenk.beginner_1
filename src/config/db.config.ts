import { Sequelize } from "sequelize";

const sequelizeInstance = new Sequelize({
  logging: console.log,
  password: "chat_app_12345678",
  username: "chat_app",
  database: "chat_app",
  dialect: "mysql",
  host: "localhost",
  define: {
    freezeTableName: true,
  },
});

export { sequelizeInstance };
//process.env.Variable_name-1

import { Sequelize } from "sequelize";

const dbName = process.env.DB_NAME
const dbUser = process.env.BD_DEV_USERNAME as string
const dbHost = process.env.DEV_ORIGIN
const dbPassword = process.env.BD_DEV_PASSWORD

console.log(dbName);

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

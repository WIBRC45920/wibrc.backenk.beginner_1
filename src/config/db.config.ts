import { Sequelize } from "sequelize";

const sequelizeInstance = new Sequelize("sqlite::memory:", {
  logging: console.log,
  define: {
    freezeTableName: true,
  }
});

export { sequelizeInstance };
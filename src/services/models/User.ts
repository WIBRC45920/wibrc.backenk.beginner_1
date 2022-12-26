import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../../config/db.config";
import { UserStatusDTO } from "../types/index";
import { Message, Group } from "./index";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dateNaiss: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(UserStatusDTO.ADMIN, UserStatusDTO.USER),
      defaultValue: UserStatusDTO.USER,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "User",
    timestamps: true, //Allow to add creation date and update date in  the BD
    createdAt: "create_at", //createdAt: false -> to cancel it creation
    updatedAt: "update_at", //updatedAt: false -> to cancel it creation
  }
);

export { User };

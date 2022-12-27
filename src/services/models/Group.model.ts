import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../../config/db.config";
import { GroupType } from "../types/GroupDTO";

export class Group extends Model {}

Group.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    sujet: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(GroupType.DIALOGUE, GroupType.FACE_TO_FACE),
      defaultValue: GroupType.FACE_TO_FACE,
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Group",
    timestamps: true, //Allow to add creation date and update date in  the BD
    createdAt: "create_at", //createdAt: false -> to cancel it creation
    updatedAt: "update_at", //updatedAt: false -> to cancel it creation
  }
);

import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../../config/db.config";

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    textContent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageContent: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Message",
    timestamps: true, //Allow to add creation date and update date in  the BD
    createdAt: "create_at", //createdAt: false -> to cancel it creation
    updatedAt: "update_at", //updatedAt: false -> to cancel it creation
  }
);

export { Message };

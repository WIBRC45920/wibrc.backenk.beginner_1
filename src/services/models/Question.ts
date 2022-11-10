import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../../config/db.config";
import { QuestionStatusDTO } from "../types/QuestionDTO";

class Question extends Model {}

Question.init(
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(QuestionStatusDTO.OPEN, QuestionStatusDTO.CLOSED),
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "Question",
    timestamps: true, //Allow to add creation date and update date in  the BD
    createdAt: "create_at", //createdAt: false -> to cancel it creation
    updatedAt: "update_at", //updatedAt: false -> to cancel it creation
  }
);

export { Question };

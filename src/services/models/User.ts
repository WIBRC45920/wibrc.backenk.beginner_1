import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../../config/db.config";

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    firsName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, 
{
    sequelize: sequelizeInstance,
    modelName: "User"
});

export { User };
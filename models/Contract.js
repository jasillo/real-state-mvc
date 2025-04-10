import { Model, DataTypes } from 'sequelize';
import db from '../config/db.js'

class Contract extends Model {}

Contract.init(
    {
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: "contract",
        tableName: "contracts"
    }
);

export default Contract;
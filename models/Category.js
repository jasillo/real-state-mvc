import { Model, DataTypes } from 'sequelize';
import db from '../config/db.js'

class Category extends Model {}

Category.init(
    {
        name: {
            type: DataTypes.STRING(30),
            allowNull: false
        }
    },
    {
        sequelize: db,
        modelName: "category",
        tableName: "categories"
    }
);

export default Category;
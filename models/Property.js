import { Model, DataTypes } from 'sequelize';
import db from '../config/db.js'

class Property extends Model {}
Property.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        parking: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        toilet: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        area: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pet: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        furnished: {
            type: DataTypes.BOOLEAN,
            allowNull : false
        },
        lat: {
            type: DataTypes.STRING,
            allowNull : false
        },
        lng: {
            type: DataTypes.STRING,
            allowNull : false
        },
        published: {
            type: DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull : true
        }
    },
    {
        sequelize: db,
        modelName: "property",
        tableName: "properties",
        scopes: {
            adminPanel: {
                attributes: ['id', 'title', 'price', 'image']
            }
        }
    }
);

export default Property;
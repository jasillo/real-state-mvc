import { DataTypes } from 'sequelize';
import db from '../config/db.js'

const User = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pwd: {
        type: DataTypes.STRING,
        allowNull:false
    },
    token: DataTypes.STRING,
    isVerified: DataTypes.BOOLEAN
});

export default User;
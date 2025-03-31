import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
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
}, {
    hooks:{
        beforeCreate: async function(user) {
            const salt = await bcrypt.genSalt(10);
            user.pwd = await bcrypt.hash(user.pwd, salt);
        }
    }
}

);

export default User;
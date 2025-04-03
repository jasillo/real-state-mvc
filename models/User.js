import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js'

class User extends Model {

    /**
     * update password methos
     * @param {string} newPassword - the new password
     * @returns {Promise<void>}
     */
    async updatePassword(newPassword) {
        const salt = await bcrypt.genSalt(10);
        this.pwd = await bcrypt.hash(newPassword, salt);
        await this.save(); 
    }

    /**
     * compare the password with the stored password
     * @param {string} password
     * @returns {Promise<boolean>}
     */
    async verifyPassword(password) {
        return await bcrypt.compare(password, this.pwd);
    }
}

// Definir los atributos del modelo
User.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true },
        },
        pwd: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        token: DataTypes.STRING,
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize: db,
        modelName: "user",
        tableName: "users",
        hooks: {
            beforeCreate: async (user) => {
                user.pwd = await bcrypt.hash(user.pwd, 10);
            },
        },
    }
);

export default User;
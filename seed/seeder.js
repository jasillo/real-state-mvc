import { exit } from 'node:process'
import categoriesData from './categoryData.js'
import contractData from './contractData.js'
import userData from './userData.js'
import { Category, Contract, User, Property } from '../models/index.js'
import db from '../config/db.js'

const importData = async () => {
    try {
        await db.authenticate();
        await db.sync({ force: true });

        await Promise.all([
            Category.bulkCreate(categoriesData),
            Contract.bulkCreate(contractData),
            User.bulkCreate(userData)
        ]);

        exit(0);
    } catch (error) {
        console.log(error);
        exit(1);
    }
};

const deleteData = async () => {
    try {
        // await Promise.all([
        //     Category.destroy({ where: {} }),
        //     Contract.destroy({ where: {} }),
        //     User.destroy({ where: {} })
        // ]);
        await db.sync({ force: true });
        exit(0);
    } catch (error) {
        console.log(error);
        exit(1);
    }
};

if (process.argv[2] === "-i") {
    importData();
}

if (process.argv[2] === "-d") {
    deleteData();
}
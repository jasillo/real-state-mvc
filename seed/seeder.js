import { exit } from 'node:process'
import categoriesData from './categoryData.js'
import contractData from './contractData.js'
import { Category, Contract } from '../models/index.js'
import db from '../config/db.js'

const importData = async () => {
    try {
        await db.authenticate();
        await db.sync();

        await Promise.all([
            await Category.bulkCreate(categoriesData),
            await Contract.bulkCreate(contractData)
        ]);db:

        exit(0);
    } catch (error) {
        console.log(error);
        exit(1);
    }
};

const deleteData = async () => {
    try {
        await Promise.all([
            await Category.destroy({ where: {}, truncate: true }),
            await Contract.destroy({ where: {}, truncate: true })
        ]);

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
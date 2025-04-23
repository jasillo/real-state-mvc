import Category from "./Category.js"
import Contract from "./Contract.js"
import Property from "./Property.js"
import User from "./User.js"

Property.belongsTo(User, {foreignKey: 'userId'});
Property.belongsTo(Contract, {foreignKey: 'contractId'});
Property.belongsTo(Category, {foreignKey: 'categoryId'});

export {
    Property,
    Category,
    Contract,
    User
};
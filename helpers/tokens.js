import bcrypt from 'bcrypt';

/**
 * Generate a token combinig a random number with the date
 * @returns token
 */
const generateId = () =>
    Math.random().toString(32).substring(2) + Date.now().toString(32);

/**
 * @param {string} pwd 
 * @returns hashed password
 */
const hashPwd = async (pwd) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(pwd, salt);
    return hashedPwd;
}


export {
    generateId,
    hashPwd
}
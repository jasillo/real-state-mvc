import jwt from 'jsonwebtoken';

/**
 * Generate a token combinig a random number with the date
 * @returns token
 */
const generateId = () =>
    Math.random().toString(32).substring(2) + Date.now().toString(32);

/**
 * Generate a Json Web Token using the user ID
 * @param {{id:string, name:string}} data 
 * @returns token
 */
const generateJWT = (data) =>
    jwt.sign(({
        id: data.id,
        name: data.name
    }),
        process.env.JWT_KEY,
        { expiresIn: '1d' });

export {
    generateId,
    generateJWT
}

/**
 * Generate a token combinig a random number with the date
 * @returns token
 */
const generateId = () =>
    Math.random().toString(32).substring(2) + Date.now().toString(32);

export {
    generateId
}
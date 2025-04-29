import bcrypt from 'bcrypt'

const userData = [
    {
        name: 'test',
        email: 'test@gg.com',
        pwd: bcrypt.hashSync('testpwd', 10),
        isVerified: true,
    },
    {
        name: 'test1',
        email: 'test1@gg.com',
        pwd: bcrypt.hashSync('testpwd', 10),
        isVerified: true,
    }
];

export default userData;
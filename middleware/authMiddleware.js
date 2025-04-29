import jwt from 'jsonwebtoken'
import User from '../models/User.js';

const requireAuth = async (req, res, next) => {
    // verify token exist
    const { _token } = req.cookies;
    if (!_token) {
        return res.redirect('/auth/login');
    }

    // verity token content
    try {
        const decoded = jwt.verify(_token, process.env.JWT_KEY);
        const user = await User.scope('minimum').findByPk(decoded.id);

        // atach to req
        if (user) {
            req.user = user;
        } else {
            return res.clearCookie('_token').redirect('/auth/login');    
        }
    } catch (error) {
        return res.clearCookie('_token').redirect('/auth/login');
    }
    next();
};

export default requireAuth
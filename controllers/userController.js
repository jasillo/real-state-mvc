import {check, validationResult} from 'express-validator';
import User from '../models/User.js';

const loginForm = (req, res) => {
    res.render('auth/login',{
        page: 'Iniciar Sesión'
    })
};

const registerForm = (req, res) => {
    res.render('auth/register',{
        page: 'Crear Cuenta'
    })
};

const registerUser = async (req, res) => {
    const newUser = await User.create(req.body);
    res.json(newUser);
};

const recoveryPwdForm = (req, res) => {
    res.render('auth/recoveryPwd',{
        page: 'Recupera tu password'
    })
};

export{
    loginForm,
    registerForm,
    recoveryPwdForm,
    registerUser
};
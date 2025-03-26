import { check, validationResult } from 'express-validator';
import User from '../models/User.js';

const loginForm = (req, res) => {
    res.render('auth/login', {
        page: 'Iniciar Sesión'
    })
};

const registerForm = (req, res) => {
    res.render('auth/register', {
        page: 'Crear Cuenta'
    })
};

const registerUser = async (req, res) => {
    await check('name').notEmpty().withMessage('El nombre no puede estar en blanco').run(req);
    await check('email').isEmail().withMessage('Debe ingresar un email valido').run(req);
    await check('pwd').isLength({ min: 8 }).withMessage('el password debe tener al menos 8 caracteres').run(req);
    await check('rePwd').equals(req.body.pwd).withMessage('los passwords no son iguales').run(req);
    let valErrors = validationResult(req);

    console.log(req.body);
    // check fields
    if (!valErrors.isEmpty()) {
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            errors: valErrors.array(),
            saved: {
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    // check duplicated user email
    const userFound = await User.findOne({ where: { email: req.body.email } });
    if (userFound) {
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            errors: [{ msg: 'este email ya esta registrado' }],
            saved: {
                name: req.body.name,
                email: req.body.email
            }
        });
    }

    const newUser = await User.create(req.body);
    res.json(newUser);
};

const recoveryPwdForm = (req, res) => {
    res.render('auth/recoveryPwd', {
        page: 'Recupera tu password'
    })
};

export {
    loginForm,
    registerForm,
    recoveryPwdForm,
    registerUser
};
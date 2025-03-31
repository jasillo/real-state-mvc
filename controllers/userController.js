import { check, validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateId } from '../helpers/tokens.js'

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

const registerValidator = [
    check('name').notEmpty().withMessage('El nombre no puede estar en blanco'),
    check('email').isEmail().withMessage('Debe ingresar un email valido'),
    check('pwd').isLength({ min: 8 }).withMessage('el password debe tener al menos 8 caracteres'),
    check('rePwd').custom((value, { req }) => {
        if (value !== req.body.pwd) {
            throw new Error('Los passwords no coinciden');
        }
        return true;
    })
];

const singupUser = async (req, res) => {
    // extract fields
    const { name, email, pwd } = req.body;

    // check fields' errors
    let valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            errors: valErrors.array(),
            saved: {
                name: name,
                email: email
            }
        });
    }

    // check existing account by email
    const userFound = await User.findOne({ where: { email: email } });
    if (userFound) {
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            errors: [{ msg: 'este email ya esta registrado' }],
            saved: {
                name: name,
                email: email
            }
        });
    }

    await User.create({
        name: name,
        email: email,
        pwd: pwd,
        token: generateId()
    });

    // show succesfull message
    res.render('templates/message',{
        page: 'Cuenta creada correctamente',
        message : 'Hemos enviado un email de confirmacion al correo'
    })
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
    singupUser,
    registerValidator
};
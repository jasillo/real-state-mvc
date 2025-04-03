import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateId, hashPwd } from '../helpers/tokens.js';
import { emailConfirmAccount, emailRecoveryPwd } from '../helpers/emails.js'

/**
 * rendeer the login form page for firts time
 */
const loginForm = (req, res) => {
    res.render('auth/login', {
        page: 'Iniciar Sesión',
        csrfToken: req.csrfToken()
    })
};

// ========================================================
// SECTION: Register new User
// ========================================================

/**
 * rules for validating the register form
 */
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

/**
 * Create a new user.
 * If req empty: render an empty form.
 * If create user failed: render register view with errors.
 * If create user success: render a confirmation message and send email.
 * @param {{ name, email, pwd, rePwd }} req 
 * @returns {void} render register or message view
 */
const singupUser = async (req, res) => {
    // req es empty, render an empty form
    if (req.method === "GET") {
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            csrfToken: req.csrfToken()
        })
    }

    const { name, email, pwd } = req.body;
    const saved = { name, email };

    const renderWithErrors = (errors) => {
        return res.render('auth/register', {
            page: 'Crear Cuenta',
            errors,
            csrfToken: req.csrfToken(),
            saved
        });
    };

    // check fields' errors
    let valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return renderWithErrors(valErrors.array());
    }

    // check existing account by email
    const userFound = await User.findOne({ where: { email: email } });
    if (userFound) {
        return renderWithErrors([{ msg: 'este email ya esta registrado' }]);
    }

    // create user with a verify email token
    const user = await User.create({ name, email, pwd, token: generateId() });

    // send confirmation email
    emailConfirmAccount({
        name: user.name,
        email: user.email,
        token: user.token
    });


    // show succesfull message
    res.render('templates/message', {
        page: 'Cuenta creada correctamente',
        message: 'Hemos enviado un email de confirmacion al correo'
    })
};

/**
 * verify the user account by the token that was send by email.
 * If token exist: render verifyEmail view with success message.
 * If token no exist: render verifyEmail view with error message.
 * @param {string} req.params.token - sended token by email
 * @returns {void} render verifyEmail view.
 */
const verifyEmail = async (req, res) => {
    const { token } = req.params;

    // verify valid token
    const user = await User.findOne({ where: { token: token } });
    if (!user) {
        return res.render('auth/verifyEmail', {
            page: 'Error al verificar email',
            message: 'Hubo un error al verificar tu email',
            error: true
        });
    }

    // confirm account
    user.token = null;
    user.isVerified = true;
    await user.save();

    res.render('auth/verifyEmail', {
        page: 'Cuenta verificada',
        message: 'La cuenta se verifico correctamente'
    });
};

// ========================================================
// SECTION: Recovery Password
// ========================================================

/**
 * rules for validating the recovery password form
 */
const emailValidator = [
    check('email').isEmail().withMessage('Debe ingresar un email valido')
];

/**
 * rules for validating the recovery password form
 */
const pwdValidator = [
    check('pwd').isLength({ min: 8 }).withMessage('el password debe tener al menos 8 caracteres')
];

/**
 * restart password, send an email with a link for recovery password.
 * If req empty: render an empty form.
 * If recovery fail: render recoveryPwd with errors.
 * If success: render message view and send token by email.
 * @param {{ email }} req 
 * @returns {void} render recoveryPwd or message view
 */
const resetPwd = async (req, res) => {
    // req empty
    if (req.method === "GET") {
        return res.render('auth/recoveryPwd', {
            page: 'Recupera tu password',
            csrfToken: req.csrfToken()
        })
    }

    const { email } = req.body;

    const renderWithErrors = (errors) => {
        return res.render('auth/recoveryPwd', {
            page: 'Recupera tu password',
            errors,
            csrfToken: req.csrfToken(),
            // saved
        });
    };

    // check fields' errors
    let valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return renderWithErrors(valErrors.array());
    }

    // check if email exist
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return renderWithErrors([{ msg: 'este email no esta registrado' }]);
    }

    // Generate token and send email
    user.token = generateId();
    user.save();

    // send a recovery password email
    emailRecoveryPwd({
        name: user.name,
        email: user.email,
        token: user.token
    });


    // show succesfull message
    res.render('templates/message', {
        page: 'Recuperacion de password',
        message: `Se ha enviado un email a ${user.email} con las instrucciones para resetear el password.`
    })
}

/**
 * Update user pasword.
 * If req empty: render an empty form.
 * If token is not valid: render verifyEmail view with errors.
 * If update user failed: render resetPwd view with errors.
 * If update user success: render a verifyEmail view success.
 * @param {{pwd}} req 
 * @returns {void} render verifyEmail or resetPwd view
 */
const createNewPwd = async (req, res) => {
    // token validation
    const { token } = req.params;
    const user = await User.findOne({ where: { token } });
    if (!user) {
        return res.render('auth/verifyEmail', {
            page: 'Reestablecer Password',
            message: 'Hubo un error al validar tu informacion',
            error: true
        });
    }

    // render resetPwd view in get request
    if (req.method === "GET") {
        return res.render('auth/resetPwd', {
            page: 'Reestablecer Password',
            csrfToken: req.csrfToken()
        });
    }

    const { pwd } = req.body;

    // check fields' errors
    let valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
        return res.render('auth/resetPwd', {
            page: 'Reestablecer Password',
            errors: valErrors.array(),
            csrfToken: req.csrfToken(),
        });
    }

    // udpate user data
    user.pwd = await hashPwd(pwd);
    user.token = null;
    await user.save();

    // show succesfull message
    res.render('auth/verifyEmail', {
        page: 'Cambio de password exitoso',
        message: 'Se ha cambiado el password exitosamente.'
    })
}


export {
    loginForm,
    singupUser,
    verifyEmail,
    resetPwd,
    createNewPwd,
    registerValidator,
    emailValidator,
    pwdValidator
};
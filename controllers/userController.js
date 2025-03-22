

const loginForm = (req, res) => {
    res.render('auth/login',{
        page: 'Iniciar Sesión'
    })
}

const registerForm = (req, res) => {
    res.render('auth/register',{
        page: 'Crear Cuenta'
    })
}

const recoveryPwdForm = (req, res) => {
    res.render('auth/recoveryPwd',{
        page: 'Recupera tu password'
    })
}

export{
    loginForm,
    registerForm,
    recoveryPwdForm
}
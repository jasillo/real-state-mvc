import nodemailer from 'nodemailer';


const registerEmail = async(data) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD
        }
  });

    const {name, email, token} = data;

    // send email
    await  transport.sendMail({
        from: 'bienesRaice.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p> Hola ${name}, confirma tu email en bienesRaices.com<\p>

            <p> Has click en el siguiente link para confirmarla:
                <a href= "${process.env.BACKEND_URL}:${process.env.PORT}/auth/verify-email/${token}"> Confirmar Email<\a>
            <\p>

            <p>Si no creaste esta cuenta, ignora el mensaje.<\p>
        `

    });
};


export {
    registerEmail
};
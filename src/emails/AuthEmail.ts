import { transporter } from "../config/nodemailer";

interface IEmail {
    email: string,
    name: string,
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user : IEmail) => {
        const info = await transporter.sendMail({
        from: "Ontrax <admin@ontrax.com>",
        to: user.email,
        subject: "Ontrax - Confirma tu cuenta",
        text: "Ontrax - Confirma tu cuenta",
        html: `<p>Hola ${user.name}. Has creado tu cuenta en Ontrax, ya casi está todo listo, solo tienes que confirmar tu cuenta</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            <p>E ingresa el siguiente código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
        `,
      });
      console.log('Mensaje enviado', info.messageId);
    }
}
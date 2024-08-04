import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { FailToSendEmail } from "../helpers/errors/failed_email_error";
import { envs } from "../envs";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "contato@roleapp.com.br",
    pass: "!@#RinhaDeMina010504"
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  if (!envs.EMAIL_LOGIN || !envs.EMAIL_PASSWORD) {
    console.error("CASA CAIU!!!");
    throw new Error("CASA CAIU!!!");
  }

  const mailOptions = {
    from: "contato@roleapp.com.br",
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado para ${to}: ${info.response}`);
  } catch (error: any) {
    console.error(`Erro ao enviar e-mail para ${to}: ${error}`);
    throw new FailToSendEmail(`Erro ao enviar e-mail para ${to}: ${error}`);
  }
}

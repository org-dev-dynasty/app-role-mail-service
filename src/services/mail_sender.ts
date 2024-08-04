import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { FailToSendEmail } from "../helpers/errors/failed_email_error";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: process.env.EMAIL_LOGIN,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail enviado para ${to}: ${info.response}`);
  } catch (error: any) {
    throw new FailToSendEmail(`Erro ao enviar e-mail para ${to}: ${error}`);
    console.error(`Erro ao enviar e-mail para ${to}: ${error}`);
  }
}

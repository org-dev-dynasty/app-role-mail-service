import { Request, Response } from "express";
import { sendEmail } from "../services/mail_sender";

export function emailHandler(req: Request, res: Response) {
  try {
    const { to, subject, text } = req.body;

    if (!subject) {
      throw new Error("Missing parameters");
    }
    if (!text) {
      throw new Error("Missing 'text' parameter");
    }
    if (!to) {
      throw new Error("Missing 'to' parameter");
    }

    sendEmail(to, subject, text);

    return res.status(200).send("Email sent successfully");
  } catch (error: any) {
    console.error("caiu a baia");
    return res.status(400).send(error.message);
  }
}

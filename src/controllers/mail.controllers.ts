import { transporter } from "../config/mailer";
import { Response, Request } from "express";
import { Mail } from "../models/project";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (req: Request, res: Response) => {
   const { name, email, phone, message } = req.body;
   try {
      await transporter.sendMail({
         from: process.env.MAIL_USER,
         to: process.env.MAIL_RECEIVER,
         subject: `message from portfolio - ${name}`,
         html: `
         <b>Nombre: ${name}</b><br>
         <b>Email: ${email}</b><br>
         <b>Telefono: ${phone}</b><br>
         <b>Mensaje:</b><br>
         <p>${message}</p>`,
      });

      const mail = await Mail.create({ name, email, phone, message });

      return res.status(200).json({
         success: true,
         content: mail,
         message: "email enviado correctamente",
      });
   } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: error });
   }
};

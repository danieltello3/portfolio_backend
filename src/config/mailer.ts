import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
});

transporter.verify().then(() => {
   console.log("Ready for send emails");
});

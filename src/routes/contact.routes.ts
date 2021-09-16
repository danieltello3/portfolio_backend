import { Router } from "express";
import { sendEmail } from "../controllers/mail.controllers";

export const contactRouter = Router();

contactRouter.post("/contact", sendEmail);

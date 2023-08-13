import nodemailer from 'nodemailer';
import { Request, Response, NextFunction } from 'express';
import 'dotenv/config';
import { EmailExist } from '../controllers/registrations.controller';
import { Registrations } from '../entities/registrations.entity';

export const emailSetting = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "gigihsantoso0524@gmail.com",
    pass: process.env.PASSWORD_GMAIL,
  },
})


export function checkEmailExisting(req: Request, res: Response, next: NextFunction) {
  EmailExist(req.body.email, (err: Error, registrations: Registrations[]) => {
    if (registrations !== null) {
      return res.status(400).json({ "message": "Email already registered" });
    } else if (err) {
      return res.status(500).json({ "message": "Internal Server Error" });
    }
    next()
  })
}
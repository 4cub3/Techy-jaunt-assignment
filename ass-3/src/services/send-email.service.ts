import nodemailer, { type SMTPSentMessageInfo } from "nodemailer";
import { CONFIGS } from "../config/config";

const transporter = nodemailer.createTransport({
  // host: CONFIGS.smtpHost,
  // port: CONFIGS.smtpPort,
  // secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  service: "gmail",
  auth: {
    user: CONFIGS.smtpUser,
    pass: CONFIGS.smtpPass,
  },
});

export const sendEmail = async (
  from: string = "doyin97@gmail.com",
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  try {
    await transporter.verify();
    const info: SMTPSentMessageInfo = await transporter.sendMail({
      from: `"Event management Team" <${from}>`, // sender address
      to: to, // list of recipients
      subject: subject, // subject line
      html: html, // HTML body
    });
    console.log(info);
  } catch (error) {
    throw error;
  }
};

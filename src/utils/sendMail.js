import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  try {
    return await transporter.sendMail(options);
  } catch (error) {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.', error
    );
  }
};



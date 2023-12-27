import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'amprojects2003@gmail.com',
      pass: 'qzfl pvll mtun lvae',
    },
  });

  await transporter.sendMail({
    from: 'amprojects2003@gmail.com', // sender address
    // to: 'mdmorshed.sj2005@gmail.com', // list of receivers
    to, // list of receivers
    subject: 'Reset your password within 10 minutes.', // Subject line
    text: 'Reset your password', // plain text body
    html, // html body
    // html: 'raju', // html body
  });
};

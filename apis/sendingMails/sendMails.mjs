import nodemailer from "nodemailer";

const SendEmail   = async (options) => {
  const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
  });
  const data = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.text,
  };
  await transporter.sendMail(data);
};
export default SendEmail ;
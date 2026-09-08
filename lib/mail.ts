import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification Code",
    html: `
      <div style="font-family: sans-serif; line-height: 1.8;">
        <h2>Verify Your Email</h2>
        <p>Your verification code is:</p>
        <h1 style="letter-spacing: 4px;">${code}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  });
};

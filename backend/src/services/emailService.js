import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendStatusEmail = async (candidateEmail, candidateName, jobTitle, status) => {
  const mailOptions = {
    from: `"RankResume AI" <${process.env.EMAIL_USER}>`,
    to: candidateEmail,
    subject: `Application Update: ${jobTitle}`,
    html: `
      <h3>Hello ${candidateName},</h3>
      <p>Your application status for the position <strong>${jobTitle}</strong> has been updated to: <strong>${status.toUpperCase()}</strong>.</p>
      <p>Log in to your dashboard to view complete details.</p>
    `
  };

  return transporter.sendMail(mailOptions);
};
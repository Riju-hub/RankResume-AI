// backend/src/services/emailService.js
import nodemailer from 'nodemailer';

const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error('EMAIL_USER or EMAIL_PASS is missing in environment variables.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user.trim(),
      pass: pass.trim().replace(/\s+/g, '') // remove spaces from 16-char app password
    }
  });
};

export const sendStatusEmail = async (candidateEmail, candidateName, jobTitle, status) => {
  const transporter = getTransporter();
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

export const sendResetPasswordEmail = async (userEmail, resetUrl) => {
  const transporter = getTransporter();
  const mailOptions = {
    from: `"RankResume AI Support" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Password Reset Request - RankResume AI',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #0f172a; border: 1px solid #e2e8f0; border-radius: 16px;">
        <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 12px;">Reset Your Password</h2>
        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
          We received a request to reset the password for your RankResume AI account. Click the button below to set a new password:
        </p>
        <div style="margin: 28px 0;">
          <a href="${resetUrl}" style="background-color: #4f46e5; color: #ffffff; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; text-decoration: none; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
          This link is valid for <strong>15 minutes</strong>. If you did not request a password reset, you can safely ignore this email.
        </p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
};
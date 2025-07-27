import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number.parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Password Reset Request',
        html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
        <p>You requested a password reset for your account. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #666; font-size: 14px;">This link will expire in 5 minutes. If you didn't request this reset, please ignore this email.</p>
        <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this URL into your browser:</p>
        <p style="color: #007bff; word-break: break-all;">${resetUrl}</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

export async function sendWelcomeEmail(email: string, name: string) {
    const mailOptions = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Welcome to Job Portal',
        html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333; text-align: center;">Welcome to Job Portal!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for joining our job portal. Your account has been successfully created.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
        </div>
        <p>Best regards,<br>The Job Portal Team</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
}

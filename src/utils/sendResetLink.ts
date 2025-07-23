import transporter from './nodeMailer';

const sendResetLink = async (email: string, resetUrl: string) => {
    try {
        await transporter.sendMail({
            from: `"Hotel Bookings" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Reset Your Password - Hotel Bookings',
            text: `You requested to reset your password. Use the link below to set a new password:\n${resetUrl}`,
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f6f9fc; padding: 20px;">
                    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        <h2 style="color: #333; text-align: center;">Reset Your Password</h2>
                        <p style="color: #555; font-size: 16px;">
                            You requested to reset your password for your Hotel Bookings account. Click the button below to reset it. This link is valid for a limited time.
                        </p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetUrl}" style="background-color: #007bff; color: #fff; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block;">
                                Reset Password
                            </a>
                        </div>
                        <p style="color: #999; font-size: 12px;">
                            If you didn’t request a password reset, please ignore this email or contact support if you have questions.
                        </p>
                        <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
                        <p style="color: #bbb; font-size: 12px; text-align: center;">
                            &copy; ${new Date().getFullYear()} Hotel Bookings. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        });

        console.log('✅ Reset link email sent to', email);
    } catch (error) {
        console.error('❌ Failed to send reset link:', error);
    }
};

export default sendResetLink;

import nodemailer from "nodemailer"
import { ENV } from "../config/ENV.js"
import asyncHandler from "./asyncHandler.js"
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS,
    }
})

export const sendOtpEmail = async (email, otp, type) => {
    const purpose =
        type === "account_verification"
            ? "verify your account"
            : "confirm your event booking";

    const subject =
        type === "account_verification"
            ? "Verify Your Email Address | Eventora"
            : "Your Event Booking Verification Code | Eventora";

    const mailOptions = {
        from: {
            name: "Eventora",
            address: ENV.EMAIL_USER,
        },
        to: email,
        subject,

        text: `
Hello,

Use the following OTP to ${purpose} on Eventora:

${otp}

This code expires in 5 minutes.

If you did not request this code, please ignore this email.

Thanks,
Team Eventora
        `.trim(),

        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your Eventora Verification Code</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial,Helvetica,sans-serif; color:#172033;">

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
        style="background-color:#f4f6fb; padding:32px 12px;">
        <tr>
            <td align="center">

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                    style="max-width:560px; background-color:#ffffff; border-radius:16px; overflow:hidden;">

                    <!-- Header -->
                    <tr>
                        <td style="background-color:#312e81; padding:28px 32px; text-align:center;">
                            <h1 style="margin:0; color:#ffffff; font-size:28px; letter-spacing:0.5px;">
                                Eventora
                            </h1>
                            <p style="margin:8px 0 0; color:#ddd6fe; font-size:13px;">
                                Your events. Your moments.
                            </p>
                        </td>
                    </tr>

                    <!-- Email Content -->
                    <tr>
                        <td style="padding:36px 32px 24px;">

                            <h2 style="margin:0 0 16px; font-size:23px; line-height:1.4; color:#172033;">
                                Verify your email address
                            </h2>

                            <p style="margin:0 0 24px; font-size:15px; line-height:1.7; color:#526078;">
                                Hello,
                                <br /><br />
                                Use the verification code below to
                                <strong>${purpose}</strong>.
                                We're glad to have you with us!
                            </p>

                            <!-- OTP Card -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0"
                                style="background-color:#f5f3ff; border:1px solid #ddd6fe; border-radius:12px;">
                                <tr>
                                    <td align="center" style="padding:24px 16px;">
                                        <p style="margin:0 0 12px; color:#5b21b6; font-size:12px; font-weight:bold; letter-spacing:1.5px;">
                                            YOUR VERIFICATION CODE
                                        </p>

                                        <p style="margin:0; color:#312e81; font-size:34px; font-weight:bold; letter-spacing:8px;">
                                            ${String(otp).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}
                                        </p>

                                        <p style="margin:14px 0 0; color:#6b7280; font-size:13px;">
                                            Expires in 5 minutes
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Security Notice -->
                            <p style="margin:24px 0 0; font-size:14px; line-height:1.7; color:#526078;">
                                <strong>Security reminder:</strong>
                                Never share this code with anyone. Eventora support will
                                never ask you to disclose your verification code.
                            </p>

                            <p style="margin:20px 0 0; font-size:14px; line-height:1.7; color:#526078;">
                                If you didn't request this code, you can safely ignore
                                this email. No action is required.
                            </p>

                            <p style="margin:28px 0 0; font-size:14px; line-height:1.7; color:#172033;">
                                Best regards,<br />
                                <strong>Team Eventora</strong>
                            </p>

                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color:#f8fafc; border-top:1px solid #e8edf5; padding:22px 32px; text-align:center;">
                            <p style="margin:0 0 8px; color:#64748b; font-size:12px; line-height:1.6;">
                                This is an automated message. Please do not reply to this email.
                            </p>

                            <p style="margin:0; color:#94a3b8; font-size:12px;">
                                &copy; ${new Date().getFullYear()} Eventora. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>
</html>
        `,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
        success: true,
        messageId: info.messageId,
    };
};
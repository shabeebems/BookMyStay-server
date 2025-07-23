export enum Messages {
    EMAIL_EXISTS = "Email already exists",
    USER_REGISTERED = "User registration initiated. OTP sent to your email.",

    OTP_VERIFIED = "✅ OTP verified successfully. You can now log in.",
    OTP_INVALID = "❌ Invalid OTP. Please try again.",
    OTP_EXPIRED = "⏰ OTP has expired. Please fill the registration form again.",
    OTP_RESENT = "📩 A new OTP has been sent to your email.",
    OTP_NOT_FOUND = "No active OTP session found.",

    LOGIN_SUCCESS = "Login successful.",
    PASSWORD_INCORRECT = "Incorrect password.",
    USER_BLOCKED = "User is blocked.",
    USER_NOT_FOUND = "No account found with this email.",

    RESET_LINK_SENT = "Password reset link sent to your email.",
    RESET_FAILED = "Reset failed or link expired.",
    PASSWORD_RESET_SUCCESS = "Password has been reset successfully.",

    INTERNAL_SERVER_ERROR = "Something went wrong. Please try again later.",
}
export enum Messages {

  // Registration
  EMAIL_EXISTS = "❌ An account with this email already exists.",
  USER_REGISTERED = "📩 Registration initiated. An OTP has been sent to your email.",

  // OTP Messages
  OTP_VERIFIED = "✅ OTP verified successfully. You can now log in.",
  OTP_INVALID = "❌ The OTP you entered is invalid. Please try again.",
  OTP_EXPIRED = "⏰ The OTP has expired. Please complete the registration form again.",
  OTP_RESENT = "📩 A new OTP has been sent to your email address.",
  OTP_NOT_FOUND = "❌ No active OTP session found. Please initiate registration again.",

  // Login Messages
  LOGIN_SUCCESS = "✅ Logged in successfully.",
  PASSWORD_INCORRECT = "❌ The password you entered is incorrect.",
  USER_BLOCKED = "❌ This account has been blocked. Please contact support.",
  USER_NOT_FOUND = "❌ No account found with the provided email address.",

  // Password Reset Messages
  RESET_LINK_SENT = "📩 A password reset link has been sent to your email.",
  RESET_FAILED = "❌ Password reset failed or the link has expired.",
  PASSWORD_RESET_SUCCESS = "✅ Your password has been reset successfully.",

  // Data Fetch Messages
  FETCH_USERS_SUCCESS = "✅ Users retrieved successfully.",

  // Server & Error Messages
  INTERNAL_SERVER_ERROR = "❌ An internal server error occurred. Please try again later.",

  // Token & Authorization Messages
  ACCESS_TOKEN_INVALID = "❌ Access token verification failed.",
  REFRESH_TOKEN_INVALID = "❌ Refresh token verification failed.",
  NO_TOKEN = "❌ No authentication tokens found in the request.",
  UNAUTHORIZED_ACCESS = "❌ You are not authorized to access this resource."
}

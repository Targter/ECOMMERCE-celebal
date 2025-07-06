// Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() +
        (parseInt(process.env.COOKIE_EXPIRE, 10) || 7) * 24 * 60 * 60 * 1000
    ), // Default to 7 days if COOKIE_EXPIRE is undefined
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION" ? true : false, // Secure only in production
    sameSite: process.env.NODE_ENV === "PRODUCTION" ? "None" : "Lax", // Lax for local dev, None for production
    path: "/", // Ensure cookie is available for all routes
  };

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;

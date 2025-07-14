const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ErrorHander("Please provide a valid token", 401));
  }

  const token = authHeader.split(" ")[1];
  console.log("tokeN:", token);

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHander("Invalid or expired token", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

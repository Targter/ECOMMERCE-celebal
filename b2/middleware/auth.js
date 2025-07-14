// // // const ErrorHander = require("../utils/errorhander.js");
// // // const catchAsyncErrors = require("./catchAsyncErrors.js");
// // // const jwt = require("jsonwebtoken");
// // // const User = require("../models/userModel.js");

// // // exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
// // //   // Get token from Authorization header
// // //   const authHeader = req.headers.authorization;
// // //   console.log("authHeader:", authHeader);
// // //   if (!authHeader || !authHeader.startsWith("Bearer ")) {
// // //     return next(new ErrorHander("Please provide a valid token", 401));
// // //   }

// // //   const token = authHeader.split(" ")[1];
// // //   console.log("tokeN:", token);

// // //   try {
// // //     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
// // //     req.user = await User.findById(decodedData.id);
// // //     next();
// // //   } catch (error) {
// // //     return next(new ErrorHander("Invalid or expired token", 401));
// // //   }
// // // });

// // // exports.authorizeRoles = (...roles) => {
// // //   return (req, res, next) => {
// // //     if (!roles.includes(req.user.role)) {
// // //       return next(
// // //         new ErrorHander(
// // //           `Role: ${req.user.role} is not allowed to access this resouce `,
// // //           403
// // //         )
// // //       );
// // //     }

// // //     next();
// // //   };
// // // };

// // const ErrorHander = require("../utils/errorhander");
// // const catchAsyncErrors = require("./catchAsyncErrors");
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/userModel");

// // exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
// //   // Get token from cookie instead of Authorization header
// //   const token = req.cookies.token;
// //   console.log("token:", token);
// //   if (!token) {
// //     return next(new ErrorHander("Please login to access this resource", 401));
// //   }

// //   try {
// //     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = await User.findById(decodedData.id);
// //     next();
// //   } catch (error) {
// //     // Clear the invalid token cookie
// //     res.clearCookie("token");
// //     return next(new ErrorHander("Invalid or expired token", 401));
// //   }
// // });

// // // The authorizeRoles middleware can remain the same
// // exports.authorizeRoles = (...roles) => {
// //   return (req, res, next) => {
// //     if (!roles.includes(req.user.role)) {
// //       return next(
// //         new ErrorHander(
// //           `Role: ${req.user.role} is not allowed to access this resource`,
// //           403
// //         )
// //       );
// //     }
// //     next();
// //   };
// // };

// const ErrorHander = require("../utils/errorhander.js");
// const catchAsyncErrors = require("./catchAsyncErrors.js");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel.js");

// exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
//   // Get token from cookies
//   const token = req.cookies.token; // Assumes cookie is named 'token'
//   console.log("Cookie token:", token);

//   if (!token) {
//     return next(new ErrorHander("Please provide a valid token", 401));
//   }

//   try {
//     const decodedData = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decodedData.id);
//     if (!req.user) {
//       return next(new ErrorHander("User not found", 401));
//     }
//     console.log("Authenticated user:", req.user._id);
//     next();
//   } catch (error) {
//     return next(new ErrorHander("Invalid or expired token", 401));
//   }
// });

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHander(
//           `Role: ${req.user.role} is not allowed to access this resource`,
//           403
//         )
//       );
//     }
//     next();
//   };
// };

const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("./catchAsyncErrors.js");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  console.log("authHeader:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No valid Bearer token found");
    return next(new ErrorHander("Please provide a valid token", 401));
  }

  const token = authHeader.split(" ")[1];
  console.log("token:", token);

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    if (!req.user) {
      console.log("User not found for ID:", decodedData.id);
      return next(new ErrorHander("User not found", 401));
    }
    console.log("Authenticated user:", req.user._id);
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return next(new ErrorHander("Invalid or expired token", 401));
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

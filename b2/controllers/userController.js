const ErrorHander = require("../utils/errorhander.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("here i am ", req.body);
  if (!req.body.avatar) {
    return next(new ErrorHander("Avatar is required", 400));
  }

  // Upload to Cloudinary with enhanced error handling
  // console.log("reqBoyd", req.body);
  let myCloud;
  // console.log("called")
  try {
    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
      resource_type: "auto", // Handles both image and video
    });
    // console.log("called ",myCloud)
  } catch (uploadError) {
    console.error("Cloudinary upload error:", uploadError);
    return next(
      new ErrorHander(`Avatar upload failed: ${uploadError.message}`, 500)
    );
  }
  // console.log("called 2")
  const { name, email, password } = req.body;
  // console.log("name:", name, email, password);
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  // console.log("user: controller...js ");
  // res.cookie("heeh", "abhayTheGreat");
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log("LoginEmail", req.body);
  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  console.log("pass Status:", isPasswordMatched);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log("user:");
  console.log("called. forgot pass", user);
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });
  console.log("reqprotocol", req.protocol, req.get("host"));
  const resetPasswordUrl = `${req.protocol}://localhost:5173/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  console.log("message:", message, resetPasswordUrl);
  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log("error:", error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  console.log("called...reset", req.body);
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // console.log("called...reset", resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  // console.log("called...reset", user);
  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }
  console.log("Reset Done...", req.body);
  console.log("Reset Done...", req.body.confirmPassword);

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  console.log("Reset Done...", req.body.password);
  user.password = req.body.password;
  console.log("userPass:", user.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  console.log("Reset Done...", user);
  sendToken(user, 200, res);
});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  // console.log("this userId is correct:", req.user._id);
  // console.log("userId::", user._id);
  res.status(200).json({
    success: true,
    user,
  });
});

// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  console.log("name:", req.body);
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.user.avatar !== "") {
    const user = await User.findById(req.user.id);
    console.log("user:", user);
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);
    // console.log("deleted.........");
    // console.log("avatarURl:", req.user.avatar);
    const myCloud = await cloudinary.v2.uploader.upload(req.user.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    // console.log("myCloud:Cloud prob");

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  console.log("udpated");
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  console.log(3);
  res.status(200).json({
    success: true,
  });
});

// Get all users(admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get single user (admin)
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Delete User --Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // console.log("user cCalled");
  if (!user) {
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  // console.log("user cCalled");
  await cloudinary.v2.uploader.destroy(imageId);

  // console.log("user cCalled", user);
  // Use deleteOne() or findByIdAndDelete() instead of remove()
  await User.deleteOne({ _id: req.params.id });

  console.log("user cCalled removed success");
  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
});

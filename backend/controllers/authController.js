const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const User = require("../models/userModel");
const sendEmail = require("../utils/sendEmail");
const { findById } = require("../models/userModel");

const createAndSendToken = (user, statusCode, res) => {
  // Create the token
  const token = user.createToken();

  // Send the token as a response
  res.status(201).json({
    status: "success",
    data: {
      token,
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  // Add user properties through body
  const { name, email, password } = req.body;

  // check if email exists
  const user = await User.findOne({ email });

  if (user) {
    return next(
      new AppError(
        "User with email already exists. Please other another email",
        400
      )
    );
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  // Extract email and password and check if both are given
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if the emails exists or not and also check if the password for that email is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordCorrect(password, user.password))) {
    return next(new AppError("Incorrect email or password", 400));
  }

  createAndSendToken(user, 201, res);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Take email
  const { email } = req.body;

  // check user with email
  const user = await User.findOne({ email });

  if (!user) return next(new AppError("Email could not be sent", 404));

  // create reset token
  const resetToken = user.createPasswordResetToken();

  // Save the password token to database
  await user.save({ validateBeforeSave: false });

  const resetURl = `http://127.0.0.1:3000/api/v1/users/resetPassword/${resetToken}`;

  const message = ` <h1>Your requested for reseting your password</h1>
  <p>Please Click on the Button to reset your password</p>
  <a href=${resetURl}><button>Reset Password</button></a>`;

  // send the link for password reset

  try {
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: message,
    });

    res.status(200).json({
      status: "success",
      message: "Email Sent",
    });
  } catch (error) {
    console.log(error);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError("Email could not be sent", 500));
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Take the token
  const { token } = req.params;

  // Hash the token through crypto
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  // find the user with the reset token and passwordResetExpires
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Token is invalid or expired", 400));
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetToken = undefined;

  await user.save();

  createAndSendToken(user, 201, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  // Get the token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access!", 401)
    );
  }

  // Verfity the token through jwt.verify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    return next(
      new AppError("The user belonging to the token does not exist", 401)
    );

  next();
});

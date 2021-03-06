const crypto = require("crypto")
const ErrorResponse = require("../utils/errorResponse")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

// @desc    Login user
exports.login = async (req, res, next) => {
  const { email, password } = req.body

  // Check if email and password is provided
  // if (!email || !password) {
  //   return next(new ErrorResponse("Please provide an email and password", 400))
  // }
    // Check that user exists by email
  await User.findOne({ email }, async(err, user)=>{
      if(err){
        return next(new ErrorResponse("Error Occured"))
      }
    sendToken(user, 200, res)
    }).catch(err=> next(err))
}

// @desc    Register user
exports.register = async (req, res, next) => {
 const { Firstname, Lastname, email, password } = req.body

    const user = new User({
      Firstname,
      Lastname,
      email,
      password
    });
    await user.save().then(()=>sendToken(user, 200, res)).catch(err=>next(err))
}

exports.checkCurrentUser = async (req, res, next) => {
  // grab token from req.body
  const token = req.body.token
  // grab user from token
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  console.log(token)
  
  return res.json(decoded.id)
 
  // await User.findOne({ _id: decoded.id }, (err, user) => {
  //   if (err) {
  //     return next(err)
  //   }
  //   if (!user) {
  //     return next(new ErrorResponse("User not found", 404))
  //   }
  //   req.user = user
  //   next()
  // }
}


// @desc    Forgot Password Initialization
exports.forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params._id,
    });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
}
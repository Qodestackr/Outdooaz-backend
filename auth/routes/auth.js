const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  checkCurrentUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.route("/register").post(register)

router.route("/login").post(login)

router.route('/get-user').get(checkCurrentUser)

router.route("/forgotpassword").post(forgotPassword)

router.route("/passwordreset/:resetToken").put(resetPassword)

// router.route("/get-user/:id").get()

module.exports = router;
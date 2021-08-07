// const checkAuth = require('../../middleware/checkAuth')


const User = require("../../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const signUp = (req, res) => {
  const { email, password, fullname, countryCode, phoneNumber } = req.body.user;

  User.findOne({ email }) //Checking if the email exist
    .then((user) => {
      if (user)
        res.status(409).json({ error: "Account with this Email already exist!" })
      else {
        //Hashing the password
        bcrypt.hash(password, 10, (error, hash) => {
          if (error) {
            return res.status(500).json({ error })
          }
        
          else {
            const userData = new User({
              email,
              fullname,
              countryCode,
              phoneNumber,
              password: hash
            })
            userData
              .save()
              .then(() => {
                // create reusable transporter object using the default SMTP transport

                res.status(201).json({
                  message: "The user has been signed up successfully!",
                  userData
                })
              })
              .catch((error) => res.status(500).json({ error }))
          }
        })
      }
    })
}

const signIn = (req, res, next) => {
  const { password, email } = req.body.user
  User.find({ email: email }, (err, user) => {
    if (err || user.length === 0)
      res.status(404).json({ error: "No user was found with this email." })

    else if (user.length > 0) {

      //Comparing password
      bcrypt.compare(password, user[0].password, (_err, result) => {
        if (_err) res.status(401).json({ error: "Authentication has failed!" })
        else if (result) {
          const userData = {
            email: user[0].email,
            ID: user[0]._id
          }
          const token = jwt.sign(userData, "MONGO_SECRET", { expiresIn: "1h" })
          res.status(200).json({
            message: "Authentication has been successful",
            token: token,
            userData,
          })
        } else
          res.status(401).json({ error: "The password entered is incorrect!" })
      })
    }
  }).catch((err) => res.status(500).json({ error: err }))
}

const updateUser = (req, res, next) => {
  const userID = req.params.userID

  User.updateMany({ _id: userID }, { $set: req.body })
    .then((result) => result.state(200).json(result))
    .catch((error) => res.status(409).json(error))
}

const deleteUser = (req, res, next) => {
  User.findByIdAndDelete({ _id: req.params.userID })
    .then((result) => {
      if (result.length > 0)
        res.status(200).json({ message: "User has been deleted" })
      else res.status(404).json({ message: "No user was found with this ID" })
    })
    .catch((error) => res.status(200).json(error))
}

module.exports = { signUp, signIn, updateUser, deleteUser }

// methodology: WBS 
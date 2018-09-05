const config = require("../config/database");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  let newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: "Failed to register User"
      });
    } else {
      res.json({
        success: true,
        msg: "User registered"
      });
    }
  });
});

router.post("/authenticate", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({
        success: false,
        msg: "User not found"
      });
    } else {
      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          let token = jwt.sign({data:user}, config.secret, {
            expiresIn: 604800
          });

          res.json({
            success: true,
            token: "bearer " + token,
            user:{
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                email: user.email,
            }
          });
        }else{
            res.json({
                success: false,
                msg: "Wrong password"
            });
        }
      });
    }
  });
});

router.get("/profile",passport.authenticate('jwt',{session: false}) ,(req, res) => {
  res.json({user: req.user});
});

module.exports = router;

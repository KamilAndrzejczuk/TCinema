const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../config/database");

const UserSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: Number
  },
  password: {
    type: String,
    required: true
  }
});

const User = (module.exports = mongoose.model("User", UserSchema));

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByEmail = function (email, callback) {
  User.findOne({ email: email }, callback);
};

module.exports.addUser = function (newUser, callback) {
  User.getUserByEmail(newUser.email, (err, user) => {
    if (err) throw err;
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, encrypted) => {
        if (err) throw err;
        newUser.password = encrypted;
        newUser.save(callback);
      });
    });
  });
};

module.exports.comparePassword = function (
  candidatePassword,
  hashedPassword,
  callback
) {
  bcrypt.compare(candidatePassword || "", hashedPassword, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

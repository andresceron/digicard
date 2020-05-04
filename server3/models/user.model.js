var mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var userSchema = new Schema({
  // name: String,
  email: { type: String, unique: true, required: true },
  hash: { type: String },
  salt: { type: String }
  // resetPasswordToken: { type: String, required: false },
  // resetPasswordExpires: { type: String, required: false }
});


userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    "secret"
  );
};

userSchema.methods.toAuthJSON = function(token) {
  return {
    _id: this._id,
    email: this.email,
    token: token,
    username: this.username
  };
};

module.exports = mongoose.model("User", userSchema);

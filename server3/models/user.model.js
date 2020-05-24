const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
const envVars = process.env;

var userSchema = new Schema({
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
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  hash: { type: String },
  salt: { type: String }
  // resetPasswordToken: { type: String, required: false },
  // resetPasswordExpires: { type: String, required: false }
});

userSchema.method({
  generateJWT: function() {
    console.log('inside GENERATEJWT')
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 2);

    return jwt.sign(
      {
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
      },
      'secret'
    );
  },
  validatePassword: function(password) {
    console.log('validatePassword', password);
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
      .toString("hex");
    return this.hash === hash;
  },
  setPassword: function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 128, 128, "sha512")
      .toString("hex");
  },
  toAuthJSON: function(token) {
    return {
      _id: this._id,
      email: this.email,
      token: token,
      username: this.username
    }
  }
});


userSchema.methods.toAuthJSON = function(token) {
  return {
    _id: this._id,
    email: this.email,
    token: token,
    username: this.username
  };
};

/**
 * Statics
 */
userSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

module.exports = mongoose.model('User', userSchema);

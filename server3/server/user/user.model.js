const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require( '../helpers/APIError' );
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
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
    required: true
  },
  website: {
    type: String,
    required: false
  },
  jobTitle: {
    type: String,
    required: false
  },
  phonePrefix: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false,
    match: [/^[1-9][0-9]{5,15}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.'],
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  socials: {
    type: Array,
    required: false,
    default: [
      { id: 'behance', baseUrl: 'https://www.behance.net/$$socialid$$', value: undefined },
      { id: 'facebook', baseUrl: 'https://www.facebook.com/$$socialid$$', value: undefined },
      { id: 'github', baseUrl: 'https://www.github.com/$$socialid$$', value: undefined },
      { id: 'instagram', baseUrl: 'https://www.instagram.com/$$socialid$$', value: undefined },
      { id: 'linkedin', baseUrl: 'https://www.linkedin.com/in/$$socialid$$', value: undefined },
      { id: 'pinterest', baseUrl: 'https://www.pinterest.com/$$socialid$$', value: undefined },
      { id: 'skype', baseUrl: 'skype:live:$$socialid$$', value: undefined },
      { id: 'snapchat', baseUrl: 'https://www.snapchat.com/add/$$socialid$$', value: undefined },
      { id: 'spotify', baseUrl: 'https://open.spotify.com/user/$$socialid$$', value: undefined },
      { id: 'tiktok', baseUrl: 'https://www.tiktok.com/@$$socialid$$', value: undefined },
      { id: 'tumblr', baseUrl: 'https://$$socialid$$.tumblr.com/', value: undefined },
      { id: 'twitter', baseUrl: 'https://www.twitter.com/$$socialid$$', value: undefined },
      { id: 'vimeo', baseUrl: 'https://www.vimeo.com/$$socialid$$', value: undefined },
      { id: 'whatsapp', baseUrl: 'https://wa.me/$$socialid$$', value: undefined },
      { id: 'youtube', baseUrl: 'https://youtube.com/$$socialid$$', value: undefined },
    ],
  },
  contacts: [],
  // {
  // type: UserSchema.ObjectId,
  // ref: 'User' }],
  // {
  //     type: Array,
  //     required: false,
  //     default: [ {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User'
  //     }]
  //   },
  image: {
    type: String,
    required: false
  },
  qr: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  hash: { type: String },
  salt: { type: String },
  refreshToken: { type: String, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: String, required: false }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
  generateJWT: function() {
    // const today = new Date();
    // const expirationDate = new Date(today);
    // expirationDate.setDate(today.getDate() + 2);

    return jwt.sign(
      {
        email: this.email,
        id: this._id,
        // exp: parseInt(expirationDate.getTime() / 1000, 10)
      },
      'secret',
      {
        expiresIn: 10000
      }
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

/**
 * Statics
 */
UserSchema.statics = {
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

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);

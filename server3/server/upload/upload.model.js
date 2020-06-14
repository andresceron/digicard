const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require( '../helpers/APIError' );
// const jwt = require("jsonwebtoken");
// const crypto = require("crypto");

/**
 * Upload Schema
 */
const UploadSchema = new mongoose.Schema({
  image: {
    type: String,
    required: false
  }
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
UploadSchema.method({
});

/**
 * Statics
 */
UploadSchema.statics = {};

/**
 * @typedef User
 */
module.exports = mongoose.model('Upload', UploadSchema);

const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');
const passportConfig  =  require('../../config/passport-config');
const passport = require('passport');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

  /** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/register')
  .post(validate(paramValidation.register), authCtrl.register);

  /** GET /api/auth/google - Returns token if correct username and password is provided */
router.route('/google')
  .get(validate(paramValidation.register), authCtrl.google);

  /** GET /api/auth/google - Returns token if correct username and password is provided */
router.route('/google/callback')
  .get(validate(paramValidation.register), passport.authenticate('google', { scope: ['profile'] }), authCtrl.googleCallback);

  /** GET /api/auth/linkedin - Returns token if correct username and password is provided */
router.route('/linkedin')
  .get(validate(paramValidation.register), authCtrl.linkedin);

  /** GET /api/auth/facebook - Returns token if correct username and password is provided */
router.route('/facebook')
  .get(validate(paramValidation.register), authCtrl.facebook);

  /** GET /api/auth/login - Returns token if correct username and password is provided */
router.route('/me')
  .get(validate(paramValidation.me), passportConfig.authenticate, authCtrl.me);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

module.exports = router;

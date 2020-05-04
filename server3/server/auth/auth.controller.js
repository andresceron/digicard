const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const passport = require('passport');
const User = require("../../models/user.model");

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity

  const user = req.body.data;

  console.log('USER?!: ', user);

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  return passport.authenticate('local',
    (err, passportUser, info) => {
      const test = {
        'err': err,
        'passportUser': passportUser,
        'info': info
      };

      if (err) {
        return next(err);
      }
      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON(user.token) });
      }

      // const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      return res.json({ status: 400 });
    }
  )(req, res, next);

}

/**
 * Returns ???? if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function register(req, res, next) {
  const { email, password } = req.body.data;

  User.findOne({ 'email': email }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the email: ${email}`
      });
    }

    const newUser = new User({
      email: req.body.data.email,
      password: req.body.data.password
    });

    newUser.setPassword(password);

    console.log('newUSER!!: ' , newUser);

    newUser.save((err, savedUser) => {
      if (err) {
        console.log('errSAVED: ', err);
        return res.json(err);
      }

      console.log('userSAVED: ', savedUser);
      return res.json(savedUser);
    });

  });

}



/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

module.exports = { login, register, getRandomNumber };

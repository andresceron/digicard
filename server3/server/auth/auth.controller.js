const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const passport = require('passport');
const User = require("../../models/user.model");
const DataForm = require('../helpers/DataForm');

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {

  console.log('req!! ', req.body)

  if (!req.body || !req.body.data.email || !req.body.data.password) {
    console.log('INSIDE NO EMAIL OR PASSWORD!!! ');
    return res.status(422).json(
      new DataForm({
        code: 400,
        message: 'Both email and password are required'
      })
    );
  }

  return passport.authenticate('login',
    (err, passportUser, info) => {
      console.log('passportUser', passportUser);

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
        return res.json(new DataForm({ user: user.toAuthJSON(user.token) }));
      }

      // const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
      return res.status(401).json(
        new DataForm({
          code: 400,
          message: 'Unknown user'
        })
      );
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
      return res.status(409).json(
        new DataForm({
          code: 400,
          message: `Email already registered: ${email}`
        })
      );
    }

    const newUser = new User({
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      email: req.body.data.email,
      password: req.body.data.password
    });

    newUser.setPassword(password);

    newUser.save((err, savedUser) => {
      if (err) {
        console.log('errSAVED: ', err);
        return res.json(err);
      }

      console.log('userSAVED: ', savedUser);
      return res.json(new DataForm(savedUser));
    });

  });

}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function me(req, res, next) {

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

module.exports = { login, register, getRandomNumber, me };

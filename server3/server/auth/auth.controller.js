const passport = require('passport');
const QRCode = require( 'qrcode' );
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');
const User = require("../user/user.model");
const DataForm = require( '../helpers/DataForm' );

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {

  if (!req.body || !req.body.data.email || !req.body.data.password) {
    return res.status(422).json(
      new DataForm({
        code: 400,
        message: 'Both email and password are required'
      })
    );
  }

  return passport.authenticate('login',
    (err, passportUser, info) => {
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
async function register(req, res, next) {
  const { email, password } = req.body.data;

  try {
    const user = await User.findOne({'email': email}).exec();
    if (user) {
      return res.status(409).json(
        new DataForm({
          code: 400,
          message: `Email already registered: ${email}`
        })
      )
    }

    const newUser = new User({
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      email: req.body.data.email,
      password: req.body.data.password
    });

    const qrCodeResponse = await QRCode.toDataURL(`http://dev.zeroweb.local.com:4200/contacts/${newUser._id}`);
    newUser.qr = qrCodeResponse;
    newUser.setPassword(password);

    const newUserResponse = await newUser.save();
    if (!newUserResponse) {
      return res.status(400).json(
        new DataForm({
          code: 400,
          message: `Unknown Error`
        })
      )
    }

    return res.json(new DataForm(newUserResponse));

  } catch (err) {
    return res.status(400).json(
      new DataForm({
        code: 400,
        message: `Unknown Error`
      })
    )
  }

}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function me(req, res, next) {
  //  TODO
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

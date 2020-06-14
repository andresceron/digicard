const httpStatus = require('http-status');
const passport = require('passport');
const QRCode = require( 'qrcode' );
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
    console.log('USER', user);
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

    newUser.save((err, savedUser) => {
      if (err) {
        return res.json(err);
      }

      return res.json(new DataForm(savedUser));
    });

    //   , ( err, userMatch ) =>
    //   {
    //   if ( userMatch ) {
    //     console.log( 'userNatch:: ', userMatch );
    //     return res.status(409).json(
    //       new DataForm({
    //           code: 400,
    //           message: `Email already registered: ${email}`
    //         })
    //       );
    //   }
    // });
    // console.log( 'USER!!: ', user );
    //  => {
    //   if (userMatch) {
    //     return res.status(409).json(
    //       new DataForm({
    //         code: 400,
    //         message: `Email already registered: ${email}`
    //       })
    //     );
    //   }

    //   const newUser = new User({
    //     firstName: req.body.data.firstName,
    //     lastName: req.body.data.lastName,
    //     email: req.body.data.email,
    //     password: req.body.data.password
    //   } );

    //   const test = await QR.generate( 'test' );

    //   newUser.setPassword(password);

    //   // newUser.qr = qrCode;

    //   newUser.save((err, savedUser) => {
    //     if (err) {
    //       console.log('errSAVED: ', err);
    //       return res.json(err);
    //     }

    //     console.log('userSAVED: ', savedUser);
    //     return res.json(new DataForm(savedUser));
    //   });

    // });
  }
  catch (err) {
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
function google(req, res, next) {
  console.log('googleController!! req! ', req);
  console.log('googleController!! res! ', res);
  // passport.authenticate('google', { scope: ['profile'] })
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function googleCallback(req, res, next) {
  console.log('googleCallback');
  // passport.authenticate('google', { scope: ['profile'] })
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function linkedin(req, res, next) {

}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function facebook(req, res, next) {

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

module.exports = { login, register, google, googleCallback, linkedin, facebook, getRandomNumber, me };

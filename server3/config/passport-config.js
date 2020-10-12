const passport = require('passport');
const DataForm = require('../server/helpers/DataForm');

function authenticate(req, res, next) {
  return passport.authenticate("jwt", {
      session: false
  }, (err, user, info) => {
    if (err) {
      console.log('!!AUTHENTICATION ERROR!! ', err);
      return next(err);
    }

    if (!user) {
      console.log('!!NO AUTH USER!! ', err);
      return res.status(401).json(
        new DataForm({
          code: '401',
          error: 'UNAUTHORIZED_USER'
        })
      );
    }

    if (info) {
      console.log('!!AUTH INFOO!! ', info);
    }

    // Forward user information to the next middleware
    req.user = user;
    next();
  })(req, res, next);
}

function authenticateTokenUser(req, res, next) {
  return passport.authenticate("jwt", {
      session: false
  }, (err, user, info) => {
    if (err) {
      console.log('!!AUTHENTICATION ERROR!! ', err);
      return next(err);
    }

    if (!user || !user._id.equals(req.params.userId)) {
      console.log('!!NO AUTH USER!! ', err);
      return res.status(401).json(
        new DataForm({
          code: '401',
          error: 'UNAUTHORIZED_USER'
        })
      );
    }

    if (info) {
      console.log('!!AUTH INFOO!! ', info);
    }

    // Forward user information to the next middleware
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = { authenticate, authenticateTokenUser };

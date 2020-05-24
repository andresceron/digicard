const passport = require('passport');
const DataForm = require('../server/helpers/DataForm');

function authenticate (req, res, next) {
  return passport.authenticate("jwt", {
      session: false
  }, (err, user, info) => {
      if (err) {
          console.log('ERRRR!!!! ', err);
          return next(err);
      }
      if (!user) {
        console.log('NO USER!!!! ', err);
        return res.status(401).json(
          new DataForm({
            code: '401',
            error: 'UNAUTHORIZED_USER'
          })
        );
      }

      if (info) {
        console.log('INFOOOO ', info);
      }
      // Forward user information to the next middleware
      req.user = user;
      next();
  })(req, res, next);
}

module.exports = { authenticate };

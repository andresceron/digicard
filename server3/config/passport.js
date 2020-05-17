const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require("../models/user.model");
const DataForm = require('../server/helpers/DataForm');
JWTstrategy = require('passport-jwt').Strategy;
ExtractJWT = require('passport-jwt').ExtractJwt;
GoogleStrategy = require('passport-google-oauth20').Strategy;

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
const envVars = process.env;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

passport.use(
  'login',
  new LocalStrategy({
    usernameField: 'data[email]',
    passwordField: 'data[password]',
    session: false
  },
  (email, password, done) => {
    try {
      Users.findOne({
        'email': email
      }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return done(
            null,
            false,
            new DataForm({
              status: 'error',
              error: 'email or password is invalid'
            })
          );
        }

        return done(null, user);
      });
    }
    catch(err) {
      done(err);
    }
  })
);

passport.use(
  'register',
  new LocalStrategy({
    usernameField: 'data[email]',
    passwordField: 'data[password]',
    session: false
  },
  (email, password, done) => {
    try {
      Users.findOne({
        'email': email
      }).then(user => {
        if (user !== null) {
          return done(
            null,
            false,
            { errors: { "email": "email is already registred" } }
          );
        }
        return done(null, user);
      });
    }
    catch(err) {
      done(err);
    }
  })
);

passport.use(
  'jwt',
  new JWTstrategy(opts, function(jwt_payload, done) {
    Users.findOne({_id: jwt_payload.id}, function(err, user) {
        if (err) {
            return done(false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
  })
);

passport.use(
  'google',
  new GoogleStrategy({
  clientID: envVars.GOOGLE_CLIENT_ID,
  clientSecret: envVars.GOOGLE_SECRET,
  callbackURL: "http://dev.zeroweb.local.com:3000"
},
function(accessToken, refreshToken, profile, cb) {
  console.log('profile!! ', profile);
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));

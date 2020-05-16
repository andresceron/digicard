const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require("../models/user.model");
const DataForm = require('../server/helpers/DataForm');
JWTstrategy = require('passport-jwt').Strategy;
ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
};

console.log('inside here!!');

// passport.use(new LocalStrategy({
//   usernameField: 'data[email]',
//   passwordField: 'data[password]'
// }, function (email, password, done) {
//   console.log('INSIDE PASSPORT');
//   Users.findOne({ 'email': email })
//   .then(user => {
//     if (!user || !user.validatePassword(password)) {
//       return done(
//         null,
//         false,
//         { errors: { "email or password": "is invalid" } }
//       );
//     }
//     return done(null, user);
//   })
//   .catch(done);
// }));

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
        console.log('INSIDE LOGIN PASSPORT', user.validatePassword(password));
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

        console.log('user!!!!!!!! ', user);
        return done(null, user);
      });
    }
    catch(err) {
      console.log('EEEEERRRRR ', err);
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
    console.log('INSIDE REGISTER PASSPORT');
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

console.log('opts!! ', opts);
passport.use(
  'jwt',
  new JWTstrategy(opts, function(jwt_payload, done) {
    console.log('INSIDEEEE: ', jwt_payload.email);
    console.log('INSIDEEEE222: ', jwt_payload);
    Users.find({}, function (err, users) {
      console.log('users!!!', users);
    })
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
}));

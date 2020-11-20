"use strict";
// import passport from 'passport';
// import * as passportLocal from 'passport-local';
// // import Users from '../server/user/user.model';
// import { DataForm } from '../helpers/data-form';
// // JWTstrategy = require('passport-jwt').Strategy;
// import * as passportJWT from 'passport-jwt'
// // GoogleStrategy = require('passport-google-oauth20').Strategy;
// const opts = {
//   jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'secret'
// };
// passport.use(
//   'login',
//   new passportLocal.Strategy({
//     usernameField: 'data[email]',
//     passwordField: 'data[password]',
//     session: false
//   },
//   (email, password, done) => {
//     try {
//       // Users.findOne({
//       //   'email': email
//       // }).then(user => {
//       //   if (!user || !user.validatePassword(password)) {
//       //     return done(
//       //       null,
//       //       false,
//       //       // new DataForm({
//       //       //   status: 'error',
//       //       //   error: 'email or password is invalid'
//       //       // })
//       //     );
//       //   }
//       //   return done(null, user);
//       // });
//     }
//     catch(err) {
//       done(err);
//     }
//   })
// );
// passport.use(
//   'register',
//   new passportLocal.Strategy({
//     usernameField: 'data[email]',
//     passwordField: 'data[password]',
//     session: false
//   },
//   (email, password, done) => {
//     // try {
//     //   Users.findOne({
//     //     'email': email
//     //   }).then(user => {
//     //     if (user !== null) {
//     //       return done(
//     //         null,
//     //         false,
//     //         // { errors: { "email": "email is already registred" } }
//     //       );
//     //     }
//     //     return done(null, user);
//     //   });
//     // }
//     // catch(err) {
//     //   done(err);
//     // }
//   })
// );
// passport.use(
//   'jwt',
//   new passportJWT.Strategy(opts, function(jwt_payload, done) {
//     // Users.findOne({_id: jwt_payload.id}, function(err, user) {
//     //     if (err) {
//     //         return done(false);
//     //     }
//     //     if (user) {
//     //         return done(null, user);
//     //     } else {
//     //         return done(null, false);
//     //     }
//     // });
//   })
// );
// export default passport;
//# sourceMappingURL=passport.js.map
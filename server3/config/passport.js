const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require("../models/user.model");

// passport.use(new LocalStrategy({
//   usernameField: 'user[email]',
//   passwordField: 'user[password]',
// }, (email, password, done) => {
//   Users.findOne({ email })
//     .then((user) => {
//       if(!user || !user.validatePassword(password)) {
//         return done(null, false, { errors: { 'email or password': 'is invalid' } });
//       }

//       return done(null, user);
//     }).catch(done);
// }));

console.log('inside here!!');


passport.use(new LocalStrategy({
  usernameField: 'data[email]',
  passwordField: 'data[password]'
}, function (email, password, done) {
  console.log('INSIDE PASSPORT');
  Users.findOne({ 'email': email })
  .then(user => {
    if (!user || !user.validatePassword(password)) {
      return done(
        null,
        false,
        { errors: { "email or password": "is invalid" } }
      );
    }
    return done(null, user);
  })
  .catch(done);
}));


// function configData(email, password, done) {
//   console.log('return ConfigData');
// }

// (email, password, done) => {
//     console.log('INSIDE PASSPORT');
//     Users.findOne({ "local.email": email })
//     .then(user => {
//       if (!user || !user.validatePassword(password)) {
//         return done(
//           null,
//           false,
//           { errors: { "email or password": "is invalid" } }
//         );
//       }
//       return done(null, user);
//     })
//     .catch(done);
//   }
// ));

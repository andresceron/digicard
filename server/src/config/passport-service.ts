import User from '../models/user.model';
import Logger from '../loaders/logger';
import DataForm from '../helpers/data-form';
import passport from 'passport';
import passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt'
import config from './config';

const opts = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
      done(err, user);
  });
});

passport.use(
  'login',
  new LocalStrategy({
    usernameField: 'data[email]',
    passwordField: 'data[password]',
    session: false
  }, (email, password, done) => {
    try {
      User.findOne({
        'email': email
      }).then(user => {
        if (!user || !user.validatePassword(password)) {
          return done(
            null,
            false,
            // pending issue to be merged
            // https://github.com/DefinitelyTyped/DefinitelyTyped/pull/47105/files
            // new DataForm({
            //   code: '401',
            //   error: 'email or password is invalid'
            // })
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
      User.findOne({
        'email': email
      }).then(user => {
        if (user !== null) {
          return done(
            null,
            false,
            // { errors: { "email": "email is already registred" } }
          );
        }
        return done(null, user);
      });
    }
    catch (e) {
      Logger.error('LocalStrategyRegisterError: ', e);
      done(e);
    }
  })
);

passport.use(
  'jwt',
  new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }

    } catch (e) {
      Logger.error('jwtStrategyFindUserError: ', e);
      return done(false);

    }
  })
);

export default passport;
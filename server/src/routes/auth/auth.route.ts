import express from 'express';
import * as paramValidation from '../../config/param-validation';
import * as authCtrl from './auth.controller';
import * as passportAuth from '../../config/passport-authcheck';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * POST /api/auth/login
 * Returns token if correct username and password is provided
 */
router.route('/login')
  .post(paramValidation.loginValidation, authCtrl.login);

/**
 * POST /api/auth/login
 * Returns token if correct username and password is provided
 */
router.route('/register')
  .post(paramValidation.registerValidation, authCtrl.register);

/** GET
 * /api/auth/me
 * Returns token if authToken is valid
 */
router.route('/me')
  .get(passportAuth.validateToken, authCtrl.me);

export default router;

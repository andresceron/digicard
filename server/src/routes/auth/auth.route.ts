import express from 'express';
import * as paramValidation from '../../config/param-validation';
import * as authCtrl from './auth.controller';
import * as passportAuth from '../../config/passport-authcheck';

const router = express.Router(); // eslint-disable-line new-cap

/**
 * POST /api/auth/login
 * Returns token if correct username and password is provided
 */
router
  .route('/login')
  .post(paramValidation.loginValidation, authCtrl.login);

/**
 * POST /api/auth/register
 */
router
  .route('/register')
  .post(paramValidation.registerValidation, authCtrl.register);

/**
 * POST /api/auth/reset-password
 */
router
  .route('/reset-password')
  .post(authCtrl.resetPassword);

/**
 * POST /api/auth/new-password
 */
router
  .route('/new-password')
  .post(authCtrl.newPassword);

/**
 * POST /api/auth/valid-password-token
 */
router
  .route('/validate-password-token')
  .post(authCtrl.validatePasswordToken);

/** GET
 * /api/auth/me
 * Returns token if authToken is valid
 */
router
  .route('/me')
  .get(passportAuth.validateToken, authCtrl.me);

export default router;

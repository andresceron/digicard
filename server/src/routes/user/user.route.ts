import { Router } from 'express';
import * as paramValidation from '../../config/param-validation';
import * as passportAuth from '../../config/passport-authcheck';
import * as userCtrl from './user.controller';

const router = Router();

router.route('/')
  /** GET /api/users - Get list of users */
  // .get(userCtrl.list)

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(passportAuth.authenticateTokenUser, userCtrl.get)

  // TODO: This needs to refactor and move to own sub-route like /:userId/upload
  /** PUT /api/users/:userId - Update user */
  .put(passportAuth.authenticateTokenUser, paramValidation.updateUserValidation, userCtrl.update)

  /** PATCH /api/users/:userId - Update user contacts */
  // .patch(passportAuth.authenticateTokenUser, paramValidation.saveContactValidation, userCtrl.saveContact)

  /** DELETE /api/users/:userId - Delete user */
  // TODO: Need to test this
  .delete(passportAuth.authenticateTokenUser, userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;
import { Router } from 'express';
import * as paramValidation from '../../config/param-validation';
import * as passportAuth from '../../config/passport-authcheck';
import * as contactCtrl from './contact.controller';

const router = Router(); // eslint-disable-line new-cap

router.route('/:userId/search')
  /** GET /api/contacts/:userId/search?name={string} - Get contacts */
  .get(passportAuth.authenticateTokenUser, contactCtrl.getSearch);

// TODO: improve this
router.route('/:contactId/save')
/** GET /api/contacts/:contactId/delete - Delete contact */
  .patch(passportAuth.authenticate, contactCtrl.save)

  // TODO: improve this
router.route('/:contactId/delete')
/** GET /api/contacts/:contactId/delete - Delete contact */
  .delete(passportAuth.authenticate, contactCtrl.remove)

router.route('/:contactId/detail')
  /** GET /api/contacts/:contactId/detail - Get Contact Detail */
  .get(contactCtrl.getSingle)

  /** PATCH /api/contacts/:userId - Update user */
  // .patch(passportAuth.authenticateTokenUser, contactCtrl.update)

/** Load post when API with contactId or UserId route parameter is hit */
// router.param('userId', contactCtrl.loadUser);
router.param('contactId', contactCtrl.loadSingle);

export default router;

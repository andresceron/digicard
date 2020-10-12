const express = require('express');
const contactCtrl = require('./contact.controller');
const passportConfig  =  require('../../config/passport-config');
const router = express.Router(); // eslint-disable-line new-cap

router.route('/:userId/search')
  /** GET /api/contacts/:userId/search?name={string} - Get users */
  .get(passportConfig.authenticate, contactCtrl.getSearch)

router.route( '/:userId/delete/:contactId' )
/** GET /api/contacts/:userId/delete/:contactId - Get user */
  .delete(passportConfig.authenticate, contactCtrl.remove)

router.route( '/:contactId/detail' )
  /** GET /api/contacts/:contactId/detail - Get user */
  .get(contactCtrl.getSingle)

  /** PATCH /api/contacts/:userId - Update user */
  .patch(passportConfig.authenticate, contactCtrl.update)

/** Load post when API with contactId or UserId route parameter is hit */
// router.param('userId', contactCtrl.loadUser);
router.param('contactId', contactCtrl.loadSingle);

module.exports = router;

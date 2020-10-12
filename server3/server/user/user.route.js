const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const passportConfig  =  require('../../config/passport-config');
const userCtrl = require('./user.controller');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});
const upload = multer({storage: storage});

const router = express.Router(); // eslint-disable-line new-cap

// router.route('/')
//   /** GET /api/users - Get list of users */
//   // .get(userCtrl.list)

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(passportConfig.authenticateTokenUser, userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(passportConfig.authenticateTokenUser, validate(paramValidation.updateUser), upload.single('data[image]'), userCtrl.update)

  /** PATCH /api/users/:userId - Update user */
  .patch(passportConfig.authenticateTokenUser, validate(paramValidation.updateUser), userCtrl.saveContact)

  /** DELETE /api/users/:userId - Delete user */
  .delete(passportConfig.authenticateTokenUser, userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

module.exports = router;

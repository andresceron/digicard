const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const uploadCtrl = require('./upload.controller');
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

router.route('/')

  /** POST /api/upload - Create new user */
  .post(validate(paramValidation.upload), upload.single('data[image]'), uploadCtrl.uploadSingle)

module.exports = router;

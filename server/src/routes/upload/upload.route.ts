import { Router } from 'express';
import * as paramValidation from '../../config/param-validation';
import * as uploadCtrl from './upload.controller';
import multer from 'multer';

// todo: move to service?
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    console.log('fileName:: ', fileName);
    cb(null, fileName)
  }
});
const upload = multer({storage: storage});

const router = Router();

router.route('/')

  /** POST /api/upload - Create new user */
  .post(
    paramValidation.uploadProfilePicValidation,
    upload.single('data[image]'),
    uploadCtrl.uploadSingle)

export default router;

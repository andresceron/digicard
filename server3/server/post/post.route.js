const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const postCtrl = require('./post.controller');
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
  /** GET /api/posts - Get list of posts */
  .get(postCtrl.list)

  /** POST /api/posts - Create new post */
  .post(validate(paramValidation.createPost), postCtrl.create);

router.route('/:postId')
  /** GET /api/posts/:postId - Get post */
  .get(postCtrl.get)

  /** PUT /api/posts/:postId - Update post */
  .put(validate(paramValidation.updatePost), upload.single('data[image]'), postCtrl.update)

  /** DELETE /api/posts/:postId - Delete post */
  .delete(postCtrl.remove);

/** Load post when API with postId route parameter is hit */
router.param('postId', postCtrl.load);

module.exports = router;

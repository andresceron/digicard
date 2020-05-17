const Post = require('./post.model');
const DataForm = require('../helpers/DataForm');
const FileUpload = require('../helpers/FileUpload');
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const passport = require('passport');

/**
 * Load post and append to req.
 */

function load(req, res, next, id) {
  Post.get(id)
      .then((post) => {
        req.post = new DataForm(post); // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(e => next(e));
}

/**
 * Get post
 * @returns {Post}
 */
function get(req, res) {
  return res.json(req.post);
}

/**
 * Create new post
 * @property {string} req.body.data.title - The title of post.
 * @property {string} req.body.data.content - The content of post.
 * @property {string} req.file - The file of post.
 * @returns {Post}
 */

function create(req, res, next) {

  const post = new Post({
    title: req.body.data.title,
    content: req.body.data.content,
    image: req.body.data.image,
    author: req.user._id
  });

  post.save()
      .then(savedPost => res.json(new DataForm(savedPost)))
      .catch(e => next(e));
}

/**
 * Update existing post
 * @property {string} req.body.data.title - The title of post.
 * @property {string} req.body.data.content - The content of post.
 * @property {string} req.file - The file of post.
 * @returns {Post}
 */
async function update(req, res, next) {
  const post = req.post.data;
  post.title = req.body.data.title;
  post.content = req.body.data.content;

  try {
    const uploadImage = await FileUpload.upload(req.file);
    post.image = uploadImage.Location;

    await unlinkAsync(`${ 'uploads/' + req.file.filename}`)
  }
  catch(err) {
    console.log('Upload error!', err);
  }

  Post.findOneAndUpdate({ author: req.user._id, _id: post._id }, post, {new: true})
      .then(savedPost => {
        if (savedPost) {
          res.json(new DataForm(savedPost));
        } else {
          res.status(404).json({
            code: 400,
            message: 'No post found'
          });
        }
      })
      .catch(e => next(e));
}

/**
 * Get post list.
 * @property {number} req.query.skip - Number of posts to be skipped.
 * @property {number} req.query.limit - Limit number of posts to be returned.
 * @returns {Post[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;

  Post.list({ limit, skip }, req.user._id)
      .then(posts => res.json(new DataForm(posts)))
      .catch(e => next(e));

}

/**
 * Delete post.
 * @returns {Post}
 */
function remove(req, res, next) {
  const post = req.post.data;
  post.remove()
      .then(deletedPost => res.json(deletedPost))
      .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };

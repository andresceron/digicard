const Post = require('./post.model');
const DataForm = require('../helpers/DataForm');
/**
 * Load post and append to req.
 */
function load(req, res, next, id) {
  Post.get(id)
    .then((post) => {
      console.log('POST ID', post);
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
 * @returns {Post}
 */

function create(req, res, next) {
  const post = new Post({
    title: req.body.data.title,
    content: req.body.data.content
  });

  post.save()
    .then(savedPost => res.json(savedPost))
    .catch(e => next(e));
}

/**
 * Update existing post
 * @property {string} req.body.data.title - The title of post.
 * @property {string} req.body.data.content - The content of post.
 * @returns {Post}
 */
function update(req, res, next) {
  const post = req.post.data;
  post.title = req.body.data.title;
  post.content = req.body.data.content;

  post.save()
    .then(savedPost => res.json(savedPost))
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
  Post.list({ limit, skip })
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

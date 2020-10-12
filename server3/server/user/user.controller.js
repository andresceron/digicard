const User = require( './user.model' );
const DataForm = require( '../helpers/DataForm' );
const FileUpload = require( '../helpers/FileUpload' );
const fs = require('fs');
const { promisify } = require('util');
const unlinkAsync = promisify(fs.unlink);
const passport = require('passport');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {

  if (id.toString() !== req.user._id.toString()) {
    console.log( 'load!! ', id );
    console.log( 'load2!! ', req.user._id );

    return res.status(401).json(
      new DataForm({
        code: '401',
        error: 'UNAUTHORIZED_USER'
      })
    );
  }

  User.get(id)
  .then((user) => {
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  })
  .catch(e => next(e));

}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  // console.log('user!!!: ', req.user);
  return res.json(
    new DataForm(req.user)
  );
}

/**
 * Create new user
 * @property {string} req.body.data.username - The username of user.
 * @property {string} req.body.data.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.data.username,
    mobileNumber: req.body.data.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.data - The user.
 * @property {string} req.body.data.socials - The users social list.
 * @property {string} req.file - The file of post
 * @returns {User}
 */
async function update(req, res, next) {
  const user = req.user;

  user.firstName = req.body.data.firstName;
  user.lastName = req.body.data.lastName;
  user.email = req.body.data.email;
  user.jobTitle = req.body.data.jobTitle;
  user.phonePrefix = req.body.data.phonePrefix;
  user.phoneNumber = req.body.data.phoneNumber;
  user.website = req.body.data.website;
  user.city = req.body.data.city;
  user.country = req.body.data.country;
  user.image = req.body.data.image;
  user.socials = req.body.data.socials;
  user.contacts = req.body.data.contacts;

  user.save()
    .then(savedUser => res.json(new DataForm(savedUser)))
    .catch(e => next(e));
}

/**
 * SaveContact
 * @property {string} req.body.data - contactId.
 * @returns {User}
 */

function saveContact(req, res, next) {
  const user = req.user;

  contactFound = user.contacts.includes(req.body.data);
  if (contactFound || user._id === req.body.data) {
    console.log('inside here!!');
    return res.status(409).json(
      new DataForm({
        code: 400,
        message: `Contact is already in your list`
      })
    )
  }

  console.log( 'USER:: ', user);

  user.contacts.push(req.body.data);
  user.save()
    .then(savedUser => res.json(new DataForm(savedUser)))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, saveContact, list, remove };

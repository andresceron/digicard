const User = require( '../user/user.model' );
const Contact = require( '../user/user.model' );
const DataForm = require('../helpers/DataForm');
const Logger = require('../../config/logger');

/**
 * Load contact and append to req.
 */

function loadPublicUser(req, res, next, id) {
  // console.log('checkReq1:: ', req.headers.authorization);
  // // console.log('checkReq2:: ', req);

  // Contact.get(id)
  //   .then((user) => {
  //     console.log('user!!', user);
  //     const customUser = {
  //       _id: user._id,
  //       contacts: user.contacts
  //     };

  //     req.user = customUser;
  //       return next();
  //     })
  //     .catch(e => next(e));
}


function loadSingle(req, res, next, id) {
  Contact.get(id)
      .then((contact) => {
        const customContact = {
          firstName: contact.firstName,
          lastName: contact.lastName,
          email: contact.email,
          jobTitle: contact.jobTitle,
          phonePrefix: contact.phonePrefix,
          phoneNumber: contact.phoneNumber,
          website: contact.website,
          city: contact.city,
          country: contact.country,
          image: contact.image,
          socials: contact.socials
        };

        req.contact = new DataForm(customContact); // eslint-disable-line no-param-reassign
        return next();
      })
      .catch(e => next(e));
}

/**
 * Get contact single
 * @returns {Contact}
 */
function getSingle(req, res, next) {
  console.log('INSIDE HERE GETSIGNLE!!', req.contact);
  return res.json(req.contact);
}

async function getSearch(req, res, next) {

  // Comparing IDS to match token id
  if (!req.user._id.equals(req.params.userId)) {
    return res.status(401).json(
      new DataForm({
        code: 401,
        message: `Unauthorized User`
      })
    )
  }

  try {
    const search = new RegExp(req.query.name, 'i');
    const query = {
      $and: [
        {
          $or:
            [
              { firstName: search },
              { lastName: search },
            ]
        },
      ]
    };

    const contactsReturnFilter = { _id: 1, firstName: 1, lastName: 1, image: 1 };
    const contactsResults = await User.find(query, contactsReturnFilter).exec();
    const filterResults = contactsResults.filter(r => req.user.contacts.includes(r._id))

    res.json(new DataForm(filterResults));

  } catch (err) {
    console.log('err!!! ', err);
    res.status(400).json(
      new DataForm({
        code: 400,
        message: `Unexpected Error: ${err}`
      })
    )
  }

}

/**
 * Update existing user
 * @property {string} req.body.data - The contacts list.
 * @returns {void}
 */
async function update(req, res, next) {
  try {
    console.log('INSIDE HERE!!');
    const updateContact = await Contact.findByIdAndUpdate(id, postData, { new: true });
    if (!updateContact) {
      res.status(400).json(
        new DataForm({
          code: 400,
          message: `Unexpected Error: ${updateContect}`
        })
      )
    }

    res.json(new DataForm(updateContact))

  } catch (err) {
    res.status(400).json(
      new DataForm({
        code: 400,
        message: `Unexpected Error: ${err}`
      })
    )
  }


  user.firstName = req.body.data.firstName;
  user.save()
    .then(savedUser => res.json(new DataForm(savedUser)))
    .catch(e => next(e));
}

/**
 * Remove existing contact
 * @property {string} req.body.data - The contacts list.
 * @returns {void}
 */
async function remove(req, res, next) {
  try {
    console.log('INSIDE HERE == REMOVE !!');
    console.log('---- REQ USER ', req.user._id);
    console.log('---- REQ PARAMS ', req.params.contactId);
    const updateContact = await Contact.findByIdAndUpdate(req.user._id, { $pullAll: { contacts: [req.params.contactId] } });
    if (!updateContact) {
      res.status(400).json(
        new DataForm({
          code: 400,
          message: `Unexpected Error: ${updateContect}`
        })
      )
    }

    res.json(new DataForm(updateContact))

  } catch (err) {
    res.status(400).json(
      new DataForm({
        code: 400,
        message: `Unexpected Error: ${err}`
      })
    )
  }
}


module.exports = { loadSingle, loadPublicUser, getSingle, getSearch, update, remove };

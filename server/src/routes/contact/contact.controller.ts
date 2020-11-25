import { NextFunction, Request, Response } from 'express';
import { BadRequestError, UnauthorizedError, InternalServerError, ConflictError } from '../../helpers/api-error';
import User from '../../models/user.model';
import DataForm from '../../helpers/data-form';

/**
 * Load contact and append to req.
 */
export const loadSingle = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    const contact = await User.get(id);
    if (contact) {
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

      // @ts-expect-error need to fix
      req.contact = contact;

      next();
    }
  } catch (err) {
    return next(err);
  }
};

/**
 * Get contact single
 * @returns {Contact}
 */
export const getSingle = (req: Request, res: Response, next: NextFunction) => {
  return res.json(
    // @ts-expect-error need to fix
    new DataForm(req.contact)
  );
};

/**
 * Get contact single
 * @returns {Contacts[]}
 */
export const getSearch = async (req: Request, res: Response, next: NextFunction) => {
  // Comparing IDS to match token id
  // @ts-expect-error need to fix
  if (!req.user?._id.equals(req.params.userId)) {
    return next(new UnauthorizedError());
  }

  try {
    const search = new RegExp(req.query.name as string, 'i');
    const query = {
      $and: [
        {
          $or: [{ firstName: search }, { lastName: search }]
        }
      ]
    };

    const contactsReturnFilter = { _id: 1, firstName: 1, lastName: 1, image: 1 };
    const contactsResults = await User.find(query, contactsReturnFilter).exec();

    // @ts-expect-error need to fix
    const filterResults = contactsResults.filter((r) => req.user?.contacts.includes(r._id));

    res.json(new DataForm(filterResults));
  } catch (err) {
    console.log('err!!! ', err);
    return next(new BadRequestError(err));
  }
};

/**
 * SaveContact
 * @property {string} req.body.data - contactId.
 * @returns {User}
 */

// TODO: Fix 'contacts' and 'save' to show correct.
export const save = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const contact = req.body.data;

  // @ts-expect-error need to fix
  const contactFound = user?.contacts.includes(contact);

  // @ts-expect-error need to fix
  if (contactFound || user?._id === req.body.data) {
    return next(new ConflictError('Contact is already in your list'));
  }

  try {
    // @ts-expect-error need to fix
    user?.contacts.push(contact);

    // @ts-expect-error need to fix
    const updatedUser = await user?.save();

    if (updatedUser) {
      res.json(new DataForm(updatedUser));
    }
  } catch (err) {
    return next(new InternalServerError());
  }
};

/**
 * Remove existing contact
 * @property {string} req.body.data - The contacts list.
 * @returns {void}
 */

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-expect-error need to fix
    const updateContact = await User.findByIdAndUpdate(req.user?._id, {
      $pullAll: { contacts: [req.params.contactId] }
    });
    if (!updateContact) {
      throw new BadRequestError();
    }

    console.log('updateContact: ', updateContact);
    res.json(new DataForm(updateContact));
  } catch (err) {
    return next(new BadRequestError());
  }
};

// /**
//  * Update existing user
//  * @property {string} req.body.data - The contacts list.
//  * @returns {void}
//  */
// export const update = async(req: Request, res: Response, next: NextFunction) => {
//   try {
//     console.log('INSIDE HERE!!');
//     const updateContact = await User.findByIdAndUpdate(id, postData, { new: true });
//     if (!updateContact) {
//       res.status(400).json(
//         new DataForm({
//           code: 400,
//           message: `Unexpected Error: ${updateContect}`
//         })
//       )
//     }

//     res.json(new DataForm(updateContact))

//   } catch (err) {
//     res.status(400).json(
//       new DataForm({
//         code: 400,
//         message: `Unexpected Error: ${err}`
//       })
//     )
//   }

//   user.firstName = req.body.data.firstName;
//   user.save()
//     .then(savedUser => res.json(new DataForm(savedUser)))
//     .catch(e => next(e));
// }

// module.exports = { loadSingle, loadPublicUser, getSingle, getSearch, update, remove };

/* eslint-disable @typescript-eslint/ban-ts-comment */
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

      // @ts-ignore
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
    // @ts-ignore
    new DataForm(req.contact)
  );
};

/**
 * Get contact single
 * @returns {Contacts[]}
 */
export const getSearch = async (req: Request, res: Response, next: NextFunction) => {
  // Comparing IDS to match token id
  // @ts-ignore
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

    // @ts-ignore
    const filterResults = contactsResults.filter((r) => req.user?.contacts.includes(r._id));

    res.json(new DataForm(filterResults));
  } catch (err) {
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

  // @ts-ignore
  const contactFound = user?.contacts.includes(contact);

  // @ts-ignore
  if (contactFound || user?._id === req.body.data) {
    return next(new ConflictError('Contact is already in your list'));
  }

  try {
    // @ts-ignore
    user?.contacts.push(contact);

    // @ts-ignore
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
    // @ts-ignore
    const updateContact = await User.findByIdAndUpdate(req.user?._id, {
      $pullAll: { contacts: [req.params.contactId] }
    });
    if (!updateContact) {
      throw new BadRequestError();
    }

    res.json(new DataForm(updateContact));
  } catch (err) {
    return next(new BadRequestError());
  }
};
/* eslint-enable @typescript-eslint/ban-ts-comment */

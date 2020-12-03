/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import fs = require('fs');
import User from '../../models/user.model';
import DataForm from '../../helpers/data-form';
import { ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from '../../helpers/api-error';
import Logger from '../../loaders/logger';

/**
 * Load user and append to req.
 */
export const load = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    // @ts-ignore
    // TODO: Fix _id not found in User
    if (id.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedError();
    }

    const user = await User.get(id);
    if (user) {
      req.user = user;
      return next();
    }

    // throw user;
  } catch (err) {
    // TODO: Fix possible error log.
    // Logger.error('UserCtrlLoadErr: ', err);
    return next(err);
  }
};

/**
 * Get user
 * @returns {User}
 */
export const get = (req: Request, res: Response) => {
  return res.json(new DataForm(req.user));
};

// /**
//  * Update existing user
//  * @property {string} req.body.data - The user.
//  * @property {string} req.body.data.socials - The users social list.
//  * @property {string} req.file - The file of post
//  * @returns {User}
//  */
export const update = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  const bodyData = req.body.data || undefined;

  if (!!user) {
    // TODO: Check this typing error of 'user[key]'
    for (const key of Object.keys(bodyData)) {
      // @ts-ignore
      user[key] = bodyData[key];
    }

    try {
      // @ts-ignore
      const updatedUser = await user.save();
      res.json(new DataForm(updatedUser));
    } catch (err) {
      return next(err);
    }
  }
};

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
// TODO: Remove list call if not used
export const list = (req: Request, res: Response) => {
  // Todo: Fix the list pagination
  // const { limit = 50, skip = 0 } = req.query;
  // User.list({ limit, skip })
  //   .then(users => res.json(users))
  //   .catch(e => next(e));
  // return res.send('hello');
};

/**
 * Delete user.
 * @returns {User}
 */
export const remove = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  // TODO: Fix "remove" function not being recognized
  try {
    // @ts-ignore
    const deletedUser = await user?.remove();

    if (deletedUser) {
      res.json(
        new DataForm({
          id: deletedUser._id,
          firstName: deletedUser.firstName,
          lastName: deletedUser.lastName,
          email: deletedUser.email
        })
      );
    }
  } catch (err) {
    return next(new InternalServerError(err));
  }
};
/* eslint-enable @typescript-eslint/ban-ts-comment */

import Joi from '@hapi/joi';
import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../helpers/api-error';

export const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const joiLoginSchema = Joi.object().keys({
    data: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  });

  const { error } = joiLoginSchema.validate(req.body);

  if (error) {
    return next(new NotFoundError('Missing content to send'));
  }

  next();
};

export const registerValidation = (req: Request, res: Response, next: NextFunction) => {
  const joiSchema = Joi.object().keys({
    data: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  });

  const { error } = joiSchema.validate(req.body);

  if (error) {
    return next(new NotFoundError('Missing content to send'));
  }

  next();
};

/** PUT /api/users/:userId - Update user */
export const updateUserValidation = (req: Request, res: Response, next: NextFunction) => {
  const joiSchema = Joi.object().keys({
    data: Joi.any().required()
  });

  const { error } = joiSchema.validate(req.body);

  if (error) {
    return next(new NotFoundError('Missing content to send'));
  }

  next();
};

/** PATCH /api/users/:userId - Update user contacts */
export const saveContactValidation = (req: Request, res: Response, next: NextFunction) => {
  const joiSchema = Joi.object().keys({
    data: Joi.any().required()
  });

  const { error } = joiSchema.validate(req.body);

  if (error) {
    return next(new NotFoundError('Missing content to send'));
  }

  next();
};

/** POST /api/upload - Upload image*/
export const uploadProfilePicValidation = (req: Request, res: Response, next: NextFunction) => {
  const joiSchema = Joi.object().keys({
    data: {
      file: Joi.any().required()
    }
  });

  const { error } = joiSchema.validate(req.body);

  if (error) {
    return next(new NotFoundError('Missing content to send'));
  }

  next();
};

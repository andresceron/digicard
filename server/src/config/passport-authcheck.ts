import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from './config';
import { IUser } from '../interfaces/user.interface';
import { UnauthorizedError } from '../helpers/api-error';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate(
    'jwt',
    {
      session: false
      // TODO: Replace all "any"
    },
    (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        return next(new UnauthorizedError());
      }

      if (info) {
        // TODO: What to do with this?
        console.log('!!AUTH INFOO!! ', info);
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

export const authenticateTokenUser = (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate(
    'jwt',
    {
      session: false
    },
    (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      if (!user || !user._id.equals(req.params.userId)) {
        return next(new UnauthorizedError());
      }

      if (info) {
        // TODO: What to do with this?
        console.log('!!AUTH INFOO!! ', info);
      }

      // Forward user information to the next middleware
      req.user = user;

      next();
    }
  )(req, res, next);
};

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.split(' ')[1]) || '';

  jwt.verify(token, config.jwtSecret as string, (err: any, user: any) => {
    if (err) {
      return next(new UnauthorizedError());
    }

    req.user = user;

    next();
  });
};

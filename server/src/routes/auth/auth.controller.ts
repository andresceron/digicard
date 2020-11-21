import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import QRCode from  'qrcode';
import User from "../../models/user.model";
import DataForm from  '../../helpers/data-form' ;;
import Logger from '../../loaders/logger';
import { IUser } from '../../interfaces/user.interface';
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from '../../helpers/api-error';
import config from '../../config/config';

/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// TODO: Replace any
export const login = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.body || !req.body.data.email || !req.body.data.password) {
    return next(new BadRequestError('Both email and password are required'));
  }

  return passport.authenticate('login',
    // TODO: Add correct types
    (err: any, passportUser: IUser, info: any) => {
      try {
        if (err) {
          throw err;
        }

        if (passportUser) {
          const user = passportUser;
          // TODO: Move to service?
          const token = passportUser.generateJWT();
          return res.json(
            new DataForm(
              { user: passportUser.toAuthJSON(token) }
            )
          );
        }

        throw new NotFoundError('User not found');

      } catch (err) {
        Logger.error(err);
        return next(err);
      }
    }
  )(req, res, next);

}

/**
 * Returns user if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const register = async(req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body.data;

  try {
    const user = await User.findOne({'email': email}).exec();
    if (user) {
      throw new ConflictError('user already registred');
    }

    const newUser = new User({
      firstName: req.body.data.firstName,
      lastName: req.body.data.lastName,
      email: req.body.data.email,
      password: req.body.data.password
    });

    // TODO: Change this static to dynamic per env
    const qrCodeResponse = await QRCode.toDataURL(`${config.baseUrl}/contacts/${newUser._id}`);
    console.log('qrCodeResponse:: ', qrCodeResponse);
    newUser.qr = qrCodeResponse;
    newUser.setPassword(password);

    const newUserResponse = await newUser.save();
    if (!newUserResponse) {
      throw new InternalServerError();
    }

    return res.json(new DataForm(newUserResponse));

  } catch (err) {
    Logger.error(err);
    return next(err);
  }

}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
export const me = (req: Request, res: Response, next: NextFunction) => {
  //  TODO finish this function call
  res.json(new DataForm(req.user));
}
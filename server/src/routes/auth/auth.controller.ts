import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import QRCode from 'qrcode';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from '../../models/user.model';
import DataForm from '../../helpers/data-form';
import Logger from '../../loaders/logger';
import { IUser } from '../../interfaces/user.interface';
import { BadRequestError, ConflictError, InternalServerError, NotFoundError } from '../../helpers/api-error';
import config from '../../config/config';
import passwordResetToken from '../../models/resettokens.model';
/**
 * Returns jwt token if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
// TODO: Replace any
export const login = (req: Request, res: Response, next: NextFunction): any => {
  if (!req.body?.data?.email || !req.body?.data?.password) {
    return next(new BadRequestError('Both email and password are required'));
  }

  return passport.authenticate(
    'login',
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
          return res.json(new DataForm({ user: passportUser.toAuthJSON(token) }));
        }

        throw new NotFoundError('User not found');
      } catch (err) {
        Logger.error(err);
        return next(err);
      }
    }
  )(req, res, next);
};

/**
 * Returns user if valid email and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body.data;

  try {
    const user = await User.findOne({ email: email }).exec();
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
    const qrCodeResponse = await QRCode.toDataURL(`${config.baseUrl}/public/${newUser._id}`);
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
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body?.data?.email) {
    return next(new BadRequestError('Email is required'));
  }

  const user = await User.findOne({ email: req.body.data.email });
  if (!user) {
    throw new ConflictError('Email does not exist');
  }

  console.log('inside reset-password controller');

  const resetToken = new passwordResetToken({ _userId: user._id, resetToken: crypto.randomBytes(16).toString('hex') })
  const saveResetToken = await resetToken.save();
  if (!saveResetToken) {
    throw new InternalServerError();
  }

  await passwordResetToken.deleteOne({ _userId: user._id, resetToken: { $ne: resetToken.resetToken } }).exec();

  const transporter =
    nodemailer.createTransport({
      service: 'Gmail',
      port: 465,
      auth: {
        user: 'andres.fleat@gmail.com',
        pass: 'aC890423'
      }
    });

  const mailOptions = {
    to: user.email,
    from: 'andres.fleat@gmail.com',
    subject: 'Node.js Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://dev.zeroweb.local.com:4200/reset-password/' + resetToken.resetToken + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };

  transporter.sendMail(mailOptions, (err: any, info: any) => {
    console.log('sendMail info', info);
    console.log('sendMail err', err);
  });

  // TODO: Temporal, remove later
  Logger.info(`resetToken:: ${resetToken.resetToken}`);

  return res.json(new DataForm({ status: 'OK' }));
};

export const validatePasswordToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body?.data?.token) {
    return next(new BadRequestError('token is required'));
  }

  try {
    const userToken = await passwordResetToken.findOne({ resetToken: req.body.data.token });
    console.log('userToken:: ', userToken);
    if (!userToken) {
      throw new ConflictError('Invalid Token');
    }

    const user = await User.findOne({ _id: userToken._userId });
    if (!user) {
      throw new InternalServerError();
    }

    return res.json(
      new DataForm({ status: 'OK' })
    );
  } catch (err) {
    return next(err);
  }
}

export const newPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken = await passwordResetToken.findOne({ resetToken: req.body.data.token }).exec();
    if (!userToken) {
      throw new ConflictError('Token has expired');
    }

    const user = await User.findById(userToken._userId);
    if (!user) {
      throw new BadRequestError('User does not exists');
    }

    user.setPassword(req.body.data.password);
    const saveUser = await user.save();
    if (!saveUser) {
      throw new InternalServerError();
    }

    await passwordResetToken.deleteOne({ _userId: user._id, resetToken: req.body.data.token }).exec();

    return res.json(
      new DataForm({ status: 'OK' }
    ));

  } catch (err) {
    return next(err);
  }

};

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
export const me = (req: Request, res: Response, next: NextFunction) => {
  //  TODO finish this function call
  res.json(new DataForm(req.user));
};

// import Promise from 'bluebird';
import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config/config';
import { IauthJson, IUser, UserModel } from '../interfaces/user.interface';
import { ConflictError } from '../helpers/api-error';

/**
 * User Schema
 */
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  website: {
    type: String,
    required: false
  },
  jobTitle: {
    type: String,
    required: false
  },
  phonePrefix: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false,
    match: [/^[1-9][0-9]{5,15}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  city: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  },
  socials: {
    type: Array,
    required: false,
    default: [
      { id: 'behance', baseUrl: 'https://www.behance.net/$$socialid$$', value: undefined },
      { id: 'facebook', baseUrl: 'https://www.facebook.com/$$socialid$$', value: undefined },
      { id: 'github', baseUrl: 'https://www.github.com/$$socialid$$', value: undefined },
      { id: 'instagram', baseUrl: 'https://www.instagram.com/$$socialid$$', value: undefined },
      { id: 'linkedin', baseUrl: 'https://www.linkedin.com/in/$$socialid$$', value: undefined },
      { id: 'pinterest', baseUrl: 'https://www.pinterest.com/$$socialid$$', value: undefined },
      { id: 'skype', baseUrl: 'skype:live:$$socialid$$', value: undefined },
      { id: 'snapchat', baseUrl: 'https://www.snapchat.com/add/$$socialid$$', value: undefined },
      { id: 'spotify', baseUrl: 'https://open.spotify.com/user/$$socialid$$', value: undefined },
      { id: 'tiktok', baseUrl: 'https://www.tiktok.com/@$$socialid$$', value: undefined },
      { id: 'tumblr', baseUrl: 'https://$$socialid$$.tumblr.com/', value: undefined },
      { id: 'twitter', baseUrl: 'https://www.twitter.com/$$socialid$$', value: undefined },
      { id: 'vimeo', baseUrl: 'https://www.vimeo.com/$$socialid$$', value: undefined },
      { id: 'whatsapp', baseUrl: 'https://wa.me/$$socialid$$', value: undefined },
      { id: 'youtube', baseUrl: 'https://youtube.com/$$socialid$$', value: undefined }
    ]
  },
  contacts: [],
  image: {
    type: String,
    required: false
  },
  qr: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  hash: { type: String },
  salt: { type: String },
  refreshToken: { type: String, required: false },
  resetPasswordToken: { type: String, required: false },
  resetPasswordExpires: { type: String, required: false }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
// TODO: Evaluate to move this methos to a service instead.
userSchema.methods.generateJWT = function (): string {
  return jwt.sign(
    {
      email: this.email,
      id: this._id
      // exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    config.jwtSecret,
    {
      expiresIn: 10000
    }
  );
};

userSchema.methods.validatePassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 128, 128, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.setPassword = function (password: string): void {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 128, 128, 'sha512').toString('hex');
};

userSchema.methods.toAuthJSON = function (token: string): IauthJson {
  return {
    _id: this._id,
    email: this.email,
    token: token,
    username: this.username
  };
};

/**
 * Statics
 */

userSchema.statics.get = async function (id: string): Promise<IUser> {
  try {
    const user = await this.findOne({ _id: id }, { hash: 0, salt: 0 });

    if (!user) {
      throw new ConflictError('User does not exist');
    }

    return user;
  } catch (err) {
    throw err;
  }
};

userSchema.statics.list = function ({ skip = 0, limit = 50 } = {}): Promise<Array<IUser>> {
  return this.find()
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec();
};

/**
 * @typedef User
 */

export default model<IUser, UserModel>('User', userSchema);

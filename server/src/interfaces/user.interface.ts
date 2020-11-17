import { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  jobTitle: string;
  phonePrefix: string
  phoneNumber: string;
  city: string;
  country: string;
  socials: SocialAccounts[];
  contacts: string[];
  image: string;
  qr: string;
  createdAt?: Date;
  hash?: string;
  salt?: string;
  refreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  validatePassword(password: string): boolean;
  generateJWT(): string;
  setPassword(password: string): void;
  toAuthJSON(token: string): IauthJson;
}

export interface UserModel extends Model<IUser> {
  get(name: string): Promise<IUser>,
  list(skip: number, limit: number): Promise<Array<IUser>>
}

export interface SocialAccounts {
  id: string,
  baseUrl: string,
  value: string
}

export interface IauthJson {
  _id: Schema.Types.ObjectId;
  email: string;
  token: string;
  username: string;
}
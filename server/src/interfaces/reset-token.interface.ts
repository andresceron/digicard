import { Document, Schema } from 'mongoose';

export interface IResetToken extends Document {
  _userId: Schema.Types.ObjectId;
  resetToken: string;
  createdAt: Date;
}

import { model, Schema } from 'mongoose';
import { IResetToken } from '../interfaces/reset-token.interface';

const resetTokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  resetToken: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});

/**
 * @typedef passwordResetToken
 */

export default model<IResetToken>('passwordResetToken', resetTokenSchema);

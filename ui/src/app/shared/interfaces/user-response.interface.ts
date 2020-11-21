import { IUser } from './user.interface';

export interface IUserResponse {
  data: IUser;
  message: any;
  metadata: any;
}

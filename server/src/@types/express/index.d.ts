import { IContact } from '../../interfaces/contact.interface';
import { IUser } from '../../interfaces/user.interface';

declare namespace Express {
  interface Request {
    contact: IContact;
  }
}
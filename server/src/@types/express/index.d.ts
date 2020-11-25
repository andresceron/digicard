import { IContact } from '../../interfaces/contact.interface';

declare namespace Express {
  interface Request {
    contact: IContact;
  }
}

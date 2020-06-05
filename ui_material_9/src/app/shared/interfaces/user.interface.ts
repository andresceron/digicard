import { ISocials } from './socials.interface';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  phoneNumber: string;
  city: string;
  country: string;
  socials: any;
}

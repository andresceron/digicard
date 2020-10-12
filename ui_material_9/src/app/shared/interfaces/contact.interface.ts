import { ISocials } from './socials.interface';

export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  phonePrefix?: string;
  phoneNumber?: string;
  city?: string;
  country?: string;
  countryName?: string;
  website?: string;
  socials: any;
  image?: string;
}

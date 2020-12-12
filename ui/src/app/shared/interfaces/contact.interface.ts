import { ISocials } from './socials.interface';

export interface IContact {
  _id: string;
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
  socials: ISocials[];
  image?: string;
}

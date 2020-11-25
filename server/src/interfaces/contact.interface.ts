import { SocialAccounts } from './user.interface';

export interface IContact {
  firstName: string;
  lastName: string;
  email: string;
  website: string;
  jobTitle: string;
  phonePrefix: string;
  phoneNumber: string;
  city: string;
  country: string;
  socials: SocialAccounts[];
  image: string;
}

import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { Cookies } from '@services/cookies.service';

export const SERVICES: any[] = [
  ClientStorage,
  ApiService,
  Cookies
];

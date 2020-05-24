import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
import { Cookies } from '@services/cookies.service';
import { PostsService } from '@services/posts.service';

export const SERVICES: any[] = [
  ClientStorage,
  ApiService,
  AuthService,
  Cookies,
  PostsService
];

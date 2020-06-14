import { ClientStorage } from '@services/client-storage.service';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
import { Cookies } from '@services/cookies.service';
import { PostsService } from '@services/posts.service';
import { WindowsService } from '@services/windows.service';
import { UploadService } from '@services/upload.service';

export const SERVICES: any[] = [
  ClientStorage,
  ApiService,
  AuthService,
  Cookies,
  PostsService,
  UploadService
];

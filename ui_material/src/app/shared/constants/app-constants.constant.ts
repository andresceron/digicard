import { IAppConstants } from '@interfaces/app.interface';

export const AppPrefix = 'AngularNode';
export const AppConstants: IAppConstants = {
  prefix: AppPrefix,
  appState: `${AppPrefix}.appState`,
  savedItems: `${AppPrefix}.savedItems`
};

export const NOTIFICATIONS_MESSAGES = {
  NEW: 'New post created succesfully',
  UPDATED: 'Post updated successfully',
  ERROR: 'Unknown Error, please try again later',
  DELETED: 'Post deleted successfully',
  DISMISS: 'Dismiss',
  LOGIN_SUCESS: 'Logged in sucessfully',
  LOGIN_ERROR: 'Attempt to login failed'
};

export const MIME_TYPES = [
  'jpg',
  'jpeg',
  'image/jpg',
  'image/jpeg'
];

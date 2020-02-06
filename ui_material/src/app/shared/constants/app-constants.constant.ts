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
  DISMISS: 'Dismiss'
};

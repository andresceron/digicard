import { IAppConstants } from '@interfaces/app.interface';

export const AppPrefix = 'Socialar';
export const AppConstants: IAppConstants = {
  prefix: AppPrefix,
  appState: `${AppPrefix}.appState`
};

export const NOTIFICATIONS_MESSAGES = {
  NEW: 'New post created succesfully',
  UPDATED: 'Post updated successfully',
  ERROR: 'Unknown Error. Please try again later',
  DELETED: 'Post deleted successfully',
  DISMISS: 'Dismiss',
  LOGIN_SUCCESS: 'Logged in sucessfully',
  LOGIN_ERROR: 'Attempt to login failed',
  REGISTER_SUCCESS: 'Logged in sucessfully',
  REGISTER_ERROR: 'Attempt to register failed',
  REQUEST_RESET_PASSWORD_SUCCESS: 'Reset password requested successfully. Check you email',
  REQUEST_RESET_PASSWORD_ERROR: 'Attempt to request new password failed. Please try again later',
  NEW_PASSWORD_SUCCESS: 'New password updated successfully.',
  NEW_PASSWORD_ERROR: 'Attempt to set new password failed. Please try again later',
  VALIDATE_TOKEN_ERROR: 'Invalid token! Please try again',
  PROFILE_UPDATE_SUCCESS: 'Profile updated!',
  PROFILE_UPDATE_ERROR: 'Attempt to update profile failed. Please try again later',
  LINK_COPIED_SUCCESS: 'Link Copied Successfully'
};

export const FORM_ERRORS = {
  EMAIL: 'Invalid email',
  PASSWORD: 'Invalid password',
  FIRST_NAME: 'Invalid first name',
  LAST_NAME: 'Invalid last name',
  MIN_PASSWORD: 'Password must be at least 6 characters',
  MAX_PASSWORD: 'Password must be less than 15 characters',
  REGISTER: 'Attempt to register failed',
  PASSWORD_MATCH: 'Pasword does not match'
};

export const ROUTES = {
  LOGIN: 'login',
  REGISTER: 'register'
};

export const REG_EXP_PATTERNS = {
  SOCIAL_REPLACE: /(?:^|\W)\$socialid\$(?:$|\W)/
};

export const MIME_TYPES = ['jpg', 'jpeg', 'image/jpg', 'image/jpeg'];

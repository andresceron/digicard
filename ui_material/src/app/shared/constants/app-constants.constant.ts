import { IAppConstants } from '@interfaces/app.interface';

export const AppPrefix = 'AngularNode';
export const AppConstants: IAppConstants = {
  prefix: AppPrefix,
  appState: `${AppPrefix}.appState`,
  savedItems: `${AppPrefix}.savedItems`
};

import { AppConstants } from '@constants/app-constants.constant';
import { ClientStorage } from '@services/client-storage.service';

export function setupHook(cs: ClientStorage) {

  return () => {
    return new Promise((res) => {

      if (!cs.getItem(AppConstants.appState)) {
        cs.setItem(AppConstants.appState, {});
        res(true);
      }

      if (!cs.getItem(AppConstants.savedItems)) {
        cs.setItem(AppConstants.savedItems, []);
        res(true);
      }
      return res(true);
    });
  };
}

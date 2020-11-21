import { AppConstants } from '@constants/app-constants.constant';
import { ClientStorage } from '@services/client-storage.service';

export function setupHook(cs: ClientStorage) {

  return () => {
    return new Promise((res) => {

      if (!cs.getItem(AppConstants.appState)) {
        cs.setItem(AppConstants.appState, {});
        res(true);
      }

      return res(true);
    });
  };
}

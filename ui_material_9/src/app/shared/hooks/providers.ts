import { setupHook } from '@hooks/setup.hook';
import { ClientStorage } from '@services/client-storage.service';
import { APP_INITIALIZER } from '@angular/core';

export const PRE_HOOKS_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: setupHook,
    deps: [ClientStorage]
  }
];

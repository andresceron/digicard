import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { INTERCEPTORS } from '@interceptors/providers';
import { SERVICES } from '@services/providers';
import { COMPONENTS_PROVIDERS } from '@components/providers';
import { GUARDS } from '@guards/providers';
import { PRE_HOOKS_PROVIDERS } from '@hooks/providers';

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    PRE_HOOKS_PROVIDERS,
    GUARDS,
    SERVICES,
    INTERCEPTORS,
    COMPONENTS_PROVIDERS,
  ],
  declarations: []
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() private parentModule: CoreModule) {

    // Check if an instance of CoreModule is already created,
    // this ensures that the injectables behave properly
    if (parentModule) {
      throw new Error('CoreModule already loaded');
    }
  }
}

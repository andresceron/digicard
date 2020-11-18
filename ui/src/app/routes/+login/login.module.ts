import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { LoginRouterModule } from './login-router.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    LoginRouterModule
  ],
  exports: [LoginRouterModule],
  declarations: [LoginComponent]
})

export class LoginModule { }

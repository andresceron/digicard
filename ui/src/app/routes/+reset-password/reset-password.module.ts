import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { RouterModule } from '@angular/router';
import { ResetPasswordRouterModule } from './reset-password-router.module';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ResetPasswordRouterModule
  ],
  exports: [ResetPasswordRouterModule],
  declarations: [ResetPasswordComponent]
})

export class ResetPasswordModule { }

import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { RegisterRouterModule } from './register-router.module';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    RegisterRouterModule
  ],
  exports: [RegisterRouterModule],
  declarations: [RegisterComponent]
})

export class RegisterModule { }

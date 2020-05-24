import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { ProfileRouterModule } from './profile-router.module';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ProfileRouterModule
  ],
  exports: [ProfileRouterModule],
  declarations: [ProfileComponent]
})

export class ProfileModule { }

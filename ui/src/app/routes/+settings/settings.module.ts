import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { SettingsRouterModule } from './settings-router.module';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    SettingsRouterModule
  ],
  exports: [SettingsRouterModule],
  declarations: [SettingsComponent]
})

export class SettingsModule { }

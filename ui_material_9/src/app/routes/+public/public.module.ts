import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { PublicRouterModule } from './public-router.module';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    PublicRouterModule
  ],
  exports: [PublicRouterModule],
  declarations: [PublicComponent]
})

export class PublicModule { }

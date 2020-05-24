import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { HomeRouterModule } from './home-router.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    HomeRouterModule
  ],
  exports: [HomeRouterModule],
  declarations: [HomeComponent]
})

export class HomeModule { }

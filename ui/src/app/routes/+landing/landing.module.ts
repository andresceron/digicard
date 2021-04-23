import { NgModule } from '@angular/core';

import { NgwWowModule } from 'ngx-wow';
import { ScrollDirective } from '@directives/scroll.directive';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { LandingRouterModule } from './landing-router.module';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    LandingRouterModule,
    NgwWowModule
  ],
  exports: [LandingRouterModule],
  declarations: [LandingComponent, ScrollDirective]
})

export class LandingModule { }

import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { ListRouterModule } from './list-router.module';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ListRouterModule
  ],
  exports: [ListRouterModule],
  declarations: [ListComponent]
})

export class ListModule { }

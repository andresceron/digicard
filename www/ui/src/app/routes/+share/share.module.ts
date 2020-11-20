import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { ShareRouterModule } from './share-router.module';
import { RouterModule } from '@angular/router';
import { ShareComponent } from './share.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ShareRouterModule
  ],
  exports: [ShareRouterModule],
  declarations: [ShareComponent]
})

export class ShareModule { }

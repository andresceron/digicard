import { NgModule } from '@angular/core';

import { PostNewRouterModule } from './post-new-router.module';
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { PostNewComponent } from './post-new.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    PostNewRouterModule
  ],
  exports: [PostNewRouterModule],
  declarations: [PostNewComponent]
})

export class PostNewModule { }

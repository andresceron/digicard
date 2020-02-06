import { NgModule } from '@angular/core';

import { PostEditRouterModule } from './post-edit-router.module';
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { PostEditComponent } from './post-edit.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    PostEditRouterModule
  ],
  exports: [PostEditRouterModule],
  declarations: [PostEditComponent]
})

export class PostEditModule { }

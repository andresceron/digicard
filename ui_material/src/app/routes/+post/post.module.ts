import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { PostRouterModule } from './post-router.module';
import { RouterModule } from '@angular/router';
import { PostComponent } from './post.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    PostRouterModule
  ],
  exports: [PostRouterModule],
  declarations: [PostComponent]
})

export class PostModule { }

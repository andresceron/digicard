import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostNewComponent } from './post-new.component';

const routes: Routes = [
  {
    path: '',
    component: PostNewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class PostNewRouterModule {}

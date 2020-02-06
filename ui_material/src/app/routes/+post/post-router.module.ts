import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new'
  },
  {
    path: 'new',
    loadChildren: './edit/post-edit.module#PostEditModule'
  },
  {
    path: ':postId/edit',
    loadChildren: './edit/post-edit.module#PostEditModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class PostRouterModule {}

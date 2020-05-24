import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new'
  },
  {
    path: 'new',
    loadChildren: () => import('./edit/post-edit.module').then(m => m.PostEditModule)
  },
  {
    path: ':postId/edit',
    loadChildren: () => import('./edit/post-edit.module').then(m => m.PostEditModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class PostRouterModule {}

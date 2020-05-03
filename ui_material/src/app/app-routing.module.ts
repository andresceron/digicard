import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './routes/+home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: './routes/+login/login.module#LoginModule'
  },
  {
    path: 'list',
    loadChildren: './routes/+list/list.module#ListModule'
  },
  {
    path: 'post',
    loadChildren: './routes/+post/post.module#PostModule'
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRouterModule { }

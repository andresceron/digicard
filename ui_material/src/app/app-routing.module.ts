import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: './routes/+home/home.module#HomeModule'
  },
  {
    path: 'login',
    loadChildren: './routes/+login/login.module#LoginModule'
  },
  {
    path: 'list',
    canActivate: [AuthGuard],
    loadChildren: './routes/+list/list.module#ListModule'
  },
  {
    path: 'post',
    canActivate: [AuthGuard],
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

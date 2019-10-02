import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: './routes/+home/home.module#HomeModule'
  },
  {
    path: 'list',
    pathMatch: 'full',
    loadChildren: './routes/+list/list.module#ListModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRouterModule { }

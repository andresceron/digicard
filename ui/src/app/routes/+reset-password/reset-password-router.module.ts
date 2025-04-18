import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  },
  {
    path: ':token',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ResetPasswordRouterModule {}

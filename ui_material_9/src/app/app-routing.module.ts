import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./routes/+home/home.module').then(m => m.HomeModule)
  // },
  {
    path: 'login',
    loadChildren: () => import('./routes/+login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/+register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/+profile/profile.module').then(m => m.ProfileModule)
  },
  {
    path: 'share',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/+share/share.module').then(m => m.ShareModule)
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/+contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: '**',
    redirectTo: 'contacts'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ]
})

export class AppRouterModule { }

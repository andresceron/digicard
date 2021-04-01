import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/+contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./routes/+login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./routes/+register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./routes/+reset-password/reset-password.module').then(m => m.ResetPasswordModule)
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
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./routes/+settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./routes/+public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'legal',
    loadChildren: () => import('./routes/+legal/legal.module').then(m => m.LegalModule)
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

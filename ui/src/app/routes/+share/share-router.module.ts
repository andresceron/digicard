import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareComponent } from './share.component';

const routes: Routes = [
  {
    path: '',
    component: ShareComponent,
  },
  {
    path: 'qr',
    loadChildren: () => import('./qr/share-qr.module').then(m => m.ShareQrModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ShareRouterModule {}

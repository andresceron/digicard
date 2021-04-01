import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareQrComponent } from './share-qr.component';

const routes: Routes = [
  {
    path: '',
    component: ShareQrComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ShareQrRouterModule {}

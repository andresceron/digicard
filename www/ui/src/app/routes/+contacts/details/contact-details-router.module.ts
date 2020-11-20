import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactDetailsComponent } from './contact-details.component';

const routes: Routes = [
  {
    path: '',
    component: ContactDetailsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ContactDetailsRouterModule {}

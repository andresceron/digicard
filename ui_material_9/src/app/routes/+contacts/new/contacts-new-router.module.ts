import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsNewComponent } from './contacts-new.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsNewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ContactsNewRouterModule {}

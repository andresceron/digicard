import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactsEditComponent } from './contacts-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsEditComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ContactsEditRouterModule {}

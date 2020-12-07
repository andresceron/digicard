import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  {
    path: '',
    component: ContactsComponent
  },
  {
    path: ':contactId/detail',
    loadChildren: () => import('./details/contact-details.module').then(m => m.ContactDetailsModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ]
})

export class ContactsRouterModule {}

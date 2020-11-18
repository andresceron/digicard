import { NgModule } from '@angular/core';

import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';

import { ContactsRouterModule } from './contacts-router.module';
import { RouterModule } from '@angular/router';
import { ContactsComponent } from './contacts.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ContactsRouterModule
  ],
  exports: [ContactsRouterModule],
  declarations: [ContactsComponent]
})

export class ContactsModule { }

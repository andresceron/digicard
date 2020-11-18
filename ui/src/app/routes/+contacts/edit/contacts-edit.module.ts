import { NgModule } from '@angular/core';

import { ContactsEditRouterModule } from './contacts-edit-router.module';
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ContactsEditComponent } from './contacts-edit.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ContactsEditRouterModule
  ],
  exports: [ContactsEditRouterModule],
  declarations: [ContactsEditComponent]
})

export class ContactsEditModule { }

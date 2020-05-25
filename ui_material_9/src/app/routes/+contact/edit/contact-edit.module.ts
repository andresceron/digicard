import { NgModule } from '@angular/core';

import { ContactsEditRouterModule } from './contact-edit-router.module';
import { ComponentsModule } from './node_modules/@modules/components.module';
import { SharedModule } from './node_modules/@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ContactsEditComponent } from './contact-edit.component';

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

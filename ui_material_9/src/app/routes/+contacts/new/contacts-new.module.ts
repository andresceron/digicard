import { NgModule } from '@angular/core';

import { ContactsNewRouterModule } from './contacts-new-router.module';
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ContactsNewComponent } from './contacts-new.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ContactsNewRouterModule
  ],
  exports: [ContactsNewRouterModule],
  declarations: [ContactsNewComponent]
})

export class ContactsNewModule { }

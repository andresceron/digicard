import { NgModule } from '@angular/core';

import { ContactsNewRouterModule } from './contacts-new-router.module';
import { ComponentsModule } from './node_modules/@modules/components.module';
import { SharedModule } from './node_modules/@modules/shared.module';
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

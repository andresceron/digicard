import { NgModule } from '@angular/core';
import { ContactDetailsRouterModule } from './contact-details-router.module';
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details.component';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    ContactDetailsRouterModule
  ],
  exports: [ContactDetailsRouterModule],
  declarations: [ContactDetailsComponent]
})

export class ContactDetailsModule { }

import { NgModule } from '@angular/core';
import { ContactDetailsRouterModule } from './contact-details-router.module';
import { ComponentsModule } from '@modules/components.module';
import { SharedModule } from '@modules/shared.module';
import { RouterModule } from '@angular/router';
import { ContactDetailsComponent } from './contact-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    RouterModule,
    ComponentsModule,
    SharedModule,
    BrowserAnimationsModule,
    ContactDetailsRouterModule
  ],
  exports: [ContactDetailsRouterModule],
  declarations: [ContactDetailsComponent]
})

export class ContactDetailsModule { }

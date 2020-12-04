import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { ContactDetailComponent } from '@components/contact-detail/contact-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    ContactDetailComponent
  ],
  declarations: [
    ContactDetailComponent
  ]
})

export class ContactDetailModule {}

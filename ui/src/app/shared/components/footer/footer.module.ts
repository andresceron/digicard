import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { FooterComponent } from '@components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    FooterComponent
  ],
  declarations: [
    FooterComponent
  ]
})

export class FooterModule {}

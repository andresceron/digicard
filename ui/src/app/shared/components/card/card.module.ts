import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { CardComponent } from '@components/card/card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    CardComponent
  ],
  declarations: [
    CardComponent
  ]
})

export class CardModule {}

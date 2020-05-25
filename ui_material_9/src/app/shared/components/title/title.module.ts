import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { TitleComponent } from '@components/title/title.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    TitleComponent
  ],
  declarations: [
    TitleComponent
  ]
})

export class TitleModule {}

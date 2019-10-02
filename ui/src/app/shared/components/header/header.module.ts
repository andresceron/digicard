import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { HeaderComponent } from '@components/header/header.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})

export class HeaderModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { HeaderComponent } from '@components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})

export class HeaderModule {}

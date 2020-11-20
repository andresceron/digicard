import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { SvgComponent } from '@components/svg/svg.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SvgComponent
  ],
  declarations: [
    SvgComponent
  ]
})

export class SvgModule {}

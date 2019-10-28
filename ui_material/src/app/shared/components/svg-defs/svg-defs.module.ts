import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { SvgDefsComponent } from '@components/svg-defs/svg-defs.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SvgDefsComponent
  ],
  declarations: [
    SvgDefsComponent
  ]
})

export class SvgDefsModule {}

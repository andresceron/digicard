import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { SortbyComponent } from '@components/sortby/sortby.component';

import { SvgModule } from '@components/svg/svg.module';

@NgModule({
  imports: [
    SharedModule,
    SvgModule
  ],
  exports: [
    SortbyComponent
  ],
  declarations: [
    SortbyComponent
  ]
})

export class SortbyModule {}

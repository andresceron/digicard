import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { DataListComponent } from './data-list.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [
    DataListComponent
  ],
  declarations: [
    DataListComponent
  ]
})

export class DataListModule {}

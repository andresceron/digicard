import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBootstrapModule } from '@shared/bootstrap/app.bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { VirtualScrollerModule } from 'ngx-virtual-scroller';

@NgModule({
  imports: [
    CommonModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule
  ],
  exports: [
    CommonModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule,
    VirtualScrollerModule
  ],
  declarations: [
  ]
})

export class SharedModule {}

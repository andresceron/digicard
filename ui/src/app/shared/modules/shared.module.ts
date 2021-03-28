import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBootstrapModule } from '@shared/bootstrap/app.bootstrap.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    AppBootstrapModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
  ]
})

export class SharedModule {}

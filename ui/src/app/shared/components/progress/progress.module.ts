import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { ProgressComponent } from '@components/progress/progress.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    SharedModule
  ],
  exports: [
    ProgressComponent
  ],
  declarations: [
    ProgressComponent
  ]
})

export class ProgressModule {}

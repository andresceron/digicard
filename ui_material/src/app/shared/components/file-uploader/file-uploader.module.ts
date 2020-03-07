import { NgModule } from '@angular/core';
import { SharedModule } from '@modules/shared.module';
import { FileUploaderComponent } from '@components/file-uploader/file-uploader.component';
import { ProgressModule } from '@components/progress/progress.module';

@NgModule({
  imports: [
    SharedModule,
    ProgressModule
  ],
  exports: [
    FileUploaderComponent
  ],
  declarations: [
    FileUploaderComponent
  ]
})

export class FileUploaderModule {}

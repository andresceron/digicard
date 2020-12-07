import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'sc-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileUploaderComponent {
  @Input() icon: string;
  @Input() buttonText = 'Button';
  @Output() fileEvent: EventEmitter<any> = new EventEmitter();
  onChange: Function;
  file: File | null = null;

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    this.file = event?.item(0);
    this.handleInputChange(this.file);
  }

  constructor() {}

  private handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;

    // TODO: In the future, check the match-file before emitting
    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }

    this.fileEvent.emit(file);
  }

}

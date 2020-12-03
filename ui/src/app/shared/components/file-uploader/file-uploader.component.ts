import {
  Component,
  ChangeDetectionStrategy,
  HostListener,
  Input,
  ElementRef,
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
  @Input() progress;
  @Input() icon;
  @Input() buttonText = 'Button';
  @Output() fileEvent: EventEmitter<any> = new EventEmitter();
  onChange: Function;
  file: File | null = null;

  @HostListener('change', ['$event.target.files'])
  emitFiles(event: FileList) {
    const file = event && event.item(0);
    // this.onChange(file);
    this.file = file;
    this.handleInputChange(file);
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;

    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }

    this.fileEvent.emit(file);
  }

}

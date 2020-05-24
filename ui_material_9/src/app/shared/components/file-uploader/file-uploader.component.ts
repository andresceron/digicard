import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  Input,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sc-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploaderComponent,
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileUploaderComponent implements ControlValueAccessor {
  @Input() progress;
  @Output() fileEvent: EventEmitter<any> = new EventEmitter<any>();
  onChange: Function;
  file: File | null = null;

  @HostListener('change', ['$event.target.files'])
  emitFiles( event: FileList ) {
    const file = event && event.item(0);
    // this.onChange(file);
    this.file = file;
    this.handleInputChange(file);
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  handleInputChange(files) {
    const file = files;
    const pattern = /image-*/;
    const reader = new FileReader();

    // if (!file.type.match(pattern)) {
    //   alert('invalid format');
    //   return;
    // }

    // reader.onloadend = this._handleReaderLoaded.bind(this);
    // reader.readAsDataURL(file);
    this.fileEvent.emit(file);
  }

  // _handleReaderLoaded(e) {
  //   const reader = e.target;
  //   this.fileEvent.emit(
  //     this.file
  //   );
  // }

}

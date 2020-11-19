import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FileUploaderComponent } from './file-uploader.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@modules/shared.module';

xdescribe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FileUploaderComponent,
      ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create sortby component', async(() => {
    expect(component).toBeTruthy();
  }));

});

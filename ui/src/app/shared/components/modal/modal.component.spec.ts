import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from '@components/modal/modal.component';
import { ModalService } from './shared/modal.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/modules/shared.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      imports: [
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        ModalService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

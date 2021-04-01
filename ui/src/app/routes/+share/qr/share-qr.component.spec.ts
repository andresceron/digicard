import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ShareQrComponent } from './share-qr.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRouteStub, UsersServiceStub } from 'app/stubs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersService } from '@services/users.service';

describe('ShareQrComponent', () => {
  let component: ShareQrComponent;
  let fixture: ComponentFixture<ShareQrComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShareQrComponent
      ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterModule
      ],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: UsersService,
          useValue: UsersServiceStub
        },
        MatSnackBar
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareQrComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create post component', () => {
    expect(component).toBeTruthy();
  });

});

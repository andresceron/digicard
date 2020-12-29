import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ShareComponent } from './share.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub, UsersServiceStub } from 'app/stubs';
import { UsersService } from '@services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';

describe('ShareComponent', () => {
  let component: ShareComponent;
  let fixture: ComponentFixture<ShareComponent>;

  const CONTACT_WITH_QR = {
    _id: 'testId',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    socials: [],
    qr: 'data'
  };

  const CONTACT_WITHOUT_QR = {
    _id: 'testId',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    socials: []
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShareComponent
      ],
      imports: [
        SharedModule,
        HttpClientTestingModule,
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: UsersService,
          useClass: UsersServiceStub
        },
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => 'safeStringSanitize',
            bypassSecurityTrustUrl: (url) => 'safeStringUrl'
          }
        },
        MatSnackBar
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create share component', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate ngOnInit and set contactId and initSubscriptions with contact', () => {
    initConfig(CONTACT_WITH_QR);
    expect(component.user).toBe(CONTACT_WITH_QR);
  });

  it('should initSubscriptions and configQR with QR', () => {
    initConfig(CONTACT_WITH_QR);
    expect(component.user).toBe(CONTACT_WITH_QR);
    expect(component.user.qr).toBe('safeStringUrl');
  });

  it('should initSubscriptions and configQR without QR', () => {
    initConfig(CONTACT_WITHOUT_QR);
    expect(component.user).toBe(CONTACT_WITHOUT_QR);
    expect(component.user.qr).toBeFalsy();
  });

  it('should initSubscriptions and configEmail', () => {
    initConfig(CONTACT_WITHOUT_QR);
    expect(component.user).toBe(CONTACT_WITHOUT_QR);
    expect(component.linkEmail).toContain('mailto:?');
  });

  it('should initSubscriptions and configSMS', () => {
    initConfig(CONTACT_WITHOUT_QR);
    expect(component.user).toBe(CONTACT_WITHOUT_QR);
    expect(component.linkSMS).toBe('safeStringUrl');
  });

  it('should initSubscriptions and configLink', () => {
    initConfig(CONTACT_WITHOUT_QR);
    expect(component.user).toBe(CONTACT_WITHOUT_QR);
    expect(component.linkCopy).toBe(`${environment.baseUrl}public/testId`);
  });

  it('should call shareQR() and set isQRVisible to false if already true', () => {
    component.isQRVisible = true;
    expect(component.isQRVisible).toBeTruthy();

    component.shareQR();
    expect(component.isQRVisible).toBeFalsy();
  });

  it('should call shareQR() and set isQRVisible to true', () => {
    expect(component.isQRVisible).toBeFalsy();

    component.shareQR();
    expect(component.isQRVisible).toBeTruthy();
  });

  it('should call shareLink() and copy link and show snackbar message', () => {
    // TODO: Need to figure out how to test this case with clipboard and copy / paste;
    // const dummyTextarea = document.createElement('textarea');
    // const documentSpy = spyOn(document, 'createElement').and.returnValue(dummyTextarea);

    const snackBar = TestBed.inject(MatSnackBar);
    const snackBarSpy = spyOn(snackBar, 'open');

    initConfig(CONTACT_WITH_QR);
    component.shareLink();

    expect(snackBarSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.LINK_COPIED_SUCCESS, 'Dismiss', {duration: 3000});
  });

  it('should call backToList and change isQRVisiable to false', () => {
    component.isQRVisible = true;
    expect(component.isQRVisible).toBeTruthy();

    component.backToList();
    expect(component.isQRVisible).toBeFalsy();
  });

  function initConfig(data) {
    const userServiceSpy = spyOn(TestBed.inject(UsersService), 'getUser').and.returnValue(of(data));
    fixture.detectChanges();

    expect(userServiceSpy).toHaveBeenCalled();
  }

});

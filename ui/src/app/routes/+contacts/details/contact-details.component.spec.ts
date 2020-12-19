import { TestBed, async, ComponentFixture, tick, fakeAsync, flush } from '@angular/core/testing';
import { ContactDetailsComponent } from './contact-details.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRouteStub, ContactsServiceStub } from 'app/stubs';
import { ContactsService } from '@services/contacts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;

  const routeStub = new ActivatedRouteStub();

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  const CONTACT_EMPTY_SOCIALS = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    socials: []
  };

  const CONTACT_WITH_SOCIAL_VALUE = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    socials: [
      {
        id: 'socialId',
        baseUrl: 'https://www.socialurl.com/$$socialid$$',
        value: 'testuser'
      }
    ]
  };

  const CONTACT_WITHOUT_SOCIAL_VALUE = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@user.com',
    socials: [
      {
        id: 'socialId',
        baseUrl: 'https://www.socialurl.com/$$socialid$$'
      }
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactDetailsComponent
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
          provide: ContactsService,
          useClass: ContactsServiceStub
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: ActivatedRoute,
          useValue: routeStub
        },
        MatSnackBar
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create post component', () => {
    expect(component).toBeTruthy();
  });

  it('should not have contactId and not call setContactSubscription function', () => {
    routeStub.setParamMap({});
    fixture.detectChanges();

    expect(component.contactData).toBeFalsy();
  });

  it('should set contactId and get data from setContactSubscription', () => {
    routeStub.setParamMap({contactId: 'abc123'});

    const getContactSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of(CONTACT_EMPTY_SOCIALS));
    fixture.detectChanges();

    expect(getContactSpy).toHaveBeenCalled();
    expect(component.contactData).toBe(CONTACT_EMPTY_SOCIALS);
  });

  it('should call configSocialUrls and set social.fullUrl', () => {
    routeStub.setParamMap({contactId: 'abc123'});

    const getContactSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of(CONTACT_WITH_SOCIAL_VALUE));
    fixture.detectChanges();

    expect(getContactSpy).toHaveBeenCalled();
    expect(component.contactData).toBe(CONTACT_WITH_SOCIAL_VALUE);
    expect(component.contactData.socials[0].fullUrl).toBe('https://www.socialurl.com/testuser');
  });

  it('should call configSocialUrls and not have social.value and not set social.fullUrl', () => {
    routeStub.setParamMap({contactId: 'abc123'});

    const getContactSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of(CONTACT_WITHOUT_SOCIAL_VALUE));
    fixture.detectChanges();

    expect(getContactSpy).toHaveBeenCalled();
    expect(component.contactData).toBe(CONTACT_WITHOUT_SOCIAL_VALUE);
    expect(component.contactData.socials[0].fullUrl).toBeUndefined();
  });

  it('should call deleteContact and navigate to /contacts', () => {
    deleteContact();
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/contacts`]);
  });

  it('should call deleteContact and show snackbar deleted message', () => {
    const snackBar = TestBed.inject(MatSnackBar);
    const snackBarSpy = spyOn(snackBar, 'open');
    deleteContact();

    expect(snackBarSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.DELETED, 'Dismiss', {duration: 3000});
  });

  it('should call goToContacts and navigate to /contacts', () => {
    deleteContact();
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/contacts`]);
  });

  it('should call goToContacts and throw error', () => {
    deleteContact(true);
    expect(component.hasDeleteContactError).toBeTruthy();
  });

  it('should call goToContacts and hit catch and showDeleteContactError', fakeAsync(() => {
    routeStub.setParamMap({ contactId: 'abc123' });
    const removeContactSpy = spyOn(TestBed.inject(ContactsService), 'removeContact').and.returnValue('');
    component.deleteContact();

    expect(removeContactSpy).toHaveBeenCalled();
    expect(component.hasDeleteContactError).toBeTruthy();
    tick(3000);
    expect(component.hasDeleteContactError).toBeFalsy();
    flush();
  }));

  function deleteContact(hasError = false) {
    routeStub.setParamMap({ contactId: 'abc123' });

    let removeContactSpy;
    if (hasError) {
      removeContactSpy = spyOn(TestBed.inject(ContactsService), 'removeContact').and.returnValue(throwError('ERROR'));
    } else {
      removeContactSpy = spyOn(TestBed.inject(ContactsService), 'removeContact').and.returnValue(of(CONTACT_EMPTY_SOCIALS));
    }

    component.deleteContact();
    fixture.detectChanges();
    expect(removeContactSpy).toHaveBeenCalled();
  }

});

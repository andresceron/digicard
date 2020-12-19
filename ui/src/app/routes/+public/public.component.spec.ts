import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PublicComponent } from './public.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ActivatedRouteStub, AuthServiceStub, ContactsServiceStub } from 'app/stubs';
import { ContactsService } from '@services/contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('PublicComponent', () => {
  let component: PublicComponent;
  let fixture: ComponentFixture<PublicComponent>;

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
        PublicComponent
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
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
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create public component', () => {
    expect(component).toBeTruthy();
  });

  it('should initiate ngOnInit and set empty contactId', () => {
    routeStub.setParamMap({});

    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of());
    fixture.detectChanges();

    expect(contactsServiceSpy).not.toHaveBeenCalled();

  });

  it('should initiate ngOnInit and set contactId and initSubscriptions with contact', () => {
    routeStub.setParamMap({contactId: 'testId'});

    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of(CONTACT_EMPTY_SOCIALS));
    fixture.detectChanges();

    expect(contactsServiceSpy).toHaveBeenCalled();
    expect(component.contact).toBe(CONTACT_EMPTY_SOCIALS);

  });

  it('should initiate ngOnInit and set contactId and initSubscriptions and configSocialUrls', () => {
    routeStub.setParamMap({contactId: 'testId'});

    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of(CONTACT_WITH_SOCIAL_VALUE));
    fixture.detectChanges();

    expect(contactsServiceSpy).toHaveBeenCalled();
    expect(component.contact).toBe(CONTACT_WITH_SOCIAL_VALUE);
    expect(component.contact.socials[0].fullUrl).toBe('https://www.socialurl.com/testuser');
  });

  it('should initiate ngOnInit and set contactId and initSubscriptions and configSocialUrls but without social.value', () => {
    routeStub.setParamMap({contactId: 'testId'});

    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of(CONTACT_WITHOUT_SOCIAL_VALUE));
    fixture.detectChanges();

    expect(contactsServiceSpy).toHaveBeenCalled();
    expect(component.contact).toBe(CONTACT_WITHOUT_SOCIAL_VALUE);
    expect(component.contact.socials[0].fullUrl).toBeUndefined();
  });

  it('should initiate ngOnInit and set contactId and initSubscriptions to return catchError', () => {
    routeStub.setParamMap({contactId: 'testId'});
    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(throwError('ERROR'));
    fixture.detectChanges();

    expect(contactsServiceSpy).toHaveBeenCalled();
    expect(component.contact).toBeUndefined();

  });

  it('should call saveContact and make an API request to saveContact and navigate to contacts', () => {
    routeStub.setParamMap({ contactId: 'testId' });

    spyOn(TestBed.inject(ContactsService), 'getContact').and.returnValue(of(CONTACT_EMPTY_SOCIALS));
    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'saveContact').and.returnValue(of(CONTACT_EMPTY_SOCIALS));

    fixture.detectChanges();
    component.saveContact();

    expect(contactsServiceSpy).toHaveBeenCalled();

    expect(mockRouter.navigate).toHaveBeenCalledWith([`/contacts`]);
  });

  // TODO: Look into this and check if necessary
  xit('should call saveContact with curentAuthUser and saveContact to throw error', () => {
    routeStub.setParamMap({ contactId: 'testId' });

    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'saveContact').and.returnValue(throwError('ERROR'));

    fixture.detectChanges();
    component.saveContact();

    expect(contactsServiceSpy).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should call saveContact with no curentAuthUser and navigate to /login', () => {
    routeStub.setParamMap({});

    spyOnProperty(TestBed.inject(AuthService), 'currentAuthValue').and.returnValue(false);

    fixture.detectChanges();

    component.saveContact();

    const contactsServiceSpy = spyOn(TestBed.inject(ContactsService), 'saveContact').and.returnValue(of(CONTACT_EMPTY_SOCIALS));
    expect(contactsServiceSpy).not.toHaveBeenCalled();

    expect(mockRouter.navigate).toHaveBeenCalledWith([`/login`]);
  });

});

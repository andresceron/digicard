import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { ApiService } from '@services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';
import { of } from 'rxjs';
import { ApiServiceStub, ClientStorageStub, AuthServiceStub } from 'app/stubs';
import { ContactsService } from '@services/contacts.service';
import { AuthService } from '@services/auth.service';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactsComponent,
        SearchbarComponent
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: ApiService,
          useClass: ApiServiceStub
        },
        {
          provide: ClientStorage,
          useClass: ClientStorageStub
        },
        {
          provide: Router,
          useValue: mockRouter
        },
        ContactsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create post component', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchContacts and return contacts by query', () => {
    const contacts = [];
    const spyGetContacts = spyOn(TestBed.inject(ContactsService), 'getContacts').and.returnValue(of(contacts));
    fixture.detectChanges();
    component.searchContacts('asd');
    expect(spyGetContacts).toHaveBeenCalled();
    expect(component.contacts).toBe(contacts);
  });

  it('should call goToDetail and go to contact detail', () => {
    const contact = {
      _id: '123',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      socials: []
    };

    component.goToDetail(contact);

    expect(mockRouter.navigate).toHaveBeenCalledWith([`/contacts/${contact._id}/detail`]);
  });

  it('should call toggleSearchBar and change isSearchbarVisible to true', () => {
    component.isSearchbarVisible = false;
    component.toggleSearchbar();
    expect(component.isSearchbarVisible).toBeTruthy();
  });

  it('should call toggleSearchBar and change isSearchbarVisible to false', fakeAsync(() => {
    const contacts = [];
    const spyGetContacts = spyOn(TestBed.inject(ContactsService), 'getContacts').and.returnValue(of(contacts));
    fixture.detectChanges();

    component.isSearchbarVisible = true;
    component.toggleSearchbar();

    expect(component.isSearchbarVisible).toBeFalsy();
    expect(spyGetContacts).toHaveBeenCalled();

  }));

});

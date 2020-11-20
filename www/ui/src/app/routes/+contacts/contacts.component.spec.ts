import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { SortbyComponent } from '@components/sortby/sortby.component';
import { DataListComponent } from '@components/data-list/data-list.component';
import { SvgComponent } from '@components/svg/svg.component';
import { ModalComponent } from '@components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { ApiService } from '@services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalService } from '@components/modal/shared/modal.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';

describe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContactsComponent,
        SearchbarComponent,
        SortbyComponent,
        DataListComponent,
        SvgComponent,
        ModalComponent,
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiService,
        ModalService,
        ClientStorage
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

});

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ContactsComponent } from './contacts.component';
import { SearchbarComponent } from './node_modules/@components/searchbar/searchbar.component';
import { SortbyComponent } from './node_modules/@components/sortby/sortby.component';
import { DataListComponent } from './node_modules/@components/data-list/data-list.component';
import { SvgComponent } from './node_modules/@components/svg/svg.component';
import { ModalComponent } from './node_modules/@components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './node_modules/@modules/shared.module';
import { ApiService } from './node_modules/@services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalService } from './node_modules/@components/modal/shared/modal.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientStorage } from './node_modules/@services/client-storage.service';

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

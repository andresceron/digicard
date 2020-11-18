import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

});

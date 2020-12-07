import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { DataListComponent } from '@components/data-list/data-list.component';
import { SvgComponent } from '@components/svg/svg.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { ApiService } from '@services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ClientStorage } from '@services/client-storage.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
        SearchbarComponent,
        DataListComponent,
        SvgComponent
      ],
      imports: [
        ReactiveFormsModule,
        SharedModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ApiService,
        ClientStorage
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

});

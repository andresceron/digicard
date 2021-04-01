import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub, UsersServiceStub } from 'app/stubs';
import { UsersService } from '@services/users.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SettingsComponent
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
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create share component', () => {
    expect(component).toBeTruthy();
  });

});

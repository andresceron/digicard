import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { SvgComponent } from '@components/svg/svg.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub } from 'app/stubs';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        SearchbarComponent,
        SvgComponent
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
          provide: Router,
          useValue: mockRouter
        },
        {
          provide: FormBuilder,
          useValue: formBuilder
        }
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

  it('should create loginFormGroup with default values', () => {
    component.loginFormGroup = formBuilder.group({
      email:  ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    fixture.detectChanges();

    expect(component.loginFormGroup.controls.email.value).toBe('');
    expect(component.loginFormGroup.controls.password.value).toBe('');
  });

  it('should not have valid loginFormGroup', () => {
    component.loginFormGroup = formBuilder.group({
      email:  ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    component.onLogin();

    expect(component.loginFormGroup.controls.valid).toBeFalsy();
  });

  it('should have valid loginFormGroup', () => {
    loginGroupValues();
  });

  it('should call onLogin and call with valid authService.login response', () => {
    const loginValue = { email: 'user@test.com', token: 'token123', _id: 'id123' };
    loginGroupValues();
    login(loginValue, 'returnOf');
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/contacts`]);
  });

  it('should call onLogin and call authService.login and reject to catch', () => {
    loginGroupValues();
    login('', 'none');
    expect(component.loginFormGroup.controls.password.value).toBe(null);
  });

  it('should call onLogin and call authService.login and go to else call loginError', () => {
    loginGroupValues();
    login('', 'returnOf');
    expect(component.loginFormGroup.controls.password.value).toBe(null);
  });
  it('should call onLogin and call authService.login and catchError', () => {
    loginGroupValues();
    login('', 'returnCatchError');
    expect(component.loginFormGroup.controls.password.value).toBe(null);
  });

  function loginGroupValues() {
    component.loginFormGroup = formBuilder.group({
      email:  ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    component.loginFormGroup.controls.email.setValue('user@test.com');
    component.loginFormGroup.controls.password.setValue('123456789');
    expect(component.loginFormGroup.valid).toBeTruthy();
  }

  function login(value: any, returnType: string) {
    let loginSpy;
    switch (returnType) {
      case 'none':
        loginSpy = spyOn(TestBed.inject(AuthService), 'login').and.returnValue(value);
        break;
      case 'returnOf':
        loginSpy = spyOn(TestBed.inject(AuthService), 'login').and.returnValue(of(value));
        break;
      case 'returnCatchError':
        loginSpy = spyOn(TestBed.inject(AuthService), 'login').and.returnValue(throwError('ERROR'));
        break;
      default:
        break;
    }

    component.onLogin();
    fixture.detectChanges();
    expect(loginSpy).toHaveBeenCalled();
  }

});

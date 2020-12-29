import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { SearchbarComponent } from '@components/searchbar/searchbar.component';
import { SvgComponent } from '@components/svg/svg.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@services/auth.service';
import { AuthServiceStub } from 'app/stubs';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const formBuilder: FormBuilder = new FormBuilder();

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegisterComponent,
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create register component', () => {
    expect(component).toBeTruthy();
  });

  it('should configure registerFormGroup with default values', () => {
    configForm();
  });

  it('should call goToLogin and redirect to Login', () => {
    component.goToLogin();
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/login`]);
  });

  it('should call onSubmit and return as registerFormGroup is not valid', () => {
    component.onSubmit();
    expect(component.registerFormGroup.valid).toBeFalsy();
  });

  it('should call onSubmit and call with valid authService.register response', () => {
    const registerValue = { email: 'user@test.com', token: 'token123', _id: 'id123' };
    registerGroupValues();
    register(registerValue, 'returnOf');
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/login`]);
  });

  it('should call onSubmit and call authService.register and reject to catch, reset password value and show error message', () => {
    registerGroupValues();
    register('', 'none');
    expect(component.registerFormGroup.controls.password.value).toBe(null);
  });

  it('should call onSubmit and call authService.register and go to else call loginError', () => {
    registerGroupValues();
    register('', 'returnOf');
    expect(component.registerFormGroup.controls.password.value).toBe(null);
  });

  it('should call onSubmit and call authService.register and catchError', () => {
    registerGroupValues();
    register('', 'returnCatchError');
    expect(component.registerFormGroup.controls.password.value).toBe(null);
  });

  function configForm() {
    component.registerFormGroup = formBuilder.group({
      firstName:  ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email:  ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });

    fixture.detectChanges();

    expect(component.registerFormGroup.controls.firstName.value).toBe('');
    expect(component.registerFormGroup.controls.lastName.value).toBe('');
    expect(component.registerFormGroup.controls.email.value).toBe('');
    expect(component.registerFormGroup.controls.password.value).toBe('');
  }

  function registerGroupValues() {
    component.registerFormGroup = formBuilder.group({
      firstName:  ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email:  ['', [Validators.required, Validators.email]],
      password:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    });

    component.registerFormGroup.controls.firstName.setValue('User');
    component.registerFormGroup.controls.lastName.setValue('Test');
    component.registerFormGroup.controls.email.setValue('user@test.com');
    component.registerFormGroup.controls.password.setValue('123456789');

    expect(component.registerFormGroup.valid).toBeTruthy();
  }

  function register(value: any, returnType: string) {
    let registerSpy;
    switch (returnType) {
      case 'none':
        registerSpy = spyOn(TestBed.inject(AuthService), 'register').and.returnValue(value);
        break;
      case 'returnOf':
        registerSpy = spyOn(TestBed.inject(AuthService), 'register').and.returnValue(of(value));
        break;
      case 'returnCatchError':
        registerSpy = spyOn(TestBed.inject(AuthService), 'register').and.returnValue(throwError('ERROR'));
        break;
      default:
        break;
    }

    component.onSubmit();
    fixture.detectChanges();
    expect(registerSpy).toHaveBeenCalled();
  }
});

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from '@modules/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { ActivatedRouteStub, AuthServiceStub } from 'app/stubs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  const formBuilder: FormBuilder = new FormBuilder();
  const routeStub = new ActivatedRouteStub();
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResetPasswordComponent
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
        },
        {
          provide: ActivatedRoute,
          useValue: routeStub
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create reset-password component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should subscribe to route.params and have not params.token and set isRequestingPassword to true ', () => {
    routeStub.setParamMap({});
    fixture.detectChanges();

    expect(component.isRequestingPassword).toBeTruthy();
  });

  it('should subscribe to route.params and have set params.token and validateToken', () => {
    const dummyToken = { token: 'token123' };
    const validateTokenSpy = spyOn(TestBed.inject(AuthService), 'validateResetPasswordToken').and.returnValue(of(true));
    routeStub.setParamMap(dummyToken);

    fixture.detectChanges();

    expect(component.isRequestingPassword).toBeFalsy();
    expect(component.hasValidToken).toBeTruthy();
    expect(validateTokenSpy).toHaveBeenCalledWith(dummyToken);
    expect(component.hasValidToken).toBeTruthy();
  });

  it('should subscribe to route.params and have set params.token and validateToken to return null', () => {
    const dummyToken = { token: 'token123' };
    const validateTokenSpy = spyOn(TestBed.inject(AuthService), 'validateResetPasswordToken').and.returnValue(of(false));
    routeStub.setParamMap(dummyToken);

    fixture.detectChanges();

    expect(validateTokenSpy).toHaveBeenCalledWith(dummyToken);
    expect(component.hasValidToken).toBeUndefined();
  });

  it('should subscribe to route.params and have set params.token and return null', () => {
    const dummyToken = { token: 'token123' };
    const validateTokenSpy = spyOn(TestBed.inject(AuthService), 'validateResetPasswordToken').and.returnValue(of(false));
    routeStub.setParamMap(dummyToken);

    fixture.detectChanges();

    expect(validateTokenSpy).toHaveBeenCalledWith(dummyToken);
    expect(component.hasValidToken).toBeUndefined();
  });

  it('should subscribe to route.params and have return catchError, show validate token error and redirect to login', () => {
    const dummyToken = { token: 'token123' };
    const snackBarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');

    const validateTokenSpy = spyOn(TestBed.inject(AuthService), 'validateResetPasswordToken').and.returnValue(throwError('ERROR'));
    routeStub.setParamMap(dummyToken);

    fixture.detectChanges();

    expect(snackBarSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.VALIDATE_TOKEN_ERROR, 'Dismiss', { duration: 3000 });

    expect(validateTokenSpy).toHaveBeenCalledWith(dummyToken);
    expect(component.hasValidToken).toBeFalsy();
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/login`]);
  });

  it('should call onSubmitRequest with invalid form', () => {
    component.resetPasswordForm = formBuilder.group({
      email:  ['', [Validators.required]]
    });

    component.onSubmitRequest();
    expect(component.resetPasswordForm.valid).toBeFalsy();
  });

  it('should call onSubmitRequest with valid form', () => {
    const resetPasswordSpy = spyOn(TestBed.inject(AuthService), 'resetPassword').and.returnValue(of(true));
    const snackBarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');

    component.resetPasswordForm = formBuilder.group({
      email:  ['', [Validators.required]]
    });
    component.resetPasswordForm.controls.email.setValue('user@test.com');

    component.onSubmitRequest();

    expect(component.resetPasswordForm.valid).toBeTruthy();
    expect(resetPasswordSpy).toHaveBeenCalledWith({email: 'user@test.com'});
    expect(snackBarSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.REQUEST_RESET_PASSWORD_SUCCESS, 'Dismiss', { duration: 3000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/login`]);
  });

  it('should call onSubmitRequest and return error', () => {
    const resetPasswordSpy = spyOn(TestBed.inject(AuthService), 'resetPassword').and.returnValue(false);
    const snackBarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');

    component.resetPasswordForm = formBuilder.group({
      email:  ['', [Validators.required]]
    });
    component.resetPasswordForm.controls.email.setValue('user@test.com');

    component.onSubmitRequest();

    expect(component.resetPasswordForm.valid).toBeTruthy();
    expect(resetPasswordSpy).toHaveBeenCalledWith({email: 'user@test.com'});
    expect(snackBarSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.ERROR, 'Dismiss', { duration: 3000 });
  });

  it('should call onSubmitRequest and catchError', () => {
    const resetPasswordSpy = spyOn(TestBed.inject(AuthService), 'resetPassword').and.returnValue(throwError('ERROR'));
    const snackBarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');

    component.resetPasswordForm = formBuilder.group({
      email:  ['', [Validators.required]]
    });
    component.resetPasswordForm.controls.email.setValue('user@test.com');

    component.onSubmitRequest();

    expect(component.resetPasswordForm.valid).toBeTruthy();
    expect(resetPasswordSpy).toHaveBeenCalledWith({email: 'user@test.com'});
    expect(snackBarSpy).toHaveBeenCalled();
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.REQUEST_RESET_PASSWORD_ERROR, 'Dismiss', { duration: 3000 });
  });

  it('should call onSubmitNewPassword with invalid form', () => {
    component.newPasswordForm = formBuilder.group({
      password:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });

    component.onSubmitNewPassword();
    expect(component.newPasswordForm.valid).toBeFalsy();
  });

  it('should call onSubmitNewPassword with valid form and return false response', () => {
    const newPasswordSpy = spyOn(TestBed.inject(AuthService), 'newPassword').and.returnValue(of(false));
    const snackBarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');

    const dummyToken = { token: 'token123' };
    routeStub.setParamMap(dummyToken);

    component.newPasswordForm = formBuilder.group({
      password:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword:  ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });

    component.newPasswordForm.controls.password.setValue('12345678');
    component.newPasswordForm.controls.confirmPassword.setValue('12345678');

    fixture.detectChanges();

    component.onSubmitNewPassword();

    expect(component.newPasswordForm.valid).toBeTruthy();
    expect(newPasswordSpy).toHaveBeenCalledWith({ token: 'token123', password: '12345678'});
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.NEW_PASSWORD_ERROR, 'Dismiss', { duration: 3000 });
  });

  it('should call onSubmitRequest with valid form and return valid response', () => {
    const newPasswordSpy = spyOn(TestBed.inject(AuthService), 'newPassword').and.returnValue(of(true));
    const snackBarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');

    const dummyToken = { token: 'token123' };
    routeStub.setParamMap(dummyToken);

    component.newPasswordForm = formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]]
    });

    component.newPasswordForm.controls.password.setValue('12345678');
    component.newPasswordForm.controls.confirmPassword.setValue('12345678');

    fixture.detectChanges();

    component.onSubmitNewPassword();

    expect(component.newPasswordForm.valid).toBeTruthy();
    expect(component.isRequestingPassword).toBeFalsy();
    expect(component.hasValidToken).toBeTruthy();
    expect(newPasswordSpy).toHaveBeenCalledWith({ token: 'token123', password: '12345678'});
    expect(snackBarSpy).toHaveBeenCalledWith(NOTIFICATIONS_MESSAGES.NEW_PASSWORD_SUCCESS, 'Dismiss', { duration: 3000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith([`/login`]);
  });

});

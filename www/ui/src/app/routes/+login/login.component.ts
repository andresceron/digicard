import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first, concatMap, take } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { IAuthResponse } from '@interfaces/auth-response.interface';
import { GoogleLoginProvider, AuthService as SocialAuthService } from 'angularx-social-login';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginError: boolean;
  formHasError: boolean;
  formErrorEmail = 'Invalid email';
  showPassword = false;
  isLoading = false;
  user = undefined;

  public loginFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]]
  } );

  private regexValidators = {
    /* tslint:disable */
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    /* tslint:enable */
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  onLogin() {
    if (this.loginFormGroup.valid) {
      try {
        this.loginError = false;
        this.isLoading = true;

        const obj = {
          email: this.loginFormGroup.value.email,
          password: this.loginFormGroup.value.password
        };

        this.authService
            .login(obj)
            .pipe(first())
            .subscribe(
              (res: IAuthResponse) => {
                if (!!res) {
                  console.log(res);
                  this.isLoading = false;
                  // Sucessful Login
                  this.snackBar.open(
                    `Welcome back ${res.email}`,
                    'Dismiss',
                    { duration: 3000 }
                  );

                  this.router.navigate(['/contacts']);
                }
              },
              (err) => {
                this.isLoading = false;
                this.loginFormGroup.controls.password.reset();
                this.loginFormGroup.controls.password.setErrors(null);
                this.loginError = true;
                this.snackBar.open(NOTIFICATIONS_MESSAGES.LOGIN_ERROR, 'Dismiss', {
                  duration: 3000
                });
            });
      } catch (err) {
        console.log(err);
      }
    }
  }

  onRegister() {
    this.router.navigate(['/register']);
  }

  onSocialLogin(target): void {
    this.user = undefined;
    try {

      if (target === 'google') {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      }

      // if (target === 'facebook') {
      //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      // }

      // if (target === 'linkedin') {
      //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
      // }

      this.loginError = false;
      this.isLoading = true;

      // const source = this.socialAuthService.authState.pipe(
      //   concatMap(result => this.authService.social(result))
      // ).subscribe(result2 => { // do stuff });
      //     console.log('result2: ', result2);
      //   });

      this.socialAuthService.authState.subscribe((user) => {
        this.user = user;
        console.log('user!! ', this.user);
      });

      this.authService
          .social(target)
          .pipe(take(this.user))
          .subscribe(
            (res: ICustomResponse) => {
              if (!!res) {
                console.log('res: ', res);
                this.isLoading = false;

                // Sucessful Login
                // this.snackBar.open(
                //   `Welcome back ${res.email}`,
                //   'Dismiss',
                //   { duration: 3000 }
                // );

                // this.router.navigate(['/list']);
              }
            },
            (err) => {
              this.isLoading = false;
              this.loginFormGroup.controls.password.reset();
              this.loginFormGroup.controls.password.setErrors(null);
              this.loginError = true;
              this.snackBar.open(NOTIFICATIONS_MESSAGES.LOGIN_ERROR, 'Dismiss', {
                duration: 3000
              });
            });
    } catch (err) {
      console.log(err);
    }
  }

  getErrorEmail() {
    return this.loginFormGroup.get('email').hasError('required') ? 'Field is required' :
      this.loginFormGroup.get('email').hasError('pattern') ? 'Not a valid emailaddress' :
        this.loginFormGroup.get('email').hasError('alreadyInUse') ? 'This emailaddress is already in use' : '';
  }

  getErrorPassword() {
    return this.loginFormGroup.get( 'password' ).hasError( 'required' ) ?
      'Field is required (at least eight characters, one uppercase letter and one number)' :
      this.loginFormGroup.get( 'password' ).hasError( 'requirements' ) ?
        'Password needs to be at least eight characters, one uppercase letter and one number' : '';
  }

  checkPassword(control) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  ngOnDestroy() {
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { IAuthResponse } from '@interfaces/auth-response.interface';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginError: boolean;
  formHasError: boolean;
  formErrorEmail = 'Invalid email';
  formErrorPassword = 'Invalid password';
  showPassword = false;
  isLoading = false;
  user = undefined;

  public loginFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  } );

  private regexValidators = {
    /* eslint-disable max-len */
    /* tslint:disable */
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    /* tslint:enable */
    /* eslint-enable max-len */
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

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

  public goToPage(path) {
    this.router.navigate([`/${path}`]);
  }
}

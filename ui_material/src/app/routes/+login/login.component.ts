import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { IUserResponse } from '@interfaces/user-response.interface';
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

  public loginFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
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
              (res: IUserResponse) => {
                if (!!res) {
                  console.log(res);
                  this.isLoading = false;
                  // Sucessful Login
                  this.snackBar.open(
                    `Welcome back ${res.email}`,
                    'Dismiss',
                    { duration: 3000 }
                  );

                  this.router.navigate(['/list']);
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

  onSocialLogin(target) {
    console.log('Login with oauth2');
    const oauthUrl = 'http://dev.zeroweb.local.com:3000/api/auth/google';
    return this.http.get(oauthUrl)
      .subscribe(
        res => {
          console.log(res);
        }, err => {
          console.warn(err);
        });
    // try {
    //   this.loginError = false;
    //   this.isLoading = true;

    //   this.authService
    //       .social(target)
    //       .pipe(first())
    //       .subscribe(
    //         (res: ICustomResponse) => {
    //           if (!!res) {
    //             console.log('res: ', res);
    //             this.isLoading = false;

    //             // Sucessful Login
    //             // this.snackBar.open(
    //             //   `Welcome back ${res.email}`,
    //             //   'Dismiss',
    //             //   { duration: 3000 }
    //             // );

    //             // this.router.navigate(['/list']);
    //           }
    //         },
    //         (err) => {
    //           this.isLoading = false;
    //           this.loginFormGroup.controls.password.reset();
    //           this.loginFormGroup.controls.password.setErrors(null);
    //           this.loginError = true;
    //           this.snackBar.open(NOTIFICATIONS_MESSAGES.LOGIN_ERROR, 'Dismiss', {
    //             duration: 3000
    //           });
    //       });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  onLogout() {
  }

  ngOnDestroy() {
  }
}

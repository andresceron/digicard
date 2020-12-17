import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAuthResponse } from '@interfaces/auth-response.interface';
import { FORM_ERRORS, NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public readonly FORM_ERRORS = FORM_ERRORS;

  public showPassword = false;
  public loginFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  } );

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  public onLogin(): void {
    if (!this.loginFormGroup.valid) {
      return;
    }

    try {
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
                // Sucessful Login
                this.showMessage(`Welcome back ${res.email}`);
                this.goToPage('contacts');
              } else {
                this.loginError();
              }
            },
            (err) => {
              this.loginError();
            }
          );
    } catch (err) {
      this.loginError();
    }

  }

  public goToPage(path): void {
    this.router.navigate([`/${path}`]);
  }

  private loginError() {
    this.loginFormGroup.controls.password.reset();
    this.loginFormGroup.controls.password.setErrors(null);
    this.showMessage(NOTIFICATIONS_MESSAGES.LOGIN_ERROR);
  }

  private showMessage(value: string): void {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000
    });
  }
}

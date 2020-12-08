import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FORM_ERRORS, NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { ConfirmPasswordValidator } from '@shared/validators/confirm-password.validator';

@Component({
  selector: 'sc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public readonly TITLE = 'Reset Pasword';
  public readonly FORM_ERRORS = FORM_ERRORS;
  public showPassword = false;
  public showConfirmPassword = false;
  public isRequestingPassword: boolean;
  public hasValidToken: boolean;

  public resetPasswordForm = this.fb.group({
    email: new FormControl('', [Validators.required])
  });

  public newPasswordForm = this.fb.group(
    {
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validator: ConfirmPasswordValidator.MatchPassword }
  );

  private resetToken: string;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe((params) => {
      if (params.token !== null && params.token !== undefined) {
        this.isRequestingPassword = false;
        this.resetToken = params.token;
        this.validateToken(this.resetToken);
      } else {
        this.isRequestingPassword = true;
      }
    });
  }

  public onSubmitRequest(): void {
    if (!this.resetPasswordForm.valid) {
      return;
    }

    try {
      this.authService
        .resetPassword({ email: this.resetPasswordForm.value.email })
        .pipe(first())
        .subscribe(
          (res: any) => {
            if (!!res) {

              this.snackBar.open(NOTIFICATIONS_MESSAGES.REQUEST_RESET_PASSWORD_SUCCESS, 'Dismiss', { duration: 5000 });
              this.router.navigate(['/login']);
            }
          },
          (err) => {
            this.snackBar.open(NOTIFICATIONS_MESSAGES.REQUEST_RESET_PASSWORD_ERROR, 'Dismiss', { duration: 5000 });
          }
        );
    } catch (err) {
      this.snackBar.open(NOTIFICATIONS_MESSAGES.ERROR, 'Dismiss', { duration: 5000 });
    }
  }

  public onSubmitNewPassword(): void {
    if (!this.newPasswordForm.valid) {
      return;
    }

    const obj = {
      token: this.resetToken,
      password: this.newPasswordForm.value.password
    };

    this.authService
      .newPassword(obj)
      .pipe(first())
      .subscribe((res) => {
        if (!res) {
          this.snackBar.open(NOTIFICATIONS_MESSAGES.NEW_PASSWORD_ERROR, 'Dismiss', { duration: 5000 });
          return;
        }

        this.isRequestingPassword = false;
        this.hasValidToken = true;
        this.snackBar.open(NOTIFICATIONS_MESSAGES.NEW_PASSWORD_SUCCESS, 'Dismiss', { duration: 5000 });
        this.goToPage('login');
      });
  }

  private validateToken(token: string): void {
    this.authService
      .validateResetPasswordToken({ token: token })
      .pipe(first())
      .subscribe(
        (result) => {
          if (!result) {
            return;
          }

          this.isRequestingPassword = false;
          this.hasValidToken = true;
        },
        (err) => {
          this.hasValidToken = false;
          this.snackBar.open(NOTIFICATIONS_MESSAGES.VALIDATE_TOKEN_ERROR, 'Dismiss', { duration: 5000 });
          this.goToPage('login');
        }
      );
  }

  private goToPage(path: string): void {
    this.router.navigate([`/${path}`]);
  }
}

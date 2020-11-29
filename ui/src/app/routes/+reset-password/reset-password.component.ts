import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { Subscription } from 'rxjs';
import { ConfirmPasswordValidator } from '@shared/validators/confirm-password.validator';

@Component({
  selector: 'sc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit, OnDestroy {
  submitError: boolean;
  formHasError: boolean;
  isLoading = false;
  showPassword = false;
  isRequestingPassword: boolean;
  hasValidToken: boolean;

  // TODO: Move to constants file
  title = 'Reset Pasword';
  formErrorEmail = 'Invalid email';
  formErrorMinPassword = 'Password must be at least 6 characters';
  formErrorMaxPassword = 'Password must be less than 15 characters';
  formErrorMatch = 'Password does not match';

  resetToken: string;

  userSub: Subscription;
  formSub: Subscription;

  public resetPasswordForm = this.fb.group({
    email: new FormControl('',  [Validators.required])
  });

  public newPasswordForm = this.fb.group({
    password: new FormControl('',  [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 15 ) ]),
    confirmPassword: new FormControl('',  [Validators.required]),
  }, { validator: ConfirmPasswordValidator.MatchPassword });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
      // this.route.params
      //   .pipe(
      //     map(params => params.token),
      //     switchMap(params => {
      //       if (params !== null && params !== undefined) {
      //         this.isRequestingPassword = false;
      //         return this.authService.validateResetPasswordToken({ token: params });
      //       } else {
      //         this.isRequestingPassword = true;
      //         return;
      //       }
      //     })
      //   )
      //   .subscribe(result => {
      //     console.log('result', result);
      //   });

    this.route.params
        .pipe(
          first()
        ).subscribe(params => {
          if (params.token !== null && params.token !== undefined) {
            this.isRequestingPassword = false;
            this.resetToken = params.token;
            this.validateToken(this.resetToken);
          } else {
            this.isRequestingPassword = true;
          }
        });

  }

  public onSubmitRequest() {
    if (!this.resetPasswordForm.valid) {
      return;
    }

    try {
      this.submitError = false;
      this.isLoading = true;

      this.authService
          .resetPassword({email: this.resetPasswordForm.value.email})
          .pipe(first())
          .subscribe(
            (res: any) => {
              if (!!res) {
                this.isLoading = false;

                this.snackBar.open(NOTIFICATIONS_MESSAGES.REQUEST_RESET_PASSWORD_SUCCESS, 'Dismiss', { duration: 5000 });
                this.router.navigate(['/login']);
              }
            },
            (err) => {
              this.isLoading = false;
              this.submitError = true;
              this.snackBar.open(NOTIFICATIONS_MESSAGES.REQUEST_RESET_PASSWORD_ERROR, 'Dismiss', { duration: 5000 });
          });
    } catch (err) {
      this.snackBar.open(NOTIFICATIONS_MESSAGES.ERROR, 'Dismiss', { duration: 5000 });
    }
  }

  public onSubmitNewPassword() {
    if (!this.newPasswordForm.valid) {
      return;
    }
    const obj = {
      token: this.resetToken,
      password: this.newPasswordForm.value.password
    };

    this.authService.newPassword(obj)
    .pipe(first())
    .subscribe(res => {
      if (res) {
        this.isRequestingPassword = false;
        this.hasValidToken = true;
      }
    });
  }

  private validateToken(token) {
    this.authService.validateResetPasswordToken({ token: token })
      .pipe(first())
      .subscribe((result) => {
        console.log(result);
        if (!result) {
          return;
        }

        this.isRequestingPassword = false;
        this.hasValidToken = true;
      }, (err => {
          this.hasValidToken = false;
          this.snackBar.open(NOTIFICATIONS_MESSAGES.VALIDATE_TOKEN_ERROR, 'Dismiss', { duration: 5000 });
          this.goToPage('login');
        })
      );
  }

  private goToPage(path) {
    this.router.navigate([`/${path}`]);
  }

  ngOnDestroy() {
  }
}

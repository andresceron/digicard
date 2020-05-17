import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { IUserResponse } from '@interfaces/user-response.interface';
import { ConfirmPasswordValidator } from '@validators/confirm-password.validator';

@Component({
  selector: 'sc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
  registerError: boolean;
  formHasError: boolean;
  formErrorEmail = 'Invalid email';
  showPassword = false;
  isLoading = false;

  public registerFormGroup: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, , Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]]
  }, {validator: ConfirmPasswordValidator.MatchPassword});

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.registerFormGroup.valid) {
      try {
        this.registerError = false;
        this.isLoading = true;

        const obj = {
          firstName: this.registerFormGroup.value.firstName,
          lastName: this.registerFormGroup.value.lastName,
          email: this.registerFormGroup.value.email,
          password: this.registerFormGroup.value.password
        };

        this.authService
            .register(obj)
            .pipe(first())
            .subscribe(
              (res: any) => {
                if (!!res && res._id) {
                  console.log(res);
                  this.isLoading = false;
                  // Sucessful register
                  this.snackBar.open(
                    `Thank you for registering: ${res.email}`,
                    'Dismiss',
                    { duration: 3000 }
                  );

                  setTimeout(() => {
                    this.router.navigate(['/login']);
                  }, 2000);
                }
              },
              (err) => {
                console.warn('register: ', err);
                this.isLoading = false;
                this.registerFormGroup.get('password').reset();
                this.registerFormGroup.get('password').setErrors(null);
                this.registerFormGroup.get('confirmPassword').reset();
                this.registerFormGroup.get('confirmPassword').setErrors(null);
                this.registerError = true;
                this.snackBar.open(NOTIFICATIONS_MESSAGES.REGISTER_ERROR, 'Dismiss', {
                  duration: 3000
                });
            });
      } catch (err) {
        console.log(err);
      }
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
  }
}

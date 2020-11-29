import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES } from '@constants/app-constants.constant';
import { ConfirmPasswordValidator } from '@validators/confirm-password.validator';

@Component({
  selector: 'sc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {
  registerError: boolean;
  formHasError: boolean;
  formErrorFirstName = 'Invalid first name';
  formErrorLastName = 'Invalid last name';
  formErrorEmail = 'Invalid email';
  formErrorMinPassword = 'Password must be at least 6 characters';
  formErrorMaxPassword = 'Password must be less than 15 characters';
  showPassword = false;
  isLoading = false;

  public registerFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      firstName: new FormControl( '', [ Validators.required ]),
      lastName: new FormControl('', [ Validators.required ]),
      email: new FormControl('', [ Validators.required, , Validators.email ]),
      password: new FormControl('', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 15 ) ])
    });
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

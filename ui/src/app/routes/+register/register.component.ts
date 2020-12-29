import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NOTIFICATIONS_MESSAGES, FORM_ERRORS } from '@constants/app-constants.constant';

@Component({
  selector: 'sc-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  public readonly FORM_ERRORS = FORM_ERRORS;
  public hasRegisterError: boolean;
  public showPassword = false;
  public registerFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.configForm();
  }

  public onSubmit(): void {
    if (!this.registerFormGroup.valid) {
      return;
    }

    try {
    this.hasRegisterError = false;

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
            if (res?._id) {
              this.showMessage(`Thank you for registering: ${res.email}`);
              this.goToLogin();
            } else {
              this.registerError();
            }
          },
          (err) => {
            this.registerError();
        });
    } catch (err) {
      this.registerError();
    }
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  private registerError() {
    this.registerFormGroup.get('password').reset();
    this.registerFormGroup.get('password').setErrors(null);
    this.hasRegisterError = true;
    this.showMessage(NOTIFICATIONS_MESSAGES.REGISTER_ERROR);
  }

  private showMessage(value: string): void {
    this.snackBar.open(value, 'Dismiss', {
      duration: 3000
    });
  }

  private configForm(): void {
    this.registerFormGroup = this.fb.group({
      firstName: new FormControl( '', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });
  }

}

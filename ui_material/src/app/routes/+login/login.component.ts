import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICustomResponse } from '@interfaces/custom-response.interface';
import { first } from 'rxjs/operators';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  formHasError: boolean;
  formErrorMessage = 'Invalid email';
  showPassword = false;

  public loginFormGroup: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    public apiService: ApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  onLogin(data) {
    // if (this.loginFormGroup.valid) {
      try {
        const obj = {
          email: this.loginFormGroup.value.email,
          password: this.loginFormGroup.value.password
        };

        console.log('obj IS => ', obj);
        this.apiService.post('auth/login', obj)
        .pipe(first())
        .subscribe((res: ICustomResponse) => {
          if (!!res) {
            console.log('res:: ', res);
            this.loginFormGroup.reset();

            // this.router.navigate(['/list']);
          }
        });

      } catch (err) {
        console.log(err);
      }
    // }
  }

  ngOnDestroy() {
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '@services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    console.log(data);
  }

  ngOnDestroy() {
  }
}

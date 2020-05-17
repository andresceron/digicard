import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {

  static MatchPassword(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    console.log(password);
    console.log(confirmPassword);

    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ ConfirmPassword: true });
    }

    return null;
  }
}

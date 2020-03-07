import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MIME_TYPES } from '@constants/app-constants.constant';

export function requiredFileType(): ValidatorFn {
  return function (control: AbstractControl): {[key: string]: boolean} {
    const file = control.value;
    const mimeTypesArr = MIME_TYPES;
    let mimeMatch;

    if (file) {
      mimeMatch = mimeTypesArr.find((type) => type.toLowerCase() === file.type.toLowerCase());
      return mimeMatch ? null : {requiredFileType: true};
    }
  };
}

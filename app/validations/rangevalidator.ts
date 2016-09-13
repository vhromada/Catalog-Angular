import {ValidatorFn, AbstractControl} from "@angular/forms";

export function rangeValidator(minValue: number, maxValue: number): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value = control.value;
    if (value || value === 0) {
      const valid = minValue <= value && value <= maxValue;
      return valid ? null : {'range': {value}};
    }

    return null;
  }
}

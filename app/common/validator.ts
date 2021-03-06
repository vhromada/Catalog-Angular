import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

export class Validator {

    static validate(form: FormGroup, formErrors: {}, validationMessages: {}, forced: boolean) {
        for (const field in formErrors) {
            formErrors[field] = '';
            const control = form.get(field);
            if (forced || (control && control.dirty && !control.valid)) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    static rangeValidator(minValue: number, maxValue: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const value = control.value;
            if (value || value === 0) {
                const valid = minValue <= value && value <= maxValue;
                return valid ? null : {'range': {value}};
            }

            return null;
        };
    }

    static yearsValidator(endYearControl: AbstractControl): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const startYear = control.value;
            const endYear = endYearControl.value;
            if (!startYear || !endYear) {
                return null;
            }
            if (startYear > endYear) {
                return {'years': {startYear}};
            }

            return null;
        };
    }

}

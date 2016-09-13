import {FormGroup} from "@angular/forms";

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
}
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const isRequired = (
  field: 'email' | 'nombre' | 'mensaje' | 'asuntoEmail',
  form: FormGroup
) => {
  const control = form.get(field);

  return control && control.touched && control.hasError('required');
};

export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');

  return control && control?.touched && control.hasError('email');
};
export const hasMinLength = (minLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length < minLength) {
      return {
        minLength: 'El mínimo de caracteres permitidos es de ' + minLength,
      };
    }
    return null;
  };
};

export const hasMaxLength = (maxLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length > maxLength) {
      return {
        maxLength: 'El maximo de caracteres permitidos es de ' + maxLength,
      };
    }
    return null;
  };
};

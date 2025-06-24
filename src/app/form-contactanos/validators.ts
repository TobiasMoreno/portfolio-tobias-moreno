import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const isRequired = (
  field: 'email' | 'nombre' | 'mensaje' | 'asuntoEmail' | 'telefono',
  form: FormGroup
) => {
  const control = form.get(field);
  return control && control.touched && control.hasError('required');
};

export const hasEmailError = (form: FormGroup) => {
  const control = form.get('email');
  return control && control.touched && control.hasError('email');
};

export const hasPhoneError = (form: FormGroup) => {
  const control = form.get('telefono');
  return control && control.touched && control.hasError('pattern');
};

export const hasMinLength = (minLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.trim().length < minLength) {
      return {
        minLength: `Mínimo ${minLength} caracteres requeridos`,
      };
    }
    return null;
  };
};

export const hasMaxLength = (maxLength: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value && control.value.length > maxLength) {
      return {
        maxLength: `Máximo ${maxLength} caracteres permitidos`,
      };
    }
    return null;
  };
};

// Validador para teléfonos argentinos
export const hasValidPhone = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const phone = control.value.replace(/\s/g, ''); // Remover espacios
    const phoneRegex = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/;
    
    if (!phoneRegex.test(phone)) {
      return {
        invalidPhone: 'Ingrese un número de teléfono válido (ej: 11 1234 5678)',
      };
    }
    return null;
  };
};

// Nuevo validador para nombres
export const hasValidName = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const name = control.value.trim();
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    
    if (!nameRegex.test(name)) {
      return {
        invalidName: 'El nombre debe contener solo letras y espacios (2-50 caracteres)',
      };
    }
    return null;
  };
};

// Nuevo validador para evitar spam
export const hasNoSpam = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    
    const spamWords = ['http://', 'https://', 'www.', '.com', '.org', '.net'];
    const value = control.value.toLowerCase();
    
    for (const spamWord of spamWords) {
      if (value.includes(spamWord)) {
        return {
          spamDetected: 'No se permiten enlaces en el mensaje',
        };
      }
    }
    return null;
  };
};

// Función helper para obtener mensaje de error específico
export const getFieldErrorMessage = (
  field: 'email' | 'nombre' | 'mensaje' | 'asuntoEmail' | 'telefono',
  form: FormGroup
): string | null => {
  const control = form.get(field);
  if (!control || !control.touched) return null;

  if (control.hasError('required')) {
    return 'Este campo es requerido';
  }

  if (field === 'email' && control.hasError('email')) {
    return 'Ingrese un email válido';
  }

  if (field === 'telefono' && control.hasError('pattern')) {
    return 'Solo se permiten números';
  }

  if (field === 'telefono' && control.hasError('invalidPhone')) {
    return control.errors?.['invalidPhone'];
  }

  if (control.hasError('minLength')) {
    return control.errors?.['minLength'];
  }

  if (control.hasError('maxLength')) {
    return control.errors?.['maxLength'];
  }

  if (field === 'nombre' && control.hasError('invalidName')) {
    return control.errors?.['invalidName'];
  }

  if (control.hasError('spamDetected')) {
    return control.errors?.['spamDetected'];
  }

  return null;
};

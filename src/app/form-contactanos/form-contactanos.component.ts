import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { toast } from 'ngx-sonner';
import { hasEmailError, isRequired } from './validators';

export interface SubmitForm{
  nombre: FormControl<string | null>
  email: FormControl<string | null>
  mensaje: FormControl<string | null>
}

@Component({
  selector: 'app-form-contactanos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-contactanos.component.html',
  styleUrl: './form-contactanos.component.css',
})
export class FormContactanosComponent {
  private _formBuilder = inject(FormBuilder);

  
  form = this._formBuilder.group<SubmitForm>({
    nombre: this._formBuilder.control('', [Validators.required]),
    mensaje: this._formBuilder.control('', [
      Validators.required,
    ]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
  });

  submit() {
    console.log(this.form.value);
    
  }
  isRequired(field: 'email' | 'nombre' | 'mensaje') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

}

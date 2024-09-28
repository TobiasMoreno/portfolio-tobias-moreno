import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import { hasEmailError, isRequired } from './validators';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/enviroment';

export interface SubmitForm {
  nombre: FormControl<string | null>;
  email: FormControl<string | null>;
  mensaje: FormControl<string | null>;
  asuntoEmail: FormControl<string | null>;
}

@Component({
  selector: 'app-form-contactanos',
  standalone: true,
  imports: [ReactiveFormsModule, NgxSonnerToaster],
  templateUrl: './form-contactanos.component.html',
  styleUrl: './form-contactanos.component.css',
})
export class FormContactanosComponent {
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group<SubmitForm>({
    nombre: this._formBuilder.control('', [Validators.required]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    mensaje: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    asuntoEmail: this._formBuilder.control('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  async submit() {
    if (!this.form.valid) {
      toast.error('Error al Enviar Formulario');
      return;
    }
    emailjs.init(environment.API_KEY_EMAILJS);
    await emailjs.send('service_vlnpsqq', 'template_ix8q55z', {
      asuntoEmail: this.form.value.asuntoEmail,
      nombre: this.form.value.nombre,
      email: this.form.value.email,
      mensaje: this.form.value.mensaje,
    });
    toast.success('Enviado');
    this.form.reset();
  }
  isRequired(field: 'email' | 'nombre' | 'mensaje') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }
}

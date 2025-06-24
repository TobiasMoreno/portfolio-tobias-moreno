import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxSonnerToaster, toast } from 'ngx-sonner';
import {
  hasEmailError,
  hasMaxLength,
  hasMinLength,
  isRequired,
  hasValidName,
  hasNoSpam,
  getFieldErrorMessage,
  hasValidPhone,
  hasPhoneError,
} from './validators';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/enviroment';

export interface SubmitForm {
  nombre: FormControl<string | null>;
  email: FormControl<string | null>;
  telefono: FormControl<string | null>;
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

  lastSentTime: number | null = null;
  coolDownPeriod = 60000; // 1 minuto
  isSubmitting = false;

  form = this._formBuilder.group<SubmitForm>({
    nombre: this._formBuilder.control('', [
      Validators.required,
      hasValidName(),
    ]),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    telefono: this._formBuilder.control('', [
      hasValidPhone(),
    ]),
    mensaje: this._formBuilder.control('', [
      Validators.required,
      hasMinLength(10),
      hasMaxLength(500),
      hasNoSpam(),
    ]),
    asuntoEmail: this._formBuilder.control('', [
      Validators.required,
      hasMinLength(5),
      hasMaxLength(50),
    ]),
  });

  async submit() {
    if (this.isSubmitting) return;

    const now = Date.now();

    if (this.lastSentTime && (now - this.lastSentTime < this.coolDownPeriod)) {
      const remainingTime = Math.ceil((this.coolDownPeriod - (now - this.lastSentTime)) / 1000);
      toast.error(`Debes esperar ${remainingTime} segundos antes de enviar otro mensaje`);
      return;
    }

    if (!this.form.valid) {
      this.markAllFieldsAsTouched();
      toast.error('Por favor, corrige los errores en el formulario');
      return;
    }

    this.isSubmitting = true;

    try {
      emailjs.init(environment.API_KEY_EMAILJS);
      
      // Información del usuario
      const userInfo = {
        nombre: this.form.value.nombre?.trim(),
        email: this.form.value.email?.trim(),
        telefono: this.form.value.telefono?.trim(),
        asuntoEmail: this.form.value.asuntoEmail?.trim(),
        mensaje: this.form.value.mensaje?.trim(),
      };

      // Información del sistema y contexto
      const systemInfo = {
        fecha: new Date().toLocaleString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'America/Argentina/Buenos_Aires'
        }),
        fechaISO: new Date().toISOString(),
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        idioma: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        urlOrigen: window.location.href,
        referrer: document.referrer || 'Directo',
      };

      // Información adicional del mensaje
      const messageInfo = {
        longitudMensaje: userInfo.mensaje?.length || 0,
        longitudAsunto: userInfo.asuntoEmail?.length || 0,
        tipoConsulta: this.detectarTipoConsulta(userInfo.asuntoEmail || '', userInfo.mensaje || ''),
        prioridad: this.calcularPrioridad(userInfo.asuntoEmail || '', userInfo.mensaje || ''),
        palabrasClave: this.extraerPalabrasClave(userInfo.asuntoEmail || '', userInfo.mensaje || ''),
      };

      // Combinar todas las variables
      const templateParams = {
        ...userInfo,
        ...systemInfo,
        ...messageInfo,
        // Variables para el template
        saludo: this.generarSaludo(),
        resumen: this.generarResumen(userInfo),
        instruccionesRespuesta: this.generarInstruccionesRespuesta(messageInfo.tipoConsulta),
        contactoAlternativo: this.generarContactoAlternativo(userInfo),
      };

      await emailjs.send(
        'service_vlnpsqq', 
        'template_ix8q55z', 
        templateParams
      );

      toast.success('¡Mensaje enviado exitosamente! Te responderé pronto.');
      this.lastSentTime = Date.now();
      this.form.reset();
      
    } catch (error) {
      console.error('Error al enviar email:', error);
      toast.error('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      this.isSubmitting = false;
    }
  }

  // Métodos auxiliares para procesar información
  private detectarTipoConsulta(asunto: string, mensaje: string): string {
    const texto = (asunto + ' ' + mensaje).toLowerCase();
    
    if (texto.includes('trabajo') || texto.includes('empleo') || texto.includes('cv') || texto.includes('curriculum')) {
      return 'Oportunidad Laboral';
    } else if (texto.includes('proyecto') || texto.includes('desarrollo') || texto.includes('aplicación')) {
      return 'Proyecto de Desarrollo';
    } else if (texto.includes('consulta') || texto.includes('ayuda') || texto.includes('duda')) {
      return 'Consulta Técnica';
    } else if (texto.includes('colaboración') || texto.includes('partnership')) {
      return 'Colaboración';
    } else if (texto.includes('presupuesto') || texto.includes('cotización') || texto.includes('precio')) {
      return 'Cotización';
    } else {
      return 'Consulta General';
    }
  }

  private calcularPrioridad(asunto: string, mensaje: string): string {
    const texto = (asunto + ' ' + mensaje).toLowerCase();
    
    if (texto.includes('urgente') || texto.includes('inmediato') || texto.includes('asap')) {
      return 'Alta';
    } else if (texto.includes('proyecto') || texto.includes('trabajo') || texto.includes('empleo')) {
      return 'Media';
    } else {
      return 'Normal';
    }
  }

  private extraerPalabrasClave(asunto: string, mensaje: string): string {
    const palabrasClave = ['angular', 'react', 'vue', 'javascript', 'typescript', 'node', 'python', 'java', 'c#', 'php', 'sql', 'mongodb', 'aws', 'azure', 'docker', 'kubernetes', 'git', 'agile', 'scrum'];
    const texto = (asunto + ' ' + mensaje).toLowerCase();
    const encontradas = palabrasClave.filter(palabra => texto.includes(palabra));
    return encontradas.length > 0 ? encontradas.join(', ') : 'No especificadas';
  }

  private generarSaludo(): string {
    const hora = new Date().getHours();
    if (hora < 12) return 'Buenos días';
    if (hora < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  private generarResumen(userInfo: any): string {
    return `Nuevo mensaje de ${userInfo.nombre} (${userInfo.email} | ${userInfo.telefono}) sobre "${userInfo.asuntoEmail}"`;
  }

  private generarInstruccionesRespuesta(tipoConsulta: string): string {
    const instrucciones = {
      'Oportunidad Laboral': 'Revisar CV y experiencia. Responder con detalles sobre la posición y próximos pasos.',
      'Proyecto de Desarrollo': 'Evaluar requerimientos técnicos. Solicitar más detalles si es necesario.',
      'Consulta Técnica': 'Proporcionar información técnica detallada o recursos útiles.',
      'Colaboración': 'Evaluar sinergias y oportunidades de trabajo conjunto.',
      'Cotización': 'Analizar alcance y proporcionar estimación de costos y tiempos.',
      'Consulta General': 'Responder de manera profesional y cordial.'
    };
    return instrucciones[tipoConsulta as keyof typeof instrucciones] || 'Responder de manera profesional.';
  }

  private generarContactoAlternativo(userInfo: any): string {
    return `Teléfono: ${userInfo.telefono}`;
  }

  private markAllFieldsAsTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  isRequired(field: 'email' | 'nombre' | 'mensaje' | 'asuntoEmail' | 'telefono') {
    return isRequired(field, this.form);
  }

  hasEmailError() {
    return hasEmailError(this.form);
  }

  hasPhoneError() {
    return hasPhoneError(this.form);
  }

  getErrorMessage(field: 'email' | 'nombre' | 'mensaje' | 'asuntoEmail' | 'telefono') {
    return getFieldErrorMessage(field, this.form);
  }

  isFieldInvalid(field: 'email' | 'nombre' | 'mensaje' | 'asuntoEmail' | 'telefono') {
    const control = this.form.get(field);
    return control && control.touched && control.invalid;
  }

  isFieldValid(field: 'email' | 'nombre' | 'mensaje' | 'asuntoEmail' | 'telefono') {
    const control = this.form.get(field);
    return control && control.touched && control.valid;
  }
}

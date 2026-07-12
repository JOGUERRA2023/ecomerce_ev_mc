import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '@shared/services/alert.service';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-register-form',
  imports: [FormField, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  authService = inject(AuthService);
  alertService = inject(AlertService);
  router = inject(Router);
  isLoading = signal(false);

  registerModel = signal({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (fieldPath) => {
    required(fieldPath.name, { message: 'El nombre es requerido' });
    required(fieldPath.email, { message: 'El correo electrónico es requerido' });
    email(fieldPath.email, { message: 'Ingrese un correo electrónico válido' });
    required(fieldPath.password, { message: 'La contraseña es requerida' });
    minLength(fieldPath.password, 4, {
      message: 'La contraseña debe tener al menos 4 caracteres',
    });
    required(fieldPath.confirmPassword, { message: 'Debe confirmar la contraseña' });
    validate(fieldPath.confirmPassword, (ctx) =>
      ctx.value() === ctx.valueOf(fieldPath.password)
        ? undefined
        : { kind: 'confirmPassword', message: 'Las contraseñas no coinciden' },
    );
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.registerForm().invalid()) {
      this.registerForm().markAsTouched();
      return;
    }

    this.isLoading.set(true);
    try {
      const { name, email, password } = this.registerModel();
      await lastValueFrom(this.authService.register({ name, email, password }));
    } catch (error) {
      console.log(error);
      this.alertService.error('Ocurrió un error inesperado');
    } finally {
      this.isLoading.set(false);
    }
  }
}

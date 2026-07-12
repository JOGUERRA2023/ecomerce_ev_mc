import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '@shared/services/alert.service';
import { Router, RouterLink } from '@angular/router';
import { email, form, FormField, minLength, required } from '@angular/forms/signals';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login-form',
  imports: [FormField, RouterLink],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  authService = inject(AuthService);
  alertService = inject(AlertService);
  router = inject(Router);
  isLoading = signal(false);

  loginModel = signal({
    email: '',
    password: '',
  });

  loginForm = form(this.loginModel, (fieldPath) => {
    required(fieldPath.email, { message: 'El correo electrónico es requerido' });
    email(fieldPath.email, { message: 'Ingrese un correo electrónico válido' });
    required(fieldPath.password, { message: 'La contraseña es requerida' });
    minLength(fieldPath.password, 4, {
      message: 'La contraseña debe tener al menos 4 caracteres',
    });
  });

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().invalid()) {
      this.loginForm().markAsTouched();
      return;
    }

    this.isLoading.set(true);
    try {
      const { email, password } = this.loginModel();
      await lastValueFrom(this.authService.login({ email, password }));
    } catch (error) {
      console.log(error);
      this.alertService.error('Ocurrió un error inesperado');
    } finally {
      this.isLoading.set(false);
    }
  }
}

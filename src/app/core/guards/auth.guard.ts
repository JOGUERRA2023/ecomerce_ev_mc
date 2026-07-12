import { inject } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const alertService = inject(AlertService);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  alertService.error('Debe iniciar sesión para acceder a esta página');
  return false;
};

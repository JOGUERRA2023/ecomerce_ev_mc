import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { catchError, throwError } from 'rxjs';

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const token = authService.accessToken();
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        authService.logoutExpired();
      }
      return throwError(() => error);
    }),
  );
}

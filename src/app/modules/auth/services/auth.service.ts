import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, switchMap, tap } from 'rxjs';
import { LoginResponseDTO } from '../interfaces/LoginResponseDTO';
import { RegisterResponseDTO } from '../interfaces/RegisterResponseDTO';
import { UserAuth } from '../interfaces/UserAuth';
import { Router } from '@angular/router';
import { AlertService } from '@shared/services/alert.service';
import { isPlatformBrowser } from '@angular/common';
import { AUTH_KEYS, AUTH_MESSAGES } from '@shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  httpClient = inject(HttpClient);
  currentUser = signal<UserAuth | null>(null);
  accessToken = signal<string | null>(this.getTokenFromSessionStorage());
  isAuthenticated = computed(() => this.accessToken() !== null);
  router = inject(Router);
  alertService = inject(AlertService);
  private authTimer?: any;

  constructor() {
    if (this.isBrowser) {
      this.autoLogoutIfExpired();
    }
  }

  login({ email, password }: { email: string; password: string }) {
    return this.httpClient
      .post<LoginResponseDTO>(`${environment.baseUrl}/api/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.handleAuthSuccess(response);
        }),
        catchError((error) => {
          this.handleAuthError();
          throw error;
        }),
      );
  }

  register({ name, email, password }: { name: string; email: string; password: string }) {
    return this.httpClient
      .post<RegisterResponseDTO>(`${environment.baseUrl}/api/auth/register`, {
        name,
        email,
        password,
      })
      .pipe(
        switchMap(() => this.login({ email, password })),
        catchError((error) => {
          this.handleAuthError();
          throw error;
        }),
      );
  }

  logout() {
    this.cleanAuthSession();
    this.alertService.success(AUTH_MESSAGES.sessionClosed);
  }

  logoutExpired() {
    this.cleanAuthSession();
    this.alertService.warning(AUTH_MESSAGES.sessionExpired);
  }

  private cleanAuthSession() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    this.clearSessionStorage();
    if (this.authTimer) {
      clearTimeout(this.authTimer);
      this.authTimer = undefined;
    }
    this.router.navigate(['/login']);
  }

  handleAuthSuccess(response: LoginResponseDTO) {
    if (response.access_token) {
      this.currentUser.set({
        userId: response.userId!,
        email: response.email!,
      });
      this.accessToken.set(response.access_token);
      if (this.isBrowser) {
        sessionStorage.setItem(AUTH_KEYS.accessToken, response.access_token);
        this.autoLogoutIfExpired();
      }
      this.router.navigate(['/']);
      this.alertService.success(AUTH_MESSAGES.loginSuccess);
    }
  }

  handleAuthError() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    this.clearSessionStorage();
  }

  getTokenFromSessionStorage() {
    if (this.isBrowser) {
      const token = sessionStorage.getItem(AUTH_KEYS.accessToken);
      return token ? token : null;
    }
    return null;
  }

  clearSessionStorage() {
    if (this.isBrowser) sessionStorage.removeItem(AUTH_KEYS.accessToken);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const base64Url = parts[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  private autoLogoutIfExpired() {
    const token = this.accessToken();
    if (!token) return;

    const decoded = this.getDecodedAccessToken(token);
    if (!decoded || !decoded.exp) return;

    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTime - currentTime;

    if (this.authTimer) {
      clearTimeout(this.authTimer);
    }

    if (timeUntilExpiration <= 0) {
      this.logoutExpired();
    } else {
      this.authTimer = setTimeout(() => {
        this.logoutExpired();
      }, timeUntilExpiration);
    }
  }
}

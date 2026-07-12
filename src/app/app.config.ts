import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { CartReducer } from './store/cart/reducers';
import { provideEffects } from '@ngrx/effects';
import { CarEffects } from './store/cart/effects';
import { CheckoutReducer } from './store/checkout/reducer';
import { CheckoutEffects } from './store/checkout/effects';
import {
  provideClientHydration,
  withEventReplay,
  withIncrementalHydration,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      Cart: CartReducer,
      Checkout: CheckoutReducer,
    }),
    provideEffects([CarEffects, CheckoutEffects]),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideHttpClient(withFetch(), withInterceptors([AuthInterceptor])),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

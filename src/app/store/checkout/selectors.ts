import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CheckoutState } from './reducer';

export const CheckoutFeatureSelector = createFeatureSelector<CheckoutState>('Checkout');

export const selectCheckoutStatus = createSelector(
  CheckoutFeatureSelector,
  (state) => state.status,
);

export const selectCheckoutOrder = createSelector(CheckoutFeatureSelector, (state) => state.order);

export const selectCheckoutError = createSelector(
  CheckoutFeatureSelector,
  (state) => state.error,
);

export const selectIsSubmittingOrder = createSelector(
  CheckoutFeatureSelector,
  (state) => state.status === 'submitting',
);

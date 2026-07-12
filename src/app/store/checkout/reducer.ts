import { createReducer, on } from '@ngrx/store';
import { CheckoutActions } from './actions';
import { Order } from 'app/modules/checkout/interfaces/order';

export type CheckoutStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface CheckoutState {
  status: CheckoutStatus;
  order: Order | null;
  error: string | null;
}

const INITIAL_STATE: CheckoutState = {
  status: 'idle',
  order: null,
  error: null,
};

export const CheckoutReducer = createReducer(
  INITIAL_STATE,
  on(CheckoutActions.submitOrder, (state) => ({
    ...state,
    status: 'submitting' as const,
    error: null,
  })),
  on(CheckoutActions.orderSuccess, (state, { order }) => ({
    ...state,
    status: 'success' as const,
    order,
    error: null,
  })),
  on(CheckoutActions.orderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(CheckoutActions.resetCheckout, () => INITIAL_STATE),
);

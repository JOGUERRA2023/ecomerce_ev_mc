import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order, OrderInput } from 'app/modules/checkout/interfaces/order';

export const CheckoutActions = createActionGroup({
  source: 'Checkout',
  events: {
    'Submit Order': props<{ order: OrderInput }>(),
    'Order Success': props<{ order: Order }>(),
    'Order Failure': props<{ error: string }>(),
    'Reset Checkout': emptyProps,
  },
});

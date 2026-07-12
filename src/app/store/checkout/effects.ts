import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { CheckoutActions } from './actions';
import { CartActions } from '../cart/actions';
import { Order } from 'app/modules/checkout/interfaces/order';

const SIMULATED_NETWORK_DELAY_MS = 1200;

export class CheckoutEffects {
  actions = inject(Actions);

  submitOrder = createEffect(() => {
    return this.actions.pipe(
      ofType(CheckoutActions.submitOrder),
      switchMap(({ order }) => {
        const simulatedOrder: Order = {
          ...order,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };

        return of(simulatedOrder).pipe(
          delay(SIMULATED_NETWORK_DELAY_MS),
          map((generatedOrder) => CheckoutActions.orderSuccess({ order: generatedOrder })),
          catchError(() =>
            of(CheckoutActions.orderFailure({ error: 'No se pudo procesar la orden' })),
          ),
        );
      }),
    );
  });

  clearCartOnOrderSuccess = createEffect(() => {
    return this.actions.pipe(
      ofType(CheckoutActions.orderSuccess),
      map(() => CartActions.clearProducts()),
    );
  });
}

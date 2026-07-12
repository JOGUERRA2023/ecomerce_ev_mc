import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CartActions, CartStorageActions } from './actions';
import { withLatestFrom, tap } from 'rxjs';
import { selectProductsInCart } from './selectors';

const CART_KEY = 'my_cart';

export class CarEffects {
  store = inject(Store);
  action = inject(Actions);

  cartEffects = createEffect(
    () => {
      return this.action.pipe(
        ofType(
          CartActions.addProduct,
          CartActions.restProduct,
          CartActions.removeProduct,
          CartActions.clearProducts,
        ),
        withLatestFrom(this.store.select(selectProductsInCart)),
        tap(([_, cart]) => {
          localStorage.setItem(CART_KEY, JSON.stringify(cart));
        }),
      );
    },
    {
      dispatch: false,
    },
  );

  loadCartProducts = createEffect(
    () => {
      return this.action.pipe(
        ofType(CartStorageActions.loadProducts),
        tap((_) => {
          const productsInCart = localStorage.getItem(CART_KEY);
          if (productsInCart) {
            this.store.dispatch(
              CartStorageActions.loadProductsFromLocalStorage({
                products: JSON.parse(productsInCart),
              }),
            );
          }
        }),
      );
    },
    {
      dispatch: false,
    },
  );
}

import { createReducer, on } from '@ngrx/store';
import { CartActions, CartStorageActions } from './actions';
import { Product } from 'app/modules/product/interfaces/product';

const INITIAL_STATE: Product[] = [];

export const CartReducer = createReducer(
  INITIAL_STATE,
  on(CartActions.addProduct, (state, { product, quantity }) => {
    const amount = quantity ?? 1;
    const findedProduct = state.find((item) => item.id === product.id);
    if (findedProduct) {
      return state.map((item) =>
        item.id === product.id ? { ...item, quantity: (item?.quantity ?? 0) + amount } : item,
      );
    }
    return [...state, { ...product, quantity: amount }];
  }),
  on(CartActions.restProduct, (state, { id }) => {
    const findedProduct = state.find((item) => item.id === id);
    if (findedProduct && (findedProduct.quantity ?? 0) > 1) {
      return state.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity ?? 0) - 1 } : item,
      );
    }
    return state.filter((item) => item.id !== id);
  }),
  on(CartActions.removeProduct, (state, { id }) => {
    return state.filter((item) => item.id !== id);
  }),
  on(CartActions.clearProducts, () => {
    return [];
  }),
  on(CartStorageActions.loadProducts, (state) => {
    return [...state];
  }),
  on(CartStorageActions.loadProductsFromLocalStorage, (state, { products }) => {
    return [...products];
  }),
);

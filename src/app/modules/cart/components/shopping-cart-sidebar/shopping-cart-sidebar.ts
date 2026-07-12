import { Component, inject } from '@angular/core';
import { CartSidebarService } from '../../services/cart-sidebar.service';
import { Product } from 'app/modules/product/interfaces/product';
import { Store } from '@ngrx/store';
import { selectProductsInCart, selectTotalPrice } from 'app/store/cart/selectors';
import { CartActions } from 'app/store/cart/actions';
import { AlertService } from 'app/shared/services/alert.service';
import { CART_MESSAGES } from 'app/shared/constants';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-sidebar',
  imports: [RouterLink],
  templateUrl: './shopping-cart-sidebar.html',
  styleUrl: './shopping-cart-sidebar.css',
})
export class ShoppingCartSidebar {
  cartsidebarService = inject(CartSidebarService);
  store = inject(Store);
  alertService = inject(AlertService);

  productsInCart = this.store.selectSignal(selectProductsInCart);
  totalProducts = this.store.selectSignal(selectTotalPrice);

  addQuantity(product: Product) {
    this.store.dispatch(CartActions.addProduct({ product }));
    this.alertService.success(CART_MESSAGES.productAdded(product.name));
  }

  restQuantity(productId: string) {
    const product = this.productsInCart().find((p) => p.id === productId);
    this.store.dispatch(CartActions.restProduct({ id: productId }));
    if (product) {
      this.alertService.warning(CART_MESSAGES.productReduced(product.name));
    }
  }

  removeProduct(productId: string) {
    const product = this.productsInCart().find((p) => p.id === productId);
    this.store.dispatch(CartActions.removeProduct({ id: productId }));
    if (product) {
      this.alertService.info(CART_MESSAGES.productRemoved(product.name));
    }
  }

  clearCart() {
    this.store.dispatch(CartActions.clearProducts());
    this.alertService.info(CART_MESSAGES.cartCleared);
  }
}

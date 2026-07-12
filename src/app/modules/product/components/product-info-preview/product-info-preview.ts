import { Component, computed, inject, input, signal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { Store } from '@ngrx/store';
import { CartActions } from 'app/store/cart/actions';
import { AlertService } from 'app/shared/services/alert.service';
import { CART_MESSAGES } from 'app/shared/constants';

@Component({
  selector: 'app-product-info-preview',
  imports: [],
  templateUrl: './product-info-preview.html',
  styleUrl: './product-info-preview.css',
})
export class ProductInfoPreview {
  product = input<Product>();
  quantity = signal<number>(1);

  store = inject(Store);
  alertService = inject(AlertService);

  ratingArray = computed(() => {
    return Array.from({ length: this.product()?.rating ?? 0 });
  });

  increment(): void {
    this.quantity.update((q) => q + 1);
  }

  decrement(): void {
    this.quantity.update((q) => (q > 1 ? q - 1 : 1));
  }

  addToCart(): void {
    const product = this.product();
    if (!product) return;

    this.store.dispatch(CartActions.addProduct({ product, quantity: this.quantity() }));
    this.alertService.success(CART_MESSAGES.productAdded(product.name));
  }
}

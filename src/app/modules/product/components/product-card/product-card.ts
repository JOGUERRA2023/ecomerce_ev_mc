import { Component, computed, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../interfaces/product';
import { CartActions } from 'app/store/cart/actions';
import { AlertService } from 'app/shared/services/alert.service';
import { CART_MESSAGES } from 'app/shared/constants';
import { Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { WishlistService } from '@modules/wishlist/services/wishlist.service';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input<Product>({
    name: '',
    id: '0',
    price: 0,
    rating: 0,
    stock: 0,
    category: '',
    image: '',
  });
  ratingArray = computed(() => Array.from({ length: Math.round(this.product().rating ?? 0) ?? 0 }));
  store = inject(Store);
  alertService = inject(AlertService);
  wishlistService = inject(WishlistService);
  authService = inject(AuthService);
  router = inject(Router);

  isInWishlist = computed(() =>
    this.wishlistService.wishlist().some((p) => p.id === this.product().id),
  );

  addToCart() {
    this.store.dispatch(CartActions.addProduct({ product: this.product() }));
    this.alertService.success(CART_MESSAGES.productAdded(this.product().name));
  }

  addToWishList() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      this.alertService.error('Debe iniciar sesión para agregar a favoritos');
      return;
    }

    const productId = this.product().id;
    if (this.isInWishlist()) {
      this.wishlistService
        .removeFromWishlist({ productId, userId: '' })
        .subscribe({
          next: () => {
            this.alertService.success('Producto eliminado de favoritos');
          },
          error: () => {
            this.alertService.error('No se pudo eliminar de favoritos');
          },
        });
    } else {
      this.wishlistService.addToWishlist(productId).subscribe({
        next: () => {
          this.alertService.success('Producto agregado a favoritos');
        },
        error: () => {
          this.alertService.error('No se pudo agregar a favoritos');
        },
      });
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Wishlist as WishlistModel } from '../interfaces/Wishlist';
import { Product } from '../../product/interfaces/product';
import { environment } from '@environments/environment';
import { AuthService } from '@modules/auth/services/auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  httpClient = inject(HttpClient);
  authService = inject(AuthService);

  wishlist = signal<Product[]>([]);

  constructor() {
    effect(() => {
      if (this.authService.isAuthenticated()) {
        this.loadWishlist();
      } else {
        this.wishlist.set([]);
      }
    });
  }

  getWishlist() {
    return this.httpClient.get<Product[]>(`${environment.baseUrl}/api/wishlist`);
  }

  loadWishlist() {
    this.getWishlist().subscribe({
      next: (products) => this.wishlist.set(products),
      error: () => this.wishlist.set([]),
    });
  }

  addToWishlist(productId: string) {
    return this.httpClient
      .post<WishlistModel>(`${environment.baseUrl}/api/wishlist`, {
        productId,
      })
      .pipe(
        tap(() => {
          this.loadWishlist();
        }),
      );
  }

  removeFromWishlist(wishlist: WishlistModel) {
    return this.httpClient
      .delete<WishlistModel>(
        `${environment.baseUrl}/api/wishlist/${wishlist.productId}`,
      )
      .pipe(
        tap(() => {
          this.loadWishlist();
        }),
      );
  }
}

import { Component, inject } from '@angular/core';
import { ProductCard } from '@modules/product/components/product-card/product-card';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  imports: [ProductCard],
  templateUrl: './wishlist.html',
  styles: ``,
})
export class Wishlist {
  wishlistService = inject(WishlistService);
}

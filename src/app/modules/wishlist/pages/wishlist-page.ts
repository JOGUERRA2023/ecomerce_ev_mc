import { Component } from '@angular/core';
import { Wishlist } from '../components/wishlist/wishlist';

@Component({
  selector: 'app-wishlist-page',
  imports: [Wishlist],
  template: ` <app-wishlist></app-wishlist> `,
})
export class WishlistPage {}

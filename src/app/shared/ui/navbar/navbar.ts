import { Component, computed, inject } from '@angular/core';
import { CartSidebarService } from 'app/modules/cart/services/cart-sidebar.service';
import { CategoryFeatureService } from 'app/modules/category/services/category-feature.service';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { Store } from '@ngrx/store';
import { selectCountOfProducts } from 'app/store/cart/selectors';
import { InputSearchProduct } from 'app/modules/product/components/input-search-product/input-search-product';
import { RouterLink } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [InputSearchProduct, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  categoryFeatureService = inject(CategoryFeatureService);
  sidebarService = inject(SidebarService);
  cartSidebarService = inject(CartSidebarService);
  store = inject(Store);

  cartCount = this.store.selectSignal(selectCountOfProducts);
  authService = inject(AuthService);
  isAuthenticated = computed(() => this.authService.isAuthenticated());

  products = computed(() => {
    return [
      {
        id: '0',
        name: 'Apple Juice',
        price: 2.19,
        stock: 10,
        category: 'Fruit',
        image: 'product-1.png',
      },
    ];
  });

  open() {
    this.sidebarService.open();
  }

  openCart() {
    this.cartSidebarService.open();
  }

  logout() {
    this.authService.logout();
  }
}

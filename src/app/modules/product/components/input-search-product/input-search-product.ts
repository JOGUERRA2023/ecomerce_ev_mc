import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { CategoryFeatureService } from 'app/modules/category/services/category-feature.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { debounceTime, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-search-product',
  imports: [FormsModule],
  templateUrl: './input-search-product.html',
  styleUrl: './input-search-product.css',
})
export class InputSearchProduct {
  categoryFeatureService = inject(CategoryFeatureService);
  categories = computed(() => this.categoryFeatureService.categories());
  productService = inject(ProductService);
  router = inject(Router);

  searchTerm = signal('');
  productResponse = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(1000),
      switchMap((term) => {
        if (!this.searchTerm()) return of({ data: [], meta: {} });
        return this.productService.getProducts({ searchTerm: term });
      }),
    ),
  );

  products = computed(() => this.productResponse()?.data || []);

  searchProduct() {
    const url = `/products`;
    this.router.navigate([url], { queryParams: { search: this.searchTerm() } });
  }
}

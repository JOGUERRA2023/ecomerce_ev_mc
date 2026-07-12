import { Component, computed, inject, signal } from '@angular/core';
import { ProductFilters, ProductFiltersChange, PriceFilter } from '../../components/product-filters/product-filters';
import { ProductList } from '../../components/product-list/product-list';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-list-page',
  imports: [ProductFilters, ProductList],
  template: `
    <section class="section-shop py-[100px] max-[1200px]:py-[50px] min-h-screen">
      <div
        class="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]"
      >
        <div class="w-full flex mb-[-30px]">
          <div class="w-1/3">
            <app-product-filters (filtersApplied)="onFiltersApplied($event)"></app-product-filters>
          </div>
          <div class="w-2/3">
            <app-product-list
              [products]="filteredProducts()"
              [isLoading]="productResource.isLoading()"
              [hasError]="!!productResource.error()"
            ></app-product-list>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: ``,
})
export class ProductListPage {
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  search = toSignal(this.activeRoute.queryParamMap.pipe(map((params) => params.get('search'))));
  categoryId = toSignal(
    this.activeRoute.queryParamMap.pipe(
      map((params) => {
        const value = params.get('categoryId');
        return value ? Number(value) : null;
      }),
    ),
  );

  priceFilter = signal<PriceFilter | null>(null);

  productService = inject(ProductService);

  productResource = rxResource({
    params: () => ({
      searchTerm: this.search(),
      categoryId: this.categoryId(),
    }),
    stream: ({ params: { searchTerm, categoryId } }) =>
      this.productService.getProducts({
        searchTerm: searchTerm ?? '',
        categoryId: categoryId ?? undefined,
      }),
  });

  products = computed(() => this.productResource.value()?.data ?? []);

  filteredProducts = computed(() => {
    const price = this.priceFilter();
    if (!price) return this.products();

    return this.products().filter((p) => (p.price ?? 0) >= price.min && (p.price ?? 0) <= price.max);
  });

  onFiltersApplied(change: ProductFiltersChange): void {
    this.priceFilter.set(change.price);

    this.router.navigate([], {
      relativeTo: this.activeRoute,
      queryParams: { categoryId: change.categoryId ?? null },
      queryParamsHandling: 'merge',
    });
  }
}

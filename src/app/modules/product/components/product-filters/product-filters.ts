import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryFeatureService } from '@modules/category/services/category-feature.service';

export interface PriceFilter {
  min: number;
  max: number;
}

export interface ProductFiltersChange {
  categoryId: number | null;
  price: PriceFilter | null;
}

@Component({
  selector: 'app-product-filters',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.html',
  styleUrl: './product-filters.css',
})
export class ProductFilters {
  categoryFeatureService = inject(CategoryFeatureService);
  categories = this.categoryFeatureService.categories;

  selectedCategoryId = signal<number | null>(null);
  selectedPrice = signal<PriceFilter | null>(null);

  filtersApplied = output<ProductFiltersChange>();

  toggleCategory(categoryId: number): void {
    this.selectedCategoryId.set(this.selectedCategoryId() === categoryId ? null : categoryId);
  }

  selectPrice(min: number, max: number): void {
    const current = this.selectedPrice();
    const isSame = current?.min === min && current?.max === max;
    this.selectedPrice.set(isSame ? null : { min, max });
  }

  applyFilters(): void {
    this.filtersApplied.emit({
      categoryId: this.selectedCategoryId(),
      price: this.selectedPrice(),
    });
  }
}

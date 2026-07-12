import { Injectable, inject } from '@angular/core';
import { ProductService } from './product.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductFeaturedService {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getFeatured());
}

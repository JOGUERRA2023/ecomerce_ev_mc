import { Component, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-popular-products',
  imports: [ProductCard],
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.css',
})
export class PopularProducts {
  private productService = inject(ProductService);
  products = toSignal(this.productService.getFeatured());
}

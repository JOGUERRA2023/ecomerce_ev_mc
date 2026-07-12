import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { Product } from '../interfaces/product';
import { ProductPage } from '../interfaces/productPage';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrl;
  http = inject(HttpClient);
  endpoint = `${this.baseUrl}/api/products`;

  getProducts({ searchTerm, categoryId }: { searchTerm?: string; categoryId?: number | null }) {
    let params = new HttpParams();

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    if (categoryId != null) {
      params = params.set('categoryId', categoryId);
    }

    return this.http.get<ProductPage>(this.endpoint, { params });
  }

  getFeatured() {
    return this.http.get<Product[]>(`${this.endpoint}/featured`);
  }

  getProductById(id: string) {
    return this.http.get<Product>(`${this.endpoint}/detail/${id}`);
  }
}

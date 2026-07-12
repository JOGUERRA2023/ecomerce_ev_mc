import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = environment.baseUrl;
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Category[]>(`${this.baseUrl}/api/categories`);
  }
}

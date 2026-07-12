import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/Category';
import { CategoryService } from './category.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CategoryFeatureService {
  private categoryService = inject(CategoryService);
  categories = toSignal<Category[]>(this.categoryService.getAll());
}

import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryFeatureService } from 'app/modules/category/services/category-feature.service';
import { SidebarService } from 'app/shared/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  categoryFeatureService = inject(CategoryFeatureService);
  sidebarService = inject(SidebarService);
  router = inject(Router);
  isOpen = computed(() => this.sidebarService.isOpen());

  onClose(): void {
    this.sidebarService.close();
  }

  onOverlayClick(): void {
    this.onClose();
  }

  onCategoryClick(categoryId: number): void {
    this.router.navigate(['/products'], { queryParams: { categoryId } });
    this.onClose();
  }
}

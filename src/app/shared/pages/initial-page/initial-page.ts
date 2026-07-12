import { Component, inject } from '@angular/core';
import { PopularProducts } from 'app/modules/product/components/popular-products/popular-products';
import { SeoService } from 'app/shared/services/seo.service';
import { Hero } from 'app/shared/ui/hero/hero';
import { CouponsSection } from 'app/shared/ui/coupons-section/coupons-section';

@Component({
  selector: 'app-initial-page',
  imports: [PopularProducts, Hero, CouponsSection],
  templateUrl: './initial-page.html',
  styles: ``,
})
export class InitialPage {
  seoService = inject(SeoService);

  constructor() {
    this.seoService.updateTags({
      title: 'Inicio',
      description:
        '¡Encuentra los mejores productos frescos y de calidad en nuestra tienda! Explora nuestra amplia variedad de frutas, verduras, carnes y mucho más. ¡Entrega rápida y precios increíbles!',
    });
  }
}

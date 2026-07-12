import { Component, computed, effect, inject } from '@angular/core';
import { ProductImagePreview } from '../../components/product-image-preview/product-image-preview';
import { ProductInfoPreview } from '../../components/product-info-preview/product-info-preview';
import { ProductCard } from '../../components/product-card/product-card';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductImage } from '../../interfaces/productImage';
import { map, of } from 'rxjs';
import { SeoService } from 'app/shared/services/seo.service';

@Component({
  selector: 'app-product-detail-page',
  imports: [ProductImagePreview, ProductInfoPreview, ProductCard],
  templateUrl: './product-detail-page.html',
  styleUrl: './product-detail-page.css',
})
export class ProductDetailPage {
  productService = inject(ProductService);
  activatedRoute = inject(ActivatedRoute);
  seoService = inject(SeoService);

  idProduct = toSignal(this.activatedRoute.params.pipe(map((params) => params['id'])), {
    initialValue: '',
  });

  productResource = rxResource({
    params: () => ({
      idProduct: this.idProduct(),
    }),
    stream: ({ params: { idProduct } }) => this.productService.getProductById(idProduct),
  });

  relatedProductsResource = rxResource({
    params: () => ({
      categoryId: this.productResource.value()?.categoryId,
    }),
    stream: ({ params: { categoryId } }) => {
      if (categoryId !== undefined) {
        return this.productService.getProducts({ searchTerm: '', categoryId });
      }
      return of(null);
    },
  });

  relatedProducts = computed(() => {
    const currentProductId = this.productResource.value()?.id;
    const allProducts = this.relatedProductsResource.value();
    if (!allProducts) return [];

    const list = Array.isArray(allProducts) ? allProducts : (allProducts.data ?? []);
    return list
      .filter((p) => p.id !== currentProductId)
      .slice(0, 4);
  });

  productImages = computed(() => {
    const productImage: ProductImage = {
      productId: this.productResource.value()?.id ?? '',
      image: this.productResource.value()?.image ?? '',
      featured: true,
    };

    const firstExtraProductImage: ProductImage = {
      productId: this.productResource.value()?.id ?? '',
      image: '/img/product/3.jpg',
      featured: false,
    };

    const secondExtraProductImage: ProductImage = {
      productId: this.productResource.value()?.id ?? '',
      image: '/img/product/4.jpg',
      featured: false,
    };

    const productImages: ProductImage[] = [
      productImage,
      firstExtraProductImage,
      secondExtraProductImage,
    ];
    return productImages;
  });

  constructor() {
    effect(() => {
      const product = this.productResource.value();
      if (product) {
        this.seoService.updateTags({
          title: product.name ?? '',
          description: product.description ?? '',
          image: product.image ?? '',
          type: 'product',
        });
      }
    });
  }
}

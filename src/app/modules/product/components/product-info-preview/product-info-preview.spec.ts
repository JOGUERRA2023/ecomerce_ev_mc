import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductInfoPreview } from './product-info-preview';
import { Product } from '../../interfaces/product';

const mockProduct: Product = {
  id: '2',
  name: 'Test Product',
  price: 100,
  category: 'Test Category',
  rating: 4,
  image: 'test.jpg',
};

describe('ProductInfoPreview', () => {
  let fixture: ComponentFixture<ProductInfoPreview>;
  let component: ProductInfoPreview;
  let compiledElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProductInfoPreview],
    });
    fixture = TestBed.createComponent(ProductInfoPreview);
    component = fixture.componentInstance;
    compiledElement = fixture.nativeElement;

    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar la información del producto', () => {
    const productNameElement = compiledElement.querySelector('#product-name');
    expect(productNameElement?.textContent?.trim()).toBe(mockProduct.name);
  });

  it('debería retornar la cantidad de rating en el computed ratingArray', () => {
    expect(component.ratingArray()).toHaveLength(mockProduct.rating ?? 0);
  });

  it('debería renderizar 5 estrellas si el rating es 5', () => {
    fixture.componentRef.setInput('product', { ...mockProduct, rating: 5 });
    fixture.detectChanges();

    const ratingStarElements = compiledElement.querySelectorAll('.rating-star');
    expect(ratingStarElements).toHaveLength(5);
  });
});

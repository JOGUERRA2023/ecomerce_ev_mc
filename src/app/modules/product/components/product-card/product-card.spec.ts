import { ComponentFixture } from '@angular/core/testing';
import { ProductCard } from './product-card';
import { TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { ComponentRef } from '@angular/core';
import { Product } from '../../interfaces/product';

const MOCK_PRODUCT: Product = {
  id: '1',
  name: 'Test Product',
  price: 100,
  rating: 4,
  stock: 20,
  category: 'Test',
  image: 'test.jpg',
};

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;
  let compiled: ComponentRef<ProductCard>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideStore(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    compiled = fixture.componentRef;
    nativeElement = fixture.nativeElement;
  });

  it('Crear componente ProductCard', () => {
    expect(component).toBeTruthy();
  });

  it('Debería mostrar el titulo del producto', () => {
    compiled.setInput('product', MOCK_PRODUCT);
    fixture.detectChanges();
    expect(nativeElement?.querySelector('a.title')?.textContent).toBe(MOCK_PRODUCT.name);
  });
});

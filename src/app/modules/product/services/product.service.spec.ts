import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Product } from '../interfaces/product';
import { ProductPage } from '../interfaces/productPage';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 100,
    image: 'https://example.com/product1.jpg',
    description: 'Description 1',
    discount: 10,
    stock: 10,
  },
  {
    id: '2',
    name: 'Product 2',
    price: 200,
    image: 'https://example.com/product2.jpg',
    description: 'Description 2',
    discount: 20,
    stock: 20,
  },
  {
    id: '3',
    name: 'Product 3',
    price: 300,
    image: 'https://example.com/product3.jpg',
    description: 'Description 3',
    discount: 30,
    stock: 30,
  },
];

const MOCK_PRODUCT_PAGE: ProductPage = {
  data: MOCK_PRODUCTS,
  meta: {},
};

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get Products', () => {
    service.getProducts({ searchTerm: 'laptop' }).subscribe((response) => {
      expect(response).toEqual(MOCK_PRODUCT_PAGE.data.length);
    });

    const req = httpMock.expectOne(
      'https://eccommerce-api-p29d.onrender.com/api/products?search=laptop',
    );
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_PRODUCT_PAGE.data.length);
  });
});

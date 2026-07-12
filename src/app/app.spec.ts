import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideStore } from '@ngrx/store';
import { provideRouter } from '@angular/router';
import { CartReducer } from '@store/cart/reducers';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideStore({ Cart: CartReducer }), provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

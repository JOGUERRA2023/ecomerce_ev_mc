import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectProductsInCart } from 'app/store/cart/selectors';
import { CheckoutActions } from 'app/store/checkout/actions';
import { selectCheckoutOrder, selectCheckoutStatus } from 'app/store/checkout/selectors';
import { OrderInput, PaymentMethod, ShippingMethod } from '../../interfaces/order';
import { OrderSuccessModal } from '../../components/order-success-modal/order-success-modal';

const PERU_CITIES = ['Lima', 'Arequipa', 'Cusco', 'Trujillo'] as const;
const PERU_STATES = ['Lima', 'Arequipa', 'Cusco', 'La Libertad'] as const;

const SHIPPING_COSTS: Record<ShippingMethod, number> = {
  free: 0,
  fixed: 5,
};

@Component({
  selector: 'app-checkout-page',
  imports: [ReactiveFormsModule, RouterLink, OrderSuccessModal],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);

  cities = PERU_CITIES;
  states = PERU_STATES;
  countries = ['Perú'] as const;

  cartItems = this.store.selectSignal(selectProductsInCart);
  checkoutStatus = this.store.selectSignal(selectCheckoutStatus);
  checkoutOrder = this.store.selectSignal(selectCheckoutOrder);

  isSubmitting = computed(() => this.checkoutStatus() === 'submitting');
  showSuccessModal = computed(() => this.checkoutStatus() === 'success');

  checkoutForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: [PERU_CITIES[0], [Validators.required]],
    postalCode: ['', [Validators.required, Validators.minLength(3)]],
    country: [this.countries[0], [Validators.required]],
    state: [PERU_STATES[0], [Validators.required]],
    shippingMethod: ['free' as ShippingMethod, [Validators.required]],
    paymentMethod: ['delivery' as PaymentMethod, [Validators.required]],
  });

  subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0),
  );

  shippingCostSignal = signal<number>(SHIPPING_COSTS.free);

  total = computed(() => this.subtotal() + this.shippingCostSignal());

  constructor() {
    this.checkoutForm.controls.shippingMethod.valueChanges.subscribe((method) => {
      this.shippingCostSignal.set(SHIPPING_COSTS[method]);
    });

    effect(() => {
      if (this.showSuccessModal()) {
        this.checkoutForm.reset({
          firstName: '',
          lastName: '',
          address: '',
          city: PERU_CITIES[0],
          postalCode: '',
          country: this.countries[0],
          state: PERU_STATES[0],
          shippingMethod: 'free',
          paymentMethod: 'delivery',
        });
      }
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid || this.cartItems().length === 0) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const formValue = this.checkoutForm.getRawValue();
    const order: OrderInput = {
      customer: {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        address: formValue.address,
        city: formValue.city,
        postalCode: formValue.postalCode,
        country: formValue.country,
        state: formValue.state,
      },
      shippingMethod: formValue.shippingMethod,
      paymentMethod: formValue.paymentMethod,
      items: this.cartItems(),
      subtotal: this.subtotal(),
      shippingCost: this.shippingCostSignal(),
      total: this.total(),
    };

    this.store.dispatch(CheckoutActions.submitOrder({ order }));
  }

  onModalConfirm(): void {
    this.store.dispatch(CheckoutActions.resetCheckout());
    this.router.navigate(['/']);
  }
}

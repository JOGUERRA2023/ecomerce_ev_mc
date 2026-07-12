import { Product } from 'app/modules/product/interfaces/product';

export type ShippingMethod = 'free' | 'fixed';
export type PaymentMethod = 'delivery' | 'yape' | 'transfer';

export interface OrderCustomerInfo {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  state: string;
}

export interface OrderInput {
  customer: OrderCustomerInfo;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  items: Product[];
  subtotal: number;
  shippingCost: number;
  total: number;
}

export interface Order extends OrderInput {
  id: string;
  createdAt: string;
}

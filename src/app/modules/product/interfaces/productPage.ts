import { Product } from './product';

export interface ProductPage {
  data: Product[];
  meta: Meta;
}

interface Meta {
  total?: number;
  limit?: number;
  page?: number;
}

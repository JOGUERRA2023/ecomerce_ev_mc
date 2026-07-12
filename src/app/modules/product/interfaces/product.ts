export interface Product {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
  categoryId?: number;
  image?: string;
  discount?: number;
  rating?: number;
  featured?: boolean;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
}

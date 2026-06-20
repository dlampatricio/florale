export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: CategoryId;
}

export type CategoryId = 'cajas' | 'desayunos';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

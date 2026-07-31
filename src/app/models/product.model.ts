export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CartItem, Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private searchQuery = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuery.asObservable();

  private cartOpen = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpen.asObservable();

  constructor() {}

  getCartItems(): CartItem[] {
    return this.cartItems.value;
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItems.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }

    this.cartItems.next([...currentItems]);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItems.value.filter(item => item.product.id !== productId);
    this.cartItems.next(currentItems);
  }

  updateQuantity(productId: number, change: number): void {
    const currentItems = this.cartItems.value;
    const item = currentItems.find(item => item.product.id === productId);

    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartItems.next([...currentItems]);
      }
    }
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((total, item) => total + item.quantity, 0);
  }

  getCartCount$(): Observable<number> {
    return this.cartItems$.pipe(
      map(items => items.reduce((total, item) => total + item.quantity, 0))
    );
  }

  getSubtotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getTax(taxRate: number = 0.05): number {
    return this.getSubtotal() * taxRate;
  }

  getTotal(taxRate: number = 0.05): number {
    return this.getSubtotal() + this.getTax(taxRate);
  }

  clearCart(): void {
    this.cartItems.next([]);
  }

  toggleCart(): void {
    this.cartOpen.next(!this.cartOpen.value);
  }

  openCart(): void {
    this.cartOpen.next(true);
  }

  closeCart(): void {
    this.cartOpen.next(false);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.next(query);
  }

  getSearchQuery(): string {
    return this.searchQuery.value;
  }
}

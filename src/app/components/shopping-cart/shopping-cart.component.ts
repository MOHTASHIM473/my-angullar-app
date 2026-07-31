import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/product.model';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {
  cartService = inject(CartService);
  cartItems: CartItem[] = [];
  subtotal = 0;
  tax = 0;
  total = 0;
  taxRate = 0.05;
  isOpen = false;

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotals();
    });
    
    this.cartService.cartOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
    });
  }

  calculateTotals(): void {
    this.subtotal = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax(this.taxRate);
    this.total = this.cartService.getTotal(this.taxRate);
  }

  updateQuantity(productId: number, change: number): void {
    this.cartService.updateQuantity(productId, change);
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    
    if (confirm(`Proceed to checkout? Total: $${this.total.toFixed(2)}`)) {
      this.cartService.clearCart();
      alert('Thank you for your purchase! Your order has been placed successfully.');
      this.cartService.closeCart();
    }
  }

  closeCart(): void {
    this.cartService.closeCart();
  }
}

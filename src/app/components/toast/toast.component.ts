import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  cartService = inject(CartService);
  showToast = false;
  message = '';

  show(message: string): void {
    this.message = message;
    this.showToast = true;
    
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide(): void {
    this.showToast = false;
  }
}

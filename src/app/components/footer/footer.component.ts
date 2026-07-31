import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  cartService = inject(CartService);

  preventDefault(event: Event): void {
    event.preventDefault();
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  filterByCategory(event: Event, category: string): void {
    event.preventDefault();
    // Scroll to products section
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    // Note: Category filtering would need to be implemented in ProductGridComponent
    // This is a placeholder for the functionality
    alert(`Filter by ${category} - Feature coming soon!`);
  }

  showInfo(event: Event, info: string): void {
    event.preventDefault();
    alert(`${info} - This feature is coming soon!`);
  }
}

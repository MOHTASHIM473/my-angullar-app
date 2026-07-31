import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { PRODUCTS } from '../../data/products.data';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent implements OnInit {
  cartService = inject(CartService);
  products = PRODUCTS;
  filteredProducts = [...PRODUCTS];
  selectedCategory = 'All';
  searchQuery = '';
  categories = ['All', 'Electronics', 'Clothing', 'Accessories'];

  ngOnInit(): void {
    this.filterProducts();
    
    // Subscribe to search query changes from header
    this.cartService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'All' || product.category === this.selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                           product.category.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.cartService.setSearchQuery(this.searchQuery);
    this.filterProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.title} added to cart!`);
  }

  getStarRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
      stars += '★';
    }
    if (hasHalfStar) {
      stars += '½';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
      stars += '☆';
    }
    
    return stars;
  }
}

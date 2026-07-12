import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartSidebarService {
  isOpen = signal(false);

  open() {
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}

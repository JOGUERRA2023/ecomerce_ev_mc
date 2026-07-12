import { afterNextRender, Component, inject, signal } from '@angular/core';
import { Navbar } from './shared/ui/navbar/navbar';
import { Sidebar } from './shared/ui/sidebar/sidebar';
import { ShoppingCartSidebar } from './modules/cart/components/shopping-cart-sidebar/shopping-cart-sidebar';
import { Alerts } from './shared/ui/alerts/alerts';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartStorageActions } from './store/cart/actions';
import { Footer } from './shared/ui/footer/footer';
import { ChatBot } from '@shared/ui/chat-bot/chat-bot';

@Component({
  selector: 'app-root',
  imports: [Navbar, Sidebar, ShoppingCartSidebar, Alerts, RouterOutlet, Footer, ChatBot],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('MitoPets');
  store = inject(Store);

  constructor() {
    afterNextRender(() => {
      this.store.dispatch(CartStorageActions.loadProducts());
    });
  }
}

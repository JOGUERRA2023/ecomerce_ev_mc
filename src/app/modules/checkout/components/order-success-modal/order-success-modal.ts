import { Component, input, output } from '@angular/core';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-order-success-modal',
  imports: [],
  templateUrl: './order-success-modal.html',
  styleUrl: './order-success-modal.css',
})
export class OrderSuccessModal {
  order = input<Order | null>(null);
  confirmed = output<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }
}

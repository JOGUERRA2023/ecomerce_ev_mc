import { Injectable, signal } from '@angular/core';

export interface Alert {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error' | 'warning';
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertsSignal = signal<Alert[]>([]);
  alerts = this.alertsSignal.asReadonly();
  private nextId = 0;

  show(message: string, type: Alert['type'] = 'success', duration = 3000) {
    const id = this.nextId++;
    const newAlert: Alert = { id, message, type };
    this.alertsSignal.update((alerts) => [...alerts, newAlert]);

    setTimeout(() => {
      this.alertsSignal.update((alerts) => alerts.filter((a) => a.id !== id));
    }, duration);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }
}

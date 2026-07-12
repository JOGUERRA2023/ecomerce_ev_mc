import { Component, inject } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alerts',
  imports: [],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  alertService = inject(AlertService);
}

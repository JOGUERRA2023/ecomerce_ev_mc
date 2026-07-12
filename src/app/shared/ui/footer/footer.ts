import { CategoryFeatureService } from 'app/modules/category/services/category-feature.service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { form, FormField, required } from '@angular/forms/signals';
import { AlertService } from 'app/shared/services/alert.service';

@Component({
  selector: 'app-footer',
  imports: [FormsModule, RouterLink, FormField],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = signal(new Date().getFullYear());
  alertService = inject(AlertService);

  companyLinks = [
    { title: 'Sobre Nosotros', url: '/about' },
    { title: 'Información de Envío', url: '/track-order' },
    { title: 'Política de Privacidad', url: '/policy' },
    { title: 'Términos y Condiciones', url: '/terms' },
    { title: 'Contáctanos', url: '/contact' },
    { title: 'Centro de Soporte', url: '/faq' },
  ];

  socialMedia = [
    { icon: 'ri-facebook-line', url: 'https://facebook.com' },
    { icon: 'ri-twitter-x-line', url: 'https://twitter.com' },
    { icon: 'ri-dribbble-line', url: 'https://dribbble.com' },
    { icon: 'ri-instagram-line', url: 'https://instagram.com' },
  ];

  private categoriesFeaturedService = inject(CategoryFeatureService);
  categories = this.categoriesFeaturedService.categories;

  footerModel = signal({
    email: '',
  });

  footerForm = form(this.footerModel, (fields) => {
    required(fields.email);
  });

  onNewsletterSubmit(): void {
    this.alertService.success('Gracias por suscribirte');
    this.footerForm().reset();
  }
}

import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

interface Slide {
  id: number;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

@Component({
  selector: 'app-hero',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  currentSlide = signal(0);

  private intervalId: ReturnType<typeof setInterval> | null = null;

  slides: Slide[] = [
    {
      id: 0,
      image: '/img/banner/banner-1.jpg',
      subtitle: 'Verduras Orgánicas',
      title: 'La mejor manera de cuidar tu salud.',
      description:
        'Descubre nuestra selección de vegetales frescos y orgánicos. Calidad garantizada directamente del campo a tu mesa.',
      buttonText: 'Comprar Ahora',
      buttonLink: 'shop-left-sidebar.html',
    },
    {
      id: 1,
      image: '/img/banner/banner-2.jpg',
      subtitle: 'Frutas Orgánicas',
      title: 'Explora frutas frescas y .',
      description:
        'Las mejores frutas de temporada seleccionadas especialmente para ti. Sabor natural y auténtico en cada bocado.',
      buttonText: 'Comprar Ahora',
      buttonLink: 'shop-left-sidebar.html',
    },
    {
      id: 2,
      image: '/img/banner/banner-1.jpg',
      subtitle: 'Ofertas Flash',
      title: '¡Aprovecha las ofertas por tiempo limitado!',
      description:
        'Descubre los mejores productos con descuentos increíbles. No te pierdas esta oportunidad única.',
      buttonText: 'Comprar Ahora',
      buttonLink: 'shop-left-sidebar.html',
    },
  ];

  ngOnInit(): void {
    this.startAutoplay();
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  startAutoplay(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide(): void {
    this.currentSlide.update((value) => (value == this.slides.length - 1 ? 0 : value + 1));
  }

  previousSlide(): void {
    this.currentSlide.update((value) => (value == 0 ? this.slides.length - 1 : value - 1));
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    this.stopAutoplay();
    this.startAutoplay();
  }
}

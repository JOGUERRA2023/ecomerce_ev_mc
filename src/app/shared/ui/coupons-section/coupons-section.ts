import { Component, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { COUPONS, COUPON_MESSAGES } from 'app/shared/constants';

@Component({
  selector: 'app-coupons-section',
  imports: [],
  template: `
    <section class="py-16 bg-brand-bg-alt border-t border-b border-[#e9e9e9] w-full" aria-labelledby="coupons-title">
      <div class="mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] px-3">
        
        <!-- Header de la sección -->
        <div class="mb-10 text-center">
          <span class="text-xs font-bold tracking-wider text-brand-primary uppercase bg-white border border-[#e9e9e9] px-3.5 py-1.5 rounded-full font-Manrope">
            Beneficios Exclusivos
          </span>
          <h2 id="coupons-title" class="mt-4 text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl font-Poppins">
            Cupones & Descuentos Únicos
          </h2>
          <p class="mt-3 max-w-2xl mx-auto text-base text-slate-500 font-Manrope">
            Ahorra en tus compras de hoy con estos códigos de descuento especiales. Haz clic en el cupón para copiar tu código al instante.
          </p>
        </div>

        <!-- Anuncio de accesibilidad para lectores de pantalla -->
        <div class="sr-only" aria-live="polite" id="coupon-announcement">
          @if (copiedCode()) {
            {{ couponMessages.copied }} ({{ copiedCode() }})
          }
        </div>

        <!-- Grilla de cupones -->
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          @for (coupon of coupons; track coupon.code) {
            <div 
              class="coupon-card relative bg-white border border-[#e9e9e9] overflow-hidden flex flex-col justify-between"
            >
              <!-- Mitad Superior: Cabecera con descuento -->
              <div 
                class="bg-gradient-to-br p-6 flex flex-col justify-between h-40 relative {{ coupon.bgColor }}"
              >
                <!-- Decoración de círculos a los costados para estilo de ticket de cupón -->
                <div class="absolute left-[-10px] bottom-[-10px] w-5 h-5 bg-brand-bg-alt rounded-full z-10 border-r border-[#e9e9e9]"></div>
                <div class="absolute right-[-10px] bottom-[-10px] w-5 h-5 bg-brand-bg-alt rounded-full z-10 border-l border-[#e9e9e9]"></div>

                <div class="flex justify-between items-start font-Manrope">
                  <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-xs">
                    Código Activo
                  </span>
                  <span class="text-xs opacity-90">
                    Vence: {{ coupon.validUntil }}
                  </span>
                </div>
                <div>
                  <h3 class="text-3xl font-black tracking-tight mb-1 font-Poppins">{{ coupon.discount }}</h3>
                  <p class="text-sm font-medium opacity-90 font-Manrope">{{ coupon.title }}</p>
                </div>
              </div>

              <!-- Mitad Inferior: Detalles del cupón -->
              <div class="p-6 flex-1 flex flex-col justify-between bg-white relative">
                <!-- Línea punteada que simula el cupón cortado -->
                <div class="absolute top-0 left-4 right-4 border-t border-dashed border-[#e9e9e9]"></div>

                <p class="text-slate-600 text-sm mt-3 mb-6 font-Manrope leading-relaxed">
                  {{ coupon.description }}
                </p>

                <!-- Botón de copiado interactivo -->
                <button
                  type="button"
                  (click)="copyCode(coupon.code)"
                  [class.bg-brand-primary]="copiedCode() !== coupon.code"
                  [class.hover:bg-brand-dark]="copiedCode() !== coupon.code"
                  [class.bg-brand-accent]="copiedCode() === coupon.code"
                  [class.text-brand-dark]="copiedCode() === coupon.code"
                  [class.text-white]="copiedCode() !== coupon.code"
                  class="coupon-button w-full flex items-center justify-center gap-2 font-semibold font-Manrope py-3 px-4 rounded-[8px] transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 cursor-pointer"
                  [attr.aria-label]="copiedCode() === coupon.code ? 'Código ' + coupon.code + ' copiado' : 'Copiar código de descuento ' + coupon.code"
                >
                  @if (copiedCode() === coupon.code) {
                    <!-- Icono Check -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-scale" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>¡Copiado!</span>
                  } @else {
                    <!-- Icono Copiar/Portapapeles -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    <span>Copiar Código: <strong class="ml-1 tracking-wider font-extrabold">{{ coupon.code }}</strong></span>
                  }
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .coupon-card {
      transition: all 0.3s ease;
      border-radius: 8px;
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(61, 90, 69, 0.08);
      }
    }
    .coupon-button {
      border: 1px solid transparent;
    }
    @keyframes scaleIn {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-scale {
      animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `,
  host: {
    'class': 'block w-full'
  }
})
export class CouponsSection {
  private platformId = inject(PLATFORM_ID);
  
  coupons = COUPONS;
  couponMessages = COUPON_MESSAGES;
  copiedCode = signal<string | null>(null);

  copyCode(code: string): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(code).then(
        () => {
          this.copiedCode.set(code);
          setTimeout(() => {
            if (this.copiedCode() === code) {
              this.copiedCode.set(null);
            }
          }, 2000);
        },
        () => {
          console.error(this.couponMessages.copyError);
        }
      );
    }
  }
}

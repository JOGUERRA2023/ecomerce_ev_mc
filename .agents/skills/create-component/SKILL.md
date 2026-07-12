---
name: create-component
description: Guía detallada y concisa para la creación de nuevos componentes standalone de Angular v21/v22+ en MitoCommerce. Cubre la estructura de archivos (solo .ts y .spec.ts), plantillas/estilos inline, reactividad con Signals, skeletons de carga para APIs, hidratación incremental y accesibilidad.
---

# Skill - Creación de Componentes en MitoCommerce

Esta guía define las reglas estrictas para la creación de nuevos componentes en **MitoCommerce**. Asegura la consistencia arquitectónica, reactividad basada en Signals y el sistema de diseño premium.

---

## 1. Ubicación y Estructura de Archivos

- **Componentes de Módulo (Lógica de Negocio):** Ubicar en `src/app/modules/<modulo>/components/<componente>/`.
- **Componentes Compartidos (Reutilizables):** Ubicar en `src/app/shared/ui/<componente>/`.
- **Archivos requeridos (Únicamente 2 archivos):**
  - `<componente>.ts` (Contiene controlador, plantilla HTML inline y estilos CSS inline)
  - `<componente>.spec.ts` (Pruebas unitarias con Vitest)
  - **REGLA ESTRICTA:** No crear archivos `.html` ni `.css` por separado. Todo debe estar encapsulado en el archivo `.ts`.

---

## 2. Configuración del Componente (Angular v21/v22+)

- **Standalone:** **NO** declarar `standalone: true` en el decorador `@Component` (es el predeterminado).
- **Change Detection:** **NO** declarar `changeDetection: ChangeDetectionStrategy.OnPush` de forma explícita (predeterminado en Angular v22+).
- **Decoradores Host:** **NO** usar `@HostBinding` o `@HostListener`. Usar el objeto `host` dentro del decorador:
- **Estructura Decorador:**
  ```typescript
  @Component({
    selector: 'app-mi-componente',
    template: `
      <div class="mi-clase text-brand-primary">
        <p>{{ value() }}</p>
      </div>
    `,
    styles: `
      .mi-clase {
        @apply transition-colors duration-200;
        border-color: var(--brand-primary);
        &:hover {
          color: var(--brand-dark);
        }
      }
    `,
    host: {
      'class': 'block w-full',
      '[attr.aria-label]': 'label()'
    }
  })
  ```

---

## 3. Reactividad y Signals

- **Inputs:** Usar la función `input()` o `input.required()` en lugar del decorador `@Input()`.
- **Outputs:** Usar la función `output()` en lugar del decorador `@Output()`.
- **Estado Local:** Usar `signal()` y para valores derivados usar `computed()`.
- **Mutaciones:** Para actualizar el estado, usar `.set()` o `.update()`. **NO** usar `.mutate()`.

---

## 4. Consumo de APIs y Skeletons de Carga

Cualquier componente que realice peticiones asíncronas de datos (por ejemplo, usando `rxResource` o llamadas HTTP directas a servicios) **debe** proveer un skeleton de carga de alta fidelidad que prevenga desplazamientos del layout (Layout Shift).
- Usar la clase global `.animate-skeleton` en los elementos simulados para animar el pulso orgánico.
- Replicar la misma estructura de cajas, anchos y altos del componente final.
- Ejemplo de estructura condicional:
  ```html
  @if (resource.isLoading()) {
    <div class="grid gap-4">
      @for (i of [1, 2, 3]; track i) {
        <div class="h-10 rounded animate-skeleton"></div>
      }
    </div>
  } @else {
    <!-- Contenido real -->
  }
  ```

---

## 5. Análisis de Hidratación Incremental (Angular SSR)

Al instanciar o cargar nuevos componentes en la aplicación, se debe analizar si califican para **hidratación diferida o incremental** utilizando bloques `@defer`. Esto optimiza sustancialmente el tamaño de carga inicial y la interactividad.

- **`hydrate on interaction`:** Ideal para componentes de UI complejos que el usuario no ve inmediatamente pero con los que interactúa directamente (ej. menús desplegables, barras de búsqueda, paneles de carritos).
  ```html
  @defer (hydrate on interaction) {
    <app-complejo-dropdown />
  } @placeholder {
    <div class="h-[40px] w-[150px] animate-skeleton rounded"></div>
  }
  ```
- **`hydrate on viewport`:** Recomendado para secciones ubicadas abajo de la línea de pliegue inicial (below the fold) (ej. footers, carruseles secundarios, grids de productos adicionales).
  ```html
  @defer (hydrate on viewport) {
    <app-footer />
  } @placeholder {
    <div class="h-[200px] w-full bg-[#f8f6f2]"></div>
  }
  ```
- **`hydrate on idle`:** Para componentes no críticos de prioridad media.

---

## 6. Estilos y Sistema de Diseño (Tailwind v4)

- **Limitación de Compilación Aislada:** Angular procesa de forma independiente cada componente. Las utilidades de tema personalizadas de Tailwind v4 (`text-brand-primary`, `bg-brand-primary`, etc.) **NO** se pueden usar dentro de la directiva `@apply` en el bloque `styles` del componente.
- **Uso Correcto:** Usar variables CSS nativas con la sintaxis `var(...)`:
  ```css
  color: var(--brand-primary);
  background-color: var(--brand-bg-alt);
  ```
- **HTML Inline:** En la propiedad `template`, sí está permitido el uso directo de las clases utilitarias de Tailwind (ej. `class="text-brand-primary"`).

---

## 7. Accesibilidad (WCAG AA & AXE)

- **Estructura Semántica:** Utilizar etiquetas HTML5 correctas (`button`, `nav`, `section`, etc.).
- **Control del Foco:** Asegurar el orden de tabulación nativo y la visibilidad clara del foco (`focus:outline-none focus:ring-2 focus:ring-brand-primary`).
- **Atributos ARIA:** Utilizar `aria-label`, `aria-expanded` y otros descriptores donde sea necesario.

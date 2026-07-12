# Reglas Generales del Proyecto - MitoCommerce

**MitoCommerce** es una aplicación de comercio electrónico (e-commerce) desarrollada como una tienda en línea moderna. Permite a los usuarios explorar catálogos de productos, gestionar un carrito de compras interactivo y administrar una lista de deseos (wishlist).

Este archivo define las directrices arquitectónicas, estándares de codificación, estilos y flujos de trabajo que deben seguir tanto los desarrolladores como los agentes de IA (Claude/Gemini) que colaboren en este repositorio.

---

## 1. Pila Tecnológica (Tech Stack)

- **Framework:** Angular v21.x (arquitectura de componentes Standalone y Reactividad basada en Signals).
- **Gestión de Estado:** NgRx Store & Effects v21.x.
- **Estilos:** Tailwind CSS v4 para diseño responsivo y Vanilla CSS para personalizaciones de componentes.
- **Pruebas Unitarias:** Vitest como test runner principal.

---

## 2. Estructura del Proyecto y Carpetas

- **`src/app/modules/`:** Módulos encapsulados por dominio de negocio (ej. `product`, `cart`, `category`). Cada uno contiene sus componentes, servicios e interfaces.
- **`src/app/shared/`:** Componentes reutilizables de UI (`shared/ui`), páginas estáticas o de entrada general (`shared/initial-page`), y servicios transversales (`shared/services`).
- **`src/app/store/`:** Estado global de NgRx. Actualmente maneja el estado del carrito de compras (`store/cart/`).
- **`src/app/core/`:** Elementos de infraestructura global y seguridad, tales como guards (`core/guards/`) e interceptores (`core/interceptors/`).
- **Importaciones:** Usar rutas relativas dentro de un mismo módulo y alias configurados en `tsconfig.json` para recursos externos globales (como `@environments/*` o `@core/*`).

---

## 4. Gestión de Estado con NgRx

- **Actions:** Agrupar acciones utilizando `createActionGroup` con nombres de eventos descriptivos y categorizados por su origen (`source`).
- **Reducers:** Mantener funciones puras sin mutación directa del estado.
- **Selectors:** Encapsular consultas complejas y cálculos del store mediante selectores creados con `createSelector`.
- **Effects:** Utilizar efectos para operaciones asíncronas o efectos secundarios como la persistencia automática en el `localStorage` (clave `'my_cart'`). Usar `{ dispatch: false }` cuando no sea necesario despachar otra acción.
- **Uso en Componentes:** Para mantener la coherencia con el modelo reactivo de Angular, consumir selectores en componentes mediante `store.selectSignal(selector)`.

---

## 5. Estilos y Maquetación

- Diseñar layouts modernos utilizando Tailwind CSS v4 de forma primordial.
- Preferir el uso de la directiva `@apply` de Tailwind en los archivos `.css` encapsulados de los componentes (`styleUrl` o `styles`) para agrupar clases complejas o numerosas, manteniendo así los templates HTML limpios y legibles.
- Utilizar archivos `.css` encapsulados únicamente para estilos a la medida o animaciones complejas no cubiertas por las utilidades globales de Tailwind.

---

## 6. Comandos Principales

- **Desarrollo:** `ng serve` o `npm start`
- **Pruebas:** `ng test` o `npm run test` (Vitest)
- **Compilación:** `ng build` o `npm run build`
- **Linting:** `ng lint` o `npm run lint`

You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Do NOT add comments in the code. Code should be self-explanatory.
- Avoid hardcoded values and messages. All hardcoded messages and values must be stored in a dedicated `Constants.ts` file.

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly. `OnPush` is the default in Angular v22+.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

## Accessibility Requirements

- It MUST pass all AXE checks.
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes.

### Components

- Keep components small and focused on a single responsibility
- Always prefer creating independent components (e.g. for notifications, lists, panels) instead of putting markup/logic directly in main or layout files (such as `app.html`).
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Prefer inline templates for small components
- Prefer Signal Forms (`@angular/forms/signals`) for new forms. They are stable in Angular v22+ and provide signal-based state, type-safe field access, and schema-based validation
- When not using Signal Forms, prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- When using external templates/styles, use paths relative to the component TS file.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Prefer the `@Service` decorator over `@Injectable({providedIn: 'root'})` for new singleton services (Angular v22+)
- Use the `inject()` function instead of constructor injection

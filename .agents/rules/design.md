---
trigger: manual
description: Reglas y guía del Design System de MitoCommerce. Contiene las especificaciones de colores, tipografía, bordes y patrones de diseño.
---

# Design System - MitoCommerce

Este documento centraliza las directrices de diseño visual, tokens, paleta de colores, tipografías y patrones interactivos del proyecto **MitoCommerce**. Cualquier componente nuevo o modificado debe seguir estrictamente estas especificaciones para garantizar la consistencia visual y la estética premium del sitio.

---

## 1. Paleta de Colores (Color Palette)

La paleta está diseñada para transmitir una experiencia de marca premium, orgánica y editorial (Olive & Warm Stone).

### 1.1. Variables CSS Globales
Definidas en `:root` dentro de [styles.css](file:///c:/Users/mesol/OneDrive/Documentos/mitocode/cursos-y-talleres/curso-angular-expert-2026jun/mitocommerce/src/styles.css):

```css
:root {
  --brand-primary: #3D5A45;      /* Verde Oliva principal */
  --brand-dark: #1C2B20;         /* Verde Bosque Profundo para texto oscuro/hovers */
  --brand-muted: #8F9779;        /* Verde Sabio para secundarios/estados inactivos */
  --brand-accent: #D9A752;       /* Oro Ochre para estrellas, badges de destaque y alertas */
  --brand-bg: #FDFBF7;           /* Blanco Alabastro/Crema para fondo base */
  --brand-bg-alt: #F8F6F2;       /* Arena suave para fondos alternos y bordes de hover */
}
```

### 1.2. Mapeo del Tema en Tailwind CSS v4
Exponemos las variables como clases semánticas nativas a través del bloque `@theme`:

- `bg-brand-primary` / `text-brand-primary` / `border-brand-primary`
- `bg-brand-dark` / `text-brand-dark`
- `bg-brand-muted` / `text-brand-muted`
- `bg-brand-accent` / `text-brand-accent`
- `bg-brand-bg` / `text-brand-bg`
- `bg-brand-bg-alt`

---

## 2. Tipografía (Typography System)

El proyecto utiliza dos fuentes principales importadas localmente en `styles.css`.

### 2.1. Poppins

- **Familia:** `'Poppins', sans-serif`
- **Uso:** Títulos principales, encabezados, títulos de productos, precios (`.new-price` / `.old-price`) y contadores numéricos.
- **Pesos Disponibles:** 100 (Thin) a 900 (Black).
- **Uso en código:** Atributo `font-family: 'Poppins', sans-serif;` o clase `.font-Poppins`.

### 2.2. Manrope

- **Familia:** `'Manrope', sans-serif`
- **Uso:** Texto de botones principales (`.cr-button`), descripciones largas de productos, cuerpo de texto general y elementos de formulario.
- **Pesos Disponibles:** 200 (ExtraLight) a 800 (ExtraBold).
- **Uso en código:** Atributo `font-family: 'Manrope', sans-serif;` o clase `.font-Manrope`.

---

## 3. Bordes, Sombras y Formas (Borders, Shadows & Shapes)

### 3.1. Radio de Borde (Border Radius)

- **Standard Rounded (Cards, Inputs, Images):** `rounded-[8px]`
  - _Uso:_ Tarjetas de producto, contenedores de imágenes, inputs de formulario, botones estándar.
- **Circular Rounded:** `rounded-full` (o `rounded-[100%]`)
  - _Uso:_ Botones flotantes, iconos de favoritos (wishlist) y contadores del carrito.

### 3.2. Sombras y Hover (Shadows)

- **Hover de Tarjetas:** Sombra difusa tintada con el color de la marca para mantener la armonía orgánica:
  - `box-shadow: 0 8px 24px rgba(61, 90, 69, 0.06);`

---

## 4. Patrones de Interacción y Animaciones

### 4.1. Botones Principales (`.cr-button`)

- **Estado Base:** Fondo `var(--brand-primary)` con borde sólido y texto blanco.
- **Estado Hover:** Fondo y borde transicionan suavemente a `var(--brand-dark)`.
- **Esquinas:** Redondeado de `8px`.

### 4.2. Botones de Acción de Tarjetas (Favoritos y Ver)

- **Estado Base:** Fondo blanco, borde `#e9e9e9`, texto/icono `#2b2b2d`.
- **Estado Hover:** Fondo `var(--brand-bg-alt)`, texto e icono `var(--brand-primary)` con transición de 300ms.

### 4.3. Badges e Indicadores flotantes (Carrito de Compras)

- **Fondo:** `var(--brand-accent)` (Oro Ochre) en lugar de rojo/naranja estándar. Esto asegura que llame la atención de forma armónica con la paleta natural.
- **Texto:** Blanco con contorno limpio.

---

## 5. Skeletons de Carga (Skeletons & Placeholders)

Para evitar desajustes visuales (Layout Shift) y mantener una carga fluida durante las peticiones asíncronas (`fetch` / `rxResource`), se implementan Skeletons de alta fidelidad.

### 5.1. Animación y Colores de Skeleton

Definido globalmente en `styles.css`:

```css
@keyframes skeleton-pulse {
  0%, 100% {
    background-color: var(--brand-bg-alt);
  }
  50% {
    background-color: color-mix(in srgb, var(--brand-muted) 20%, transparent);
  }
}

.animate-skeleton {
  animation: skeleton-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

### 5.2. Estructura de Skeleton Card
Cada tarjeta de carga debe replicar exactamente la estructura visual de la tarjeta de producto real, utilizando cajas redondeadas con la clase `animate-skeleton`.

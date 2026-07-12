export const CART_MESSAGES = {
  productAdded: (name?: string) => `${name ?? ''} agregado al carrito`,
  productReduced: (name?: string) => `${name ?? ''} reducido del carrito`,
  productRemoved: (name?: string) => `${name ?? ''} eliminado del carrito`,
  cartCleared: 'Carrito de compras limpiado',
} as const;

export const COUPONS = [
  {
    code: 'MITO20',
    discount: '20% OFF',
    title: 'Descuento de Bienvenida',
    description: 'En tu primera compra de productos seleccionados.',
    validUntil: '31 Dic, 2026',
    bgColor: 'from-brand-primary to-brand-dark text-white',
  },
  {
    code: 'FRESH50',
    discount: '50% OFF',
    title: 'Frutas y Verduras',
    description: 'Exclusivo en productos frescos de la categoría vegetales.',
    validUntil: '15 Jul, 2026',
    bgColor: 'from-brand-accent to-[#b88d43] text-brand-dark',
  },
  {
    code: 'ENVIOGRATIS',
    discount: 'ENVÍO GRATIS',
    title: 'Envío Sin Costo',
    description: 'En compras superiores a $50 en cualquier categoría.',
    validUntil: '31 Ago, 2026',
    bgColor: 'from-brand-muted to-brand-primary text-white',
  },
] as const;

export const COUPON_MESSAGES = {
  copied: '¡Código de cupón copiado al portapapeles!',
  copyError: 'Error al copiar el código de cupón',
} as const;

export const AUTH_KEYS = {
  accessToken: 'access_token',
} as const;

export const AUTH_MESSAGES = {
  sessionClosed: 'Sesión cerrada',
  loginSuccess: 'Inicio de sesión exitoso',
  sessionExpired: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
} as const;


import type { Product } from '@/types'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function generateWhatsAppMessage(
  items: { product: Product; quantity: number; note?: string }[],
  total: number,
): string {
  const lines = items.map(({ product, quantity, note }) => {
    let line = `• ${product.name} × ${quantity} — ${formatPrice(product.price * quantity)}`
    if (note) line += `\n   ✏️ ${note}`
    return line
  })

  return [
    '🌿 *Nuevo Pedido — Florale*',
    '',
    '━━━━━━━━━━━━━━━━',
    '*🛒 Detalle del pedido:*',
    '━━━━━━━━━━━━━━━━',
    '',
    ...lines,
    '',
    '━━━━━━━━━━━━━━━━',
    `💫 *Total: ${formatPrice(total)}*`,
    '━━━━━━━━━━━━━━━━',
    '',
    'Gracias por tu compra 💛',
  ].join('\n')
}

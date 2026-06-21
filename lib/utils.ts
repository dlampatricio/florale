import type { Product } from '@/types';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function generateWhatsAppMessage(
  items: { product: Product; quantity: number; note?: string }[],
  total: number,
  delivery?: { sender: string; recipient: string; date: string; method: string }
): string {
  const lines = items.map(({ product, quantity, note }) => {
    let line = `• ${product.name} × ${quantity} — ${formatPrice(product.price * quantity)}`;
    if (note) line += `\n   ✏️ ${note}`;
    return line;
  });

  const parts = ['🌿 *Nuevo Pedido — Florale*', ''];

  if (delivery) {
    parts.push(
      '━━━━━━━━━━━━━━━━',
      '*Datos del pedido:*',
      '━━━━━━━━━━━━━━━━',
      '',
      `*De:* ${delivery.sender}`,
      `*Para:* ${delivery.recipient}`,
      `*Entrega:* ${delivery.date}`,
      `*Modalidad:* ${delivery.method}`,
      ''
    );
  }

  parts.push(
    '━━━━━━━━━━━━━━━━',
    '*Detalle del pedido:*',
    '━━━━━━━━━━━━━━━━',
    '',
    ...lines,
    '',
    '━━━━━━━━━━━━━━━━',
    `*Total: ${formatPrice(total)}*`,
    '━━━━━━━━━━━━━━━━'
  );

  return parts.join('\n');
}

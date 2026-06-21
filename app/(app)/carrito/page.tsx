'use client';

import { useCartStore } from '@/lib/cart-store';
import { getProductById } from '@/lib/products';
import { formatPrice, generateWhatsAppMessage } from '@/lib/utils';
import type { Product } from '@/types';
import { MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Great_Vibes } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

const WHATSAPP_NUMBER = '59893705133';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();

  const cartProducts = items
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null);

  const total = cartProducts.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  const handleCheckout = () => {
    const message = generateWhatsAppMessage(cartProducts, total);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 items-center text-center justify-between">
          <div>
            <h1 className={`${greatVibes.className} text-5xl text-charcoal sm:text-7xl`}>
              Tu Carrito
            </h1>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-terracotta-300/60" />
              <span className="text-[10px] text-terracotta-400/60">&#10022;</span>
              <span className="h-px w-6 bg-terracotta-300/60" />
            </div>
            <p className="mt-4 text-sm text-stone">
              {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu pedido
            </p>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white px-6 py-20 text-center shadow-sm ring-1 ring-stone-light/30">
            <ShoppingBag className="h-16 w-16 text-stone-light" />
            <div>
              <p className="text-lg font-medium text-charcoal">Tu carrito está vacío</p>
              <p className="mt-1 text-sm text-stone">Agrega productos desde nuestro catálogo</p>
            </div>
            <Link
              href="/catalogo"
              className="mt-2 inline-flex h-10 items-center gap-2 rounded-full bg-terracotta-500 px-6 text-sm font-medium text-white transition-all hover:bg-terracotta-600"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {cartProducts.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30"
                >
                  <Link
                    href={`/producto/${product.id}`}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-lg"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </Link>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/producto/${product.id}`}
                          className="font-display text-base text-charcoal transition-colors hover:text-terracotta-500"
                        >
                          {product.name}
                        </Link>
                        <p className="text-sm text-stone">{formatPrice(product.price)} c/u</p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="shrink-0 text-stone-light transition-colors hover:text-terracotta-500"
                        aria-label={`Eliminar ${product.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 rounded-lg border border-stone-light/50">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-charcoal"
                          aria-label="Reducir cantidad"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center text-sm font-medium text-charcoal">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-charcoal"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-semibold text-terracotta-600">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-fit rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-light/30 lg:sticky lg:top-24">
              <h2 className="font-display text-lg text-charcoal">Resumen</h2>

              <div className="mt-4 space-y-2">
                {cartProducts.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center justify-between text-sm">
                    <span className="truncate text-stone">
                      {product.name} × {quantity}
                    </span>
                    <span className="shrink-0 font-medium text-charcoal">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-stone-light/40 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-charcoal">Total</span>
                  <span className="font-display text-xl text-terracotta-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-medium text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Enviar pedido por WhatsApp
              </button>

              <p className="mt-3 text-center text-xs text-stone-light">
                Te redirigiremos a WhatsApp para coordinar la entrega
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

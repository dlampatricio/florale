'use client';

import { DatePicker } from '@/components/date-picker';
import { ImageWithSkeleton } from '@/components/image-with-skeleton';
import { Skeleton } from '@/components/skeleton';
import { useCartStore } from '@/lib/cart-store';
import { getProducts } from '@/lib/products';
import { useToastStore } from '@/lib/toast-store';
import { formatPrice, generateWhatsAppMessage } from '@/lib/utils';
import type { Product } from '@/types';
import { MessageCircle, Minus, PenLine, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Great_Vibes } from 'next/font/google';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

const WHATSAPP_NUMBER = '59893705133';

export default function CartPage() {
  const { items, updateQuantity, removeItem, updateNote } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);
  const [noteOpen, setNoteOpen] = useState<Record<string, boolean>>({});
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [productMap, setProductMap] = useState<Record<string, Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((all) => {
      const map: Record<string, Product> = {};
      all.forEach((p) => {
        map[p.id] = p;
      });
      setProductMap(map);
      setLoading(false);
    });
  }, []);

  const cartProducts = items
    .map((item) => {
      const product = productMap[item.productId];
      return product ? { product, quantity: item.quantity, note: item.note } : null;
    })
    .filter((item): item is { product: Product; quantity: number; note: string } => item !== null);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const total = cartProducts.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  const handleCheckout = () => {
    if (!sender || !recipient || !deliveryDate || !deliveryMethod) {
      addToast('Completa todos los datos del pedido');
      return;
    }
    const message = generateWhatsAppMessage(cartProducts, total, {
      sender,
      recipient,
      date: deliveryDate,
      method: deliveryMethod,
    });
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleRemove = (productId: string, name: string) => {
    removeItem(productId);
    addToast(`${name} eliminado del carrito`);
  };

  return (
    <main className="bg-cream px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 text-center sm:mb-8">
          <h1 className={`${greatVibes.className} text-4xl text-charcoal sm:text-7xl`}>
            Tu Carrito
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 sm:mt-3">
            <span className="h-px w-6 bg-terracotta-300/60" />
            <span className="text-[10px] text-terracotta-400/60">&#10022;</span>
            <span className="h-px w-6 bg-terracotta-300/60" />
          </div>
          <p className="mt-4 text-sm text-stone">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu pedido
          </p>
        </div>

        {loading && items.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {Array.from({ length: items.length }).map((_, i) => (
                <div key={i} className="flex gap-3 rounded-xl bg-white p-3 shadow-sm sm:p-4">
                  <Skeleton className="h-20 w-20 shrink-0 rounded-lg sm:h-24 sm:w-24" />
                  <div className="flex flex-1 flex-col justify-center gap-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                    <div className="mt-1 flex items-center justify-between">
                      <Skeleton className="h-7 w-20 rounded-lg" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm sm:p-6">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                {Array.from({ length: items.length }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-14" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-px w-full" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-7 w-20" />
              </div>
              <Skeleton className="h-px w-full" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <div className="flex gap-2">
                  <Skeleton className="h-9 flex-1 rounded-lg" />
                  <Skeleton className="h-9 flex-1 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-white px-4 py-16 text-center shadow-sm ring-1 ring-stone-light/30 sm:px-6 sm:py-20">
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
              {cartProducts.map(({ product, quantity, note }) => {
                const isOpen = noteOpen[product.id] ?? false;
                return (
                  <div key={product.id} className="rounded-xl bg-white shadow-sm">
                    <div className="flex gap-3 px-3 py-3 sm:px-4 sm:py-4">
                      <Link
                        href={`/producto/${product.id}`}
                        aria-label={product.name}
                        className="h-20 w-20 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24"
                      >
                        <ImageWithSkeleton
                          src={product.image}
                          alt={product.name}
                          width={96}
                          height={96}
                          sizes="(max-width: 640px) 80px, 96px"
                          className="h-full w-full"
                        />
                      </Link>

                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/producto/${product.id}`}
                            className="truncate font-display text-sm text-charcoal transition-colors hover:text-terracotta-500 sm:text-base"
                          >
                            {product.name}
                          </Link>
                          <button
                            onClick={() => handleRemove(product.id, product.name)}
                            className="shrink-0 rounded-lg p-1 text-stone-light transition-colors hover:bg-red-50 hover:text-red-500"
                            aria-label={`Eliminar ${product.name}`}
                          >
                            <Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          </button>
                        </div>

                        <p className="mt-0.5 text-xs text-stone sm:text-sm">
                          {formatPrice(product.price)}
                          <span className="text-stone-light"> c/u</span>
                        </p>

                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-0.5 rounded-lg border border-stone-light/30">
                            <button
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-l-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-charcoal active:bg-stone-light/40 sm:h-8 sm:w-8"
                              aria-label="Reducir cantidad"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="flex h-7 w-8 items-center justify-center text-xs font-medium text-charcoal sm:h-8">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              className="flex h-7 w-7 items-center justify-center rounded-r-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-charcoal active:bg-stone-light/40 sm:h-8 sm:w-8"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-terracotta-600 sm:text-base">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-stone-light/20 px-3 py-2 sm:px-4">
                      {note && !isOpen ? (
                        <button
                          onClick={() => setNoteOpen((p) => ({ ...p, [product.id]: true }))}
                          className="flex w-full items-center gap-1.5 text-xs text-stone transition-colors hover:text-terracotta-600"
                        >
                          <PenLine className="h-3 w-3 shrink-0" />
                          <span className="truncate">{note}</span>
                        </button>
                      ) : isOpen || note ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={note}
                            onChange={(e) => updateNote(product.id, e.target.value)}
                            placeholder="Nota para tu pedido..."
                            className="min-w-0 flex-1 rounded-lg border border-stone-light/30 bg-white px-3 py-1.5 text-xs text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
                          />
                          <button
                            onClick={() => {
                              if (!note) setNoteOpen((p) => ({ ...p, [product.id]: false }));
                            }}
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-stone-light transition-colors hover:bg-stone-light/20 hover:text-charcoal"
                          >
                            {note ? (
                              <PenLine className="h-3 w-3" />
                            ) : (
                              <span className="text-sm leading-none">×</span>
                            )}
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setNoteOpen((p) => ({ ...p, [product.id]: true }))}
                          className="flex items-center gap-1.5 text-xs text-stone-light transition-colors hover:text-terracotta-600"
                        >
                          <PenLine className="h-3 w-3" />
                          Agregar nota
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-fit rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-6 lg:sticky lg:top-24">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-6 w-1 shrink-0 rounded-full bg-terracotta-400" />
                <h2 className="font-display text-lg text-charcoal">Resumen</h2>
              </div>

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

              <div className="mt-5 border-t border-stone-light/20 pt-5">
                <div className="flex items-start gap-2">
                  <div className="mt-0.5 h-4 w-0.5 shrink-0 rounded-full bg-terracotta-400" />
                  <h3 className="font-display text-sm text-charcoal">Datos del pedido</h3>
                </div>

                <div className="mt-3 space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-stone-light/30 bg-white px-3 pt-5 pb-1.5 text-xs text-charcoal transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
                    />
                    <span className="pointer-events-none absolute left-3 top-1.5 text-[10px] font-medium text-stone transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:text-stone-light peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-medium peer-focus:text-charcoal">
                      De (tu nombre)
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      placeholder=" "
                      className="peer w-full rounded-lg border border-stone-light/30 bg-white px-3 pt-5 pb-1.5 text-xs text-charcoal transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
                    />
                    <span className="pointer-events-none absolute left-3 top-1.5 text-[10px] font-medium text-stone transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:text-stone-light peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-medium peer-focus:text-charcoal">
                      Para (quien recibe)
                    </span>
                  </div>
                  <div>
                    <DatePicker value={deliveryDate} onChange={setDeliveryDate} />
                  </div>
                  <div>
                    <div className="flex gap-2">
                      {['Envío', 'Retiro'].map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setDeliveryMethod(m)}
                          className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                            deliveryMethod === m
                              ? 'border-terracotta-400 bg-terracotta-50 text-terracotta-600'
                              : 'border-stone-light/30 text-stone hover:border-stone-light/60 hover:text-charcoal'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-medium text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98]"
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

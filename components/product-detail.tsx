'use client';

import { useCartStore } from '@/lib/cart-store';
import { useToastStore } from '@/lib/toast-store';
import { formatPrice } from '@/lib/utils';
import type { Category, Product } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronRight, Share2, ShoppingBag, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ImageWithSkeleton } from './image-with-skeleton';

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
  category: Category | null;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0));
  const addToast = useToastStore((s) => s.addToast);
  const [added, setAdded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: product.name, url });
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleAdd = () => {
    addItem(product.id);
    addToast(`${product.name} agregado al carrito`);
    setAdded(true);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setLightboxOpen(false);
  }, []);

  useEffect(() => {
    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, handleKeyDown]);

  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <button
            onClick={() => setLightboxOpen(true)}
            className="w-full overflow-hidden rounded-2xl bg-stone-light/20 ring-1 ring-stone-light/30 transition-all duration-300 hover:ring-terracotta-300/50 hover:shadow-lg hover:shadow-stone/10 text-left cursor-zoom-in"
          >
            <div className="aspect-square">
              <ImageWithSkeleton
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full"
                priority
              />
            </div>
          </button>

          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-3">
              <div className="mt-1.5 h-8 w-1 shrink-0 rounded-full bg-terracotta-400" />
              <h1 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <p className="mt-4 leading-relaxed text-stone">{product.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <p className="font-display text-3xl text-terracotta-600">
                {formatPrice(product.price)}
              </p>
              <button
                onClick={handleShare}
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl border border-stone-light/40 text-stone transition-all hover:border-terracotta-300 hover:bg-terracotta-50 hover:text-terracotta-600"
                aria-label="Compartir producto"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-sage-500" />
                ) : (
                  <Share2 className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="mt-8">
              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.97 }}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-all ${
                  added
                    ? 'bg-sage-500 text-white'
                    : 'bg-terracotta-500 text-white hover:bg-terracotta-600 hover:shadow-lg hover:shadow-terracotta-500/25'
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    Agregado
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    Añadir al carrito
                  </>
                )}
              </motion.button>

              {itemCount > 0 && (
                <Link
                  href="/carrito"
                  className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-terracotta-200 bg-white px-6 text-sm font-medium text-terracotta-600 transition-all hover:border-terracotta-300 hover:bg-terracotta-50"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Ir al carrito
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-stone-light/40 pt-12">
            <div className="flex items-start gap-3">
              <div className="mt-1.5 h-8 w-1 shrink-0 rounded-full bg-terracotta-400" />
              <div>
                <h2 className="font-display text-2xl text-charcoal">También te puede gustar</h2>
                <p className="mt-0.5 text-sm text-stone">Descubre más productos</p>
              </div>
            </div>
            <hr className="mt-4 border-stone-light/30" />

            <div className="mt-8 grid gap-6 grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 6).map((rp) => (
                <Link key={rp.id} href={`/producto/${rp.id}`} className="group">
                  <div className="mb-3 overflow-hidden rounded-2xl bg-stone-light/20 ring-1 ring-stone-light/30 transition-all duration-300 group-hover:ring-terracotta-300/50 group-hover:shadow-lg group-hover:shadow-stone/10">
                    <div className="aspect-square">
                      <ImageWithSkeleton
                        src={rp.image}
                        alt={rp.name}
                        width={400}
                        height={400}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                  <h3 className="font-display text-base text-charcoal">{rp.name}</h3>
                  <p className="mt-0.5 font-medium text-terracotta-600">{formatPrice(rp.price)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={1200}
                height={1200}
                className="h-auto max-h-[90vh] w-full object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

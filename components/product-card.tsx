'use client';

import { useCartStore } from '@/lib/cart-store';
import { useToastStore } from '@/lib/toast-store';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types';
import { ImageWithSkeleton } from './image-with-skeleton';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id);
    addToast(`${product.name} agregado al carrito`);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group transition-all duration-300 hover:-translate-y-0.5"
    >
      <Link href={`/producto/${product.id}`} aria-label={product.name}>
        <div className="relative overflow-hidden rounded-2xl bg-stone-light/20 ring-1 ring-stone-light/30 transition-all duration-300 group-hover:ring-terracotta-300/50 group-hover:shadow-lg group-hover:shadow-stone/10">
          <div className="aspect-square overflow-hidden">
            <ImageWithSkeleton
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full"
            />
          </div>

          <button
            onClick={handleAdd}
            className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-lg backdrop-blur-sm transition-all hover:bg-terracotta-500 hover:text-white hover:shadow-terracotta-500/30 active:scale-90"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <Plus className="h-4.5 w-4.5" />
          </button>
        </div>
      </Link>

      <Link href={`/producto/${product.id}`}>
        <div className="mt-2 space-y-0.5 text-left">
          <h3 className="font-display text-base leading-tight text-charcoal">{product.name}</h3>
          <p className="font-semibold text-terracotta-600">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </motion.article>
  );
}

'use client';

import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';
import type { Category, Product } from '@/types';
import { motion } from 'framer-motion';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function ProductDetailClient({
  product,
  relatedProducts,
  category,
}: {
  product: Product;
  relatedProducts: Product[];
  category: Category | null;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="overflow-hidden rounded-2xl bg-stone-light/20 max-md:max-h-[400px] md:max-h-[550px]">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="flex flex-col justify-center">
            {category && (
              <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-terracotta-100 px-3 py-1 text-xs font-medium text-terracotta-600">
                {category.name}
              </span>
            )}

            <h1 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-4 leading-relaxed text-stone">{product.description}</p>

            <p className="mt-6 font-display text-3xl text-terracotta-600">
              {formatPrice(product.price)}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center gap-0.5 rounded-xl border border-stone-light/60">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center text-stone transition-colors hover:text-charcoal"
                  aria-label="Reducir cantidad"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex h-10 w-10 items-center justify-center text-sm font-medium text-charcoal">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center text-stone transition-colors hover:text-charcoal"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <motion.button
                onClick={handleAdd}
                whileTap={{ scale: 0.97 }}
                className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-xl px-6 text-sm font-medium transition-all ${
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
                    Añadir al carrito — {formatPrice(product.price * quantity)}
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20 border-t border-stone-light/40 pt-12">
            <h2 className="font-display text-2xl text-charcoal">También te puede gustar</h2>
            <p className="mt-1 text-sm text-stone">
              Descubre más productos{' '}
              {category ? `de ${category.name.toLowerCase()}` : 'relacionados'}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.slice(0, 3).map((rp) => (
                <Link key={rp.id} href={`/producto/${rp.id}`} className="group">
                  <div className="mb-3 overflow-hidden rounded-2xl bg-stone-light/20">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.name}
                        width={400}
                        height={400}
                        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
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
    </main>
  );
}

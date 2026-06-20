'use client'

import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/cart-store'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function ProductCard({
  product,
  index,
}: {
  product: Product
  index: number
}) {
  const addItem = useCartStore((s) => s.addItem)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="relative mb-3">
        <Link href={`/producto/${product.id}`}>
          <div className="overflow-hidden rounded-2xl bg-stone-light/20">
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                onLoad={() => setImgLoaded(true)}
                className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  imgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </Link>

        <button
          onClick={() => addItem(product.id)}
          className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-lg backdrop-blur-sm transition-all hover:bg-terracotta-500 hover:text-white hover:shadow-terracotta-500/30 active:scale-90"
          aria-label={`Añadir ${product.name} al carrito`}
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <Link href={`/producto/${product.id}`}>
        <div className="space-y-1 px-1">
          <h3 className="font-display text-lg leading-tight text-charcoal">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-sm text-stone">{product.description}</p>
          <p className="pt-1 font-semibold text-terracotta-600">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

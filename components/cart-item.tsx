'use client'

import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/lib/cart-store'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'

export function CartItem({ product }: { product: Product }) {
  const { items, updateQuantity, removeItem } = useCartStore()
  const item = items.find((i) => i.productId === product.id)
  if (!item) return null

  return (
    <div className="flex gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-stone-light/30">
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          width={80}
          height={80}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <h4 className="truncate text-sm font-medium text-charcoal">
            {product.name}
          </h4>
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
              onClick={() => updateQuantity(product.id, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-charcoal"
              aria-label="Reducir cantidad"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="flex h-8 w-8 items-center justify-center text-sm font-medium text-charcoal">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center text-stone transition-colors hover:text-charcoal"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <span className="text-sm font-semibold text-terracotta-600">
            {formatPrice(product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}

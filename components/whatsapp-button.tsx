'use client'

import type { Product } from '@/types'
import { formatPrice, generateWhatsAppMessage } from '@/lib/utils'
import { getProducts } from '@/lib/products'
import { useCartStore } from '@/lib/cart-store'
import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

const WHATSAPP_NUMBER = '573001234567'

export function WhatsAppButton() {
  const { items, closeDrawer } = useCartStore()
  const [productMap, setProductMap] = useState<Record<string, Product>>({})

  useEffect(() => {
    getProducts().then((all) => {
      const map: Record<string, Product> = {}
      all.forEach((p) => { map[p.id] = p })
      setProductMap(map)
    })
  }, [])

  const cartProducts = items
    .map((item) => {
      const product = productMap[item.productId]
      return product ? { product, quantity: item.quantity } : null
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null)

  const total = cartProducts.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0,
  )

  const handleCheckout = () => {
    const message = generateWhatsAppMessage(cartProducts, total)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    closeDrawer()
    window.open(url, '_blank')
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={items.length === 0}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-600 text-sm font-medium text-white transition-all hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
    >
      <MessageCircle className="h-5 w-5" />
      Enviar pedido por WhatsApp — {formatPrice(total)}
    </button>
  )
}

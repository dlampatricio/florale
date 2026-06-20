'use client'

import { useCartStore } from '@/lib/cart-store'
import { getProductById } from '@/lib/products'
import { CartItem } from './cart-item'
import { WhatsAppButton } from './whatsapp-button'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag } from 'lucide-react'

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer } = useCartStore()

  const cartProducts = items
    .map((item) => {
      const product = getProductById(item.productId)
      return product ? { product, quantity: item.quantity } : null
    })
    .filter((item) => item !== null)

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <motion.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          <motion.aside
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-stone-light/60 px-5 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-charcoal" />
                <h2 className="font-display text-lg text-charcoal">Tu Pedido</h2>
                <span className="rounded-full bg-terracotta-100 px-2 py-0.5 text-xs font-medium text-terracotta-600">
                  {items.length}
                </span>
              </div>
              <button
                onClick={closeDrawer}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-stone-light/40"
                aria-label="Cerrar carrito"
              >
                <X className="h-4 w-4 text-stone" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="h-12 w-12 text-stone-light" />
                  <p className="text-sm text-stone">Tu carrito está vacío</p>
                  <p className="text-xs text-stone-light">
                    Agrega productos para empezar tu pedido
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartProducts.map(({ product }) => (
                    <CartItem key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            {cartProducts.length > 0 && (
              <div className="border-t border-stone-light/60 px-5 py-4">
                <WhatsAppButton />
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

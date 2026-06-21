'use client'

import { supabase } from '@/lib/supabase'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'
import { motion } from 'framer-motion'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadProducts = useCallback(async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProducts(data as Product[])
    setLoading(false)
  }, [])

  useEffect(() => { loadProducts() }, [loadProducts])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto? Esta acción no se puede deshacer.')) return
    setDeleting(id)
    await supabase.from('products').delete().eq('id', id)
    setProducts((p) => p.filter((pr) => pr.id !== id))
    setDeleting(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-terracotta-500 border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal">Productos</h1>
          <p className="mt-1 text-sm text-stone">{products.length} productos registrados</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex h-10 items-center gap-1.5 rounded-lg bg-terracotta-500 px-4 text-sm font-medium text-white transition-all hover:bg-terracotta-600"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-stone-light/30">
          <p className="text-lg font-medium text-charcoal">No hay productos todavía</p>
          <p className="mt-1 text-sm text-stone">Agregá tu primer producto para empezar</p>
          <Link
            href="/admin/products/new"
            className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg bg-terracotta-500 px-4 text-sm font-medium text-white transition-all hover:bg-terracotta-600"
          >
            <Plus className="h-4 w-4" />
            Crear producto
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-stone-light/30"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-light/20">
                {product.image && (
                  <Image src={product.image} alt={product.name} width={56} height={56} className="h-full w-full object-cover" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-charcoal">{product.name}</p>
                <p className="text-xs text-stone">{product.categoryId === 'cajas' ? 'Cajas de Regalo' : 'Desayunos'} · {formatPrice(product.price)}</p>
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-terracotta-600"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  disabled={deleting === product.id}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-stone transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                  {deleting === product.id ? (
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

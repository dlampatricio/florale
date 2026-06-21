'use client'

import { supabase } from '@/lib/supabase'
import { useToastStore } from '@/lib/toast-store'
import type { Category } from '@/types'
import { motion } from 'framer-motion'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)
  const addToast = useToastStore((s) => s.addToast)

  const loadCategories = useCallback(async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    if (data) setCategories(data as Category[])
    setLoading(false)
  }, [])

  useEffect(() => { loadCategories() }, [loadCategories])

  const handleDelete = async (id: string) => {
    const cat = categories.find((c) => c.id === id)
    if (!confirm(`¿Eliminar la categoría "${cat?.name}"? Los productos no se eliminarán pero quedarán sin categoría.`)) return
    setDeleting(id)
    const { error } = await supabase.from('categories').delete().eq('id', id)
    if (error) {
      addToast('Error: ' + error.message)
    } else {
      setCategories((p) => p.filter((c) => c.id !== id))
      addToast('Categoría eliminada')
    }
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
          <h1 className="font-display text-2xl text-charcoal">Categorías</h1>
          <p className="mt-1 text-sm text-stone">{categories.length} categorías registradas</p>
        </div>
        <Link
          href="/admin/categories/new"
          className="flex h-10 items-center gap-1.5 rounded-lg bg-terracotta-500 px-4 text-sm font-medium text-white transition-all hover:bg-terracotta-600"
        >
          <Plus className="h-4 w-4" />
          Nueva categoría
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-stone-light/30">
          <p className="text-lg font-medium text-charcoal">No hay categorías todavía</p>
          <p className="mt-1 text-sm text-stone">Creá tu primera categoría para organizar los productos</p>
          <Link
            href="/admin/categories/new"
            className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg bg-terracotta-500 px-4 text-sm font-medium text-white transition-all hover:bg-terracotta-600"
          >
            <Plus className="h-4 w-4" />
            Crear categoría
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-stone-light/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-terracotta-100">
                <span className="text-sm font-bold text-terracotta-600">{cat.name.charAt(0)}</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-charcoal">{cat.name}</p>
                {cat.description && (
                  <p className="truncate text-xs text-stone">{cat.description}</p>
                )}
              </div>

              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/categories/${cat.id}/edit`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-terracotta-600"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <button
                  onClick={() => handleDelete(cat.id)}
                  disabled={deleting === cat.id}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-stone transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                >
                  {deleting === cat.id ? (
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

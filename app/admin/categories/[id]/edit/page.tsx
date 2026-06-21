'use client'

import { supabase } from '@/lib/supabase'
import { useToastStore } from '@/lib/toast-store'
import type { Category } from '@/types'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('categories').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error || !data) {
        router.push('/admin/categories')
        return
      }
      const c = data as Category
      setName(c.name)
      setDescription(c.description)
      setLoading(false)
    })
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) {
      addToast('El nombre es obligatorio')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('categories').update({ name, description }).eq('id', id)
    setSaving(false)

    if (error) {
      addToast('Error: ' + error.message)
    } else {
      addToast('Categoría actualizada correctamente')
      router.push('/admin/categories')
    }
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
      <Link
        href="/admin/categories"
        className="mb-4 inline-flex items-center gap-1 text-sm text-stone transition-colors hover:text-terracotta-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a categorías
      </Link>

      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-light/30">
        <h1 className="font-display text-xl text-charcoal">Editar categoría</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-charcoal">Nombre *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-charcoal">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex h-11 items-center gap-2 rounded-lg bg-terracotta-500 px-6 text-sm font-medium text-white transition-all hover:bg-terracotta-600 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <Link
              href="/admin/categories"
              className="text-sm text-stone underline-offset-2 hover:text-charcoal hover:underline"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

'use client'

import { supabase } from '@/lib/supabase'
import { useToastStore } from '@/lib/toast-store'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewCategoryPage() {
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) {
      addToast('El nombre es obligatorio')
      return
    }

    setSaving(true)
    const id = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')

    const { error } = await supabase.from('categories').insert({ id, name, description })
    setSaving(false)

    if (error) {
      addToast('Error: ' + error.message)
    } else {
      addToast('Categoría creada correctamente')
      router.push('/admin/categories')
    }
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
        <h1 className="font-display text-xl text-charcoal">Nueva categoría</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="mb-1 block text-xs font-medium text-charcoal">Nombre *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Ramos Personalizados"
              required
              className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-charcoal">Descripción</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descripción breve de la categoría..."
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
              {saving ? 'Guardando...' : 'Guardar categoría'}
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

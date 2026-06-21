'use client'

import { ImageUpload } from '@/components/image-upload'
import { supabase } from '@/lib/supabase'
import { useToastStore } from '@/lib/toast-store'
import type { Category } from '@/types'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function NewProductPage() {
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)

  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase.from('categories').select('*').order('name').then(({ data }) => {
      if (data) {
        setCategories(data as Category[])
        if (data.length > 0) setCategoryId(data[0].id)
      }
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price) {
      addToast('Completá los campos obligatorios')
      return
    }

    setSaving(true)
    const id = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '')

    const { error } = await supabase.from('products').insert({
      id,
      name,
      description,
      price: parseInt(price, 10),
      category_id: categoryId,
      image,
    })

    setSaving(false)

    if (error) {
      addToast('Error: ' + error.message)
    } else {
      addToast('Producto creado correctamente')
      router.push('/admin/products')
    }
  }

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-stone transition-colors hover:text-terracotta-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a productos
      </Link>

      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-light/30">
        <h1 className="font-display text-xl text-charcoal">Nuevo producto</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-charcoal">Nombre *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Box de Corazón con Peluche"
                required
                className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-charcoal">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción del producto..."
                rows={3}
                className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-charcoal">Precio (UYU) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="1850"
                required
                className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-charcoal">Categoría</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-charcoal">Imagen</label>
              <ImageUpload value={image} onChange={setImage} />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex h-11 items-center gap-2 rounded-lg bg-terracotta-500 px-6 text-sm font-medium text-white transition-all hover:bg-terracotta-600 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Guardando...' : 'Guardar producto'}
            </button>
            <Link
              href="/admin/products"
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

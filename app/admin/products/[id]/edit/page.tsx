'use client'

import { ImageUpload } from '@/components/image-upload'
import { supabase } from '@/lib/supabase'
import { useToastStore } from '@/lib/toast-store'
import type { Category, Product } from '@/types'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const addToast = useToastStore((s) => s.addToast)

  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [image, setImage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      supabase.from('products').select('*').eq('id', id).single(),
      supabase.from('categories').select('*').order('name'),
    ]).then(([prodRes, catRes]) => {
      if (prodRes.error || !prodRes.data) {
        router.push('/admin')
        return
      }
      const p = prodRes.data as Product
      setName(p.name)
      setDescription(p.description)
      setPrice(p.price.toString())
      setCategoryId(p.categoryId)
      setImage(p.image)
      if (catRes.data) setCategories(catRes.data as Category[])
      setLoading(false)
    })
  }, [id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price) {
      addToast('Completá los campos obligatorios')
      return
    }

    setSaving(true)
    const { error } = await supabase.from('products').update({
      name,
      description,
      price: parseInt(price, 10),
      category_id: categoryId,
      image,
    }).eq('id', id)

    setSaving(false)

    if (error) {
      addToast('Error: ' + error.message)
    } else {
      addToast('Producto actualizado correctamente')
      router.push('/admin')
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
        href="/admin"
        className="mb-4 inline-flex items-center gap-1 text-sm text-stone transition-colors hover:text-terracotta-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al panel
      </Link>

      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-light/30">
        <h1 className="font-display text-xl text-charcoal">Editar producto</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-charcoal">Nombre *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-charcoal">Descripción</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
            <Link
              href="/admin"
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

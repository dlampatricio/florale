'use client'

import { supabase } from '@/lib/supabase'
import { ImageWithSkeleton } from './image-with-skeleton'
import { ImageUp, Loader2, X } from 'lucide-react'
import { useRef, useState } from 'react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabase.storage
      .from('product-images')
      .upload(fileName, file)

    if (error) {
      alert('Error al subir la imagen: ' + error.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('product-images')
      .getPublicUrl(fileName)

    onChange(urlData.publicUrl)
    setUploading(false)
  }

  return (
    <div>
      {value ? (
        <div className="relative inline-block overflow-hidden rounded-lg">
          <ImageWithSkeleton
            src={value}
            alt="Preview"
            width={200}
            height={200}
            className="h-32 w-32"
          />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal/60 text-white transition-colors hover:bg-charcoal/80"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : uploading ? (
        <div className="flex h-32 items-center justify-center gap-2 rounded-lg border-2 border-dashed border-stone-light/40 text-sm text-stone">
          <Loader2 className="h-5 w-5 animate-spin" />
          Subiendo...
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-32 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-stone-light/40 text-sm text-stone transition-colors hover:border-terracotta-400/50 hover:text-terracotta-600"
        >
          <ImageUp className="h-5 w-5" />
          Subir imagen
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  )
}

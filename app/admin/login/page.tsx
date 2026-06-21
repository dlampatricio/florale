'use client'

import { supabase } from '@/lib/supabase'
import { Package } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message === 'Invalid login credentials'
        ? 'Correo o contraseña incorrectos'
        : 'Error al iniciar sesión. Intenta de nuevo.')
    } else {
      router.push('/admin')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-100">
            <Package className="h-6 w-6 text-terracotta-600" />
          </div>
          <h1 className="font-display text-xl text-charcoal">Panel de Administración</h1>
          <p className="mt-1 text-sm text-stone">Inicia sesión para gestionar tus productos</p>
        </div>

        <form onSubmit={handleLogin} className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-light/30">
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-charcoal">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
                className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-charcoal">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-lg border border-stone-light/30 bg-white px-3 py-2.5 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-xs text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex h-11 w-full items-center justify-center rounded-lg bg-terracotta-500 text-sm font-medium text-white transition-all hover:bg-terracotta-600 disabled:opacity-50"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>

          <div className="mt-4 text-center">
            <Link href="/" className="text-xs text-stone underline-offset-2 hover:text-terracotta-600 hover:underline">
              Volver a la tienda
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

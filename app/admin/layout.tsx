'use client'

import { supabase } from '@/lib/supabase'
import { LogOut, Package } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<boolean>(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else {
        setSession(!!data.session)
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session)
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    })

    return () => listener?.subscription.unsubscribe()
  }, [pathname, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-terracotta-500 border-t-transparent" />
      </div>
    )
  }

  const isLoginPage = pathname === '/admin/login'

  return (
    <div className="min-h-screen bg-stone-50">
      {session && !isLoginPage && (
        <header className="sticky top-0 z-40 border-b border-stone-200 bg-white">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-charcoal">
              <Package className="h-4 w-4 text-terracotta-500" />
              Panel de Administración
            </Link>
            <div className="flex items-center gap-3">
              <Link href="/" className="text-xs text-stone underline-offset-2 hover:underline">
                Ver tienda
              </Link>
              <button
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push('/admin/login')
                }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-stone transition-colors hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-3.5 w-3.5" />
                Salir
              </button>
            </div>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  )
}

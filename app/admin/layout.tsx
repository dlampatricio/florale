'use client';

import { supabase } from '@/lib/supabase';
import { ExternalLink, LayoutList, LogOut, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else {
        setSession(!!data.session);
      }
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(!!session);
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => listener?.subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-terracotta-500 border-t-transparent" />
      </div>
    );
  }

  const isLoginPage = pathname === '/admin/login';

  return (
    <div className="min-h-screen bg-stone-50">
      {session && !isLoginPage && (
        <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-3 sm:px-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 text-sm font-medium text-charcoal"
            >
              <Package className="h-4 w-4 text-terracotta-500" />
              <span className="inline">Administración</span>
            </Link>

            <nav className="flex items-center gap-0.5 sm:gap-1">
              <Link
                href="/admin/products"
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-terracotta-600 sm:w-auto sm:gap-1.5 sm:px-2.5"
              >
                <Package className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Productos</span>
                <span className="absolute -bottom-6 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-md bg-charcoal px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 sm:hidden">
                  Productos
                </span>
              </Link>

              <Link
                href="/admin/categories"
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-terracotta-600 sm:w-auto sm:gap-1.5 sm:px-2.5"
              >
                <LayoutList className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Categorías</span>
                <span className="absolute -bottom-6 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-md bg-charcoal px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 sm:hidden">
                  Categorías
                </span>
              </Link>

              <Link
                href="/"
                target="_blank"
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-charcoal sm:w-auto sm:gap-1.5 sm:px-2.5"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Tienda</span>
                <span className="absolute -bottom-6 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-md bg-charcoal px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 sm:hidden">
                  Ver tienda
                </span>
              </Link>

              <button
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push('/admin/login');
                }}
                className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-stone transition-colors hover:bg-red-50 hover:text-red-600 sm:w-auto sm:gap-1.5 sm:px-2.5"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">Salir</span>
                <span className="absolute -bottom-6 left-1/2 z-[100] -translate-x-1/2 whitespace-nowrap rounded-md bg-charcoal px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 sm:hidden">
                  Cerrar sesión
                </span>
              </button>
            </nav>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
    </div>
  );
}

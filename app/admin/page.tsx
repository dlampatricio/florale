'use client';

import { supabase } from '@/lib/supabase';
import { ExternalLink, LayoutList, Package, Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  useEffect(() => {
    Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
    ]).then(([prodRes, catRes]) => {
      if (prodRes.count !== null) setProductCount(prodRes.count);
      if (catRes.count !== null) setCategoryCount(catRes.count);
    });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl text-charcoal">Panel de Administración</h1>
        <p className="mt-1 text-sm text-stone">Gestiona los productos y categorías de Florale</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/products"
          className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-light/30 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-terracotta-300/50"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-terracotta-100 transition-colors group-hover:bg-terracotta-200">
            <Package className="h-5 w-5 text-terracotta-600" />
          </div>
          <h2 className="font-display text-lg text-charcoal">Productos</h2>
          <p className="mt-0.5 text-sm text-stone">
            {productCount} {productCount === 1 ? 'producto registrado' : 'productos registrados'}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-terracotta-600 transition-colors group-hover:text-terracotta-700">
            <Plus className="h-3 w-3" />
            Administrar
          </span>
        </Link>

        <Link
          href="/admin/categories"
          className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-light/30 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-terracotta-300/50"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-sage-100 transition-colors group-hover:bg-sage-200">
            <LayoutList className="h-5 w-5 text-sage-600" />
          </div>
          <h2 className="font-display text-lg text-charcoal">Categorías</h2>
          <p className="mt-0.5 text-sm text-stone">
            {categoryCount}{' '}
            {categoryCount === 1 ? 'categoría registrada' : 'categorías registradas'}
          </p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sage-600 transition-colors group-hover:text-sage-700">
            <LayoutList className="h-3 w-3" />
            Gestionar
          </span>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="group rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-light/30 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-terracotta-300/50 sm:col-span-2 lg:col-span-1"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-stone-100 transition-colors group-hover:bg-stone-200">
            <ExternalLink className="h-5 w-5 text-stone-600" />
          </div>
          <h2 className="font-display text-lg text-charcoal">Ver Tienda</h2>
          <p className="mt-0.5 text-sm text-stone">Mira cómo se ve el catálogo desde el frente</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-stone-600 transition-colors group-hover:text-stone-700">
            <ExternalLink className="h-3 w-3" />
            Abrir tienda
          </span>
        </Link>
      </div>
    </div>
  );
}

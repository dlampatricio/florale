'use client';

import { ImageWithSkeleton } from '@/components/image-with-skeleton';
import { supabase } from '@/lib/supabase';
import { useToastStore } from '@/lib/toast-store';
import { formatPrice } from '@/lib/utils';
import type { Category, Product } from '@/types';
import { motion } from 'framer-motion';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const addToast = useToastStore((s) => s.addToast);

  const loadData = useCallback(async () => {
    const [prodRes, catRes] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name'),
    ]);
    if (prodRes.data) {
      setProducts(
        (prodRes.data as Record<string, unknown>[]).map((p) => ({
          id: String(p.id),
          name: String(p.name),
          description: String(p.description || ''),
          price: Number(p.price),
          image: String(p.image || ''),
          categoryId: String(p.category_id),
        }))
      );
    }
    if (catRes.data) setCategories(catRes.data as Category[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    setDeleting(id);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      addToast('Error al eliminar: ' + error.message);
    } else {
      setProducts((p) => p.filter((pr) => pr.id !== id));
      addToast('Producto eliminado');
    }
    setDeleting(null);
  };

  const filtered = search.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    : products;

  const grouped = categories
    .map((cat) => ({
      category: cat,
      products: filtered.filter((p) => p.categoryId === cat.id),
    }))
    .filter((g) => g.products.length > 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-terracotta-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-charcoal">Productos</h1>
          <p className="mt-1 text-sm text-stone">{products.length} productos registrados</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex h-10 items-center gap-1.5 rounded-lg bg-terracotta-500 px-4 text-sm font-medium text-white transition-all hover:bg-terracotta-600"
        >
          <Plus className="h-4 w-4" />
          Nuevo producto
        </Link>
      </div>

      <div className="relative mb-6">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-light" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar producto por nombre..."
          className="w-full rounded-lg border border-stone-light/30 bg-white py-2.5 pl-9 pr-3 text-sm text-charcoal placeholder:text-stone-light transition-colors focus:border-terracotta-400 focus:outline-none focus:ring-1 focus:ring-terracotta-400/20"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-stone-light/30">
          {search.trim() ? (
            <>
              <p className="text-lg font-medium text-charcoal">Sin resultados</p>
              <p className="mt-1 text-sm text-stone">No hay productos que coincidan con "{search}"</p>
            </>
          ) : (
            <>
              <p className="text-lg font-medium text-charcoal">No hay productos todavía</p>
              <p className="mt-1 text-sm text-stone">Agrega tu primer producto para empezar</p>
              <Link
                href="/admin/products/new"
                className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg bg-terracotta-500 px-4 text-sm font-medium text-white transition-all hover:bg-terracotta-600"
              >
                <Plus className="h-4 w-4" />
                Crear producto
              </Link>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(({ category, products: catProducts }) => (
            <div key={category.id}>
              <div className="mb-3 flex items-center gap-2">
                <div className="h-5 w-1 rounded-full bg-terracotta-400" />
                <h2 className="font-display text-lg text-charcoal">{category.name}</h2>
                <span className="rounded-full bg-stone-light/20 px-2 py-0.5 text-xs text-stone">
                  {catProducts.length}
                </span>
              </div>
              <div className="space-y-2">
                {catProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-stone-light/30"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-stone-light/20">
                      {product.image && (
                        <ImageWithSkeleton
                          src={product.image}
                          alt={product.name}
                          width={56}
                          height={56}
                          className="h-full w-full"
                        />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-charcoal">{product.name}</p>
                      <p className="text-xs text-stone">{formatPrice(product.price)}</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-stone transition-colors hover:bg-stone-light/20 hover:text-terracotta-600"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={deleting === product.id}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-stone transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                      >
                        {deleting === product.id ? (
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

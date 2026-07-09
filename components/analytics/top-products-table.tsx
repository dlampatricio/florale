'use client'

import type { TopProductItem } from '@/lib/analytics'
import { Skeleton } from '@/components/skeleton'
import Link from 'next/link'

interface TopProductsTableProps {
  data: TopProductItem[]
  loading?: boolean
}

export function TopProductsTable({ data, loading }: TopProductsTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
        <Skeleton className="mb-4 h-4 w-36" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    )
  }

  if (data.length === 0) return null

  const maxVisitors = Math.max(...data.map((d) => d.visitors), 1)

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
      <h3 className="mb-4 font-display text-sm font-medium text-charcoal">Productos más vistos</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.id}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <Link
                href={`/producto/${item.slug}`}
                target="_blank"
                className="truncate text-charcoal hover:text-terracotta-600 transition-colors"
              >
                {item.name}
              </Link>
              <span className="ml-2 shrink-0 font-medium text-stone">
                {Intl.NumberFormat('es-UY').format(item.visitors)}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-stone-light/30">
              <div
                className="h-full rounded-full bg-terracotta-400 transition-all"
                style={{ width: `${(item.visitors / maxVisitors) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import type { BreakdownItem } from '@/lib/analytics'
import { Skeleton } from '@/components/skeleton'

interface TopPagesTableProps {
  data: BreakdownItem[]
  loading?: boolean
}

export function TopPagesTable({ data, loading }: TopPagesTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-light/30">
        <Skeleton className="mb-4 h-4 w-28" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-12" />
          </div>
        ))}
      </div>
    )
  }

  const maxVisitors = Math.max(...data.map((d) => d.visitors), 1)

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-light/30">
      <h3 className="mb-4 font-display text-sm font-medium text-charcoal">Páginas más visitadas</h3>
      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="truncate text-charcoal">{item.label === '/' ? 'Inicio' : item.label}</span>
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

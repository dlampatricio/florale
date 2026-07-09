'use client'

import { useState } from 'react'
import { Skeleton } from '@/components/skeleton'
import { Info } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: number
  subtitle?: string
  loading?: boolean
  tooltip?: string
}

export function MetricCard({ label, value, subtitle, loading, tooltip }: MetricCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
        <Skeleton className="mb-2 h-3 w-20" />
        <Skeleton className="mb-1 h-8 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
      <div className="flex items-center gap-1.5">
        <p className="text-xs font-medium uppercase tracking-wider text-stone">{label}</p>
        {tooltip && (
          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-stone hover:bg-stone-light/30 hover:text-charcoal transition-colors"
              aria-label={`Más información sobre ${label}`}
            >
              <Info className="h-3 w-3" />
            </button>
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg bg-charcoal px-3 py-2 text-xs leading-relaxed text-white shadow-lg max-sm:left-0 max-sm:w-52 max-sm:-translate-x-[calc(50%-12px)]">
                {tooltip}
                <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-charcoal" />
              </div>
            )}
          </div>
        )}
      </div>
      <p className="mt-1 font-display text-2xl text-charcoal">
        {Intl.NumberFormat('es-UY').format(value)}
      </p>
      {subtitle && <p className="mt-0.5 text-xs text-stone">{subtitle}</p>}
    </div>
  )
}

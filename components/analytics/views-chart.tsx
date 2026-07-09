'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import type { TimeseriesPoint } from '@/lib/analytics'
import { Skeleton } from '@/components/skeleton'

interface ViewsChartProps {
  data: TimeseriesPoint[]
  loading?: boolean
  compact?: boolean
}

export function ViewsChart({ data, loading, compact }: ViewsChartProps) {
  const safeData = Array.isArray(data) ? data : []

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
        <Skeleton className="mb-4 h-4 w-32" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    )
  }

  if (safeData.length === 0) {
    return null
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
      <h3 className="mb-4 font-display text-sm font-medium text-charcoal">
        Visitas y Visitantes
      </h3>
      <div className={compact ? 'h-32' : 'h-64'}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={safeData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis
              dataKey="date"
              tickFormatter={(iso: string) => {
                const d = new Date(iso)
                return d.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' })
              }}
              tick={{ fontSize: 11, fill: '#78716c' }}
              interval={safeData.length > 10 ? 'preserveStartEnd' : undefined}
            />
            <YAxis tick={{ fontSize: 11, fill: '#78716c' }} />
            <Tooltip
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #e7e5e4',
                fontSize: '0.8rem',
              }}
              labelFormatter={(label: unknown) => {
                const d = new Date(label as string)
                return d.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' })
              }}
            />
            <Area
              type="monotone"
              dataKey="pageviews"
              name="Páginas vistas"
              stroke="#d46c4a"
              fill="#d46c4a"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              name="Visitantes"
              stroke="#7c9a7c"
              fill="#7c9a7c"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import type { BreakdownItem } from '@/lib/analytics'
import { Skeleton } from '@/components/skeleton'

interface BrowsersChartProps {
  data: BreakdownItem[]
  loading?: boolean
}

const COLORS = ['#d46c4a', '#7c9a7c', '#e8c17a', '#a8a29e', '#8b7e74', '#c4b5a5']

export function BrowsersChart({ data, loading }: BrowsersChartProps) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-light/30">
        <Skeleton className="mb-4 h-4 w-28" />
        <div className="flex items-center justify-center">
          <Skeleton className="h-40 w-40 rounded-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-stone-light/30">
      <h3 className="mb-4 font-display text-sm font-medium text-charcoal">Navegadores</h3>
      <div className="flex h-48 items-center justify-center gap-4">
        <div className="h-full w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="visitors"
                nameKey="label"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '0.5rem',
                  border: '1px solid #e7e5e4',
                  fontSize: '0.8rem',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-1.5 text-xs">
          {data.slice(0, 5).map((item, i) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-charcoal">{item.label}</span>
              <span className="text-stone">
                {Intl.NumberFormat('es-UY').format(item.visitors)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

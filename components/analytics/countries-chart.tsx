'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import type { BreakdownItem } from '@/lib/analytics'
import { Skeleton } from '@/components/skeleton'

interface CountriesChartProps {
  data: BreakdownItem[]
  loading?: boolean
}

export function CountriesChart({ data, loading }: CountriesChartProps) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
        <Skeleton className="mb-4 h-4 w-28" />
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-stone-light/30 sm:p-5">
      <h3 className="mb-4 font-display text-sm font-medium text-charcoal">Países</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 5, left: 5, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#78716c' }} />
            <YAxis
              type="category"
              dataKey="label"
              tick={{ fontSize: 11, fill: '#78716c' }}
              width={30}
              tickFormatter={(v: string) => v}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #e7e5e4',
                fontSize: '0.8rem',
              }}
            />
            <Bar dataKey="visitors" name="Visitantes" fill="#d46c4a" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

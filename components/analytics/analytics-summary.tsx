'use client'

import { useEffect, useState } from 'react'
import { MetricCard } from './metric-card'
import { ViewsChart } from './views-chart'
import type { AnalyticsSummary, TimeseriesPoint } from '@/lib/analytics'
import Link from 'next/link'
import { BarChart3 } from 'lucide-react'

const TOOLTIPS: Record<string, string> = {
  'Visitas (30d)': 'Cada vez que alguien entra a cualquier página de la tienda cuenta como una visita. Si una misma persona ve 3 páginas, son 3 visitas.',
  'Visitantes (30d)': 'Personas diferentes que entraron a la tienda en los últimos 30 días. Una misma persona cuenta una sola vez.',
  'Promedio/día': 'En promedio, cuántas páginas se ven por día. Te ayuda a saber si está creciendo el interés en tu tienda.',
}

export function AnalyticsSummary() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const now = new Date()
    const from = new Date(now.getTime() - 30 * 86400000).toISOString()
    const to = now.toISOString()

    Promise.all([
      fetch(`/api/analytics/summary?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
        .then((r) => r.json())
        .catch(() => null),
      fetch(`/api/analytics/timeseries?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
        .then((r) => r.json())
        .catch(() => []),
    ])
      .then(([s, t]) => {
        if (s && !s.error) setSummary(s)
        if (Array.isArray(t)) setTimeseries(t)
      })
      .finally(() => setLoading(false))
  }, [])

  const isEmpty =
    summary &&
    summary.totalPageviews === 0 &&
    summary.totalVisitors === 0 &&
    !loading

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg text-charcoal">Analíticas</h2>
        <Link
          href="/admin/analytics"
          className="inline-flex items-center gap-1 text-xs font-medium text-terracotta-600 hover:text-terracotta-700"
        >
          <BarChart3 className="h-3 w-3" />
          Ver analíticas completas
        </Link>
      </div>

      {isEmpty && (
        <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          <p className="font-medium">Aún no hay datos</p>
          <p className="mt-0.5 text-amber-700">
            Las estadísticas aparecen cuando alguien visita la tienda. Puede tardar unos minutos.
          </p>
        </div>
      )}

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <MetricCard
          label="Visitas (30d)"
          value={summary?.totalPageviews ?? 0}
          subtitle="Total de páginas vistas"
          tooltip={TOOLTIPS['Visitas (30d)']}
          loading={loading}
        />
        <MetricCard
          label="Visitantes (30d)"
          value={summary?.totalVisitors ?? 0}
          subtitle="Personas que entraron a la tienda"
          tooltip={TOOLTIPS['Visitantes (30d)']}
          loading={loading}
        />
        <MetricCard
          label="Promedio/día"
          value={summary?.avgPerDay ?? 0}
          subtitle="Páginas vistas por día en promedio"
          tooltip={TOOLTIPS['Promedio/día']}
          loading={loading}
        />
      </div>

      <ViewsChart data={timeseries} loading={loading} compact />
    </div>
  )
}

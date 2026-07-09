'use client'

import type { AnalyticsSummary, BreakdownItem, TimeseriesPoint, TopProductItem } from '@/lib/analytics'
import { useCallback, useEffect, useState } from 'react'
import { BrowsersChart } from './browsers-chart'
import { CountriesChart } from './countries-chart'
import { MetricCard } from './metric-card'
import { TopProductsTable } from './top-products-table'
import { TopReferrersTable } from './top-referrers-table'
import { ViewsChart } from './views-chart'

type Range = '24h' | '7d' | '30d'

function getRangeDates(range: Range): { from: string; to: string } {
  const now = new Date()
  const ms = range === '24h' ? 86400000 : range === '7d' ? 7 * 86400000 : 30 * 86400000
  const from = new Date(now.getTime() - ms)
  return { from: from.toISOString(), to: now.toISOString() }
}

const TOOLTIPS: Record<string, string> = {
  Visitas: 'Cada vez que alguien entra a cualquier página de la tienda cuenta como una visita. Si una misma persona ve 3 páginas, son 3 visitas.',
  Visitantes: 'Personas diferentes que entraron a la tienda. Una misma persona cuenta una sola vez, sin importar cuántas páginas vea.',
  'Promedio/día': 'En promedio, cuántas páginas se ven por día. Te ayuda a saber si está creciendo el interés en tu tienda.',
  Período: 'Cantidad de días que se están analizando en este informe.',
}

export function AnalyticsDashboard() {
  const [range, setRange] = useState<Range>('30d')
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [timeseries, setTimeseries] = useState<TimeseriesPoint[]>([])
  const [topProducts, setTopProducts] = useState<TopProductItem[]>([])
  const [topReferrers, setTopReferrers] = useState<BreakdownItem[]>([])
  const [countries, setCountries] = useState<BreakdownItem[]>([])
  const [browsers, setBrowsers] = useState<BreakdownItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async (range: Range) => {
    setLoading(true)
    const { from, to } = getRangeDates(range)
    const params = `from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`

    try {
      const safeJson = async (url: string) =>
        fetch(url).then((r) => r.json()).catch(() => null)

      const [s, t, p, r, c, b] = await Promise.all([
        safeJson(`/api/analytics/summary?${params}`),
        safeJson(`/api/analytics/timeseries?${params}`),
        safeJson(`/api/analytics/top-products?limit=10&${params}`),
        safeJson(`/api/analytics/breakdown?dimension=referrerHostname&limit=10&${params}`),
        safeJson(`/api/analytics/breakdown?dimension=country&limit=10&${params}`),
        safeJson(`/api/analytics/breakdown?dimension=browserName&limit=10&${params}`),
      ])

      if (s && !s.error) setSummary(s)
      if (Array.isArray(t)) setTimeseries(t)
      if (Array.isArray(p)) setTopProducts(p)
      if (Array.isArray(r)) setTopReferrers(r)
      if (Array.isArray(c)) setCountries(c)
      if (Array.isArray(b)) setBrowsers(b)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(range)
  }, [range, fetchData])

  const ranges: { value: Range; label: string }[] = [
    { value: '24h', label: '24 horas' },
    { value: '7d', label: '7 días' },
    { value: '30d', label: '30 días' },
  ]

  const isEmpty =
    summary &&
    summary.totalPageviews === 0 &&
    summary.totalVisitors === 0 &&
    !loading

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-charcoal">Analíticas</h1>
          <p className="mt-1 text-sm text-stone">Estadísticas de tráfico del sitio web</p>
        </div>
        <div className="flex gap-1 rounded-lg bg-stone-light/20 p-0.5">
          {ranges.map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                range === r.value
                  ? 'bg-white text-charcoal shadow-sm'
                  : 'text-stone hover:text-charcoal'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {isEmpty && (
        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 text-sm text-amber-800">
          <p className="font-medium">Aún no hay datos de analíticas</p>
          <p className="mt-1 text-amber-700">
            Las estadísticas pueden tardar unos minutos en aparecer después de que alguien visite la tienda.
            Si el problema persiste, verificá que Vercel Web Analytics esté activado en el proyecto.
          </p>
        </div>
      )}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Visitas"
          value={summary?.totalPageviews ?? 0}
          subtitle="Total de páginas vistas"
          tooltip={TOOLTIPS.Visitas}
          loading={loading}
        />
        <MetricCard
          label="Visitantes"
          value={summary?.totalVisitors ?? 0}
          subtitle="Personas que entraron a la tienda"
          tooltip={TOOLTIPS.Visitantes}
          loading={loading}
        />
        <MetricCard
          label="Promedio/día"
          value={summary?.avgPerDay ?? 0}
          subtitle="Páginas vistas por día en promedio"
          tooltip={TOOLTIPS['Promedio/día']}
          loading={loading}
        />
        <MetricCard
          label="Período"
          value={summary?.days ?? 0}
          subtitle="Días analizados en este informe"
          tooltip={TOOLTIPS.Período}
          loading={loading}
        />
      </div>

      <div className="mb-6">
        <ViewsChart data={timeseries} loading={loading} />
      </div>

      <div className="mb-6 grid gap-6 md:grid-cols-2">
        <TopProductsTable data={topProducts} loading={loading} />
        <TopReferrersTable data={topReferrers} loading={loading} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CountriesChart data={countries} loading={loading} />
        <BrowsersChart data={browsers} loading={loading} />
      </div>
    </div>
  )
}

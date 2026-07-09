import { NextResponse } from 'next/server'

const VERCEL_API = 'https://api.vercel.com/v1/query/web-analytics/visits/aggregate'

interface VercelAnalyticsResponse {
  version: number
  query: {
    since: string
    until: string
    groupBy?: string[]
    limit: number
    filter?: string
  }
  data: Record<string, string | number>[]
}

export interface AnalyticsSummary {
  totalVisitors: number
  totalPageviews: number
  avgPerDay: number
  days: number
}

export interface TimeseriesPoint {
  date: string
  visitors: number
  pageviews: number
}

export interface BreakdownItem {
  label: string
  visitors: number
  pageviews: number
}

export interface TopProductItem {
  id: string
  name: string
  slug: string
  visitors: number
  pageviews: number
}

function getConfig() {
  const token = process.env.VERCEL_ACCESS_TOKEN
  const teamId = 'team_fF9OwnxmyBMtJ3yiHzsloHJx'
  const projectId = 'prj_oX1qh10xgsHIMQhKInWt3ybMDhHc'

  if (!token) throw new Error('VERCEL_ACCESS_TOKEN not configured')

  return { token, teamId, projectId }
}

async function fetchAnalytics(params: URLSearchParams): Promise<VercelAnalyticsResponse> {
  const { token, teamId, projectId } = getConfig()
  params.set('projectId', projectId)
  params.set('teamId', teamId)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const res = await fetch(`${VERCEL_API}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })

    if (!res.ok) {
      const body = await res.text()
      throw new Error(`Vercel API error (${res.status}): ${body}`)
    }

    return res.json()
  } finally {
    clearTimeout(timeout)
  }
}

export async function getSummary(from: string, to: string): Promise<AnalyticsSummary> {
  const params = new URLSearchParams({ since: from, until: to, by: 'day', limit: '100' })
  const result = await fetchAnalytics(params)

  const totals = result.data.reduce<{ totalVisitors: number; totalPageviews: number }>(
    (acc, day) => ({
      totalVisitors: acc.totalVisitors + Number(day.visitors ?? 0),
      totalPageviews: acc.totalPageviews + Number(day.pageviews ?? 0),
    }),
    { totalVisitors: 0, totalPageviews: 0 },
  )

  const days = result.data.length || 1

  return {
    ...totals,
    avgPerDay: Math.round(totals.totalPageviews / days),
    days,
  }
}

export async function getTimeseries(from: string, to: string): Promise<TimeseriesPoint[]> {
  const params = new URLSearchParams({ since: from, until: to, by: 'day', limit: '100' })
  const result = await fetchAnalytics(params)

  return result.data.map((day) => ({
    date: day.timestamp as string,
    visitors: Number(day.visitors ?? 0),
    pageviews: Number(day.pageviews ?? 0),
  }))
}

export async function getBreakdown(
  dimension: string,
  from: string,
  to: string,
  limit = 10,
): Promise<BreakdownItem[]> {
  const params = new URLSearchParams({
    since: from,
    until: to,
    by: dimension,
    limit: limit.toString(),
  })
  const result = await fetchAnalytics(params)

  return result.data.map((item) => {
    const label = (item[dimension] as string) || '(direct)'
    return {
      label: label || '(direct)',
      visitors: Number(item.visitors) || 0,
      pageviews: Number(item.pageviews) || 0,
    }
  })
}

export async function getTopProducts(from: string, to: string, limit = 10): Promise<TopProductItem[]> {
  const breakdown = await getBreakdown('requestPath', from, to, 50)

  const productPaths = breakdown.filter((item) => {
    const parts = item.label.split('/')
    return parts[1] === 'producto' && parts[2]
  })

  if (productPaths.length === 0) return []

  const ids = [...new Set(productPaths.map((p) => p.label.split('/')[2]))]

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let productMap: Map<string, { name: string; slug: string }> = new Map()

  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const orFilters = ids.map((id) => `slug.eq.${encodeURIComponent(id)}`).join(',')
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/products?select=name,slug&or=(${orFilters})`,
        {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          cache: 'no-store',
        },
      )
      if (res.ok) {
        const products = await res.json()
        for (const p of products) {
          productMap.set(p.slug, { name: p.name, slug: p.slug })
        }
      }
    } catch {
      // fallback: use slug as name
    }
  }

  return productPaths
    .map((item) => {
      const slug = item.label.split('/')[2]
      const product = productMap.get(slug)
      return {
        id: slug,
        name: product?.name || slug.replace(/-/g, ' '),
        slug,
        visitors: item.visitors,
        pageviews: item.pageviews,
      }
    })
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, limit)
}

export function errorResponse(error: unknown) {
  const message = error instanceof Error ? error.message : 'Internal server error'
  return NextResponse.json({ error: message }, { status: 500 })
}

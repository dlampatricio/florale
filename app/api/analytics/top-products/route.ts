import { NextRequest, NextResponse } from 'next/server'
import { getTopProducts, errorResponse } from '@/lib/analytics'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Math.min(Number(searchParams.get('limit')) || 10, 50)
    const from = searchParams.get('from') || new Date(Date.now() - 30 * 86400000).toISOString()
    const to = searchParams.get('to') || new Date().toISOString()

    const data = await getTopProducts(from, to, limit)
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    })
  } catch (error) {
    return errorResponse(error)
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getBreakdown, errorResponse } from '@/lib/analytics'

const VALID_DIMENSIONS = ['country', 'requestPath', 'browserName', 'referrerHostname']

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dimension = searchParams.get('dimension') || 'requestPath'
    const limit = Math.min(Number(searchParams.get('limit')) || 10, 50)
    const from = searchParams.get('from') || new Date(Date.now() - 30 * 86400000).toISOString()
    const to = searchParams.get('to') || new Date().toISOString()

    if (!VALID_DIMENSIONS.includes(dimension)) {
      return NextResponse.json(
        { error: `Invalid dimension. Valid: ${VALID_DIMENSIONS.join(', ')}` },
        { status: 400 },
      )
    }

    const data = await getBreakdown(dimension, from, to, limit)
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
    })
  } catch (error) {
    return errorResponse(error)
  }
}

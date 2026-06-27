import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { ReactElement } from 'react'

export const alt = 'Floralé — Regalos Artesanales'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadBackground(): Promise<string> {
  const buffer = await readFile(join(process.cwd(), 'public/background.png'))
  return `data:image/png;base64,${buffer.toString('base64')}`
}

async function loadFont(): Promise<ArrayBuffer> {
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'
  const css = await fetch(cssUrl).then((r) => r.text())
  const match = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)
  if (!match) throw new Error('Could not parse font URL from Google Fonts CSS')
  return fetch(match[1]).then((r) => r.arrayBuffer())
}

export async function getResources() {
  const [backgroundSrc, fontData] = await Promise.all([
    loadBackground(),
    loadFont(),
  ])
  return { backgroundSrc, fontData }
}

export function renderContent(backgroundSrc: string): ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(rgba(251,246,239,0.8), rgba(251,246,239,0.8)), url(${backgroundSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        style={{
          fontSize: 140,
          fontWeight: 400,
          color: '#2c2a26',
          fontFamily: '"Great Vibes"',
          lineHeight: 1,
        }}
      >
        Floralé
      </div>
    </div>
  )
}

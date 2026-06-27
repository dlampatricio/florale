import { ImageResponse } from 'next/og'
import { alt, size, contentType, getResources, renderContent } from './og-image-util'

export { alt, size, contentType }

export default async function Image() {
  const { backgroundSrc, fontData } = await getResources()

  return new ImageResponse(renderContent(backgroundSrc), {
    ...size,
    fonts: [
      {
        name: 'Great Vibes',
        data: fontData,
        style: 'normal',
        weight: 400,
      },
    ],
  })
}

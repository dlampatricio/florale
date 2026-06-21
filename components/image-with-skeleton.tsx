'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithSkeletonProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  priority?: boolean
  sizes?: string
  objectFit?: 'cover' | 'contain'
}

export function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className = '',
  priority,
  sizes,
  objectFit = 'cover',
}: ImageWithSkeletonProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-stone-light/30" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ objectFit, width: '100%', height: '100%' }}
      />
    </div>
  )
}

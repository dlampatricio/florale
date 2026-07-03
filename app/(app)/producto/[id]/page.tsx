import type { Metadata } from 'next'
import { getProductById, getProducts, getCategories } from '@/lib/products'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product-detail'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProductById(id)

  if (!product) {
    return { title: 'Producto no encontrado — Florale' }
  }

  return {
    title: `${product.name} — Florale`,
    description: product.description || 'Producto artesanal único en Florale.',
    alternates: {
      canonical: `/producto/${id}`,
    },
    openGraph: {
      title: `${product.name} — Florale`,
      description: product.description || 'Producto artesanal único en Florale.',
      images: product.image ? [{ url: product.image, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Florale`,
      description: product.description || 'Producto artesanal único en Florale.',
      images: product.image ? [product.image] : [],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, allProducts, allCategories] = await Promise.all([
    getProductById(id),
    getProducts(),
    getCategories(),
  ])

  if (!product) notFound()

  const relatedProducts = allProducts.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  )
  const category = allCategories.find((c) => c.id === product.categoryId)

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      category={category ?? null}
    />
  )
}

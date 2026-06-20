import { products, getProductById, categories } from '@/lib/products'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product-detail'

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const relatedProducts = products.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id,
  )
  const category = categories.find((c) => c.id === product.categoryId)

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      category={category ?? null}
    />
  )
}

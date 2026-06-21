import { getProductById, getProducts, getCategories } from '@/lib/products'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product-detail'

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

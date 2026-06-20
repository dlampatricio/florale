import { ProductGrid } from '@/components/product-grid'
import { products } from '@/lib/products'

export default function CatalogoPage() {
  return (
    <div className="bg-cream pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl leading-tight text-charcoal sm:text-4xl">
            Nuestra Colección
          </h1>
          <p className="mt-2 text-stone">
            Cada pieza está hecha a mano con los mejores materiales
          </p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}

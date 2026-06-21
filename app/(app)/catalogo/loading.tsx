import { ProductCardSkeleton } from '@/components/product-card-skeleton'
import { Skeleton } from '@/components/skeleton'

export default function CatalogoLoading() {
  return (
    <div className="bg-cream pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <Skeleton className="mx-auto h-12 w-64 sm:h-16 sm:w-80" />
          <div className="mt-3 flex items-center justify-center gap-2">
            <Skeleton className="h-px w-6" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-px w-6" />
          </div>
        </div>
      </div>

      <section className="bg-cream px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <div className="mb-6 flex items-start gap-3">
              <Skeleton className="mt-1.5 h-8 w-1 rounded-full" />
              <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="mt-1 h-4 w-72" />
              </div>
            </div>
            <Skeleton className="h-px w-full" />
            <div className="mt-8 grid gap-6 grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>

          <div className="mb-14">
            <div className="mb-6 flex items-start gap-3">
              <Skeleton className="mt-1.5 h-8 w-1 rounded-full" />
              <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="mt-1 h-4 w-72" />
              </div>
            </div>
            <Skeleton className="h-px w-full" />
            <div className="mt-8 grid gap-6 grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

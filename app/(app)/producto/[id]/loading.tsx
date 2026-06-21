import { Skeleton } from '@/components/skeleton'

export default function ProductDetailLoading() {
  return (
    <main className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <Skeleton className="aspect-square w-full rounded-2xl" />

          <div className="flex flex-col justify-center">
            <div className="flex items-start gap-3">
              <Skeleton className="mt-1.5 h-8 w-1 rounded-full" />
              <Skeleton className="h-10 w-64 sm:h-12 sm:w-80" />
            </div>

            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <Skeleton className="mt-6 h-10 w-36" />

            <Skeleton className="mt-8 h-12 w-full rounded-xl" />
          </div>
        </div>

        <section className="mt-20 border-t border-stone-light/40 pt-12">
          <div className="flex items-start gap-3">
            <Skeleton className="mt-1.5 h-8 w-1 rounded-full" />
            <div>
              <Skeleton className="h-8 w-56" />
              <Skeleton className="mt-1 h-4 w-44" />
            </div>
          </div>
          <Skeleton className="mt-4 h-px w-full" />

          <div className="mt-8 grid gap-6 grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-square w-full rounded-2xl" />
                <Skeleton className="mt-3 h-5 w-3/4" />
                <Skeleton className="mt-1 h-4 w-1/4" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

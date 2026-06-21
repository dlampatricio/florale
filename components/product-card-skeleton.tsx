import { Skeleton } from './skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-stone-light/30">
      <div className="aspect-square">
        <Skeleton className="h-full w-full rounded-none" />
      </div>
      <div className="space-y-2 p-3 sm:p-4">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </div>
  )
}

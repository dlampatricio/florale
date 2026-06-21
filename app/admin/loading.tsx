import { Skeleton } from '@/components/skeleton'

export default function AdminLoading() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Skeleton className="h-8 w-40" />
          <Skeleton className="mt-1 h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>

      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, g) => (
          <div key={g}>
            <div className="mb-3 flex items-center gap-2">
              <Skeleton className="h-5 w-1 rounded-full" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-6 rounded-full" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-stone-light/30">
                  <Skeleton className="h-14 w-14 shrink-0 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

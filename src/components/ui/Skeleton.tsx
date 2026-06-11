export function SkeletonCard() {
  return (
    <div className="bg-cream rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 bg-beige" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-beige rounded w-1/3" />
        <div className="h-5 bg-beige rounded w-3/4" />
        <div className="h-4 bg-beige rounded w-full" />
        <div className="h-4 bg-beige rounded w-1/2" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

export function SkeletonEventCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-sm">
      <div className="h-48 bg-beige" />
      <div className="p-6 space-y-3">
        <div className="flex gap-2">
          <div className="h-6 bg-beige rounded-full w-20" />
          <div className="h-6 bg-beige rounded-full w-24" />
        </div>
        <div className="h-6 bg-beige rounded w-2/3" />
        <div className="space-y-2">
          <div className="h-4 bg-beige rounded w-1/2" />
          <div className="h-4 bg-beige rounded w-1/3" />
          <div className="h-4 bg-beige rounded w-1/4" />
        </div>
        <div className="h-11 bg-beige rounded-xl w-full" />
      </div>
    </div>
  )
}

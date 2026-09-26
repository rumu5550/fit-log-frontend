export default function WorkoutCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl bg-[#15171D] border border-[#222630] overflow-hidden animate-pulse">
      <div className="w-full aspect-[16/10] bg-[#1C1F26]" />
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <div className="flex gap-2">
          <div className="w-16 h-4 bg-[#222630] rounded-full" />
          <div className="w-12 h-4 bg-[#222630] rounded-full" />
        </div>
        <div className="w-3/4 h-6 bg-[#222630] rounded-md" />
        <div className="w-1/2 h-4 bg-[#222630] rounded-md" />
        <div className="mt-auto pt-3 border-t border-[#1C1F26] flex items-center justify-between">
          <div className="w-14 h-3 bg-[#222630] rounded" />
          <div className="w-14 h-3 bg-[#222630] rounded" />
          <div className="w-10 h-3 bg-[#222630] rounded" />
        </div>
      </div>
    </div>
  );
}

export function LibrarySkeleton() {
  return (
    <section id="library" className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="w-48 h-8 bg-[#222630] rounded-md mb-2 animate-pulse" />
        <div className="w-64 h-4 bg-[#1C1F26] rounded-md animate-pulse" />
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
        <div className="w-full max-w-md h-10 bg-[#15171D] border border-[#222630] rounded-xl animate-pulse" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-16 h-7 bg-[#15171D] border border-[#222630] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <WorkoutCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}

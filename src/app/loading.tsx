
import { CalendarDays } from "lucide-react";

const Loading = () => {
  return (
    <main className="min-h-screen bg-[#f1f8f0] px-5 py-12 sm:px-8 dark:bg-[#17251c]">
      <div className="mx-auto max-w-6xl">

        {/* Loading Header */}
        <div className="mb-10">
          <div className="mb-4 h-6 w-40 animate-pulse rounded-full bg-[#dce8dc] dark:bg-[#34483b]" />

          <div className="h-10 w-64 animate-pulse rounded-md bg-[#dce8dc] dark:bg-[#34483b]" />

          <div className="mt-4 h-4 w-80 max-w-full animate-pulse rounded bg-[#dce8dc] dark:bg-[#34483b]" />
        </div>

        {/* Loading Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-[#dce8dc] bg-white dark:border-[#34483b] dark:bg-[#203329]"
            >
              {/* Image Skeleton */}
              <div className="h-52 w-full animate-pulse bg-[#e3ece3] dark:bg-[#2b4032]" />

              <div className="space-y-4 p-5">

                {/* Category */}
                <div className="h-6 w-24 animate-pulse rounded-full bg-[#e3ece3] dark:bg-[#2b4032]" />

                {/* Title */}
                <div className="h-5 w-3/4 animate-pulse rounded bg-[#e3ece3] dark:bg-[#2b4032]" />

                {/* Description */}
                <div className="space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-[#e3ece3] dark:bg-[#2b4032]" />
                  <div className="h-3 w-5/6 animate-pulse rounded bg-[#e3ece3] dark:bg-[#2b4032]" />
                </div>

                {/* Event Information */}
                <div className="space-y-3 border-t border-[#e5ece5] pt-4 dark:border-[#405345]">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#e3ece3] dark:bg-[#2b4032]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#e3ece3] dark:bg-[#2b4032]" />
                </div>

                {/* Button */}
                <div className="h-10 w-full animate-pulse rounded-md bg-[#dce8dc] dark:bg-[#34483b]" />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Message */}
        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-[#637268] dark:text-[#aab9ad]">
          <CalendarDays className="size-4 animate-pulse" />
          Loading community events...
        </div>

      </div>
    </main>
  );
};

export default Loading;

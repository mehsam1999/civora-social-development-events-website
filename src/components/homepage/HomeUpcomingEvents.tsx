import { IEvent } from "@/lib/types/events";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

const HomeUpcomingEvent = async () => {
  const res = await fetch("http://localhost:8000/recent-upcoming-events", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch upcoming events");
  }

  const events: IEvent[] = await res.json();

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main>
      {/* Recent Upcoming Events */}
      <section className="bg-[#f1f8f0] px-5 py-16 sm:px-8 dark:bg-[#17251c]">
        <div className="mx-auto max-w-6xl">

          {/* Section Header */}
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-[#34745b] dark:text-[#a8c9ae]">
                MAKE A DIFFERENCE
              </p>

              <h2 className="font-heading text-3xl font-medium text-[#173c2d] sm:text-4xl dark:text-[#edf4ed]">
                Recent Upcoming Events
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#637268] dark:text-[#aab9ad]">
                Discover meaningful community initiatives and become part of
                something positive.
              </p>
            </div>

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#194635] transition-colors hover:text-[#c15f3c] dark:text-[#a8c9ae]"
            >
              View All Events
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Events Grid */}
          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden rounded-xl border border-[#dce8dc] bg-white transition-all hover:-translate-y-1 hover:shadow-lg dark:border-[#34483b] dark:bg-[#203329]"
                >
                  {/* Event Image */}
                  <div className="relative h-52 w-full">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>

                  {/* Event Information */}
                  <div className="p-5">

                    <span className="inline-block rounded-full bg-[#e6f0eb] px-3 py-1 text-xs font-medium text-[#34745b] dark:bg-[#263a2d] dark:text-[#a8c9ae]">
                      {event.eventType}
                    </span>

                    <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-[#173c2d] dark:text-[#edf4ed]">
                      {event.title}
                    </h3>

                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#637268] dark:text-[#aab9ad]">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-[#e5ece5] pt-4 dark:border-[#405345]">

                      <div className="flex items-center gap-2 text-sm text-[#637268] dark:text-[#aab9ad]">
                        <CalendarDays className="size-4 text-[#34745b] dark:text-[#a8c9ae]" />
                        {formatDate(event.eventDate)}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#637268] dark:text-[#aab9ad]">
                        <MapPin className="size-4 text-[#34745b] dark:text-[#a8c9ae]" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    <Link
                      href={`/upcoming-events/${event._id}`}
                      className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#194635] text-sm font-medium text-white transition-colors hover:bg-[#14372a] dark:bg-[#8fa995] dark:text-[#17251c] dark:hover:bg-[#a5bba9]"
                    >
                      View Details
                      <ArrowRight className="size-4" />
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <CalendarDays className="mx-auto size-10 text-[#8fa995] dark:text-[#a8c9ae]" />
              <h3 className="mt-4 text-lg font-semibold text-[#173c2d] dark:text-[#edf4ed]">
                No Upcoming Events
              </h3>
              <p className="mt-2 text-sm text-[#637268] dark:text-[#aab9ad]">
                New community events will appear here soon.
              </p>
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default HomeUpcomingEvent;

import { IUserJoinedEvent } from "@/lib/types/userJoinedEvents";
import { CalendarDays, MapPin, ArrowRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const JoinEventDetailsCard = ({ joinedEvent }: { joinedEvent: IUserJoinedEvent }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="overflow-hidden rounded-lg border border-[#e0e9df] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-[#34483b] dark:bg-[#203329]">

      {/* Event Image */}
      <div className="relative aspect-[16/9] w-full bg-[#dce8dc] dark:bg-[#263a2d]">
        {joinedEvent.imageUrl && (
          <Image
            src={joinedEvent.imageUrl}
            alt={joinedEvent.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        )}

        {/* Event Category */}
        <span className="absolute left-3 top-3 rounded-sm bg-[#faf8f5] px-2 py-1 text-[9px] font-semibold tracking-wide text-[#173c2d] uppercase dark:bg-[#17251c]/95 dark:text-[#edf4ed]">
          {joinedEvent.eventType}
        </span>

        {/* Joined Status */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm bg-[#194635] px-2.5 py-1 text-[9px] font-medium text-white dark:bg-[#8fa995] dark:text-[#14251a]">
          <span className="size-1.5 rounded-full bg-[#a7d5b5] dark:bg-[#294b36]" />
          Joined
        </span>
      </div>

      {/* Event Information */}
      <div className="p-3">
        <h2 className="line-clamp-2 min-h-12 font-heading text-base font-semibold leading-6 text-[#1c2b23] dark:text-[#edf4ed]">
          {joinedEvent.title}
        </h2>

        {/* Event Date */}
        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#637268] dark:text-[#aab9ad]">
          <CalendarDays className="size-3.5 text-[#a45c42] dark:text-[#e99b87]" />
          <span>{formatDate(joinedEvent.eventDate)}</span>
        </div>

        {/* Event Location */}
        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#637268] dark:text-[#aab9ad]">
          <MapPin className="size-3.5 shrink-0 text-[#557b68] dark:text-[#8fa995]" />
          <span className="line-clamp-1">{joinedEvent.location}</span>
        </div>

        {/* Joined Date */}
        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#34745b] dark:text-[#a5bba9]">
          <Clock className="size-3.5 shrink-0" />
          <span>Joined on {formatDate(joinedEvent.joinedDate)}</span>
        </div>

        {/* View Details */}
        <Link
          href={`/upcoming-events/${joinedEvent.eventId}`}
          className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-sm bg-[#194635] text-[11px] font-medium text-white transition-colors hover:bg-[#14372a] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
        >
          View Details
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default JoinEventDetailsCard;

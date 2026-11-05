
import React from "react";
import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { IEvent } from "@/lib/types/events";
import JoinEventCard from "@/components/joined event card/JoinEventCard";

const organizers = [
  {
    category: "Donation",
    name: "Tanvir Ahmed",
    role: "Event Organizer · Mirpur Civic Action",
    imageUrl: "",
  },
  {
    category: "Plantation",
    name: "Nusrat Jahan",
    role: "Environmental Coordinator · Green Dhaka",
    imageUrl: "",
  },
  {
    category: "Blood Donation",
    name: "Farhan Rahman",
    role: "Blood Donation Coordinator · Life Savers",
    imageUrl: "",
  },
  {
    category: "Cleanup",
    name: "Mahmud Hasan",
    role: "Community Organizer · Clean Dhaka",
    imageUrl: "",
  },
  {
    category: "Education",
    name: "Sadia Islam",
    role: "Education Coordinator · Shikkha Foundation",
    imageUrl: "",
  },
  {
    category: "Community Support",
    name: "Ayesha Karim",
    role: "Community Organizer · Civic Care",
    imageUrl: "",
  },
];

const UpcomingEventDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/upcoming-events/${id}`);
  const event: IEvent = await res.json();

  const organizer =
    organizers.find((item) => item.category === event.eventType) || organizers[0];

  const eventDate = new Date(`${event.eventDate}T00:00:00`).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <main className="min-h-screen bg-[#f1f8f0] px-5 py-10 transition-colors sm:px-8 dark:bg-[#17251c]">
      <div className="mx-auto max-w-6xl">

        {/* Event Header */}
        <div className="mb-7">
          <p className="mb-2 inline-flex rounded-full bg-[#5a2b18] px-3 py-1 text-[9px] font-semibold tracking-wider text-white uppercase">
            {event.eventType}
          </p>

          <h1 className="font-heading text-3xl font-medium tracking-tight text-[#173c2d] sm:text-4xl dark:text-[#edf4ed]">
            {event.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#637268] dark:text-[#aab9ad]">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-[#a45c42] dark:text-[#e99b87]" />
              {eventDate}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-[#557b68] dark:text-[#8fa995]" />
              {event.location}
            </span>
          </div>
        </div>

        {/* Event Image */}
        <div className="relative mb-5 aspect-[16/7] w-full overflow-hidden rounded-lg bg-[#dce8dc] dark:bg-[#263a2d]">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1280px"
              className="object-cover"
            />
          )}
        </div>

        {/* Event Content */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_320px]">

          {/* Left Column */}
          <div className="space-y-5">

            {/* Description */}
            <section className="rounded-lg border border-[#e0e9df] bg-white p-5 transition-colors sm:p-6 dark:border-[#34483b] dark:bg-[#203329]">
              <h2 className="mb-4 font-heading text-xl font-semibold text-[#173c2d] dark:text-[#edf4ed]">
                Event Description
              </h2>

              <p className="whitespace-pre-line text-[13px] leading-7 text-[#536157] dark:text-[#bdcabe]">
                {event.description}
              </p>
            </section>

            {/* Event Organizer */}
            <section className="rounded-lg border border-[#e0e9df] bg-white p-5 transition-colors sm:p-6 dark:border-[#34483b] dark:bg-[#203329]">
              <p className="mb-4 text-[9px] font-semibold tracking-widest text-[#637268] uppercase dark:text-[#aab9ad]">
                Event Organizer
              </p>

              <div className="flex items-center gap-3">
                {organizer.imageUrl ? (
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={organizer.imageUrl}
                      alt={organizer.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-[#e4eee3] text-sm font-semibold text-[#1a4332] dark:bg-[#344d3b] dark:text-[#c5d8c7]">
                    {organizer.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-[#1c2b23] dark:text-[#edf4ed]">
                    {organizer.name}
                  </h3>

                  <p className="mt-1 text-[10px] text-[#78877c] dark:text-[#aab9ad]">
                    {organizer.role}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <JoinEventCard event={event} />
        </div>
      </div>
    </main>
  );
};

export default UpcomingEventDetails;

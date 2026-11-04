
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";

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

const UpcomingEventDetails = async ({params}: {params: Promise<{ id: string }>;}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/upcoming-events/${id}`);
  const data = await res.json();

  const organizer =
    organizers.find((item) => item.category === data.eventType) || organizers[0];

  const eventDate = new Date(`${data.eventDate}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#f1f8f0] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Event Header */}
        <div className="mb-7">
          <p className="mb-2 inline-flex rounded-full bg-[#5a2b18] px-3 py-1 text-[9px] font-semibold tracking-wider text-white uppercase">
            {data.eventType}
          </p>

          <h1 className="font-heading text-3xl font-medium tracking-tight text-[#173c2d] sm:text-4xl">
            {data.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#637268]">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" />
              {eventDate}
            </span>

            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {data.location}
            </span>
          </div>
        </div>

        {/* Event Image */}
        <div className="relative mb-5 aspect-[16/7] w-full overflow-hidden rounded-lg bg-[#dce8dc]">
          {data.imageUrl && (
            <Image
              src={data.imageUrl}
              alt={data.title}
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
            <section className="rounded-lg border border-[#e0e9df] bg-white p-5 sm:p-6">
              <h2 className="mb-4 font-heading text-xl font-semibold text-[#173c2d]">
                Event Description
              </h2>

              <p className="whitespace-pre-line text-[13px] leading-7 text-[#536157]">
                {data.description}
              </p>
            </section>

            {/* Event Organizer */}
            <section className="rounded-lg border border-[#e0e9df] bg-white p-5 sm:p-6">
              <p className="mb-4 text-[9px] font-semibold tracking-widest text-[#637268] uppercase">
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
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-[#e4eee3] text-sm font-semibold text-[#1a4332]">
                    {organizer.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")}
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-[#1c2b23]">
                    {organizer.name}
                  </h3>

                  <p className="mt-1 text-[10px] text-[#78877c]">
                    {organizer.role}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="rounded-lg border border-[#e0e9df] bg-white p-5">
            <h2 className="mb-4 font-heading text-lg font-semibold text-[#173c2d]">
              Join Event
            </h2>

            <div className="space-y-4 border-y border-[#edf1eb] py-4">

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 size-4 text-[#557b68]" />

                <div>
                  <p className="text-[9px] font-medium tracking-wider text-[#78877c] uppercase">
                    Date
                  </p>
                  <p className="mt-1 text-xs font-medium text-[#1c2b23]">
                    {eventDate}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 text-[#557b68]" />

                <div>
                  <p className="text-[9px] font-medium tracking-wider text-[#78877c] uppercase">
                    Location
                  </p>
                  <p className="mt-1 text-xs font-medium leading-5 text-[#1c2b23]">
                    {data.location}
                  </p>
                </div>
              </div>

            </div>

            <Link
              href="/join-events"
              className="mt-4 flex h-10 w-full items-center justify-center rounded-md bg-[#194635] text-xs font-medium text-white transition-colors hover:bg-[#14372a]"
            >
              Join This Event
            </Link>

            <p className="mt-3 text-center text-[10px] text-[#78877c]">
              Your participation can make a difference.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default UpcomingEventDetails;


"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PlusCircle,
  MapPin,
  CalendarDays,
  Eye,
  Loader2,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import EditEventDialog from "@/components/dialog/EditEventDialog";
import DeleteEventDialog from "@/components/dialog/DeleteEventDialog";
import { IUserManageEvent } from "@/lib/types/userManageEvents";
import { authClient } from "@/lib/auth-client";
import { notFound } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const ManageEventPage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [events, setEvents] = useState<IUserManageEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 5;

  // Fetch Events
  useEffect(() => {
    if (isPending) return;

    const fetchEvents = async () => {
      // JWT client components
      const token = await getTokenFromClient()
      
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/manage-events/${user?.email}`,{
            headers: {
            authorization: `Bearer ${token}`,
          }
          });

        if (!res.ok) {
          notFound()
        }

        const data: IUserManageEvent[] = await res.json();
        setEvents(data);
      } 
      catch (error) {
        console.log("Error fetching events:", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user?.email, isPending]);

  // Pagination
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;

  const currentEvents = events.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  // Page Change and Smooth Scroll to Top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Date Format
  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Category Colors
  const getCategoryStyle = (category: string) => {
    switch (category?.toLowerCase()) {
      case "donation":
        return "bg-[#cce9df] text-[#285b49] dark:bg-[#284b3e] dark:text-[#b8e0d0]";
      case "cleanup":
        return "bg-[#dcebdc] text-[#42634a] dark:bg-[#304b35] dark:text-[#c5dfc5]";
      case "plantation":
        return "bg-[#d8e9ce] text-[#42633b] dark:bg-[#344b2d] dark:text-[#c9e3b8]";
      case "education":
        return "bg-[#fce0d5] text-[#9a4c31] dark:bg-[#55392f] dark:text-[#f0bca7]";
      case "blood donation":
        return "bg-[#f7dada] text-[#a33e3e] dark:bg-[#542f32] dark:text-[#efb5b5]";
      case "community support":
        return "bg-[#e4e0f3] text-[#62528d] dark:bg-[#3e3855] dark:text-[#d0c5f0]";
      default:
        return "bg-[#e8ece7] text-[#59645b] dark:bg-[#344238] dark:text-[#c2cec4]";
    }
  };

  return (
    <main className="min-h-screen bg-[#ecf1e8] px-4 py-10 transition-colors sm:px-6 dark:bg-[#17251c]">
      <div className="mx-auto w-full max-w-6xl">

        {/* Heading */}
        <div className="mb-8">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e6f0eb] px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-[#34745b] dark:bg-[#263a2d] dark:text-[#a5bba9]">
              <span className="size-2 rounded-full bg-[#c15f3c]" />
              YOUR CONTRIBUTIONS
            </p>

            <h1 className="font-heading text-4xl font-medium tracking-tight text-[#173c2d] sm:text-5xl dark:text-[#edf4ed]">
              Manage Events
            </h1>
          </div>

          <div className="mt-2 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-6 text-[#637268] dark:text-[#aab9ad]">
              View, modify, and manage the civic grassroots initiatives you
              have registered across the municipal metropolitan zone.
            </p>

            <Link
              href="/create-events"
              className="flex h-10 w-full shrink-0 items-center justify-center rounded-sm bg-[#003b2e] px-6 text-xs font-medium text-white transition-colors hover:bg-[#24513c] sm:w-auto dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
            >
              <PlusCircle className="mr-2 size-4" />
              Create Event
            </Link>
          </div>
        </div>

        {/* Events Table */}
        <section className="overflow-hidden rounded-md border border-[#dce8dc] bg-white transition-colors dark:border-[#34483b] dark:bg-[#203329]">

          {/* Table Header */}
          <div className="hidden grid-cols-[minmax(220px,2fr)_100px_minmax(140px,1fr)_130px_190px] items-center gap-4 bg-[#edf5ed] px-4 py-4 text-[10px] font-semibold tracking-wider text-[#52645a] lg:grid dark:bg-[#263a2d] dark:text-[#bdcabe]">
            <p>EVENT INITIATIVE</p>
            <p>CATEGORY</p>
            <p>LOCATION</p>
            <p>EVENT DATE</p>
            <p className="text-center">ACTIONS</p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-56 items-center justify-center gap-2 text-sm text-[#637268] dark:text-[#aab9ad]">
              <Loader2 className="size-5 animate-spin" />
              Loading events...
            </div>
          ) : events.length > 0 ? (
            currentEvents.map((event) => (
              <div
                key={event._id}
                className="grid grid-cols-1 gap-4 border-t border-[#e6ede5] px-4 py-4 transition-colors hover:bg-[#fafcf9] lg:grid-cols-[minmax(220px,2fr)_100px_minmax(140px,1fr)_130px_190px] lg:items-center lg:gap-4 dark:border-[#34483b] dark:hover:bg-[#263a2d]"
              >
                {/* Event Initiative */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-sm bg-[#e0ebe3] dark:bg-[#34483b]">
                    {event.imageUrl ? (
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <CalendarDays className="size-5 text-[#8fa995]" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <h2 className="font-heading text-base font-semibold leading-5 text-[#163a2b] dark:text-[#edf4ed]">
                      {event.title}
                    </h2>

                    <p className="mt-1 line-clamp-1 text-[11px] leading-4 text-[#637268] dark:text-[#aab9ad]">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <span
                    className={`inline-flex whitespace-nowrap rounded-sm px-2 py-1 text-[9px] font-medium uppercase ${getCategoryStyle(
                      event.eventType
                    )}`}
                  >
                    {event.eventType}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-1.5 text-[11px] text-[#52645a] dark:text-[#bdcabe]">
                  <MapPin className="mt-0.5 size-3.5 shrink-0 text-[#557b68] dark:text-[#8fa995]" />
                  <span>{event.location}</span>
                </div>

                {/* Event Date */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#52645a] dark:text-[#bdcabe]">
                  <CalendarDays className="size-3.5 shrink-0 text-[#a45c42] dark:text-[#e99b87]" />
                  <span>{formatDate(event.eventDate)}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:justify-end">

                  {/* View */}
                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="flex h-8 items-center justify-center gap-1 rounded-sm border border-[#dce8dc] bg-white px-2.5 text-[11px] font-medium text-[#315d48] transition-colors hover:bg-[#edf5ed] dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#c5d8c7] dark:hover:bg-[#344d3b]"
                  >
                    <Eye className="size-3.5" />
                    View
                  </Link>

                  {/* Edit */}
                  <EditEventDialog data={event} />

                  {/* Delete */}
                  <DeleteEventDialog data={event}></DeleteEventDialog>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <div className="flex min-h-64 flex-col items-center justify-center px-5 text-center">
              <CalendarDays className="mb-3 size-9 text-[#8fa995]" />

              <h2 className="font-heading text-xl text-[#163a2b] dark:text-[#edf4ed]">
                No Events Found
              </h2>

              <p className="mt-2 max-w-sm text-xs leading-5 text-[#718075] dark:text-[#aab9ad]">
                No events are available yet. Create a new community event
                to get started.
              </p>

              <Link
                href="/create-events"
                className="mt-5 flex h-9 items-center gap-2 rounded-sm bg-[#003b2e] px-5 text-xs font-medium text-white transition-colors hover:bg-[#24513c] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
              >
                <PlusCircle className="size-4" />
                Create Event
              </Link>
            </div>
          )}
        </section>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-7 flex justify-center">
            <Pagination>
              <PaginationContent className="gap-2">

                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        handlePageChange(currentPage - 1);
                      }
                    }}
                    aria-disabled={currentPage === 1}
                    className={`h-8 rounded-md border border-[#dce5da] bg-[#f5f7f3] px-3 text-xs text-[#52645a] hover:bg-[#e8eee7] dark:border-[#405345] dark:bg-[#203329] dark:text-[#bdcabe] dark:hover:bg-[#34483b] ${
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }`}
                  />
                </PaginationItem>

                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      className={`size-8 rounded-md border text-xs ${
                        currentPage === page
                          ? "border-[#003b2e] bg-[#003b2e] text-white hover:bg-[#003b2e] hover:text-white dark:border-[#8fa995] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9] dark:hover:text-[#14251a]"
                          : "border-[#dce5da] bg-white text-[#52645a] hover:bg-[#e8eee7] dark:border-[#405345] dark:bg-[#203329] dark:text-[#bdcabe] dark:hover:bg-[#34483b]"
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        handlePageChange(currentPage + 1);
                      }
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={`h-8 rounded-md border border-[#dce5da] bg-white px-3 text-xs text-[#52645a] hover:bg-[#e8eee7] dark:border-[#405345] dark:bg-[#203329] dark:text-[#bdcabe] dark:hover:bg-[#34483b] ${
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }`}
                  />
                </PaginationItem>

              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageEventPage;


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  CalendarDays,
  ArrowRight,
  SlidersHorizontal,
  PlusCircle,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEvent } from "@/lib/types/events";
import { notFound } from "next/navigation";

const categories = [
  "All Categories",
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Education",
  "Community Support",
  "Other",
];

const UpcomingEventPage = () => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const eventsPerPage = 9;

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:8000/upcoming-events");

        if (!res.ok) {
          notFound()
        }

        const event: IEvent[] = await res.json();
        setEvents(event);
      } catch (error) {
        console.log("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter Events
  const filteredEvents = events.filter((event) => {
    const searchMatch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const locationMatch = event.location
      .toLowerCase()
      .includes(location.toLowerCase());

    const categoryMatch =
      category === "All Categories" || event.eventType === category;

    return searchMatch && locationMatch && categoryMatch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const startIndex = (currentPage - 1) * eventsPerPage;

  const currentEvents = filteredEvents.slice(
    startIndex,
    startIndex + eventsPerPage
  );

  // Page Change and Scroll to Top
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Clear Filters
  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("All Categories");
    setCurrentPage(1);
  };

  // Date Format
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-GB", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#ecf1e8] px-4 py-10 transition-colors sm:px-6 dark:bg-[#17251c]">

      {/* Heading */}
      <div className="mx-auto mb-8 flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="mx-auto w-full max-w-6xl">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e6f0eb] px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-[#34745b] dark:bg-[#263a2d] dark:text-[#a5bba9]">
              <span className="size-2 rounded-full bg-[#c15f3c]" />
              FUTURE COMMUNITY DRIVES
            </p>

            <h1 className="font-heading text-4xl font-medium tracking-tight text-[#173c2d] sm:text-5xl dark:text-[#edf4ed]">
              Upcoming Events
            </h1>
          </div>

          <div className="mt-2 w-full md:flex items-center justify-between gap-6">
            <p className="max-w-xl text-sm leading-6 text-[#637268] dark:text-[#aab9ad]">
              Discover verified volunteer initiatives scheduled for upcoming dates.
              Past events are automatically excluded so you can focus on active
              drives that need support.
            </p>

            <Link
              href="/create-events"
              className="mt-2 flex h-10 w-full shrink-0 items-center justify-center rounded-sm bg-[#003b2e] px-6 text-xs font-medium text-white transition-colors hover:bg-[#24513c] sm:mt-0 sm:w-auto dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
            >
              <PlusCircle className="mr-2 size-4" />
              Create Event
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <section className="mx-auto mt-7 max-w-6xl border-y border-[#dce8dc] py-3 dark:border-[#34483b]">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_1.2fr_1.2fr_auto]">

          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c] dark:text-[#8fa995]" />

            <Input
              placeholder="Search events..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="h-11 rounded-sm border-[#dce8dc] bg-white pl-9 text-xs dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
            />
          </div>

          {/* Category */}
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value ?? "All Categories");
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="!h-11 w-full rounded-md border-[#dce8dc] bg-white px-3 text-xs dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="size-3.5 text-[#78877c] dark:text-[#8fa995]" />
                <SelectValue placeholder="All Categories" />
              </div>
            </SelectTrigger>

            <SelectContent className="border-[#dce8dc] bg-white dark:border-[#405345] dark:bg-[#203329]">
              {categories.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="dark:text-[#edf4ed] dark:focus:bg-[#344d3b] dark:focus:text-[#edf4ed]"
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Location Search */}
          <div className="relative">
            <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c] dark:text-[#8fa995]" />

            <Input
              placeholder="Location (e.g. Mirpur, Dhanmondi)..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setCurrentPage(1);
              }}
              className="h-11 rounded-sm border-[#dce8dc] bg-white pl-9 text-xs dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
            />
          </div>

          {/* Clear Filters */}
          <Button
            type="button"
            variant="ghost"
            onClick={clearFilters}
            className="h-10 rounded-sm text-xs text-[#526b59] transition-colors hover:border-[#e0ebe3] hover:bg-[#e0ebe3] hover:text-[#1a4332] dark:text-[#c2cec4] dark:hover:border-[#405345] dark:hover:bg-[#263a2d] dark:hover:text-[#edf4ed]"
          >
            Clear Filters
          </Button>
        </div>
      </section>

      {/* Event Cards */}
      <section className="mx-auto mt-7 max-w-6xl">
        {loading ? (
          <div className="py-20 text-center text-sm text-[#68776b] dark:text-[#aab9ad]">
            Loading events...
          </div>
        ) : currentEvents.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {currentEvents.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-md border border-[#e0e9df] bg-white shadow-sm transition-colors hover:shadow-md dark:border-[#34483b] dark:bg-[#203329]"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-[#e0ebe3] dark:bg-[#263a2d]">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    width={640}
                    height={384}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute top-3 left-3 bg-white/95 px-2 py-1 text-[9px] font-bold tracking-wide text-[#234635] uppercase dark:bg-[#17251c]/95 dark:text-[#edf4ed]">
                    {event.eventType}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#66756a] dark:text-[#aab9ad]">
                    <CalendarDays className="size-3 text-[#a45c42] dark:text-[#e99b87]" />
                    {formatDate(event.eventDate)}
                  </div>

                  <h2 className="mt-1.5 line-clamp-1 font-heading text-lg font-semibold text-[#163a2b] dark:text-[#edf4ed]">
                    {event.title}
                  </h2>

                  <p className="mt-1 flex items-center gap-1.5 text-[10px] text-[#718075] dark:text-[#aab9ad]">
                    <MapPin className="size-3 shrink-0 text-[#557b68] dark:text-[#8fa995]" />
                    <span className="line-clamp-1">{event.location}</span>
                  </p>

                  <Link
                    href={`/upcoming-events/${event._id}`}
                    className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-sm bg-[#003b2e] text-xs font-medium text-white transition-colors hover:bg-[#24513c] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
                  >
                    View Details
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-64 flex-col items-center justify-center text-center">
            <Search className="mb-3 size-8 text-[#8fa995]" />

            <h2 className="font-heading text-xl text-[#163a2b] dark:text-[#edf4ed]">
              No Events Found
            </h2>

            <p className="mt-1 text-xs text-[#718075] dark:text-[#aab9ad]">
              Try another event name, category, or location.
            </p>

            <Button
              onClick={clearFilters}
              variant="outline"
              className="mt-4 rounded-sm dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed] dark:hover:bg-[#344d3b]"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-t border-[#dce8dc] pt-5 dark:border-[#34483b]">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="h-8 rounded-sm border-[#dce8dc] text-xs dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed] dark:hover:bg-[#344d3b]"
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  size="sm"
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => handlePageChange(page)}
                  className={`size-8 rounded-sm p-0 text-xs ${
                    currentPage === page
                      ? "bg-[#003b2e] text-white hover:bg-[#24513c] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
                      : "border-[#dce8dc] dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed] dark:hover:bg-[#344d3b]"
                  }`}
                >
                  {page}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="h-8 rounded-sm border-[#dce8dc] text-xs dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed] dark:hover:bg-[#344d3b]"
            >
              Next
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default UpcomingEventPage;

import JoinEventDetailsCard from "@/components/joined event card/JoinEventDetailsCard";
import { auth } from "@/lib/auth";
import { IUserJoinedEvent } from "@/lib/types/userJoinedEvents";
import { ArrowRight, CalendarDays } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const JoinedEventButtonPage = async() => {
    const session = await auth.api.getSession({
    headers: await headers() 
})
    const user = session?.user

    const res= await fetch(`http://localhost:8000/joined-event/${user?.email}`)
    const joinedEvents:IUserJoinedEvent[] = await res.json()

return (
  <main className="min-h-screen bg-[#f1f8f0] px-5 py-10 sm:px-8">
    <div className="mx-auto w-full max-w-6xl">

      {/* Page Header */}
      <div className="mb-8">
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e6f0eb] px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-[#34745b]">
            <span className="size-2 rounded-full bg-[#c15f3c]" />
            YOUR COMMUNITY JOURNEY
          </p>

          <h1 className="font-heading text-4xl font-medium tracking-tight text-[#173c2d] sm:text-5xl">
            Joined Events
          </h1>
        </div>

        <div className="mt-2 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-[#637268]">
            Keep track of the community initiatives you&apos;ve joined across Dhaka.
          </p>
        </div>
      </div>

      {/* Joined Events Grid */}
      {joinedEvents.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {joinedEvents.map((joinedEvent) => (
            <JoinEventDetailsCard
              joinedEvent={joinedEvent}
              key={joinedEvent._id}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex min-h-64 flex-col items-center justify-center text-center">

          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-[#e6f0eb]">
            <CalendarDays className="size-7 text-[#34745b]" />
          </div>

          <h2 className="font-heading text-xl font-semibold text-[#173c2d]">
            No Joined Events Yet
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#78877c]">
            You haven&apos;t joined any community events yet. Explore upcoming
            events and become part of something meaningful.
          </p>

          <Link
            href="/upcoming-events"
            className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#194635] px-5 text-xs font-medium text-white transition-colors hover:bg-[#14372a]"
          >
            Explore Events
            <ArrowRight className="size-4" />
          </Link>

        </div>
      )}

    </div>
  </main>
);
};

export default JoinedEventButtonPage;
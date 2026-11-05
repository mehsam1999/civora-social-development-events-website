"use client"
import { authClient } from "@/lib/auth-client";
import { IEvent } from "@/lib/types/events";
import { CalendarDays, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const JoinEventCard = ({event}:{event:IEvent}) => {
    const router = useRouter();
    const { data: session } = authClient.useSession()
    const user = session?.user

    const handleJoinedEvent = async () => {

    if (!user) {
        toast.error("Please login first to join this event!");
        router.push("/login");
        return;
    }

    const data = {
        username: user.name,
        email: user.email,
        eventId: event._id,
        title: event.title,
        description: event.description,
        eventType: event.eventType,
        eventDate: event.eventDate,
        imageUrl: event.imageUrl,
        location: event.location,
        joinedDate: new Date().toISOString().split("T")[0],
    };

    try {
        const res = await fetch("http://localhost:8000/joined-events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const joinedEvent = await res.json();

        if (res.ok) {
            console.log(joinedEvent);
            toast.success("You have successfully joined the event!");
        } else {
            toast.error(joinedEvent.message || "Failed to join the event!");
        }
    } catch (error) {
        console.error("Error joining event:", error);
        toast.error("Something went wrong. Please try again.");
    }
};
    return (
        <div>
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
                        {event.eventDate}
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
                        {event.location}
                    </p>
                    </div>
                </div>

                </div>

                <button
                type="button"
                onClick={handleJoinedEvent}
                className="mt-4 flex h-10 w-full items-center justify-center rounded-md bg-[#194635] text-xs font-medium text-white transition-colors hover:bg-[#14372a]"
                >
                Join This Event
                </button>

                <p className="mt-3 text-center text-[10px] text-[#78877c]">
                Your participation can make a difference.
                </p>
            </aside>
        </div>
    );
};

export default JoinEventCard;
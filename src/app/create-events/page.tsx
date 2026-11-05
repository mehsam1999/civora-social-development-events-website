
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Users,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Education",
  "Community Support",
  "Other",
];

const initialForm = {
  title: "",
  description: "",
  eventType: "",
  eventDate: "",
  imageUrl: "",
  location: "",
};

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = useState(initialForm);
  const [imageError, setImageError] = useState(false);

  const today = new Date();
  const minDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const update = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Check whether the user is logged in
    if (!user) {
      toast.error("Please login first to create an event!");
      router.push("/login");
      return;
    }

    if (form.title.trim().length < 5) {
      toast.error("Event title must contain at least 5 characters.");
      return;
    }

    if (!form.eventDate || form.eventDate <= minDate) {
      toast.error("Please select a future event date.");
      return;
    }

    if (!form.eventType) {
      toast.error("Please select an event type.");
      return;
    }

    if (imageError) {
      toast.error("Please provide a valid image URL.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/create-events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        notFound()
      }

      console.log(data);

      toast.success("Event created successfully!");
      setForm(initialForm);
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#ecf1e8] px-4 py-10 transition-colors sm:px-6 sm:py-14 dark:bg-[#17251c]">
      <div className="mx-auto max-w-6xl">

        {/* Page Heading */}
        <div className="mb-12">
          <p className="mb-4 flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.18em] text-[#6b746c] uppercase dark:text-[#aab9ad]">
            <span className="size-2 rounded-full bg-[#c15f3c]" />
            Community Initiative
          </p>

          <h1 className="font-heading text-4xl font-medium tracking-tight text-[#173c2d] sm:text-5xl dark:text-[#edf4ed]">
            Create an Event
          </h1>

          <p className="mt-1 max-w-xl text-sm leading-6 text-[#637268] dark:text-[#aab9ad]">
            Bring your community together and make something
            meaningful happen across Dhaka&apos;s wards and
            neighborhoods.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-[#e5ebe4] bg-white p-5 shadow-[0_2px_8px_rgba(28,43,35,0.06)] transition-colors sm:p-8 dark:border-[#34483b] dark:bg-[#203329] dark:shadow-none"
        >

          {/* Event Title */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="title"
                className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c5d8c7]"
              >
                Event Title <span className="text-[#c15f3c]">*</span>
              </Label>
              <span className="text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                Min. 5 characters
              </span>
            </div>

            <div className="relative">
              <CalendarDays className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c] dark:text-[#8fa995]" />
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Winter Blanket & Food Distribution"
                minLength={5}
                required
                className="h-11 rounded-none border-[#e2e9e1] text-sm dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
              />
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="description"
                className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c5d8c7]"
              >
                Event Description <span className="text-[#c15f3c]">*</span>
              </Label>
              <span className="text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                Public Civic Notice
              </span>
            </div>

            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Describe your initiative, its purpose, and what volunteers will do..."
              required
              rows={4}
              maxLength={1000}
              className="min-h-[115px] resize-y rounded-none border-[#e2e9e1] text-sm leading-6 dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
            />

            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-1.5 text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                <Info className="size-3 shrink-0" />
                Provide key details such as volunteer requirements, what to bring, and schedule.
              </p>
              <span className="shrink-0 text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                {form.description.length}/1000 chars
              </span>
            </div>
          </div>

          {/* Event Type */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c5d8c7]">
                Event Type <span className="text-[#c15f3c]">*</span>
              </Label>
              <span className="text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                Sector Tag
              </span>
            </div>

            <Select
              value={form.eventType}
              onValueChange={(value) => {
                if (value !== null) update("eventType", value);
              }}
            >
              <SelectTrigger className="h-11 w-full rounded-none border-[#e2e9e1] text-sm dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#edf4ed]">
                <div className="flex items-center gap-3">
                  <Users className="size-4 text-[#78877c] dark:text-[#8fa995]" />
                  <SelectValue placeholder="Select an event category" />
                </div>
              </SelectTrigger>

              <SelectContent className="border-[#e2e9e1] bg-white dark:border-[#405345] dark:bg-[#263a2d]">
                {eventTypes.map((type) => (
                  <SelectItem
                    key={type}
                    value={type}
                    className="dark:text-[#edf4ed] dark:focus:bg-[#344d3b] dark:focus:text-[#edf4ed]"
                  >
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Event Date */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="eventDate"
                className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c5d8c7]"
              >
                Event Date <span className="text-[#c15f3c]">*</span>
              </Label>
              <span className="text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                Scheduled Date
              </span>
            </div>

            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c] dark:text-[#8fa995]" />
              <Input
                id="eventDate"
                type="date"
                min={minDate}
                value={form.eventDate}
                onChange={(e) => update("eventDate", e.target.value)}
                required
                className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#edf4ed] dark:[color-scheme:dark]"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                <Info className="size-3 shrink-0" />
                Only future dates can be scheduled on the civic register.
              </p>
              <span className="flex shrink-0 items-center gap-1 text-[10px] text-[#477c57] dark:text-[#9bc6a3]">
                <CheckCircle2 className="size-3" />
                Future date only
              </span>
            </div>
          </div>

          {/* Event Thumbnail Image URL */}
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="imageUrl"
                className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c5d8c7]"
              >
                Event Thumbnail Image URL <span className="text-[#c15f3c]">*</span>
              </Label>
              <span className="text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                Public CDN / HTTPS
              </span>
            </div>

            <div className="relative">
              <ImageIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c] dark:text-[#8fa995]" />
              <Input
                id="imageUrl"
                type="url"
                value={form.imageUrl}
                onChange={(e) => {
                  update("imageUrl", e.target.value);
                  setImageError(false);
                }}
                placeholder="https://images.unsplash.com/..."
                required
                className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
              />
            </div>

            {/* Image Preview */}
            {form.imageUrl && (
              <div className="overflow-hidden rounded-sm bg-[#edf5ed] p-2 dark:bg-[#263a2d]">
                <div className="mb-2 flex items-center gap-2 text-[9px] font-bold tracking-[0.12em] text-[#315c43] uppercase dark:text-[#b8d2bd]">
                  <span className="size-1.5 rounded-full bg-[#c15f3c]" />
                  Specimen Visual Preview
                </div>

                {!imageError ? (
                  <div className="relative">
                    <Image
                      src={form.imageUrl}
                      alt="Event thumbnail preview"
                      width={1200}
                      height={600}
                      unoptimized
                      onError={() => setImageError(true)}
                      className="h-48 w-full object-cover sm:h-56"
                    />

                    <button
                      type="button"
                      aria-label="Remove image URL"
                      onClick={() => {
                        update("imageUrl", "");
                        setImageError(false);
                      }}
                      className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white/90 text-[#315c43] shadow-sm hover:bg-white dark:bg-[#17251c]/90 dark:text-[#dce8dd] dark:hover:bg-[#17251c]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex h-40 flex-col items-center justify-center gap-2 text-xs text-[#8a968c] dark:text-[#aab9ad]">
                    <ImageIcon className="size-7" />
                    Image could not be loaded. Check the URL.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Event Location */}
          <div className="mb-7 space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="location"
                className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c5d8c7]"
              >
                Event Location <span className="text-[#c15f3c]">*</span>
              </Label>
              <span className="text-[10px] text-[#7a857d] dark:text-[#8fa995]">
                Precise Venue
              </span>
            </div>

            <div className="relative">
              <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c] dark:text-[#8fa995]" />
              <Input
                id="location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Dhanmondi Lake Amphitheater, Road 8/A, Dhaka 1209"
                required
                className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
              />
            </div>

            <p className="flex items-center gap-1.5 text-[10px] text-[#7a857d] dark:text-[#8fa995]">
              <Info className="size-3" />
              Specify neighborhood, landmark, or meeting pavilion.
            </p>
          </div>

          {/* Information Notice */}
          <div className="mb-7 flex gap-3 rounded-sm bg-[#edf5ed] p-4 dark:bg-[#263a2d]">
            <Info className="mt-0.5 size-4 shrink-0 text-[#477c57] dark:text-[#9bc6a3]" />
            <p className="text-[11px] text-[#526b59] dark:text-[#bdcabe]">
              By publishing, this initiative enters the open Dhaka Civic Register.
              Local civic groups, emergency monitors, and registered ward
              participants will receive notification dispatches.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              className="h-10 rounded-sm border-[#dce6dc] bg-[#e5eee5] px-6 text-xs font-medium text-[#435c49] hover:bg-[#dce8dc] hover:text-[#234635] dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#bdcabe] dark:hover:bg-[#344d3b] dark:hover:text-[#edf4ed]"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              className="h-10 rounded-sm bg-[#163a2b] px-6 text-xs font-medium text-white hover:bg-[#24513c] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
            >
              Create Event
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </form>

        {/* Footer Note */}
        <p className="mt-4 text-center text-[10px] leading-5 text-[#78877c] dark:text-[#8fa995]">
          CIVORA Municipal Ledger Article 48 · Preserving communal agency
          and grassroots mutual aid across Bangladesh.
        </p>
      </div>
    </main>
  );
}

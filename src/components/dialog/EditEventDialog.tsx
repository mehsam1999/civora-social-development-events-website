
"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";

import {
  Pencil,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  Users,
  ArrowRight,
  Info,
  CheckCircle2,
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
import { getTokenFromClient } from "@/lib/getTokenFromClient";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  eventDate: string;
  imageUrl: string;
  location: string;
};

type EditEventDialogProps = {
  data: Event;
};

const eventTypes = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Blood Donation",
  "Education",
  "Community Support",
  "Other",
];

const EditEventDialog = ({ data }: EditEventDialogProps) => {
  // Existing Event Data
  const [form, setForm] = useState({
    title: data.title,
    description: data.description,
    eventType: data.eventType,
    eventDate: data.eventDate,
    imageUrl: data.imageUrl,
    location: data.location,
  });

  const [imageError, setImageError] = useState(false);

  const today = new Date();

  const minDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];

  const update = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

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
    //JWT client
    const token = await getTokenFromClient()
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upcoming-events/${data._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const result = await res.json();

    if (res.ok) {
      toast.success("Event updated successfully!");
      window.location.reload();
    } else {
      toast.error(result.message || "Failed to update event.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger
          type="button"
          className="flex h-8 items-center justify-center gap-1 rounded-sm bg-[#e6f0e7] px-2.5 text-[11px] font-medium text-[#315d48] transition-colors hover:bg-[#d5e6d8] dark:bg-[#263a2d] dark:text-[#a5bba9] dark:hover:bg-[#344d3b]"
        >
          <Pencil className="size-3.5" />
          Edit
        </DialogTrigger>

        <DialogContent className="border-[#e5ebe4] bg-[#faf8f5] sm:min-w-xl dark:border-[#405345] dark:bg-[#17251c]">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#234635] dark:text-[#edf4ed]">
              Update Event
            </DialogTitle>

            <DialogDescription className="text-[#6b746c] dark:text-[#aab9ad]">
              Modify the details for your social service initiative.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-[#e5ebe4] bg-white p-5 shadow-[0_2px_8px_rgba(28,43,35,0.06)] sm:p-8 dark:border-[#34483b] dark:bg-[#203329]"
          >
            {/* Event Title */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="title"
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c2cec4]"
                >
                  Event Title <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
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
                  className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm dark:border-[#405345] dark:bg-[#17251c] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
                />
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="description"
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c2cec4]"
                >
                  Event Description{" "}
                  <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
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
                className="min-h-[115px] resize-y rounded-none border-[#e2e9e1] text-sm leading-6 dark:border-[#405345] dark:bg-[#17251c] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
              />

              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
                  <Info className="size-3 shrink-0" />
                  Provide key details such as volunteer requirements,
                  what to bring, and schedule.
                </p>

                <span className="shrink-0 text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
                  {form.description.length}/1000 chars
                </span>
              </div>
            </div>

            {/* Event Type & Event Date */}
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Event Type */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c2cec4]">
                    Event Type <span className="text-[#c15f3c]">*</span>
                  </Label>

                  <span className="text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
                    Sector Tag
                  </span>
                </div>

                <Select
                  value={form.eventType}
                  onValueChange={(value) => {
                    if (value !== null) update("eventType", value);
                  }}
                >
                  <SelectTrigger className="!h-11 min-h-11 w-full rounded-none border-[#e2e9e1] text-sm dark:border-[#405345] dark:bg-[#17251c] dark:text-[#edf4ed]">
                    <div className="flex items-center gap-3">
                      <Users className="size-4 text-[#78877c] dark:text-[#8fa995]" />
                      <SelectValue placeholder="Select an event category" />
                    </div>
                  </SelectTrigger>

                  <SelectContent className="border-[#e2e9e1] bg-white dark:border-[#405345] dark:bg-[#203329]">
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="eventDate"
                    className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c2cec4]"
                  >
                    Event Date <span className="text-[#c15f3c]">*</span>
                  </Label>

                  <span className="text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
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
                    className="!h-11 min-h-11 w-full rounded-none border-[#e2e9e1] pl-10 text-sm dark:border-[#405345] dark:bg-[#17251c] dark:text-[#edf4ed]"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-[#477c57] dark:text-[#a5bba9]">
                    <CheckCircle2 className="size-3" />
                    Future date only
                  </span>
                </div>
              </div>
            </div>

            {/* Event Thumbnail Image URL */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="imageUrl"
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c2cec4]"
                >
                  Event Thumbnail Image URL{" "}
                  <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
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
                  className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm dark:border-[#405345] dark:bg-[#17251c] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
                />
              </div>
            </div>

            {/* Event Location */}
            <div className="mb-7 space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="location"
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase dark:text-[#c2cec4]"
                >
                  Event Location{" "}
                  <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d] dark:text-[#aab9ad]">
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
                  className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm dark:border-[#405345] dark:bg-[#17251c] dark:text-[#edf4ed] dark:placeholder:text-[#78877c]"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <DialogClose>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-sm border-[#dce6dc] bg-[#e5eee5] px-6 text-xs font-medium text-[#435c49] hover:bg-[#dce8dc] hover:text-[#234635] dark:border-[#405345] dark:bg-[#263a2d] dark:text-[#c2cec4] dark:hover:bg-[#344d3b] dark:hover:text-[#edf4ed]"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                type="submit"
                className="h-10 rounded-sm bg-[#163a2b] px-6 text-xs font-medium text-white hover:bg-[#24513c] dark:bg-[#8fa995] dark:text-[#14251a] dark:hover:bg-[#a5bba9]"
              >
                Save Changes
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditEventDialog;


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

  const res = await fetch(
    `http://localhost:8000/upcoming-events/${data._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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
          className="flex h-8 items-center justify-center gap-1 rounded-sm bg-[#e6f0e7] px-2.5 text-[11px] font-medium text-[#315d48] transition-colors hover:bg-[#d5e6d8]"
        >
          <Pencil className="size-3.5" />
          Edit
        </DialogTrigger>

        <DialogContent className="sm:min-w-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-[#234635]">
              Update Event
            </DialogTitle>

            <DialogDescription>
              Modify the details for your social service initiative.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleSubmit}
            className="rounded-md border border-[#e5ebe4] bg-white p-5 shadow-[0_2px_8px_rgba(28,43,35,0.06)] sm:p-8"
          >
            {/* Event Title */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="title"
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase"
                >
                  Event Title <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d]">
                  Min. 5 characters
                </span>
              </div>

              <div className="relative">
                <CalendarDays className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c]" />

                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Winter Blanket & Food Distribution"
                  minLength={5}
                  required
                  className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm"
                />
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="description"
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase"
                >
                  Event Description{" "}
                  <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d]">
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
                className="min-h-[115px] resize-y rounded-none border-[#e2e9e1] text-sm leading-6"
              />

              <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-1.5 text-[10px] text-[#7a857d]">
                  <Info className="size-3 shrink-0" />
                  Provide key details such as volunteer requirements,
                  what to bring, and schedule.
                </p>

                <span className="shrink-0 text-[10px] text-[#7a857d]">
                  {form.description.length}/1000 chars
                </span>
              </div>
            </div>

            {/* Event Type & Event Date */}
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Event Type */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-[11px] font-bold tracking-wide text-[#234635] uppercase">
                    Event Type <span className="text-[#c15f3c]">*</span>
                  </Label>

                  <span className="text-[10px] text-[#7a857d]">
                    Sector Tag
                  </span>
                </div>

                <Select
                  value={form.eventType}
                  onValueChange={(value) => {
                    if (value !== null) update("eventType", value);
                  }}
                >
                  <SelectTrigger className="!h-11 min-h-11 w-full rounded-none border-[#e2e9e1] text-sm">
                    <div className="flex items-center gap-3">
                      <Users className="size-4 text-[#78877c]" />
                      <SelectValue placeholder="Select an event category" />
                    </div>
                  </SelectTrigger>

                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type} value={type}>
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
                    className="text-[11px] font-bold tracking-wide text-[#234635] uppercase"
                  >
                    Event Date <span className="text-[#c15f3c]">*</span>
                  </Label>

                  <span className="text-[10px] text-[#7a857d]">
                    Scheduled Date
                  </span>
                </div>

                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c]" />

                  <Input
                    id="eventDate"
                    type="date"
                    min={minDate}
                    value={form.eventDate}
                    onChange={(e) => update("eventDate", e.target.value)}
                    required
                    className="!h-11 min-h-11 w-full rounded-none border-[#e2e9e1] pl-10 text-sm"
                  />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="flex shrink-0 items-center gap-1 text-[10px] text-[#477c57]">
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
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase"
                >
                  Event Thumbnail Image URL{" "}
                  <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d]">
                  Public CDN / HTTPS
                </span>
              </div>

              <div className="relative">
                <ImageIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c]" />

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
                  className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm"
                />
              </div>
            </div>

            {/* Event Location */}
            <div className="mb-7 space-y-3">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="location"
                  className="text-[11px] font-bold tracking-wide text-[#234635] uppercase"
                >
                  Event Location{" "}
                  <span className="text-[#c15f3c]">*</span>
                </Label>

                <span className="text-[10px] text-[#7a857d]">
                  Precise Venue
                </span>
              </div>

              <div className="relative">
                <MapPin className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#78877c]" />

                <Input
                  id="location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="e.g. Dhanmondi Lake Amphitheater, Road 8/A, Dhaka 1209"
                  required
                  className="h-11 rounded-none border-[#e2e9e1] pl-10 text-sm"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <DialogClose>
                <Button
                    type="button"
                    variant="outline"
                    className="h-10 rounded-sm border-[#dce6dc] bg-[#e5eee5] px-6 text-xs font-medium text-[#435c49] hover:bg-[#dce8dc] hover:text-[#234635]"
                >
                    Cancel
                </Button>
            </DialogClose>

              <Button
                type="submit"
                className="h-10 rounded-sm bg-[#163a2b] px-6 text-xs font-medium text-white hover:bg-[#24513c]"
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

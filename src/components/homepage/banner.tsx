import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CirclePlus, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Banner() {
  return (
    <section className="bg-[#f1f4ef]">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">

        {/* Left Content */}
        <div>
          <p className="flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.18em] text-[#6b746c] uppercase">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-[#c15f3c]"
            />
            Dhaka Civic Registry · Dispatch 2025
          </p>

          <h1 className="mt-5 font-heading text-4xl leading-[1.05] tracking-tight text-[#1c2b23] sm:text-5xl lg:text-6xl">
            Small Acts.
            <br />
            <em className="text-[#c15f3c] italic">
              Stronger Communities.
            </em>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-[#5c665e] sm:text-lg">
            Discover neighborhood cleanups, food drives, and civic gatherings
            happening across Dhaka — then lend a hand, host your own, and watch
            small acts ripple outward.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              render={<Link href="/events" />}
              className="h-11 rounded-full bg-[#1a4332] px-6 text-white hover:bg-[#14352a]"
            >
              Explore Events
              <ArrowRight />
            </Button>

            <Button
              render={<Link href="/create-events" />}
              variant="outline"
              className="h-11 rounded-full border-[#d8d3ca] bg-transparent px-6 text-[#1c2b23] transition-colors hover:border-[#e0ebe3] hover:bg-[#e0ebe3] hover:text-[#1a4332]"
            >
              <CirclePlus />
              Create an Event
            </Button>
          </div>
        </div>

        {/* Right Image with Overlapping Quote Card */}
        <div className="relative pb-8 sm:pb-9">
          {/* Banner Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/[0.06] shadow-[0_20px_50px_-20px_rgba(28,43,35,0.25)]">
            <Image
              src="/images/banner.jpg"
              alt="Neighbors gathering for a community event"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>

          {/* Quote Card */}
          <figure className="absolute bottom-0 left-3 z-10 w-[min(18rem,90%)] rounded-lg border border-black/[0.06] bg-white/95 p-3 shadow-[0_12px_30px_-12px_rgba(28,43,35,0.3)] backdrop-blur-sm sm:left-4 sm:w-[24rem] sm:p-4">

            <Quote
              aria-hidden="true"
              className="size-4 fill-[#c15f3c] text-[#c15f3c]"
            />

            <blockquote className="mt-1.5 font-heading text-xs leading-5 text-[#1c2b23] italic sm:text-sm">
              “Every meal shared brings hope to someone in need. CIVORA made it happen.”
            </blockquote>

            <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-1">
              <span className="text-[10px] text-[#5c665e] sm:text-xs">
                <span className="font-medium text-[#1c2b23]">
                  Mehsam A.
                </span>
                , Organizer
              </span>

              <span className="text-[8px] font-medium tracking-[0.12em] text-[#8a9188] uppercase sm:text-[0.6rem]">
                Mirpur Ward 10
              </span>
            </figcaption>

          </figure>
        </div>

      </div>
    </section>
  );
}
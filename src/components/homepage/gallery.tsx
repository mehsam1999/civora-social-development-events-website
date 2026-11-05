
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type GalleryItem = {
  location: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const items: GalleryItem[] = [
  {
    location: "Mirpur",
    title: "Winter Clothing Distribution",
    description: "Warm blankets given to elderly residents",
    image: "/images/winter clothes.jpg",
    alt: "Volunteers handing warm blankets to elderly residents in Mirpur",
  },
  {
    location: "Dhanmondi",
    title: "Urban Tree Plantation",
    description: "Saplings planted along Dhanmondi Lake",
    image: "/images/tree plantation.png",
    alt: "Hands planting tree saplings in soil",
  },
  {
    location: "Mohammadpur",
    title: "Neighborhood Clean-up",
    description: "Clearing residential drainage lanes",
    image: "/images/street cleanup.jpg",
    alt: "Volunteers clearing waste during a neighborhood clean-up",
  },
  {
    location: "Uttara",
    title: "Blood Donation Drive",
    description: "Compassionate care in community halls",
    image: "/images/blood donation.jpg",
    alt: "Donors resting after a blood donation drive in Uttara",
  },
  {
    location: "Rampura",
    title: "Education Support",
    description: "Tutoring and supplies for underprivileged students",
    image: "/images/education support.jpeg",
    alt: "Volunteers providing education support to students",
  },
  {
    location: "Old Dhaka",
    title: "Food Charity",
    description: "Hot meals shared with families in need",
    image: "/images/food charity.jpg",
    alt: "Volunteers distributing food to families in need",
  },
  {
    location: "Mohakhali",
    title: "Health Awareness",
    description: "Free check-ups and hygiene workshops",
    image: "/images/health awareness.jpg",
    alt: "Health awareness session with community members",
  },
];

export function Gallery() {
  return (
    <section className="bg-[#ecf1e8] transition-colors dark:bg-[#17251c]">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:py-20">

        {/* Centered Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[0.7rem] font-bold tracking-[0.18em] text-[#c15f3c] uppercase">
            Visual Ledger
          </p>

          <h2 className="mt-4 font-heading text-3xl tracking-tight text-[#163a2b] sm:text-4xl dark:text-[#edf4ed]">
            Community Gallery
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#5c665e] sm:text-base sm:leading-7 dark:text-[#aab9ad]">
            Glimpses of solidarity, dedication, and neighborhood care across
            Dhaka.
          </p>
        </div>

        {/* Gallery Cards */}
        <div className="mt-10">
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem
                  key={item.location}
                  className="basis-full sm:basis-1/2 lg:basis-1/4"
                >
                  <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-black/[0.05] bg-white shadow-[0_10px_30px_-18px_rgba(28,43,35,0.25)] transition-colors dark:border-white/[0.08] dark:bg-[#203329]">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />

                      <span className="absolute top-2.5 left-2.5 rounded bg-white/95 px-2 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-[#1c2b23] uppercase shadow-sm dark:bg-[#17251c]/95 dark:text-[#edf4ed]">
                        {item.location}
                      </span>
                    </div>

                    <figcaption className="p-3.5">
                      <p className="text-sm font-semibold leading-5 text-[#1c2b23] dark:text-[#edf4ed]">
                        {item.title}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#6b746c] dark:text-[#aab9ad]">
                        {item.description}
                      </p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-3 size-9 bg-white/95 shadow-md hover:bg-white dark:border-[#526456] dark:bg-[#203329]/95 dark:text-[#edf4ed] dark:hover:bg-[#2b4435]" />

            <CarouselNext className="right-3 size-9 bg-white/95 shadow-md hover:bg-white dark:border-[#526456] dark:bg-[#203329]/95 dark:text-[#edf4ed] dark:hover:bg-[#2b4435]" />
          </Carousel>
        </div>

      </div>
    </section>
  );
}

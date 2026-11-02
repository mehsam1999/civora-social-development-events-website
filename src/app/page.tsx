import { Banner } from "@/components/homepage/banner";
import { Gallery } from "@/components/homepage/gallery";
import { Newsletter } from "@/components/homepage/newsletter";
import { Stats } from "@/components/homepage/stats";


export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Banner />
        <Stats />
        <Gallery />
        <Newsletter />
      </main>
    </>
  );
}

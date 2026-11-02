import { Banner } from "@/components/banner";
import { Gallery } from "@/components/gallery";
import { Navbar } from "@/components/navbar";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
        <Stats />
        <Gallery />
      </main>
    </>
  );
}

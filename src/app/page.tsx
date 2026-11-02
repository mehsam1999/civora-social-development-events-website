import { Banner } from "@/components/banner";
import { Navbar } from "@/components/navbar";
import { Stats } from "@/components/stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Banner />
        <Stats />
      </main>
    </>
  );
}

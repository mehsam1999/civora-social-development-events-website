
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f1f8f0] px-5 py-12 dark:bg-[#17251c]">
      <div className="mx-auto w-full max-w-lg text-center">

        {/* 404 Icon */}
        <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-[#e6f0eb] dark:bg-[#263a2d]">
          <SearchX className="size-9 text-[#34745b] dark:text-[#a8c9ae]" />
        </div>

        {/* Error Code */}
        <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-[#c15f3c]">
          ERROR 404
        </p>

        {/* Heading */}
        <h1 className="font-heading text-4xl font-medium tracking-tight text-[#173c2d] sm:text-5xl dark:text-[#edf4ed]">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#637268] dark:text-[#aab9ad]">
          Sorry, the page you are looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back to making a difference in your
          community.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#194635] px-6 text-sm font-medium text-white transition-colors hover:bg-[#14372a] sm:w-auto dark:bg-[#8fa995] dark:text-[#17251c] dark:hover:bg-[#a5bba9]"
          >
            <Home className="size-4" />
            Back to Home
          </Link>

          <Link
            href="/upcoming-events"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-[#cbdace] bg-white px-6 text-sm font-medium text-[#194635] transition-colors hover:bg-[#e6f0eb] sm:w-auto dark:border-[#405345] dark:bg-[#203329] dark:text-[#edf4ed] dark:hover:bg-[#263a2d]"
          >
            <ArrowLeft className="size-4" />
            Explore Events
          </Link>

        </div>

        {/* Footer */}
        <p className="mt-12 text-xs tracking-wide text-[#8a978d] dark:text-[#829488]">
          CIVORA · Small Acts. Stronger Communities.
        </p>

      </div>
    </main>
  );
};

export default NotFound;

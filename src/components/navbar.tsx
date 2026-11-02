"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Upcoming Events" },
];

export function Navbar() {
  const pathname = usePathname();

  const hoverStyle = "hover:bg-[#e0ebe3] hover:text-[#1a4332]";

  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[#faf8f5]/90 backdrop-blur">
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="CIVORA home"
        >
          <Image
            src="/images/logo.png"
            alt="CIVORA"
            width={44}
            height={34}
            priority
            className="h-9 w-auto"
          />

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-[#1a4332]">
              CIVORA
            </h2>
            <p className="text-xs tracking-wide text-[#3f4a43]">
              DHAKA CIVIC TRUST
            </p>
          </div>
        </Link>

        {/* Center Navigation */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#1a4332] text-white shadow-sm"
                    : `text-[#3f4a43] ${hoverStyle}`
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">

          {/* Theme Toggle */}
          <button
            type="button"
            aria-label="Toggle theme"
            className={`flex size-9 items-center justify-center rounded-full text-[#3f4a43] transition-colors ${hoverStyle}`}
          >
            <Sun size={18} strokeWidth={1.8} />
          </button>

          {/* Login */}
          <Link
            href="/login"
            aria-current={pathname === "/login" ? "page" : undefined}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              pathname === "/login"
                ? "bg-[#1a4332] text-white shadow-sm"
                : `text-[#3f4a43] ${hoverStyle}`
            )}
          >
            Log in
          </Link>

        </div>
      </div>
    </header>
  );
}
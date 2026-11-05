
"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Home, ChevronRight, LogOut, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/upcoming-events", label: "Upcoming Events" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const hoverStyle = "hover:bg-[#e0ebe3] hover:text-[#1a4332]";

  const { data: session } = authClient.useSession()
  const user = session?.user
  // console.log(user)

  const handleEmailSignOut = () =>{
    authClient.signOut()
    toast.success("You have successfully signed out")
    router.push('/')
  }
  return (
    <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[#faf8f5]/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-8">

        {/* Main Navbar */}
        <div className="relative flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="CIVORA home"
          >
            <div className="flex gap-2">
              <Image
                src="/images/logo_ui.png"
                alt="CIVORA Logo"
                width={48}
                height={48}
                priority
                className="size-12 object-contain"
              />

              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-[#1a4332]">
                  CIVORA
                </h2>
                <p className="text-xs tracking-wide text-[#3f4a43]">
                  DHAKA CIVIC TRUST
                </p>
              </div>
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

            {
              user ? 
              
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger render={
                  <Avatar className="size-10 cursor-pointer border-2 border-[#1a4332]">
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback className="bg-[#e0ebe3] font-semibold text-[#1a4332]">
                      {user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                }>
                </PopoverTrigger>

                <PopoverContent
                  align="end"
                  className="w-64 rounded-md border border-[#e5ebe4] bg-[#faf8f5] p-0 shadow-[0_8px_25px_rgba(28,43,35,0.12)]"
                >
                  <PopoverHeader className="space-y-1 p-4">
                    <PopoverTitle className="text-sm font-semibold text-[#1a4332]">
                      {user?.name}
                    </PopoverTitle>

                    <PopoverDescription className="text-xs text-[#6b746c]">
                      {user?.email}
                    </PopoverDescription>
                  </PopoverHeader>

                  <div className="border-t border-[#e5ebe4]" />

                  <div className="flex flex-col p-2">

                    <Link
                      href="/create-events"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#3f4a43] transition-colors hover:bg-[#e0ebe3] hover:text-[#1a4332]"
                    >
                      
                      Create An Event
                    </Link>

                    <Link
                      href="/manage-events"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#3f4a43] transition-colors hover:bg-[#e0ebe3] hover:text-[#1a4332]"
                    >
                      
                      Manage Events
                    </Link>

                    <Link
                      href="/joined-events"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#3f4a43] transition-colors hover:bg-[#e0ebe3] hover:text-[#1a4332]"
                    >
                      
                      Joined Events
                    </Link>

                  </div>

                  <div className="border-t border-[#e5ebe4]" />

                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        handleEmailSignOut();
                      }}
                      className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-[#b4533d] transition-colors hover:bg-[#fbe9e5]"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
              : 
              <>
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
                  Log In
                </Link>
              </>
            }

          </div>
        </div>

        {/* Mobile Breadcrumb Navigation */}
        <div className="border-t border-black/[0.05] py-3 md:hidden">
          <Breadcrumb>
            <BreadcrumbList className="gap-2 text-xs">

              {/* Home */}
              <BreadcrumbItem>
                {pathname === "/" ? (
                  <BreadcrumbPage className="text-[#1a4332]">
                    <Home className="size-4" />
                    <span className="sr-only">Home</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href="/"
                    aria-label="Home"
                    className="text-[#5c665e] transition-colors hover:text-[#1a4332]"
                  >
                    <Home className="size-4" />
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              <BreadcrumbSeparator>
                <ChevronRight className="size-3 text-[#a0aaa1]" />
              </BreadcrumbSeparator>

              {/* Upcoming Events */}
              <BreadcrumbItem>
                {pathname.startsWith("/upcoming-events") ? (
                  <BreadcrumbPage className="font-medium text-[#1a4332]">
                    Upcoming Events
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href="/upcoming-events"
                    className="font-medium text-[#5c665e] transition-colors hover:text-[#1a4332]"
                  >
                    Upcoming Events
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

            </BreadcrumbList>
          </Breadcrumb>
        </div>

      </div>
    </header>
  );
}

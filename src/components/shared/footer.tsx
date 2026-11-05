
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/upcoming-events", label: "Upcoming Events" },
  { href: "/create-events", label: "Create Events" },
  { href: "/manage-events", label: "Manage Events" },
  { href: "/joined-events", label: "Joined Events" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
        <path d="M18.9 2.5h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.7 22H2.4l7.7-8.8L1.9 2.5h6.8l4.7 6.2zm-1.2 17.5h1.8L7.1 4.4H5.1z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.2-1.5 1.5-1.5h1.6V3.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6v8z" />
      </svg>
    ),
  },
  {
    label: "Google",
    href: "https://www.google.com/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-3.5">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.09-1.92 3.27-4.74 3.27-8.1Z" />
        <path d="M12 23c2.97 0 5.46-.98 7.29-2.65l-3.57-2.77c-.99.66-2.25 1.06-3.72 1.06-2.86 0-5.28-1.93-6.15-4.53H2.16v2.84A11 11 0 0 0 12 23Z" />
        <path d="M5.85 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.16a11 11 0 0 0 0 9.9l3.69-2.84Z" />
        <path d="M12 4.36c1.62 0 3.06.56 4.2 1.66l3.15-3.15C17.45 1.09 14.97 0 12 0A11 11 0 0 0 2.16 7.05l3.69 2.84C6.72 7.29 9.14 4.36 12 4.36Z" />
      </svg>
    ),
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-black/[0.05] bg-[#f4f6f1] transition-colors dark:border-white/[0.08] dark:bg-[#111c16]">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1.15fr] lg:gap-12">

          {/* Brand */}
          <div>
            <p className="font-heading text-2xl tracking-tight text-[#163a2b] dark:text-[#edf4ed]">
              CIVORA
            </p>

            <p className="mt-3 font-heading text-base text-[#3f4a43] italic dark:text-[#c2cec4]">
              Small Acts. Stronger Communities.
            </p>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#5c665e] dark:text-[#aab9ad]">
              CIVORA is a civic-engagement digital platform uniting local
              grassroots initiatives, passionate volunteers, and community
              organizers across Dhaka and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer">
            <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-[#163a2b] uppercase dark:text-[#edf4ed]">
              Quick Civic Links
            </h2>

            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#5c665e] transition-colors hover:text-[#1a4332] dark:text-[#aab9ad] dark:hover:text-[#edf4ed]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact & Socials */}
          <div>
            <h2 className="text-[0.7rem] font-semibold tracking-[0.16em] text-[#163a2b] uppercase dark:text-[#edf4ed]">
              Contact &amp; Assembly
            </h2>

            <ul className="mt-4 space-y-3 text-sm text-[#5c665e] dark:text-[#aab9ad]">
              <li className="flex items-start gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#3f4a43] dark:text-[#8fa995]"
                />
                <span>
                  Civic Action Hub, House 42, Road 11, Dhanmondi, Dhaka 1209,
                  Bangladesh
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#3f4a43] dark:text-[#8fa995]"
                />
                <a
                  href="mailto:community@civora.org"
                  className="transition-colors hover:text-[#1a4332] dark:hover:text-[#edf4ed]"
                >
                  community@civora.org
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#3f4a43] dark:text-[#8fa995]"
                />
                <a
                  href="tel:+88029876543"
                  className="transition-colors hover:text-[#1a4332] dark:hover:text-[#edf4ed]"
                >
                  +880 (2) 987-6543
                </a>
              </li>
            </ul>

            <h2 className="mt-7 text-[0.7rem] font-semibold tracking-[0.16em] text-[#163a2b] uppercase dark:text-[#edf4ed]">
              Civic Dispatch Networks
            </h2>

            <ul className="mt-3 flex gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-8 items-center justify-center rounded-md bg-[#e6ebe1] text-[#3f4a43] transition-colors hover:bg-[#1a4332] hover:text-white dark:bg-[#263a2d] dark:text-[#c2cec4] dark:hover:bg-[#8fa995] dark:hover:text-[#14251a]"
                  >
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12">
          <hr className="border-black/[0.10] dark:border-white/[0.12]" />

          <div className="mt-5 flex flex-col gap-3 text-xs text-[#6b746c] sm:flex-row sm:items-center sm:justify-between dark:text-[#8fa995]">
            <p>
              © {currentYear} CIVORA Foundation. Dedicated to grassroots
              community resilience. All rights reserved.
            </p>

            <p className="font-medium tracking-[0.12em] text-[#163a2b] uppercase dark:text-[#edf4ed]">
              Dhaka Civic Development Initiative
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

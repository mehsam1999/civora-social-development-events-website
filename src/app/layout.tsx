
import type { Metadata } from "next";
import { Hanken_Grotesk, Newsreader } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "CIVORA | Small Acts. Stronger Communities.",
  description: "Discover and join meaningful social development events with CIVORA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${hankenGrotesk.variable} ${newsreader.variable}`}
    >
      <body className={`${hankenGrotesk.className} min-h-full flex flex-col`}>
        <Toaster position="top-right" richColors />
        <Navbar></Navbar>
        <main className="flex-1">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}

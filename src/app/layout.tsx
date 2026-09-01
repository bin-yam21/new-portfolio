import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Backdrop from "@/components/Backdrop";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Full-Stack Engineer building scalable, high-performance products with React, TypeScript and Next.js — backed by resilient services, solid system design and practical AI integration.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description,
  keywords: [
    "Full-Stack Engineer",
    "Systems Developer",
    "AI Developer",
    "Rust Programming",
    "React",
    "TypeScript",
    "Next.js",
    "Backend Development",
    "System Design",
    "Performance Optimization",
    site.name,
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  icons: {
    icon: "/img/profile-image.jpg",
    shortcut: "/img/profile-image.jpg",
    apple: "/img/profile-image.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} Portfolio`,
    title: `${site.name} | ${site.role}`,
    description,
    images: [
      {
        url: "/img/profile-pic.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} | ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description,
    creator: "@binyam_tamiru",
    images: ["/img/profile-pic.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1917" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  image: `${site.url}/img/profile-pic.jpg`,
  jobTitle: site.role,
  sameAs: [site.socials.github, site.socials.x, site.socials.linkedin],
  knowsAbout: [
    "Full-Stack Development",
    "Systems Programming",
    "AI Integration",
    "React",
    "TypeScript",
    "Next.js",
    "System Design",
    "Distributed Systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>

          <Backdrop />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>

        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}

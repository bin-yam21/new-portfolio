import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Backdrop from "@/components/Backdrop";
import ThemeProvider from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { experience, site } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Full-stack engineer available for full-time, contract and freelance work. I build products end to end — React, Next.js and TypeScript interfaces on Node.js, Go and Rust services — and ship them.";

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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: `${site.name} Portfolio`,
    title: `${site.name} | ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description,
    creator: "@binyam_tamiru",
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
  image: `${site.url}/img/profile-image.jpg`,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bahir Dar University",
  },
  worksFor: experience.map((job) => ({
    "@type": "Organization",
    name: job.company,
  })),
  seeks: {
    "@type": "Demand",
    name: "Full-time, contract and freelance software engineering work",
  },
  sameAs: [site.socials.github, site.socials.x, site.socials.linkedin],
  knowsAbout: [
    "Full-Stack Development",
    "Systems Programming",
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Go",
    "Rust",
    "PostgreSQL",
    "System Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
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

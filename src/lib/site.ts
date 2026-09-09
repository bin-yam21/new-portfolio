/**
 * Single source of truth for identity, links and copy that appears in more
 * than one place (nav, footer, metadata, JSON-LD).
 */
export const site = {
  name: "Binyam Tamiru",
  handle: "@bin-yam21",
  role: "Full-Stack Engineer",
  /** Longer form for the footer, the résumé card and JSON-LD. */
  roleLong: "Full-Stack Engineer — React, Next.js, Node.js, Go & Rust",
  url: "https://binyam-tamiru.vercel.app",
  location: "Addis Ababa, Ethiopia",
  /** Short form for the hero badge, where the card is only a few rem wide. */
  locationShort: "Addis Ababa, ET",
  timezone: "GMT+3",
  available: true,
  /** Published on the page and used as the contact form's reply-to. */
  email: "biniyam374@gmail.com",
  resume: "/Binyam-Tamiru-CV.pdf",
  tagline:
    "I own products end to end — React and Next.js interfaces, REST APIs, database design and Docker deployment — and reach for Go or Rust when a service needs raw performance.",
  socials: {
    github: "https://github.com/bin-yam21",
    linkedin: "https://www.linkedin.com/in/binyam-tamiru",
    x: "https://x.com/binyam_tamiru",
    telegram: "https://t.me/Binii_123",
  },
} as const;

/**
 * What a hiring manager or client actually needs to know before writing the
 * first email. Rendered as the availability band under the hero.
 */
export const availability = {
  headline: "Open to full-time, contract and freelance work",
  blurb:
    "Remote-first from Ethiopia (GMT+3), with working hours that overlap most of the European day and European mornings in the US. Open to relocation for the right team.",
  points: [
    { label: "Engagement", value: "Full-time · Contract · Freelance" },
    { label: "Availability", value: "Can start immediately" },
    { label: "Timezone", value: "GMT+3 — overlaps EU & US mornings" },
    { label: "Response time", value: "Usually within a day" },
  ],
} as const;

export const navLinks = [
  // Ordered to match the sections as they appear on the homepage.
  { label: "About", href: "/#about", id: "about" },
  { label: "Work", href: "/#work", id: "work" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

export type Experience = {
  period: string;
  role: string;
  company: string;
  summary: string;
  stack: string[];
};

export const experience: Experience[] = [
  {
    period: "Dec 2025 — Jun 2026",
    role: "Full Stack Developer",
    company: "TapServe (Tibeb Technology PLC)",
    summary:
      "Built core features for TapServe, an all-in-one POS and inventory platform for restaurants and cafés — including QR-code table ordering and a live kitchen display workflow — working across the full stack from the customer-facing ordering UI to real-time POS and kitchen updates.",
    stack: ["React", "Next.js", "Node.js", "REST APIs", "WebSockets"],
  },
  {
    period: "Dec 2024 — Dec 2025",
    role: "Full Stack Developer (Part-Time)",
    company: "Demket Technologies",
    summary:
      "Built dashboards, Telegram Mini Apps and bot integrations that consume REST endpoints and real-time event streams, delivering interactive systems with clean architecture and clear separation between the API, state and UI layers.",
    stack: ["Next.js", "Zustand", "React Query", "REST APIs"],
  },
  {
    period: "Jun 2025 — Oct 2025",
    role: "Frontend / Full Stack Developer",
    company: "Two Z Software PLC",
    summary:
      "Developed modern web applications in React and TypeScript, integrating and debugging backend APIs end to end, and improved performance and maintainability through refactoring and typed API contracts.",
    stack: ["React", "TypeScript", "REST APIs"],
  },
  {
    period: "Mar 2025 — Jun 2025",
    role: "Software Engineering Intern / Developer",
    company: "INSA — Information Network Security Administration",
    summary:
      "Contributed to backend services for secure, scalable and reliable systems, focusing on API development and system design, and applied security-aware practices across authentication, validation and access control.",
    stack: ["Backend", "REST APIs", "Authentication", "System Design"],
  },
];

/**
 * Kept to numbers the CV and github.com/bin-yam21 actually back up. The first
 * one is derived from `experience`, so it can never drift out of date.
 */
export const stats = [
  { value: String(experience.length), label: "Teams shipped for" },
  { value: "35", label: "Public repos" },
  { value: "2024", label: "Shipping since" },
] as const;

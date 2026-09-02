/**
 * Single source of truth for identity, links and copy that appears in more
 * than one place (nav, footer, metadata, JSON-LD).
 */
export const site = {
  name: "Binyam Tamiru",
  handle: "@bin-yam21",
  role: "MERN Stack Developer & Full-Stack Engineer",
  url: "https://binyam-tamiru.vercel.app",
  location: "Bahir Dar, Ethiopia · Open to remote & relocation",
  available: true,
  // TODO: swap for a public-facing address if you'd rather not publish this one.
  email: "biniyam374@gmail.com",
  resume: "/Binyam-Tamiru-CV.pdf",
  tagline:
    "MERN Stack developer who owns products end to end — React and Next.js interfaces, REST APIs, database design and Docker deployment — and reaches for Go and Rust when a service needs raw performance.",
  socials: {
    github: "https://github.com/bin-yam21",
    linkedin: "https://www.linkedin.com/in/binyam-tamiru",
    x: "https://x.com/binyam_tamiru",
    telegram: "https://t.me/Binii_123",
  },
} as const;

export const navLinks = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

/** Kept to numbers that github.com/bin-yam21 actually backs up. */
export const stats = [
  { value: "35", label: "Public repos" },
  { value: "4", label: "Core languages" },
  { value: "2024", label: "Shipping since" },
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

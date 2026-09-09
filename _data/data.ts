export type Project = {
  name: string;
  slug: string;
  /** Short one-liner used on cards and as the project page subtitle. */
  show: string;
  desc: string;
  lang: string[];
  /**
   * Filename inside `public/img`. If the file isn't there yet the card falls
   * back to a generated monogram tile, so a missing screenshot never renders
   * as a broken image — drop the PNG in with this name and it appears.
   */
  img: string;
  img2?: string;
  img3?: string;
  /** Live deployment. Omit when the project isn't hosted anywhere. */
  link?: string;
  /**
   * Public source repo. Optional so confidential/company work (which has no
   * repo to share) can still be listed as a case study.
   */
  git?: string;
  problem?: string;
  solution?: string;
  /**
   * Marks private client/company work. Confidential entries never render a
   * "View source" button and get a "Private / NDA" badge instead. Used to keep
   * these projects in their own section, separate from the open-source builds.
   */
  confidential?: boolean;
  /** Client or employer the work was done for (shown on company cards). */
  company?: string;
  /** Your role on the project, e.g. "Full-Stack Engineer". */
  role?: string;
  /** Engagement window, e.g. "2024 — 2025" or "6-month contract". */
  period?: string;
  /**
   * A few concrete results or responsibilities, shown as a bullet list on the
   * company case-study card. Keep them honest and NDA-safe.
   */
  outcomes?: string[];
  /**
   * On/off switch. Set to `false` to hide a project everywhere — homepage,
   * the /projects archive and its own page — without deleting the entry.
   * Omitting it (or `true`) keeps the project shown.
   */
  visible?: boolean;
  /** Promote to the homepage "Selected work" grid. */
  featured?: boolean;
  /**
   * Video demo file name inside `public/video/` (e.g. `demo.mp4`)
   * or a full video/embed URL (MP4, YouTube, Vimeo, Loom).
   */
  video?: string;
  /**
   * Optional custom poster thumbnail for the video player. Defaults to `/img/${img}`.
   */
  videoPoster?: string;
  /**
   * Interactive live demo or sandbox URL (falls back to `link` if not specified).
   */
  demoUrl?: string;
  /**
   * Optional label or caption explaining what the demo highlights.
   */
  demoTitle?: string;
};

export const projects: Project[] = [
  {
    name: "Schema Visualizer",
    slug: "schema-visualizer",
    show: "Interactive tool for exploring a database schema or API data model as a live diagram — entities, relationships and field-level detail.",
    desc: "A visual explorer for data models. Instead of reading a Prisma schema top to bottom, you get a pannable diagram of every entity, the relationships between them, and field-level detail on demand — which makes onboarding, review and cross-team conversations about the model considerably faster. Built as a Next.js app with a React Flow canvas, dagre for automatic graph layout, and a Prisma AST parser that reads the schema directly. Covered by a Vitest suite.",
    lang: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "React Flow",
      "dagre",
      "better-auth",
      "Tailwind CSS",
      "Vitest",
    ],
    img: "schema-visualizer.png",
    // TODO: record a walkthrough for this project, drop it in public/video/
    // and point `video` at it. (The old value pointed at a shared
    // placeholder clip that four projects reused.)
    // video: "schema-visualizer-demo.mp4",
    demoTitle: "Interactive Schema Canvas & AST Visualizer Walkthrough",
    git: "https://github.com/bin-yam21/schema-visualizer",
    // link: "https://...", // ← add the deployed URL to light up the live-demo section + card badge
    featured: true,
    problem:
      "Database schemas are written as text but understood as graphs. Developers, testers and stakeholders each end up building a different mental picture of the same model, and relationships between entities are the first thing to get lost.",
    solution:
      "Parsed the Prisma schema into an AST and rendered it onto a React Flow canvas, with dagre computing the layout so the diagram stays readable as the model grows. Entities, relationships and field-level details are all inspectable in place, and the whole thing runs as a Next.js app with authentication so a team can share one view of the model.",
  },
  {
    name: "MockGen",
    slug: "mockgen",
    show: "VS Code extension and CLI that scans a workspace for API endpoints and spins up a realistic local mock server.",
    desc: "A developer tool that removes the wait for a backend. It scans the JS/TS files in a workspace for API endpoints, extracts the TypeScript types behind them, and generates a realistic mock definition. From there it runs a local mock server with hot reload, plus a dashboard with Swagger/OpenAPI UI, inline mock editing and request charts — all driven from the VS Code command palette. Ships as a CLI and a companion extension.",
    lang: [
      "TypeScript",
      "VS Code API",
      "Node.js",
      "esbuild",
      "OpenAPI",
      "Swagger UI",
    ],
    img: "mockgen.png",
    git: "https://github.com/bin-yam21/mockgen-cli",
    visible: false, // hidden until a screenshot is added
    problem:
      "Frontend work stalls whenever the API it depends on isn't ready. Hand-written mocks drift from the real endpoints almost immediately, and keeping them current is unrewarding work nobody volunteers for.",
    solution:
      "Built a scanner that reads endpoints and their TypeScript types straight out of the workspace, so the mocks are derived from the code rather than maintained alongside it. Generated mocks are served by a local server with hot reload, and a dashboard exposes Swagger UI, inline editing and charts. Packaged as both a CLI and a VS Code extension so it fits either workflow.",
  },
  {
    name: "Rust Chat",
    slug: "rust-chat-service",
    show: "Full-stack real-time chat — a Rust/Axum WebSocket backend with JWT auth and OpenAPI docs, plus a modern React chat UI.",
    desc: "A real-time messaging app with a Rust backend and a React frontend. Axum handles the HTTP surface and the WebSocket upgrade, with Tokio underneath for concurrency; users, rooms and messages persist through SQLx against Postgres with versioned migrations, and authentication is JWT with bcrypt-hashed passwords. The React client (Vite) delivers a modern chat UI — rooms, live messages and presence over the socket — and the whole API is documented with an OpenAPI 3 spec served through Swagger UI at /docs.",
    lang: [
      "Rust",
      "Axum",
      "Tokio",
      "WebSockets",
      "SQLx",
      "PostgreSQL",
      "JWT",
      "React",
      "OpenAPI",
      "Docker",
    ],
    img: "rust-chat-service.png",
    img2: "rust-chat-docs.png",
    // TODO: see the note on schema-visualizer — needs its own recording.
    // video: "rust-chat-demo.mp4",
    demoTitle: "Real-Time WebSocket & Tokio Event Pipeline Walkthrough",
    git: "https://github.com/bin-yam21/chat_app",
    // link: "https://...", // ← add the deployed URL to light up the live-demo section + card badge
    featured: true,
    problem:
      "Real-time messaging puts pressure on a backend in a way request/response traffic doesn't — long-lived connections, per-room fan-out, and authentication that has to survive the WebSocket upgrade rather than stopping at the handshake. And an API-first backend is only as useful as it is documented and consumable.",
    solution:
      "Used Axum's WebSocket support on top of Tokio so connections are cheap to hold open, with a per-room broadcast channel fanning messages out to every client. Because browsers can't set an Authorization header on a WebSocket handshake, the JWT is passed as a query param and validated before the upgrade. Persistence runs through SQLx against Postgres with versioned migrations, the whole API is documented with an OpenAPI 3 spec served via Swagger UI at /docs, and a Vite/React frontend provides the live chat interface.",
  },
  {
    name: "Lewe",
    slug: "lewe",
    show: "Go backend service with JWT auth, Postgres and versioned migrations, laid out to the standard cmd/internal structure.",
    desc: "A Go API service built on the parts of the ecosystem that hold up in production: pgx talking to Postgres directly rather than through an ORM, sqlc generating type-safe query code from plain SQL, and golang-migrate keeping schema changes versioned and reversible. Authentication is JWT with bcrypt password hashing. Organised to the conventional cmd/ and internal/ layout, with the design captured in a written spec alongside the code.",
    lang: ["Go", "PostgreSQL", "pgx", "sqlc", "golang-migrate", "JWT"],
    img: "lewe.png",
    git: "https://github.com/bin-yam21/lewe",
    visible: false, // hidden until a screenshot is added
  },
  {
    name: "The Archive — Thrift Marketplace",
    slug: "thrift-shop",
    show: "Full-stack secondhand-fashion marketplace — a NestJS/Fastify API and a polished React storefront with listings, orders and an admin dashboard.",
    desc: "A curated thrift marketplace built end to end. The backend is a modular NestJS app on the Fastify platform, with TypeORM against Postgres, JWT auth, throttling and helmet, versioned migrations, and pluggable image storage (local or Cloudinary). The storefront is a React + shadcn/ui app — a feed of listings with category filters, item conditions, availability and delivery, wishlists and checkout — backed by a separate admin dashboard for managing inventory and orders. Payloads are validated at the edge with class-validator DTOs so handlers only ever see well-formed input.",
    lang: [
      "NestJS",
      "TypeScript",
      "Fastify",
      "React",
      "TypeORM",
      "PostgreSQL",
      "shadcn/ui",
      "JWT",
    ],
    img: "thrift-shop.png",
    // TODO: see the note on schema-visualizer — needs its own recording.
    // video: "thrift-shop-demo.mp4",
    demoTitle: "Storefront & Admin Order Workflow Walkthrough",
    git: "https://github.com/bin-yam21/thrift-shop",
    // link: "https://...", // ← add the deployed URL to light up the live-demo section + card badge
    featured: true,
    problem:
      "A real marketplace is more than an API — it needs a trustworthy storefront, an admin surface to manage inventory and orders, image handling, and validation that holds up. Wiring those layers together coherently is where most side-projects stall.",
    solution:
      "Split the system into a modular NestJS/Fastify backend (TypeORM + Postgres, JWT, throttling, migrations, local or Cloudinary uploads) and a React/shadcn storefront with a companion admin dashboard. DTO validation guards every endpoint, and the storefront covers the real shopping flow — filterable listings, conditions, availability, wishlists and checkout.",
  },
  {
    name: "FPL Assistant",
    slug: "fpl-assistant",
    show: "Fantasy Premier League companion — live data, player statistics and a drag-and-drop team builder.",
    desc: "A companion app for Fantasy Premier League managers, built to turn the raw FPL data into decisions. Live player statistics feed a drag-and-drop squad builder that works with both mouse and touch, backed by MongoDB through Mongoose and NextAuth for accounts. Scheduled jobs via node-cron keep the data fresh between gameweeks, and the interface follows the official FPL visual language.",
    lang: [
      "Next.js",
      "React",
      "MongoDB",
      "Mongoose",
      "NextAuth",
      "dnd-kit",
      "node-cron",
      "Framer Motion",
    ],
    img: "fpl-assistant.png",
    git: "https://github.com/bin-yam21/fpl-assistance",
    visible: false, // hidden until a screenshot is added
    problem:
      "FPL managers make weekly decisions across a large, fast-moving dataset. The official site shows the numbers but doesn't help you try a squad out — you can't easily reshape a team and see what it costs you.",
    solution:
      "Built a drag-and-drop squad builder on dnd-kit with both HTML5 and touch backends, so the same interaction works on a laptop and a phone. Player statistics come from the FPL data and are refreshed on a node-cron schedule rather than fetched per request. Accounts run through NextAuth over a MongoDB adapter so a manager's drafts persist between sessions.",
  },
  {
    name: "HTTP Server from Scratch",
    slug: "web-server-rust",
    show: "A working HTTP server written in Rust directly on TCP sockets — no web framework involved.",
    desc: "An HTTP/1.1 server implemented from the socket up in Rust: accepting TCP connections, parsing request lines and headers by hand, routing, and constructing well-formed responses. Written to understand what a framework is actually doing rather than to replace one. MIT licensed, with CI running on GitHub Actions.",
    lang: ["Rust", "TCP", "HTTP/1.1", "Makefile", "GitHub Actions"],
    img: "web-server-rust.png",
    git: "https://github.com/bin-yam21/web-server-rust",
    visible: false, // hidden until a screenshot is added
  },
  {
    name: "Task Management System",
    slug: "task-management-system",
    show: "Team project and task tracker with assignment, deadlines, progress and real-time notifications.",
    desc: "A full-stack application for running projects across a team. Users create projects, assign tasks, track progress against deadlines and receive notifications as work moves. Split into a JavaScript frontend and an Express/MongoDB backend, with Socket.IO carrying updates so a board reflects changes without a refresh, and JWT-based authentication guarding the API.",
    lang: [
      "JavaScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "JWT",
    ],
    img: "task-management-system.png",
    git: "https://github.com/bin-yam21/task-management-system",
    visible: false, // hidden until a screenshot is added
  },
  {
    name: "Birana — Ethiopian Bookstore",
    slug: "book-store",
    show: "Full-stack MERN e-commerce bookstore for Amharic literature — catalogue, cart, checkout, orders and an admin dashboard.",
    desc: "A production-style online bookstore built on the MERN stack and themed for an Ethiopian audience. Shoppers browse a filterable catalogue, add books to a cart and check out; an admin dashboard handles inventory and order stats. State runs through Redux Toolkit with RTK Query for data fetching and caching, authentication is handled with Firebase, and the interface is a custom Tailwind design system — parchment, deep-green and gold — with pricing in Ethiopian Birr. Frontend (Vite/React) and backend (Express/MongoDB) are separate, independently deployable services.",
    lang: [
      "React",
      "Redux Toolkit",
      "RTK Query",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
    ],
    img: "book-store.png",
    // TODO: see the note on schema-visualizer — needs its own recording.
    // video: "book-store-demo.mp4",
    demoTitle: "Bookstore Storefront & Cart Workflow Walkthrough",
    git: "https://github.com/bin-yam21/book-store-mern-stack",
    // link: "https://...", // ← add the deployed URL to light up the live-demo section + card badge
    featured: true,
    problem:
      "Amharic readers have few polished, localized places to buy books online — most options are generic, English-first and don't handle local pricing or a real storefront flow end to end.",
    solution:
      "Built a complete storefront and admin experience: a filterable catalogue with Trending badges, cart and checkout, order processing and an admin dashboard with sales stats. Redux Toolkit and RTK Query keep data fetching and caching clean, Firebase covers auth, and a bespoke Tailwind design system gives it a distinct Ethiopian identity with Birr pricing throughout.",
  },
];

/**
 * Private client & company work. These are real engagements that can't be
 * open-sourced or linked publicly, so they're shown as sanitized case studies
 * — role, problem, what was built and the stack — to demonstrate skill without
 * exposing code or protected data. Rendered in their own "Client & Company
 * Work" section, kept out of the open-source `projects` grid and the sitemap.
 *
 * These are marked `confidential: true`, so no "View source" button ever
 * renders. `img`, `link` and `demoUrl` are optional — drop a sanitized
 * screenshot into `public/img` and/or a case-study/live link if one exists.
 * Edit the copy below to match reality; keep everything NDA-safe.
 */
export const companyProjects: Project[] = [
  {
    name: "Demket — Retail & Commerce Platform",
    slug: "demket-platform",
    confidential: true,
    company: "Demket",
    role: "Full-Stack Engineer",
    period: "Company project",
    show: "Enterprise commerce and operations platform built on a Next.js dashboard — inventory, orders and reporting for a real business.",
    desc: "A production platform for a live business, built on an enterprise Next.js starter with a typed API layer. Work spanned the operations dashboard, data modelling and the integration layer that ties inventory, orders and reporting together. Delivered as private company work, so the code and deployment aren't public — the summary here focuses on the engineering, not the internals.",
    lang: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    img: "dimket.png", // sanitized screenshot
    demoUrl: "https://t.me/dimket_bot", // Telegram mini app
    git: undefined,
    problem:
      "The business was running operations across spreadsheets and disconnected tools, with no single, reliable view of inventory, orders and performance.",
    solution:
      "Built a role-based operations dashboard on a typed Next.js stack, modelling the core domain and wiring inventory, orders and reporting into one place so the team could run day-to-day operations from a single system.",
    outcomes: [
      "Designed and built key dashboard modules end to end (UI, API and data model).",
      "Modelled the core commerce domain and the reporting layer on PostgreSQL.",
      "Delivered a maintainable, typed codebase on an enterprise Next.js foundation.",
    ],
  },
  {
    name: "SecureHR — Security-Firm HR & ERP",
    slug: "securehr-erp",
    confidential: true,
    company: "Confidential (private security firm)",
    role: "Backend / Full-Stack Engineer",
    period: "Company project",
    show: "HR and ERP system for a private security company — staff records, roles and permissions, and operational workflows on a LoopBack 4 API.",
    desc: "An internal HR/ERP system for a security firm, covering employee records, role- and permission-based access and the operational workflows the business runs on. The backend is a LoopBack 4 (TypeScript) API with JWT auth over a relational database, paired with an admin dashboard. Delivered as private company work — no public repo or deployment — so this is a sanitized overview of the engineering.",
    lang: ["LoopBack 4", "TypeScript", "Node.js", "PostgreSQL", "JWT", "React"],
    img: "securehr-erp.png", // optional sanitized screenshot; falls back to a monogram tile
    // link: "https://...",
    git: undefined,
    problem:
      "The firm needed to move HR and operational records off manual processes into one system, with proper access control over who could see and change what.",
    solution:
      "Built a LoopBack 4 API with JWT authentication and a role/permission model, backing an admin dashboard for managing staff records and operational workflows — structured so new modules could be added without reworking the core.",
    outcomes: [
      "Designed the data model and role/permission layer for HR and operations.",
      "Built secured REST endpoints with JWT auth on a LoopBack 4 (TypeScript) backend.",
      "Delivered the admin dashboard workflows for staff and record management.",
    ],
  },
  {
    name: "TapServe — Food Ordering & Restaurant Management",
    slug: "tapserve",
    confidential: true,
    company: "TapServe",
    role: "Full-Stack Engineer",
    period: "Company project",
    show: "Food ordering and restaurant management platform — menus, orders and day-to-day operations for restaurant staff and customers.",
    desc: "A food ordering and restaurant management system covering the customer ordering flow and the operational side restaurants run on — menus, orders and staff workflows. Delivered as private company work, so the summary here focuses on the engineering rather than internals.",
    lang: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    img: "tapserve.png", // sanitized screenshot
    link: "https://www.tapserve.et/",
    git: undefined,
    problem:
      "Restaurants needed a single system to take orders and run day-to-day operations instead of relying on manual, disconnected processes.",
    solution:
      "Built a food ordering platform paired with a restaurant management layer, covering menus, order flow and the operational workflows staff use to run service.",
    outcomes: [
      "Built the customer-facing ordering flow end to end.",
      "Built restaurant management workflows for menus and orders.",
      "Delivered a maintainable, typed full-stack codebase.",
    ],
  },
];

/**
 * Projects shown on the site. Flip `visible: false` on any entry in the list
 * above to switch it off without deleting it.
 */
export const visibleProjects = projects.filter((p) => p.visible !== false);

/**
 * Company work shown on the site — same `visible: false` opt-out as the
 * open-source projects.
 */
export const visibleCompanyProjects = companyProjects.filter(
  (p) => p.visible !== false
);

/**
 * The subset promoted to the homepage "Selected work" grid — the ones marked
 * `featured: true`. Falls back to the first four visible projects so the
 * homepage is never empty while you're still choosing.
 */
export const featuredProjects = (() => {
  const marked = visibleProjects.filter((p) => p.featured);
  return marked.length ? marked : visibleProjects.slice(0, 4);
})();

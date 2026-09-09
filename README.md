# Binyam Tamiru — Portfolio

Personal site and project archive for **Binyam Tamiru**, full-stack engineer.
Live at **[binyam-tamiru.vercel.app](https://binyam-tamiru.vercel.app)**.

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 and
Framer Motion. Contact form delivery runs through Resend.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Resend values (optional in dev)
npm run dev                  # http://localhost:3000
```

`npm run build` runs the production build with type checking and linting
enabled — both are build failures, on purpose.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | for the contact form | Resend API key ([get one](https://resend.com/api-keys)) |
| `RESEND_TO_EMAIL` | for the contact form | Inbox that receives enquiries |
| `RESEND_FROM_EMAIL` | optional | Verified sender. Defaults to Resend's sandbox address, which **only delivers to the account that owns the API key** |

Without the first two the form returns a 503 with a clear message and the
build still succeeds.

## Editing content

Almost everything on the page is data, not markup:

- **`src/lib/site.ts`** — name, role, links, résumé path, availability band,
  work history and the hero stats.
- **`_data/data.ts`** — projects and private client case studies.
  - `visible: false` hides an entry everywhere without deleting it.
  - `featured: true` promotes it to the homepage "Selected work" grid.
  - `confidential: true` moves it into the "Client & company work" section and
    suppresses the "View source" button.
  - `img` is a filename in `public/img`. If the file isn't there the card falls
    back to a generated monogram tile, so a missing screenshot never renders as
    a broken image.
  - `video` is a filename in `public/video` (or a YouTube/Vimeo/Loom URL) and
    lights up the demo player plus the "Watch Demo" badge. Keep one recording
    per project — a shared clip under four different projects reads as a
    placeholder.

## Structure

```
src/app/                 routes, metadata, generated icon + OG image
src/app/api/send/        contact-form endpoint (validation, honeypot, rate limit)
src/components/          page sections and UI primitives
src/lib/site.ts          identity, links and copy used in more than one place
_data/data.ts            projects and case studies
public/img               project screenshots       public/video  demo recordings
```

The favicon, apple touch icon and social card are generated at build time from
`src/app/icon.tsx`, `apple-icon.tsx` and `opengraph-image.tsx`, so they follow
the values in `site.ts` rather than being separate image files to keep in sync.

## Deploy

Deploys to Vercel from `main`. Set the three environment variables above in the
project settings; nothing else is required.

import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

/**
 * The card that shows up when the site is pasted into LinkedIn, Slack, X or a
 * DM — which, for a portfolio, is the first thing most people ever see of it.
 * Generated here so it can never drift from the copy in `site.ts`; the old
 * setup reused a project screenshot for every page.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#1a1917",
          backgroundImage:
            "radial-gradient(circle at 18% 0%, rgba(224,122,42,0.28), transparent 55%), radial-gradient(circle at 92% 96%, rgba(56,132,197,0.16), transparent 50%)",
          color: "#f7f5f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#e07a2a",
              color: "#1a1917",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "-0.05em",
            }}
          >
            BT
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#b3aca4",
            }}
          >
            {site.role}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 32,
              lineHeight: 1.4,
              color: "#c9c2b9",
            }}
          >
            Full-stack engineer shipping things that last — React, Next.js,
            Node.js, Go and Rust.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            fontSize: 24,
            color: "#9d968e",
          }}
        >
          <div style={{ display: "flex" }}>
            {site.url.replace("https://", "")}
          </div>
          <div style={{ display: "flex", color: "#e07a2a" }}>
            Available for new work
          </div>
        </div>
      </div>
    ),
    size
  );
}

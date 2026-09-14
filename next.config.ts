import path from "node:path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Type and lint errors are build failures on purpose: a portfolio that
  // silently ships a broken page costs more than a red build.
  poweredByHeader: false,
  // A stray lockfile in the home directory made Next infer the wrong workspace
  // root, which throws off build-trace collection. Pin it to this project.
  outputFileTracingRoot: path.join(__dirname),
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

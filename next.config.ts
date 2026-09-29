import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75, 90],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: {
    // Allows CV uploads (4 MB max) through the careers application form
    serverActions: { bodySizeLimit: "5mb" },
  },
  async headers() {
    return [
      // The embedded Studio sets its own framing rules for the Presentation tool
      { source: "/((?!studio).*)", headers: securityHeaders },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

const parentDir = path.resolve(__dirname, "..");
const isMonorepoParent =
  !process.env.VERCEL &&
  fs.existsSync(path.join(parentDir, "SCRIPE-Backend"));

const nextConfig: NextConfig = {
  turbopack: {
    root: isMonorepoParent ? parentDir : __dirname,
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/archify-hub/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        source: "/understand-hub/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/technical",
        destination: "/technical/get-started/overview",
        permanent: false,
      },
      {
        source: "/commercial",
        destination: "/commercial/why-scripe-overview",
        permanent: false,
      },
      {
        source: "/docs",
        destination: "/technical/get-started/overview",
        permanent: false,
      },
      {
        source: "/docs/:path*",
        destination: "/technical/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;


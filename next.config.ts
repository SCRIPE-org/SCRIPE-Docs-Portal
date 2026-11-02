import type { NextConfig } from "next";

import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
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

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
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

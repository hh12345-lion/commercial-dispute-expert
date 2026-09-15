import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/blog/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/fees", destination: "/contact", permanent: true },
      { source: "/experts", destination: "/contact", permanent: true },
      { source: "/experts/:slug", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;

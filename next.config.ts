import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      // The application form attaches a CV capped at 5 MB, and the multipart
      // body carries the other nine fields on top of it.
      bodySizeLimit: "6mb",
    },
  },
  watchOptions: {
    pollIntervalMs: 500,
  },
  async redirects() {
    return [
      // The careers page moved from the singular /career, which the old
      // marketing-layout version lived at, to /careers. Anything already
      // pointing at the old URL keeps working.
      { source: "/career", destination: "/careers", permanent: true },
    ];
  },
};

export default nextConfig;

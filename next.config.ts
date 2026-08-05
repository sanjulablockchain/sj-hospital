import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
  watchOptions: {
    pollIntervalMs: 500,
  },
};

export default nextConfig;

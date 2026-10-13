import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // Add allowedDevOrigins directly inside the config object
  allowedDevOrigins: ['192.168.1.16', 'localhost:3000'],
};

export default nextConfig;

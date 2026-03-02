
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://192.168.1.10:3000",
    ],
};

export default nextConfig;



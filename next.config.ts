import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Credential PDFs live on GitHub; never bundle them into serverless functions.
  outputFileTracingExcludes: {
    "/**": ["./certificated-developers/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;

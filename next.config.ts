import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "b2qjrcfgub.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
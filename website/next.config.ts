import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/:locale/berm-v18",
        destination: "/:locale/about/history",
        permanent: true,
      },
      {
        source: "/:locale/berm-v18/:path*",
        destination: "/:locale/about/history",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

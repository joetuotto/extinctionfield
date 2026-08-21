import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

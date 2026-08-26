import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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

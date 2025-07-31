import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/tasks',
        permanent: true, // true для 301 (постоянный), false для 302 (временный)
      },
    ];
  },
};

export default nextConfig;

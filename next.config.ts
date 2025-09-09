import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/tasks/all",
  //     },
  //   ];
  // },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/tasks/all',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;

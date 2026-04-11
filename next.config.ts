import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // Comentado para usar con dev server — descomenta para build estático
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

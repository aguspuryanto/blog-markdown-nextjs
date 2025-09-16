import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static HTML export
  output: 'export',
  
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Image optimization
  images: {
    unoptimized: true, // Disable default Image Optimization API for static export
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  
  // Enable static generation for all pages
  generateBuildId: async () => 'build',
  
  // Configure trailing slashes for static export
  trailingSlash: true,
  
  // Configure base path if needed (e.g., for GitHub Pages)
  // basePath: '/my-blog',
  
  // Configure asset prefix if needed (e.g., for CDN)
  // assetPrefix: isProd ? 'https://cdn.mydomain.com' : '',
  
  // Enable React Strict Mode
  reactStrictMode: true,
  
  // Enable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Enable ESLint during build
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: Restrict image domains to prevent abuse
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nexai.io",
      },
      {
        protocol: "https",
        hostname: "cdn.nexai.io",
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com", // For GitHub avatars/content
      },
    ],
    unoptimized: false, // Enable image optimization
  },

  // Performance: Enable production optimizations
  reactStrictMode: true,

  // Performance: Disable file tracing in favor of explicit imports
  outputFileTracingRoot: undefined,

  // Performance: Optimize bundle splitting + React Compiler
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
    reactCompiler: true,
  },

  // Performance: Compress responses
  compress: true,

  // Security: Headers for production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
};

export default nextConfig;

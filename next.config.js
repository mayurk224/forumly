/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
        pathname: "/**",
      }
    ]
  },
  // This is important for Sanity Studio to work properly with catch-all routes
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable symlinks for Windows compatibility
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-win32-x64-msvc',
        'node_modules/@esbuild/win32-x64',
        'node_modules/webpack'
      ],
    },
  },
  // Avoid symlink issues on Windows
  output: 'standalone',
};

module.exports = nextConfig;

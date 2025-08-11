/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for hosting
  output: "export",

  // Disable server-side features for static export
  trailingSlash: true,

  // Image optimization
  images: {
    unoptimized: true, // Required for static export
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  },

  // Headers for CORS and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

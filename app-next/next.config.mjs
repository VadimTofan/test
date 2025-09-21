const BACKEND_URL = process.env.NEXT_PUBLIC_DB_ACCESS;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "https://test-6zo5.onrender.com/api/:path*" },
      { source: "/auth/:path*", destination: "https://test-6zo5.onrender.com/auth/:path*" },
    ];
  },
};
module.exports = nextConfig;

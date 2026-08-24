/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
];

const nextConfig = {
  images: {
    // Allow inline base64 data URLs (from the drag-and-drop screenshot editor)
    dangerouslyAllowSVG: false,
    remotePatterns: [
      // Add your image CDN domains here if needed, e.g.:
      // { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
    // Formats to serve (avif is best for quality/size, webp as fallback)
    formats: ["image/avif", "image/webp"],
  },

  // Compress responses
  compress: true,

  // Strict mode catches hydration bugs early in development
  reactStrictMode: true,

  // Security headers applied to every route
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Experimental: enable partial prerendering for faster shell delivery
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

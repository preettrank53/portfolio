/** @type {import('next').NextConfig} */
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

  // Experimental: enable partial prerendering for faster shell delivery
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;

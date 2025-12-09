// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // …any other settings
  images: {
    domains: ['picsum.photos'],
  },
};

export default nextConfig;

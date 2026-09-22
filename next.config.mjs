/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Keep the production output lean — no image optimizer bloat,
  // no unused locales/polyfills, small first-load JS.
  compress: true,
};

export default nextConfig;

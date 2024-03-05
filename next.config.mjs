/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.VERCEL_ENV !== "production",
};

export default nextConfig;

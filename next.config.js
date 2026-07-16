/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["firebase-admin", "groq-sdk"],
  },
};

module.exports = nextConfig;

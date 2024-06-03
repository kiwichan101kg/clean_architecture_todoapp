/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASIC_AUTH_USERNAME: process.env.BASIC_AUTH_USERNAME,
    FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
  },
};

export default nextConfig;

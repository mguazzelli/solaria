/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'www.solaria.com.br' },
      { protocol: 'https', hostname: 'www.solaria.com.br' },
    ],
  },
};
module.exports = nextConfig;

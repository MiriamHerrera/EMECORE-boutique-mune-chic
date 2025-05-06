/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.optimization = {
      ...config.optimization,
      minimize: true,
    };
    return config;
  },
};

module.exports = nextConfig; 
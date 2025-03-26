/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@radix-ui/react-select'],
  images: {
    domains: ['tile.openstreetmap.org'],
  },
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ipfs.io', 'tile.openstreetmap.org'],
  },
  async rewrites() {
    return [
      {
        source: '/api/alchemy/:path*',
        destination: 'https://eth-sepolia.g.alchemy.com/v2/:path*',
      },
    ];
  },
}

module.exports = nextConfig 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:['images.unsplash.com', 'res.cloudinary.com']
  },
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig

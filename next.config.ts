import withPWA from 'next-pwa'
import { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const nextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(config)

export default nextConfig


declare module 'next-pwa' {
    import { NextConfig } from 'next'
  
    interface PWAConfig {
      dest?: string
      disable?: boolean
      register?: boolean
      skipWaiting?: boolean
      buildExcludes?: RegExp[] // Add buildExcludes here
    }
  
    function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
  
    export = withPWA
  }
  
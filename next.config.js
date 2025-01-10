/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Aktiviere notwendige experimentelle Features
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
  output: 'standalone',
  // Optimiere für Produktionsumgebung
  poweredByHeader: false,
  generateEtags: false,
  // Cache-Einstellungen
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  // Webpack-Konfiguration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Stelle sicher, dass Client-Komponenten korrekt gebundled werden
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Deaktiviere experimentelle Features
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
}

module.exports = nextConfig

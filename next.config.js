/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Optimiere für Produktionsumgebung
  poweredByHeader: false,
  generateEtags: false,
  // Webpack-Konfiguration für bessere Kompatibilität
  webpack: (config, { dev, isServer }) => {
    // Füge Alias für problematische Module hinzu
    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': path.join(__dirname, 'src'),
    }

    return config
  },
  // Setze strikte Produktionseinstellungen
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig

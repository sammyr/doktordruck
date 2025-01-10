/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Optimiere für Produktionsumgebung
  poweredByHeader: false,
  generateEtags: false,
  // Webpack-Konfiguration für bessere Kompatibilität
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Füge explizite Aliase für problematische Module hinzu
        'next/dist/client/components/static-generation-async-storage.external': 
          require.resolve('next/dist/client/components/static-generation-async-storage.external'),
      }
    }
    return config;
  },
}

module.exports = nextConfig

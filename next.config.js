/** @type {import('next').NextConfig} */
const nextConfig = {
  // Obligatorio para compilar en cPanel (solo en build de producción)
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
  // ⚠️ CAMBIADO: false evita que Next.js genere carpetas por cada slug
  // Antes: trailingSlash: true → creaba /blog/slug/index.html (interfería con .htaccess)
  // Ahora: false → no crea carpetas de slugs, el .htaccess manda todo a blog-article.php
  trailingSlash: false,

  // ✅ OPTIMIZACIÓN: Compresión habilitada
  compress: true,

  // Necesario para exportación estática (sin servidor Next.js)
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
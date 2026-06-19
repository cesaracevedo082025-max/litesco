// ✅ SEO: Next.js genera robots.txt automáticamente
// Google lo encuentra en https://litesco.com.co/robots.txt

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/private', '/blog/_placeholder'],
    },
    sitemap: [
      'https://litesco.com.co/sitemap.xml',
      'https://litesco.com.co/blog-sitemap.php',
    ],
  }
}

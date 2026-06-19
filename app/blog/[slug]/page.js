/**
 * app/blog/[slug]/page.js
 *
 * Con output:'export' Next.js EXIGE que generateStaticParams exista y devuelva
 * al menos un valor. Devolvemos un slug ficticio que nunca se usará en producción
 * porque el .htaccess intercepta todas las rutas /blog/[slug] antes de que
 * Apache sirva cualquier archivo estático, mandándolas a blog-article.php.
 *
 * FLUJO EN PRODUCCIÓN:
 *   /blog/nombre-articulo → .htaccess → blog-article.php?slug=nombre-articulo → MySQL ✅
 *
 * La carpeta out/blog/_placeholder/ que genera este build es ignorada porque
 * el slug "_placeholder" nunca coincide con ningún artículo real.
 */

import BlogPage from '@/views/BlogPage'

export async function generateStaticParams() {
  return [{ slug: '_placeholder' }]
}

export async function generateMetadata() {
  return {
    robots: { index: false, follow: false },
  }
}

export default function BlogSlugPage() {
  return <BlogPage />
}
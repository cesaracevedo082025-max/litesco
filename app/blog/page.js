export const metadata = {
  title: 'Blog Legal | Noticias Jurídicas Colombia',
  description: 'Blog de noticias legales, actualizaciones jurídicas y artículos especializados sobre derecho colombiano. Mantente informado con LITESCO.',
  keywords: 'derecho colombiano, noticias legales, abogados Colombia, LITESCO',
  alternates: { canonical: 'https://litesco.com.co/blog' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Blog Legal | LITESCO',
    description: 'Noticias legales y artículos especializados sobre derecho colombiano.',
    url: 'https://litesco.com.co/blog',
    type: 'website',
    siteName: 'LITESCO',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://litesco.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Blog Legal', item: 'https://litesco.com.co/blog' },
  ],
}

import BlogPage from '@/views/BlogPage'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <BlogPage />
    </>
  )
}
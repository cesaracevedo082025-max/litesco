export const metadata = {
  title: 'Sobre LITESCO | Abogados Expertos Bogotá | Quiénes Somos',
  description: 'Conoce a LITESCO, firma legal especializada en litigios y asesoría empresarial en Bogotá. Más de 10 años de experiencia, equipo de expertos, soluciones innovadoras para tu empresa.',
  alternates: { canonical: 'https://litesco.com.co/sobre-nosotros' },
  openGraph: {
    title: 'Sobre LITESCO | Abogados Expertos Bogotá',
    description: 'Conoce a LITESCO, firma legal especializada en litigios y asesoría empresarial en Bogotá.',
    url: 'https://litesco.com.co/sobre-nosotros',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://litesco.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Sobre Nosotros', item: 'https://litesco.com.co/sobre-nosotros' },
  ],
}

import SobreNosotrosPage from '@/views/SobreNosotrosPage'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SobreNosotrosPage />
    </>
  )
}

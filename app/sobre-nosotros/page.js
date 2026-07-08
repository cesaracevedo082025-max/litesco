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

import SobreNosotrosPage from '@/views/SobreNosotrosPage'
import JsonLd, { buildBreadcrumbSchema } from '@/components/seo/JsonLd'

export default function Page() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Sobre Nosotros', url: 'https://litesco.com.co/sobre-nosotros' }])} />
      <SobreNosotrosPage />
    </>
  )
}

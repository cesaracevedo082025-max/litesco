export const metadata = {
  title: 'Asesoría Legal Corporativa | Derecho Empresarial Bogotá | LITESCO',
  description: 'Asesoría legal empresarial especializada en derecho corporativo, laboral y contractual. Soluciones jurídicas para PyME y grandes corporaciones en Bogotá. LITESCO - Tu aliado legal.',
  alternates: { canonical: 'https://litesco.com.co/corporativo' },
  openGraph: {
    title: 'Asesoría Legal Corporativa | LITESCO',
    description: 'Asesoría legal empresarial especializada en derecho corporativo en Bogotá.',
    url: 'https://litesco.com.co/corporativo',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://litesco.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Corporativo', item: 'https://litesco.com.co/corporativo' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué servicios de derecho corporativo ofrece LITESCO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LITESCO ofrece asesoría en constitución y restructuración de sociedades, elaboración y revisión de contratos comerciales, derecho laboral empresarial, compliance, fusiones y adquisiciones, y gestión de riesgos legales para PyMEs y grandes empresas en Bogotá, Colombia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Atienden a PyMEs o solo a grandes empresas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LITESCO atiende tanto a PyMEs como a grandes corporaciones. Contamos con planes de asesoría ajustados al tamaño y necesidades de cada empresa, desde startups hasta compañías consolidadas que requieren acompañamiento jurídico permanente en Colombia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el derecho laboral empresarial y cómo puede ayudarme?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El derecho laboral empresarial protege a los empleadores en temas de contratación, despidos, liquidaciones, pactos colectivos y demandas laborales. En LITESCO asesoramos a las empresas para evitar contingencias legales y representamos en procesos ante el Ministerio del Trabajo y la jurisdicción ordinaria laboral.',
      },
    },
  ],
}

import CorporativoPage from '@/views/CorporativoPage'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CorporativoPage />
    </>
  )
}

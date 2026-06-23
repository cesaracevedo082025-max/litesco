export const metadata = {
  title: 'Abogados Litigios Comerciales | Representación Judicial Bogotá',
  description: 'Litigios comerciales y civiles con representación judicial experta. Arbitraje, mediación y resolución alternativa de conflictos. Especialistas en derecho administrativo y laboral. Bogotá.',
  alternates: { canonical: 'https://litesco.com.co/litis' },
  openGraph: {
    title: 'Abogados Litigios Comerciales | LITESCO',
    description: 'Representación judicial experta en litigios comerciales y civiles en Bogotá.',
    url: 'https://litesco.com.co/litis',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://litesco.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Litis', item: 'https://litesco.com.co/litis' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué tipos de litigios maneja LITESCO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LITESCO maneja litigios civiles, comerciales, laborales y administrativos. Representamos a empresas y personas naturales en procesos judiciales ante todas las instancias, incluyendo arbitraje y mediación como métodos alternativos de solución de conflictos en Bogotá, Colombia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto tiempo tarda un proceso de litigio en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Los tiempos varían según el tipo de proceso: un proceso ejecutivo puede resolverse en 6 a 18 meses; procesos ordinarios pueden tomar de 2 a 5 años. En LITESCO evaluamos cada caso para definir la estrategia más eficiente y rápida según la jurisdicción y complejidad del asunto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Ofrecen representación en procesos administrativos ante el Estado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. LITESCO cuenta con abogados especializados en derecho contencioso administrativo para representar a empresas y personas naturales en demandas al Estado, recursos de apelación ante entidades públicas y procesos ante la jurisdicción contencioso administrativa en Colombia.',
      },
    },
  ],
}

import LitisPage from '@/views/LitisPage'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <LitisPage />
    </>
  )
}

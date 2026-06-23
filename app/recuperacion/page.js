export const metadata = {
  title: 'Cobranza BPO | Gestión de Cartera | Tercerización Bogotá',
  description: 'Servicio integral de cobranza extrajudicial y BPO. Gestión de cartera vencida con resultados garantizados. Tercerización legal especializada para empresas en Bogotá. Recupera tu dinero eficientemente.',
  alternates: { canonical: 'https://litesco.com.co/recuperacion' },
  openGraph: {
    title: 'Cobranza BPO | Gestión de Cartera | LITESCO',
    description: 'Gestión de cartera vencida con resultados garantizados en Bogotá.',
    url: 'https://litesco.com.co/recuperacion',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://litesco.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Recuperación de Cartera', item: 'https://litesco.com.co/recuperacion' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es la Cobranza BPO y cómo funciona en LITESCO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Cobranza BPO (Business Process Outsourcing) es la tercerización total del proceso de recuperación de cartera vencida. LITESCO gestiona el cobro de deudas de su empresa sin riesgo financiero para usted: nosotros asumimos el proceso extrajudicial y judicial, y solo cobramos una comisión sobre lo efectivamente recuperado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cobra LITESCO por la recuperación de cartera?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LITESCO trabaja bajo el modelo de comisión por éxito: solo cobramos un porcentaje acordado sobre la cartera que efectivamente se recupere. No hay costos fijos ni anticipos. Esto alinea nuestros incentivos con los de su empresa y elimina el riesgo financiero del proceso de cobranza.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de cartera puede gestionar LITESCO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gestionamos cartera de empresas de todos los sectores: financiero, salud, telecomunicaciones, servicios, construcción y comercio. Manejamos deudas desde etapa preventiva y extrajudicial hasta cobro judicial, incluyendo pagarés, facturas vencidas, contratos incumplidos y obligaciones dinerarias en Colombia.',
      },
    },
  ],
}

import RecuperacionPage from '@/views/RecuperacionPage'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <RecuperacionPage />
    </>
  )
}

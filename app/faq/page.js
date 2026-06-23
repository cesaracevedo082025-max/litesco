export const metadata = {
  title: 'Preguntas Frecuentes | Servicios Legales | LITESCO',
  description: 'Respuestas a preguntas frecuentes sobre servicios legales, litigios, cobranza y asesoría empresarial. Encuentra soluciones a tus dudas jurídicas en LITESCO Bogotá.',
  alternates: { canonical: 'https://litesco.com.co/faq' },
  openGraph: {
    title: 'Preguntas Frecuentes | LITESCO',
    description: 'Respuestas a preguntas frecuentes sobre servicios legales en LITESCO Bogotá.',
    url: 'https://litesco.com.co/faq',
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://litesco.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Preguntas Frecuentes', item: 'https://litesco.com.co/faq' },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué servicios ofrece LITESCO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'LITESCO ofrece servicios en tres líneas principales: Litis (litigios y representación judicial), Corporativo (asesoría legal empresarial, contratos y derecho laboral) y Recuperación (cobranza BPO y gestión de cartera vencida). Atendemos a empresas y personas naturales en Bogotá, Colombia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo agendar una consulta con LITESCO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puede contactarnos por WhatsApp al +57 313 203 7572 o a través del formulario de contacto en nuestra página web. Respondemos en menos de 24 horas y ofrecemos una primera consulta para evaluar su caso sin compromiso.',
      },
    },
    {
      '@type': 'Question',
      name: '¿LITESCO atiende empresas y personas naturales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. LITESCO atiende tanto a empresas de todos los sectores como a personas naturales que necesiten representación judicial o asesoría legal. Nuestro equipo adapta las soluciones jurídicas a las necesidades específicas de cada cliente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde están ubicados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Estamos ubicados en CRA 7 #17-01, cerca de Las Aguas, en Bogotá, Colombia. Nuestro horario de atención es de lunes a viernes de 8:00 AM a 6:00 PM y sábados de 9:00 AM a 1:00 PM.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la Cobranza BPO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Cobranza BPO es la tercerización del proceso de recuperación de cartera vencida. LITESCO gestiona el cobro de sus deudas asumiendo el proceso extrajudicial y judicial, cobrando únicamente una comisión sobre lo efectivamente recuperado, sin riesgo financiero para su empresa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es la diferencia entre Litis y Corporativo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Litis se enfoca en litigios activos: representación judicial, defensa en procesos y demandas en curso. Corporativo es asesoría preventiva: estructuración de contratos, gestión de riesgos legales y acompañamiento jurídico continuo para evitar llegar a un litigio.',
      },
    },
  ],
}

import FAQPage from '@/views/FAQPage'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FAQPage />
    </>
  )
}

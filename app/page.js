export const metadata = {
  title: 'Abogados Litigios | Asesoría Legal Bogotá | LITESCO Colombia',
  description: 'Abogados especialistas en litigios comerciales, asesoría legal empresarial y cobranza BPO en Bogotá. Soluciones jurídicas innovadoras para empresas. Consulta inicial gratis.',
  alternates: {
    canonical: 'https://litesco.com.co',
  },
  openGraph: {
    title: 'Abogados Litigios | Asesoría Legal Bogotá | LITESCO Colombia',
    description: 'Abogados especialistas en litigios comerciales, asesoría legal empresarial y cobranza BPO en Bogotá.',
    url: 'https://litesco.com.co',
  },
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
        text: 'LITESCO ofrece servicios en tres líneas principales: Litis (litigios y representación judicial en procesos civiles, comerciales y administrativos), Corporativo (asesoría legal empresarial, contratos, derecho laboral y compliance) y Recuperación (cobranza BPO y gestión de cartera vencida para empresas). Atendemos a empresas y personas naturales en Bogotá, Colombia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo agendar una consulta con LITESCO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Puede contactarnos por WhatsApp al +57 313 203 7572 o a través del formulario de contacto en litesco.com.co/contacto. Respondemos en menos de 24 horas. También puede visitarnos en nuestra oficina en CRA 7 #17-01, Bogotá, de lunes a viernes de 8 AM a 6 PM.',
      },
    },
    {
      '@type': 'Question',
      name: '¿LITESCO atiende empresas y personas naturales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. LITESCO atiende tanto a empresas de todos los sectores como a personas naturales que requieran representación judicial o asesoría legal. Adaptamos nuestras soluciones jurídicas a las necesidades de cada cliente, desde PyMEs hasta grandes corporaciones en Colombia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Dónde están ubicados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Estamos en CRA 7 #17-01, cerca de Las Aguas, Bogotá, Colombia. Horario de atención: lunes a viernes de 8:00 AM a 6:00 PM y sábados con cita previa.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es la Cobranza BPO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La Cobranza BPO (Business Process Outsourcing) es la tercerización integral del proceso de recuperación de cartera vencida. LITESCO gestiona el cobro de sus deudas extrajudicial y judicialmente, cobrando únicamente comisión sobre lo efectivamente recuperado, sin riesgo financiero para su empresa.',
      },
    },
  ],
}

import HomePage from '@/views/HomePage'

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/hero-poster.webp" fetchPriority="high" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomePage />
    </>
  )
}
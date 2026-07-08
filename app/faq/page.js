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

const faqs = [
  {
    q: '¿Qué servicios ofrece LITESCO?',
    a: 'LITESCO ofrece servicios en tres líneas principales: Litis (litigios y representación judicial), Corporativo (asesoría legal empresarial, contratos y derecho laboral) y Recuperación (cobranza BPO y gestión de cartera vencida). Atendemos a empresas y personas naturales en Bogotá, Colombia.',
  },
  {
    q: '¿Cómo agendar una consulta con LITESCO?',
    a: 'Puede contactarnos por WhatsApp al +57 313 203 7572 o a través del formulario de contacto en nuestra página web. Respondemos en menos de 24 horas y ofrecemos una primera consulta para evaluar su caso sin compromiso.',
  },
  {
    q: '¿LITESCO atiende empresas y personas naturales?',
    a: 'Sí. LITESCO atiende tanto a empresas de todos los sectores como a personas naturales que necesiten representación judicial o asesoría legal. Nuestro equipo adapta las soluciones jurídicas a las necesidades específicas de cada cliente.',
  },
  {
    q: '¿Dónde están ubicados?',
    a: 'Estamos ubicados en CRA 7 #17-01, cerca de Las Aguas, en Bogotá, Colombia. Nuestro horario de atención es de lunes a viernes de 8:00 AM a 6:00 PM y sábados de 9:00 AM a 1:00 PM.',
  },
  {
    q: '¿Qué es la Cobranza BPO?',
    a: 'La Cobranza BPO es la tercerización del proceso de recuperación de cartera vencida. LITESCO gestiona el cobro de sus deudas asumiendo el proceso extrajudicial y judicial, cobrando únicamente una comisión sobre lo efectivamente recuperado, sin riesgo financiero para su empresa.',
  },
  {
    q: '¿Cuál es la diferencia entre Litis y Corporativo?',
    a: 'Litis se enfoca en litigios activos: representación judicial, defensa en procesos y demandas en curso. Corporativo es asesoría preventiva: estructuración de contratos, gestión de riesgos legales y acompañamiento jurídico continuo para evitar llegar a un litigio.',
  },
]

import FAQPage from '@/views/FAQPage'
import JsonLd, { buildBreadcrumbSchema, buildFaqSchema } from '@/components/seo/JsonLd'

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([{ name: 'Preguntas Frecuentes', url: 'https://litesco.com.co/faq' }]),
          buildFaqSchema(faqs),
        ]}
      />
      <FAQPage />
    </>
  )
}

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

const faqs = [
  {
    q: '¿Qué es la Cobranza BPO y cómo funciona en LITESCO?',
    a: 'La Cobranza BPO (Business Process Outsourcing) es la tercerización total del proceso de recuperación de cartera vencida. LITESCO gestiona el cobro de deudas de su empresa sin riesgo financiero para usted: nosotros asumimos el proceso extrajudicial y judicial, y solo cobramos una comisión sobre lo efectivamente recuperado.',
  },
  {
    q: '¿Cuánto cobra LITESCO por la recuperación de cartera?',
    a: 'LITESCO trabaja bajo el modelo de comisión por éxito: solo cobramos un porcentaje acordado sobre la cartera que efectivamente se recupere. No hay costos fijos ni anticipos. Esto alinea nuestros incentivos con los de su empresa y elimina el riesgo financiero del proceso de cobranza.',
  },
  {
    q: '¿Qué tipo de cartera puede gestionar LITESCO?',
    a: 'Gestionamos cartera de empresas de todos los sectores: financiero, salud, telecomunicaciones, servicios, construcción y comercio. Manejamos deudas desde etapa preventiva y extrajudicial hasta cobro judicial, incluyendo pagarés, facturas vencidas, contratos incumplidos y obligaciones dinerarias en Colombia.',
  },
]

import RecuperacionPage from '@/views/RecuperacionPage'
import JsonLd, { buildBreadcrumbSchema, buildFaqSchema } from '@/components/seo/JsonLd'

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([{ name: 'Recuperación de Cartera', url: 'https://litesco.com.co/recuperacion' }]),
          buildFaqSchema(faqs),
        ]}
      />
      <RecuperacionPage />
    </>
  )
}

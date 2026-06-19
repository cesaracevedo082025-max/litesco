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

import FAQPage from '@/views/FAQPage'

export default function Page() {
  return <FAQPage />
}

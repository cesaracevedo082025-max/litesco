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

const faqs = [
  {
    q: '¿Qué servicios de derecho corporativo ofrece LITESCO?',
    a: 'LITESCO ofrece asesoría en constitución y restructuración de sociedades, elaboración y revisión de contratos comerciales, derecho laboral empresarial, compliance, fusiones y adquisiciones, y gestión de riesgos legales para PyMEs y grandes empresas en Bogotá, Colombia.',
  },
  {
    q: '¿Atienden a PyMEs o solo a grandes empresas?',
    a: 'LITESCO atiende tanto a PyMEs como a grandes corporaciones. Contamos con planes de asesoría ajustados al tamaño y necesidades de cada empresa, desde startups hasta compañías consolidadas que requieren acompañamiento jurídico permanente en Colombia.',
  },
  {
    q: '¿Qué es el derecho laboral empresarial y cómo puede ayudarme?',
    a: 'El derecho laboral empresarial protege a los empleadores en temas de contratación, despidos, liquidaciones, pactos colectivos y demandas laborales. En LITESCO asesoramos a las empresas para evitar contingencias legales y representamos en procesos ante el Ministerio del Trabajo y la jurisdicción ordinaria laboral.',
  },
]

import CorporativoPage from '@/views/CorporativoPage'
import JsonLd, { buildBreadcrumbSchema, buildFaqSchema } from '@/components/seo/JsonLd'

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema([{ name: 'Corporativo', url: 'https://litesco.com.co/corporativo' }]),
          buildFaqSchema(faqs),
        ]}
      />
      <CorporativoPage />
    </>
  )
}

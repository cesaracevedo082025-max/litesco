export const metadata = {
  title: 'Política de Privacidad | LITESCO',
  description: 'Política de Protección de Datos Personales y Privacidad de LITESCO, conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 y las directrices de la SIC.',
  alternates: { canonical: 'https://litesco.com.co/privacidad' },
  openGraph: {
    title: 'Política de Privacidad | LITESCO',
    description: 'Política de Protección de Datos Personales y Privacidad de LITESCO S.A.S.',
    url: 'https://litesco.com.co/privacidad',
  },
}

import PrivacidadPage from '@/views/PrivacidadPage'
import JsonLd, { buildBreadcrumbSchema } from '@/components/seo/JsonLd'

export default function Page() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Política de Privacidad', url: 'https://litesco.com.co/privacidad' }])} />
      <PrivacidadPage />
    </>
  )
}

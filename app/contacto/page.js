export const metadata = {
  title: 'Contacto LITESCO | Abogados en Bogotá | Consulta Gratis',
  description: 'Contacta a LITESCO para tu consulta legal gratuita. Abogados especialistas en litigios y asesoría empresarial en Bogotá. Respuesta en menos de 24 horas. ¡Escríbenos ahora!',
  alternates: {
    canonical: 'https://litesco.com.co/contacto',
  },
  openGraph: {
    title: 'Contacto LITESCO | Abogados en Bogotá',
    description: 'Contacta a LITESCO para tu consulta legal gratuita. Abogados especialistas en Bogotá.',
    url: 'https://litesco.com.co/contacto',
  },
}

import ContactoPage from '@/views/ContactoPage'
import JsonLd, { buildBreadcrumbSchema } from '@/components/seo/JsonLd'

export default function Page() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([{ name: 'Contacto', url: 'https://litesco.com.co/contacto' }])} />
      <ContactoPage />
    </>
  )
}

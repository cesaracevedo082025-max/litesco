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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://litesco.com.co' },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: 'https://litesco.com.co/contacto' },
  ],
}

import ContactoPage from '@/views/ContactoPage'

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactoPage />
    </>
  )
}

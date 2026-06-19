// ✅ SEO: Este metadata se renderiza en el SERVIDOR - Google lo ve inmediatamente
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

import HomePage from '@/views/HomePage'

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href="/images/hero-poster.webp" fetchPriority="high" />
      <HomePage />
    </>
  )
}
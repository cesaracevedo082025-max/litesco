import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollToTop from '@/components/ui/ScrollToTop'
import ConsentProvider from '@/components/ui/ConsentProvider'

// ✅ SEO: Metadata global
export const metadata = {
  metadataBase: new URL('https://litesco.com.co'),
  title: {
    default: 'LITESCO | Firma Legal Profesional en Bogotá',
    template: '%s | LITESCO',
  },
  description: 'Firma legal especializada en litigios, asesoría empresarial y cobranza BPO en Bogotá.',
  
  icons: {
    icon: '/favicon.webp', 
    shortcut: '/favicon.webp',
    apple: '/favicon.webp', 
  },

  keywords: ['abogados bogotá', 'firma legal', 'litigios', 'asesoría empresarial', 'cobranza', 'derecho corporativo'],
  authors: [{ name: 'LITESCO S.A.S.' }],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://litesco.com.co',
    siteName: 'LITESCO',
    title: 'LITESCO | Firma Legal Profesional en Bogotá',
    description: 'Firma legal especializada en litigios, asesoría empresarial y cobranza BPO en Bogotá.',
    images: [
      {
        url: '/favicon.webp',
        width: 800,
        height: 600,
        alt: 'LITESCO Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LITESCO | Firma Legal Profesional en Bogotá',
    description: 'Firma legal especializada en litigios, asesoría empresarial y cobranza BPO en Bogotá.',
    images: ['/favicon.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://litesco.com.co',
  },
}

// ✅ SEO: Schema markup JSON-LD
const schemaMarkup = {
  '@context': 'https://schema.org',
  '@type': ['LegalService', 'Organization'],
  name: 'LITESCO',
  legalName: 'LITESCO S.A.S.',
  alternateName: 'Litigio Estratégico Colombiano',
  url: 'https://litesco.com.co',
  logo: {
    '@type': 'ImageObject',
    url: 'https://litesco.com.co/logo.webp',
    width: 512,
    height: 512,
  },
  image: 'https://litesco.com.co/images/hero-poster.webp',
  description: 'Servicios jurídicos para empresas de todos los sectores en Colombia. Litigio estratégico, derecho corporativo y recuperación de cartera en Bogotá.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'CRA 7 #17-01',
    addressLocality: 'Bogotá',
    addressRegion: 'Bogotá D.C.',
    postalCode: '110321',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '4.5978',
    longitude: '-74.0762',
  },
  telephone: '+573132037572',
  email: 'gerencia@litesco.com.co',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '13:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Bogotá' },
    { '@type': 'Country', name: 'Colombia' },
  ],
  knowsAbout: [
    'Asesoría Legal Integral para Empresas y Personas Naturales en Bogotá',
    'Derecho Civil y Representación de Particulares en Colombia',
    'Derecho Comercial, Societario y Corporativo en Bogotá',
    'Derecho Laboral para Empleadores y Trabajadores en Colombia',
    'Derecho Contencioso Administrativo y Demandas al Estado en Bogotá',
    'Procesos y Litigios ante Superintendencias en Colombia',
    'Representación en Litigios Generales para Entidades y Personas Naturales en Bogotá',
    'Defensa Judicial e Interposición de Demandas en Colombia',
    'Cobranza BPO y Recuperación de Cartera para Empresas en Colombia',
    'Asesoría Corporativa Preventiva y Gestión de Riesgos Legales en Bogotá',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios Jurídicos LITESCO',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'LegalService',
          name: 'Litigios y Procesos Judiciales',
          description: 'Representación y defensa judicial en procesos civiles, comerciales y administrativos.',
          url: 'https://litesco.com.co/litis',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'LegalService',
          name: 'Asesoría Corporativa',
          description: 'Consultoría legal para empresas: contratos, societario, compliance y gestión de riesgos.',
          url: 'https://litesco.com.co/corporativo',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'LegalService',
          name: 'Recuperación de Cartera BPO',
          description: 'Tercerización de cobranza de cartera sin riesgo para la empresa.',
          url: 'https://litesco.com.co/recuperacion',
        },
      },
    ],
  },
  hasMap: [
    'https://share.google/yZDG6hqb23yWhZMrh',
    'https://share.google/3vWRBs0lEnxSZUihT',
  ],
  sameAs: [
    'https://www.linkedin.com/company/litesco/',
    'https://instagram.com/litesco.co',
    'https://www.facebook.com/share/1a1fApiY65/',
    'https://www.tiktok.com/@litesco.co',
    'https://linktr.ee/LITESCO',
    'https://share.google/yZDG6hqb23yWhZMrh',
    'https://share.google/3vWRBs0lEnxSZUihT',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+573132037572',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://litesco.com.co/#website',
  name: 'LITESCO',
  url: 'https://litesco.com.co',
  publisher: { '@id': 'https://litesco.com.co/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://litesco.com.co/blog?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* ✅ OPTIMIZACIÓN: Schema JSON-LD — Organización + Servicio Legal */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        {/* ✅ OPTIMIZACIÓN: Schema WebSite + Sitelinks Searchbox */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* ✅ OPTIMIZACIÓN: Preconnect a dominios externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" />

        {/* ✅ FUENTES DE GOOGLE (Carga estándar, 100% compatible con Server Components) */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@300;400;600;700&display=swap"
        />

        {/* ✅ OPTIMIZACIÓN: DNS-prefetch */}
        <link rel="dns-prefetch" href="https://wa.me" />
        <link rel="dns-prefetch" href="https://www.litesco.com.co" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body suppressHydrationWarning>
        <ScrollToTop />
        <ConsentProvider />
        <div className="min-h-screen bg-stone-950 text-stone-50">
          <Navbar />
          <main className="pt-20 bg-stone-900">
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
        </div>
      </body>
    </html>
  )
}
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollToTop from '@/components/ui/ScrollToTop'

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
  alternateName: 'Litigio Estratégico Colombiano',
  url: 'https://litesco.com.co',
  logo: {
    '@type': 'ImageObject',
    url: 'https://litesco.com.co/favicon.webp',
  },
  image: 'https://litesco.com.co/favicon.webp',
  description: 'Servicios jurídicos para empresas de todos los sectores en Colombia. Litigio estratégico, derecho corporativo y recuperación de cartera en Bogotá.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'CRA 7 #17-01, Edificio Colseguros',
    addressLocality: 'Bogotá',
    addressRegion: 'Bogotá D.C.',
    postalCode: '110321',
    addressCountry: 'CO',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '4.6097',
    longitude: '-74.0817',
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
  areaServed: {
    '@type': 'City',
    name: 'Bogotá',
  },
  hasMap: 'https://share.google/yZDG6hqb23yWhZMrh',
  sameAs: [
    'https://www.linkedin.com/company/litesco/',
    'https://instagram.com/litesco.co',
    'https://www.facebook.com/share/1a1fApiY65/',
    'https://www.tiktok.com/@litesco.co',
    'https://linktr.ee/LITESCO',
    'https://share.google/yZDG6hqb23yWhZMrh',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+573132037572',
    contactType: 'customer service',
    availableLanguage: 'Spanish',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* ✅ OPTIMIZACIÓN: Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
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
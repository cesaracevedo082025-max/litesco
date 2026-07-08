/**
 * Helper de datos estructurados (JSON-LD) para páginas Next.js.
 * Evita repetir la construcción de schemas y el <script> boilerplate en cada page.js.
 */

const SITE_URL = 'https://litesco.com.co'

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@id': `${SITE_URL}/#organization`,
    '@type': ['LegalService', 'Organization'],
    name: 'LITESCO',
    legalName: 'LITESCO S.A.S.',
    alternateName: 'Litigio Estratégico Colombiano',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.webp`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/images/hero-poster.webp`,
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
            url: `${SITE_URL}/litis`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LegalService',
            name: 'Asesoría Corporativa',
            description: 'Consultoría legal para empresas: contratos, societario, compliance y gestión de riesgos.',
            url: `${SITE_URL}/corporativo`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'LegalService',
            name: 'Recuperación de Cartera BPO',
            description: 'Tercerización de cobranza de cartera sin riesgo para la empresa.',
            url: `${SITE_URL}/recuperacion`,
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
}

// Solo debe usarse una vez por sitio (homepage) — ver app/page.js
export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'LITESCO',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// items: [{ name, url }] — no incluir el home como primer nodo (Google lo omite en la raíz)
export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      ...items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: item.name,
        item: item.url,
      })),
    ],
  }
}

// faqs: [{ q, a }]
export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// Listo para Fase 2 (páginas de servicio dinámicas en Next, si aplica)
export function buildLegalServiceSchema({ name, description, url, areaServed }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name,
    description,
    url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: areaServed ?? [
      { '@type': 'City', name: 'Bogotá' },
      { '@type': 'Country', name: 'Colombia' },
    ],
  }
}

/**
 * Renderiza uno o varios objetos JSON-LD como <script type="application/ld+json">.
 * Uso: <JsonLd data={buildBreadcrumbSchema([...])} />
 *      <JsonLd data={[schemaA, schemaB]} />
 */
export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean)
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
    />
  ))
}

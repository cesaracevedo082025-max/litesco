'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// ─── REEMPLAZAR CON EL PIXEL ID REAL DE META ─────────────────────────────────
// Lo encuentras en: Meta Business Suite → Administrador de eventos → Tu Pixel
const PIXEL_ID = 'REEMPLAZAR_CON_TU_PIXEL_ID'

let pixelLoaded = false

function loadPixel() {
  if (pixelLoaded || typeof window === 'undefined') return
  pixelLoaded = true

  // Meta Pixel base code
  ;(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

// ─── EVENTOS PÚBLICOS ─────────────────────────────────────────────────────────
export function trackViewContent(contentName, contentCategory) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    // No incluimos datos sensibles de litigios ni información de clientes
  })
}

export function trackLead(source) {
  if (typeof window === 'undefined' || !window.fbq) return
  window.fbq('track', 'Lead', {
    content_name: source || 'Contacto general',
    // No incluimos detalles del caso ni información legal del usuario
  })
}

// ─── COMPONENTE ──────────────────────────────────────────────────────────────
export default function MetaPixel({ consent }) {
  const pathname = usePathname()

  // Cargar el pixel cuando se da consentimiento
  useEffect(() => {
    if (consent) loadPixel()
  }, [consent])

  // PageView en cada cambio de ruta (SPA navigation)
  useEffect(() => {
    if (consent && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [pathname, consent])

  // noscript fallback (solo cuando hay consentimiento)
  if (!consent) return null

  return (
    <noscript>
      <img
        height="1" width="1" style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}

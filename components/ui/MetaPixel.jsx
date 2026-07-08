'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getConsent } from './CookieConsent'

// Pixel ID inyectado en build time desde .env (NEXT_PUBLIC_META_PIXEL_ID).
// Si no está configurado, el pixel simplemente no se carga (no rompe la página).
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

let pixelLoaded = false

function loadPixel() {
  if (pixelLoaded || typeof window === 'undefined' || !PIXEL_ID) return
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
export function generateEventId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

// Para flujos que YA hacen su propia llamada server-side (ej. envío de formulario a
// send-email-simple.php, que dispara el CAPI Lead con este mismo event_id): solo
// dispara el pixel de navegador, evitando duplicar el evento en Meta.
export function fbqLead(eventId, contentName) {
  if (typeof window === 'undefined' || !window.fbq || getConsent() !== 'true') return
  window.fbq('track', 'Lead', { content_name: contentName }, { eventID: eventId })
}

export function trackViewContent(contentName, contentCategory) {
  if (typeof window === 'undefined' || !window.fbq || getConsent() !== 'true') return
  window.fbq('track', 'ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    // No incluimos datos sensibles de litigios ni información de clientes
  })
}

// Dispara el Pixel de navegador y, en paralelo, el mismo evento vía Conversions API
// server-side (deduplicado con event_id) para no perder conversiones si el navegador
// bloquea el pixel (ad blockers, Safari ITP, etc). Nunca pasar aquí texto libre del
// usuario (mensajes, datos de casos) — solo el nombre del contenido/CTA.
export function trackLead(source) {
  if (typeof window === 'undefined' || getConsent() !== 'true') return
  const eventId = generateEventId('lead')
  const contentName = source || 'Contacto general'

  if (window.fbq) {
    window.fbq('track', 'Lead', { content_name: contentName }, { eventID: eventId })
  }

  fetch('https://www.litesco.com.co/meta-capi-endpoint.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: 'Lead',
      event_id: eventId,
      page_url: window.location.href,
      content_name: contentName,
    }),
    keepalive: true,
  }).catch(() => {})
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

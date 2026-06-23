'use client'

import { useState, useEffect } from 'react'
import CookieConsent, { getConsent } from './CookieConsent'
import MetaPixel from './MetaPixel'

export default function ConsentProvider() {
  const [consent, setConsent] = useState(null)

  // Leer consentimiento guardado al montar
  useEffect(() => {
    const saved = getConsent()
    if (saved !== null) setConsent(saved === 'true')
  }, [])

  return (
    <>
      <CookieConsent onConsentChange={setConsent} />
      <MetaPixel consent={consent === true} />
    </>
  )
}

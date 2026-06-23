'use client'

import { useState, useEffect } from 'react'

const CONSENT_KEY = 'litesco_cookie_consent'

export function getConsent() {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem(CONSENT_KEY) } catch { return null }
}

function setConsentCookie(value) {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)
  document.cookie = `litesco_cookie_consent=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export default function CookieConsent({ onConsentChange }) {
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const saved = getConsent()
    if (!saved) {
      // Mostrar banner tras 1.5s para no interrumpir la carga inicial
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
    onConsentChange?.(saved === 'true')
  }, [])

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, 'true') } catch {}
    setConsentCookie('1')
    setVisible(false)
    onConsentChange?.(true)
  }

  function decline() {
    try { localStorage.setItem(CONSENT_KEY, 'false') } catch {}
    setConsentCookie('0')
    setVisible(false)
    onConsentChange?.(false)
  }

  if (!visible) return null

  return (
    <>
      {/* Overlay suave */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.4)', zIndex: 998, backdropFilter: 'blur(2px)' }}
        onClick={() => setExpanded(false)} />

      {/* Banner */}
      <div style={{
        position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 999, width: 'min(640px, calc(100vw - 32px))',
        background: 'linear-gradient(135deg, #0f172a, #0A1628)',
        border: '1px solid rgba(245,158,11,0.25)',
        borderRadius: 20, overflow: 'hidden',
        boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        animation: 'slideUp .35s cubic-bezier(.22,1,.36,1)',
      }}>
        {/* Franja dorada */}
        <div style={{ height: 3, background: 'linear-gradient(90deg,#f59e0b,#d97706,#f59e0b)' }} />

        <div style={{ padding: '20px 24px 22px' }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 26, lineHeight: 1, flexShrink: 0 }}>🍪</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>
                Usamos cookies
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                Utilizamos cookies propias y de análisis para mejorar tu experiencia y medir el rendimiento del sitio.
                {' '}
                <button onClick={() => setExpanded(v => !v)}
                  style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                  {expanded ? 'Ver menos' : 'Más información'}
                </button>
              </p>

              {expanded && (
                <div style={{ marginTop: 14, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 14 }}>
                  {[
                    { name: 'Cookies esenciales', desc: 'Necesarias para el funcionamiento del sitio (sesión, preferencias). Siempre activas.', required: true },
                    { name: 'Análisis y rendimiento', desc: 'Meta Pixel — nos ayuda a entender cómo interactúas con el sitio para mejorar nuestros servicios. Nunca enviamos datos legales o de casos.', required: false },
                  ].map(c => (
                    <div key={c.name} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.required ? '#10b981' : '#f59e0b', flexShrink: 0, marginTop: 5 }} />
                      <div>
                        <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>
                          {c.name}{c.required && <span style={{ color: '#10b981', marginLeft: 6, fontSize: 10 }}>Siempre activa</span>}
                        </div>
                        <div style={{ color: '#64748b', fontSize: 12, lineHeight: 1.6 }}>{c.desc}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ color: '#475569', fontSize: 11, marginTop: 8 }}>
                    Política de privacidad: <a href="/contacto" style={{ color: '#f59e0b' }}>litesco.com.co/contacto</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'flex-end' }}>
            <button onClick={decline}
              style={{ padding: '9px 18px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid #1e293b', color: '#94a3b8', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all .2s' }}>
              Solo esenciales
            </button>
            <button onClick={accept}
              style={{ padding: '9px 22px', borderRadius: 10, background: 'linear-gradient(135deg,#f59e0b,#d97706)', border: 'none', color: '#020617', fontSize: 13, fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,158,11,0.35)', transition: 'all .2s' }}>
              Aceptar todo
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  )
}

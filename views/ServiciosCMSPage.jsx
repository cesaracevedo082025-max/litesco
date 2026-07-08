'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSave, FaSignOutAlt,
  FaArrowLeft, FaArrowRight, FaCheck, FaGlobeAmericas, FaSearch,
  FaBriefcase, FaGavel, FaChartBar, FaImage, FaCode, FaRocket, FaTimes
} from 'react-icons/fa'

const API_URL = 'https://www.litesco.com.co/servicios-api.php'
const SESSION_KEY = 'litesco_srv_token'

const LINEAS = [
  { id: 'litis',        label: 'Litis',                 icon: FaGavel,        color: '#ef4444' },
  { id: 'corporativo',  label: 'Corporativo',           icon: FaBriefcase,    color: '#3b82f6' },
  { id: 'recuperacion', label: 'Recuperación de Cartera', icon: FaChartBar,  color: '#10b981' },
]

const SUBCATEGORIAS = {
  litis: [
    'Procesos Civiles', 'Derecho Comercial', 'Derecho Administrativo',
    'Derecho Laboral', 'Superintendencias', 'Defensa Judicial', 'Otro',
  ],
  corporativo: [
    'Contratos Comerciales', 'Derecho Societario', 'Compliance y Riesgos',
    'Derecho Laboral Empresarial', 'In-House Legal', 'Estructuración Corporativa', 'Otro',
  ],
  recuperacion: [
    'Cobranza Extrajudicial', 'Cobranza Judicial', 'BPO Empresarial', 'Gestión de Cartera', 'Otro',
  ],
}

const PASOS = [
  { num: 1, label: 'Clasificación',  icon: FaGlobeAmericas },
  { num: 2, label: 'SEO',            icon: FaSearch        },
  { num: 3, label: 'Respuesta Rápida', icon: FaRocket      },
  { num: 4, label: 'Contenido',      icon: FaCode          },
  { num: 5, label: 'Multimedia',     icon: FaImage         },
  { num: 6, label: 'Schema',         icon: FaBriefcase     },
  { num: 7, label: 'Publicación',    icon: FaCheck         },
]

function slugify(text) {
  return (text || '')
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function getToken() {
  try { return sessionStorage.getItem(SESSION_KEY) } catch { return null }
}
function setToken(t) {
  try { sessionStorage.setItem(SESSION_KEY, t) } catch {}
}
function clearToken() {
  try { sessionStorage.removeItem(SESSION_KEY) } catch {}
}

const EMPTY_FORM = {
  id: null,
  linea_negocio: '',
  subcategoria: '',
  slug: '',
  seo_title: '',
  meta_desc: '',
  resumen_rapido: '',
  h1: '',
  content: '',
  faqs: [],
  imagen_url: '',
  imagen_alt: '',
  nombre_servicio: '',
  area_cobertura: 'Bogotá, Colombia',
  cta_tipo: 'whatsapp',
  published: 0,
  status: 'borrador',
  publish_at: '',
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('gerencia@litesco.com.co')
  const [pass, setPass] = useState('')
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password: pass }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Credenciales incorrectas')
      setToken(data.token)
      onLogin(data.token)
    } catch (e) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, padding: 40, width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>LITESCO</div>
          <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginTop: 4 }}>CMS Servicios</div>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
              style={{ width: '100%', background: '#020617', border: '1px solid #1e293b', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none' }} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Contraseña</label>
            <input value={pass} onChange={e => setPass(e.target.value)} type="password" required
              style={{ width: '100%', background: '#020617', border: '1px solid #1e293b', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none' }} />
          </div>
          {err && <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', color: '#fca5a5', fontSize: 13, marginBottom: 16 }}>{err}</div>}
          <button type="submit" disabled={loading}
            style={{ width: '100%', background: 'linear-gradient(135deg,#f59e0b,#d97706)', border: 'none', borderRadius: 11, padding: '12px 0', color: '#020617', fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>
            {loading ? 'Entrando…' : 'Entrar al CMS'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// LISTA DE SERVICIOS
// ─────────────────────────────────────────────────────────────────────────────
function ServiceList({ servicios, onNew, onEdit, onDelete, onToggle, loading, token }) {
  const [filtro, setFiltro] = useState('')
  const [linea, setLinea] = useState('')

  const filtered = servicios.filter(s =>
    (!linea || s.linea_negocio === linea) &&
    (!filtro || s.h1.toLowerCase().includes(filtro.toLowerCase()) || s.slug.includes(filtro.toLowerCase()))
  )

  const lineaColor = { litis: '#ef4444', corporativo: '#3b82f6', recuperacion: '#10b981' }

  const statusBadge = (srv) => {
    const status = srv.status || (srv.published ? 'publicado' : 'borrador')
    if (status === 'programado') {
      const fecha = srv.publish_at ? new Date(srv.publish_at.replace(' ', 'T')).toLocaleString('es-CO', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''
      return { label: `Programado${fecha ? ' · ' + fecha : ''}`, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' }
    }
    if (status === 'publicado') return { label: 'Publicado', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' }
    return { label: 'Borrador', color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)' }
  }

  return (
    <div>
      {/* Filtros */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <div style={{ flex: '1 1 200px', position: 'relative' }}>
          <FaSearch style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 13, pointerEvents: 'none' }} />
          <input value={filtro} onChange={e => setFiltro(e.target.value)} placeholder="Buscar servicio…"
            style={{ width: '100%', background: '#fff', border: '1px solid #e8edf4', borderRadius: 10, padding: '10px 14px 10px 38px', color: '#0A1628', fontSize: 13, outline: 'none', boxSizing: 'border-box', boxShadow: '0 2px 6px rgba(10,22,40,0.04)' }} />
        </div>
        <select value={linea} onChange={e => setLinea(e.target.value)}
          style={{ background: '#fff', border: '1px solid #e8edf4', borderRadius: 10, padding: '10px 14px', color: '#0A1628', fontSize: 13, outline: 'none', boxShadow: '0 2px 6px rgba(10,22,40,0.04)' }}>
          <option value="">Todas las líneas</option>
          {LINEAS.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
        </select>
      </div>

      {loading && <div style={{ color: '#94a3b8', textAlign: 'center', padding: 40 }}>Cargando…</div>}

      {!loading && filtered.length === 0 && (
        <div style={{ color: '#94a3b8', textAlign: 'center', padding: 60, fontSize: 14, background: '#fff', borderRadius: 16, border: '1px solid #e8edf4' }}>
          No hay servicios. Crea el primero con el botón <strong style={{ color: '#f59e0b' }}>+ Nuevo servicio</strong>.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map(srv => (
          <div key={srv.id} style={{ background: '#fff', border: '1px solid #e8edf4', borderRadius: 14, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', boxShadow: '0 2px 6px rgba(10,22,40,0.04)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: lineaColor[srv.linea_negocio] || '#94a3b8', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{srv.h1}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 2 }}>
                <span style={{ color: lineaColor[srv.linea_negocio], fontWeight: 600 }}>{srv.linea_negocio}</span>
                {' / '}<span>{srv.slug}</span>
              </div>
            </div>
            {(() => {
              const b = statusBadge(srv)
              return (
                <span style={{ background: b.bg, border: `1px solid ${b.border}`, color: b.color, borderRadius: 999, padding: '4px 12px', fontSize: 11, fontWeight: 700, flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {b.label}
                </span>
              )
            })()}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <button onClick={() => window.open(`/${srv.linea_negocio}/${srv.slug}?preview=${token}`, '_blank')} title="Ver página"
                style={{ background: '#f8fafc', border: '1px solid #e8edf4', borderRadius: 8, padding: '7px 10px', color: '#64748b', cursor: 'pointer', fontSize: 13 }}>
                <FaEye />
              </button>
              <button onClick={() => onToggle(srv.id)} title={srv.published ? 'Despublicar' : 'Publicar'}
                style={{ background: srv.published ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)', border: `1px solid ${srv.published ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.2)'}`, borderRadius: 8, padding: '7px 10px', color: srv.published ? '#10b981' : '#ef4444', cursor: 'pointer', fontSize: 13 }}>
                {srv.published ? <FaEye /> : <FaEyeSlash />}
              </button>
              <button onClick={() => onEdit(srv)} title="Editar"
                style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 8, padding: '7px 10px', color: '#d97706', cursor: 'pointer', fontSize: 13 }}>
                <FaEdit />
              </button>
              <button onClick={() => onDelete(srv.id)} title="Eliminar"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, padding: '7px 10px', color: '#ef4444', cursor: 'pointer', fontSize: 13 }}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WIZARD: 7 PASOS
// ─────────────────────────────────────────────────────────────────────────────
function ServiceWizard({ initial, onSave, onCancel, saving }) {
  const [paso, setPaso] = useState(1)
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial })
  const [slugManual, setSlugManual] = useState(!!initial?.slug)

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  // Auto-slug desde seo_title
  useEffect(() => {
    if (!slugManual && form.seo_title) {
      set('slug', slugify(form.seo_title.replace(/\|.*$/, '')))
    }
  }, [form.seo_title, slugManual])

  // Auto-nombre_servicio desde h1
  useEffect(() => {
    if (!form.nombre_servicio && form.h1) set('nombre_servicio', form.h1)
  }, [form.h1])

  // Contadores
  const wordCount = (text) => text.trim().split(/\s+/).filter(Boolean).length

  // FAQ helpers
  const addFaq = () => set('faqs', [...form.faqs, { q: '', a: '' }])
  const updateFaq = (i, k, v) => set('faqs', form.faqs.map((f, idx) => idx === i ? { ...f, [k]: v } : f))
  const removeFaq = (i) => set('faqs', form.faqs.filter((_, idx) => idx !== i))

  const canNext = () => {
    if (paso === 1) return form.linea_negocio && form.subcategoria
    if (paso === 2) return form.seo_title && form.slug && form.meta_desc
    if (paso === 4) return form.h1
    if (paso === 5) return !form.imagen_url || !!form.imagen_alt
    return true
  }

  const canSave = () => canNext() && (form.status !== 'programado' || !!form.publish_at)

  const schemaPreview = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: form.nombre_servicio || form.h1,
    description: form.meta_desc,
    url: `https://litesco.com.co/${form.linea_negocio}/${form.slug}`,
    serviceType: form.nombre_servicio || form.h1,
    provider: { '@type': 'Organization', name: 'LITESCO', url: 'https://litesco.com.co' },
    areaServed: form.area_cobertura,
  }

  const inp = { width: '100%', background: '#020617', border: '1px solid #1e293b', borderRadius: 10, padding: '10px 14px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' }
  const label = { display: 'block', fontSize: 11, fontWeight: 700, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }
  const field = { marginBottom: 20 }

  return (
    <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: 20, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: '#020617', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b' }}>
        <div style={{ color: '#fff', fontWeight: 800, fontSize: 15, fontFamily: 'Montserrat, sans-serif' }}>
          {form.id ? `Editando: ${form.h1 || 'Servicio'}` : 'Nuevo servicio legal'}
        </div>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: 18 }}><FaTimes /></button>
      </div>

      {/* Steps indicator */}
      <div style={{ display: 'flex', overflowX: 'auto', background: '#0A1628', borderBottom: '1px solid #1e293b', padding: '0 8px' }}>
        {PASOS.map(p => {
          const done = paso > p.num
          const active = paso === p.num
          const Icon = p.icon
          return (
            <button key={p.num} onClick={() => done && setPaso(p.num)} disabled={!done && paso !== p.num}
              style={{ flex: '1 1 auto', minWidth: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '12px 8px', background: 'none', border: 'none', borderBottom: active ? '2px solid #f59e0b' : '2px solid transparent', cursor: done ? 'pointer' : 'default', transition: 'all .2s' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? '#10b981' : active ? '#f59e0b' : '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all .2s' }}>
                {done ? <FaCheck style={{ color: '#fff', fontSize: 11 }} /> : <Icon style={{ color: active ? '#020617' : '#475569', fontSize: 11 }} />}
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: active ? '#f59e0b' : done ? '#10b981' : '#475569', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>{p.label}</span>
            </button>
          )
        })}
      </div>

      {/* Contenido del paso */}
      <div style={{ padding: '28px 28px 20px' }}>

        {/* PASO 1: Clasificación */}
        {paso === 1 && (
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>Paso 1 — Clasificación Arquitectónica</h3>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Define dónde vivirá esta página dentro de la estructura del sitio.</p>
            <div style={field}>
              <label style={label}>Línea de negocio *</label>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {LINEAS.map(l => {
                  const Icon = l.icon
                  const sel = form.linea_negocio === l.id
                  return (
                    <button key={l.id} onClick={() => { set('linea_negocio', l.id); set('subcategoria', '') }}
                      style={{ flex: '1 1 140px', border: `2px solid ${sel ? l.color : '#1e293b'}`, borderRadius: 14, padding: '16px 12px', background: sel ? `${l.color}15` : '#020617', color: sel ? l.color : '#475569', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, transition: 'all .2s' }}>
                      <Icon style={{ fontSize: 22 }} />
                      <span style={{ fontWeight: 700, fontSize: 13 }}>{l.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            {form.linea_negocio && (
              <div style={field}>
                <label style={label}>Subcategoría *</label>
                <select value={form.subcategoria} onChange={e => set('subcategoria', e.target.value)} style={{ ...inp }}>
                  <option value="">Seleccionar…</option>
                  {(SUBCATEGORIAS[form.linea_negocio] || []).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            )}
            {form.linea_negocio && form.subcategoria && (
              <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#94a3b8' }}>
                URL base: <strong style={{ color: '#f59e0b' }}>litesco.com.co/{form.linea_negocio}/[slug]</strong>
              </div>
            )}
          </div>
        )}

        {/* PASO 2: SEO */}
        {paso === 2 && (
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>Paso 2 — Metadatos SEO</h3>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Lo que el usuario y Google ven en los resultados de búsqueda (SERP).</p>
            <div style={field}>
              <label style={label}>Título SEO * <span style={{ color: form.seo_title.length > 60 ? '#ef4444' : '#475569', fontWeight: 400 }}>({form.seo_title.length}/60)</span></label>
              <input value={form.seo_title} onChange={e => set('seo_title', e.target.value)} maxLength={60} placeholder="Ej: Proceso Ejecutivo en Bogotá | LITESCO" style={inp} />
            </div>
            <div style={field}>
              <label style={label}>Slug URL *</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <span style={{ background: '#1e293b', borderRadius: '10px 0 0 10px', padding: '10px 12px', color: '#475569', fontSize: 13, whiteSpace: 'nowrap' }}>/{form.linea_negocio}/</span>
                <input value={form.slug} onChange={e => { setSlugManual(true); set('slug', slugify(e.target.value)) }}
                  placeholder="proceso-ejecutivo" style={{ ...inp, borderRadius: '0 10px 10px 0', borderLeft: 'none', flex: 1 }} />
              </div>
              <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>URL final: litesco.com.co/{form.linea_negocio}/{form.slug || '…'}</div>
            </div>
            <div style={field}>
              <label style={label}>Meta descripción * <span style={{ color: form.meta_desc.length > 160 ? '#ef4444' : '#475569', fontWeight: 400 }}>({form.meta_desc.length}/160)</span></label>
              <textarea value={form.meta_desc} onChange={e => set('meta_desc', e.target.value)} maxLength={160} rows={3}
                placeholder="Descripción orientada a conversión. Incluye el servicio y la ciudad." style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
            </div>
            {/* Vista previa SERP */}
            {form.seo_title && (
              <div style={{ background: '#fff', borderRadius: 12, padding: '14px 18px', marginTop: 8 }}>
                <div style={{ fontSize: 11, color: '#006621', marginBottom: 2 }}>litesco.com.co › {form.linea_negocio} › {form.slug}</div>
                <div style={{ fontSize: 18, color: '#1a0dab', fontWeight: 400, marginBottom: 4 }}>{form.seo_title} | LITESCO</div>
                <div style={{ fontSize: 13, color: '#545454', lineHeight: 1.5 }}>{form.meta_desc || 'Escribe la meta descripción arriba…'}</div>
              </div>
            )}
          </div>
        )}

        {/* PASO 3: Respuesta rápida */}
        {paso === 3 && (
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>Paso 3 — Bloque de Respuesta Rápida</h3>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Párrafo denso y directo (máx 50 palabras) que aparece destacado al inicio. Diseñado para capturar la "Posición Cero" y alimentar a Google AI Overviews, Gemini y Perplexity.</p>
            <div style={field}>
              <label style={label}>
                Resumen en 60 Segundos
                <span style={{ color: wordCount(form.resumen_rapido) > 50 ? '#ef4444' : '#475569', fontWeight: 400, marginLeft: 8 }}>
                  ({wordCount(form.resumen_rapido)}/50 palabras)
                </span>
              </label>
              <textarea value={form.resumen_rapido} onChange={e => set('resumen_rapido', e.target.value)} rows={5}
                placeholder="Responde: ¿Qué es este servicio? ¿Para quién aplica? ¿Qué resultado entrega LITESCO? Máximo 50 palabras."
                style={{ ...inp, resize: 'vertical', lineHeight: 1.8 }} />
            </div>
            {form.resumen_rapido && (
              <div style={{ background: 'linear-gradient(135deg,#0A1628,#0F2744)', borderRadius: 14, padding: '18px 22px', marginTop: 8, color: 'rgba(255,255,255,0.9)', fontSize: 14, fontStyle: 'italic', lineHeight: 1.85 }}>
                "{form.resumen_rapido}"
              </div>
            )}
          </div>
        )}

        {/* PASO 4: Contenido */}
        {paso === 4 && (
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>Paso 4 — Inyección del Cuerpo del Servicio</h3>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>El H1 es único por página. El editor acepta HTML completo. Los H2 generan la tabla de contenidos automáticamente.</p>
            <div style={field}>
              <label style={label}>Título Principal H1 *</label>
              <input value={form.h1} onChange={e => set('h1', e.target.value)} placeholder="Ej: Proceso Ejecutivo en Bogotá — Representación Jurídica Especializada"
                style={inp} />
            </div>
            <div style={field}>
              <label style={label}>Cuerpo del servicio (HTML)</label>
              <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{ background: '#0A1628', padding: '8px 14px', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  {[
                    ['H2', '<h2>Título</h2>'],
                    ['H3', '<h3>Subtítulo</h3>'],
                    ['💡', '<div data-callout="dorado"><div data-callout-title>Título</div><div data-callout-body>Texto</div></div>'],
                    ['✅', '<div data-callout="verde"><div data-callout-title>Título</div><div data-callout-body>Texto</div></div>'],
                    ['Lista', '<ul>\n  <li>Ítem</li>\n</ul>'],
                  ].map(([lbl, snip]) => (
                    <button key={lbl} onClick={() => set('content', form.content + '\n' + snip)}
                      style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6, padding: '4px 10px', color: '#f59e0b', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                      {lbl}
                    </button>
                  ))}
                </div>
                <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={16}
                  placeholder={'<h2>¿Qué es este servicio?</h2>\n<p>Descripción...</p>\n\n<h2>¿Cómo funciona el proceso?</h2>\n<p>...</p>'}
                  style={{ ...inp, border: 'none', borderRadius: 0, resize: 'vertical', lineHeight: 1.7, fontFamily: 'monospace', fontSize: 13 }} />
              </div>
            </div>
            <div style={field}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ ...label, margin: 0 }}>Preguntas Frecuentes (FAQ)</label>
                <button onClick={addFaq} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 8, padding: '6px 12px', color: '#f59e0b', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FaPlus style={{ fontSize: 10 }} /> Agregar pregunta
                </button>
              </div>
              {form.faqs.length === 0 && (
                <div style={{ color: '#475569', fontSize: 13, padding: '16px 0' }}>Sin preguntas aún. Usa el botón para agregar.</div>
              )}
              {form.faqs.map((faq, i) => (
                <div key={i} style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: 12, padding: 14, marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1 }}>Pregunta {i + 1}</span>
                    <button onClick={() => removeFaq(i)} style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: 14 }}><FaTimes /></button>
                  </div>
                  <input value={faq.q} onChange={e => updateFaq(i, 'q', e.target.value)} placeholder="¿Pregunta frecuente?"
                    style={{ ...inp, marginBottom: 8 }} />
                  <textarea value={faq.a} onChange={e => updateFaq(i, 'a', e.target.value)} rows={3} placeholder="Respuesta completa (entre 50 y 150 palabras)."
                    style={{ ...inp, resize: 'vertical', lineHeight: 1.6 }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PASO 5: Multimedia */}
        {paso === 5 && (
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>Paso 5 — Configuración Multimedia</h3>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>
              Imagen optimizada para Google Discover y Open Graph (mínimo 1200×630px).
              Usa <a href="https://imagekit.io" target="_blank" rel="noopener" style={{ color: '#f59e0b' }}>ImageKit.io</a> para subir y obtener la URL con transformaciones automáticas.
            </p>
            <div style={field}>
              <label style={label}>URL de la imagen (ImageKit)</label>
              <input value={form.imagen_url} onChange={e => set('imagen_url', e.target.value)}
                placeholder="https://ik.imagekit.io/litesco/servicios/proceso-ejecutivo.webp"
                style={inp} />
              <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>Al guardar, el sistema agrega automáticamente ?tr=w-1200,h-630,f-auto (tamaño Discover, WebP/AVIF) si la URL es de ImageKit y no lo trae.</div>
            </div>
            <div style={field}>
              <label style={label}>Texto alternativo (ALT) {form.imagen_url ? '*' : ''}</label>
              <input value={form.imagen_alt} onChange={e => set('imagen_alt', e.target.value)}
                placeholder="Abogado especialista en proceso ejecutivo en oficina de Bogotá" style={inp} />
              {form.imagen_url && !form.imagen_alt && (
                <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>Obligatorio cuando hay una imagen.</div>
              )}
            </div>
            {form.imagen_url && (
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>Vista previa</div>
                <img src={form.imagen_url} alt={form.imagen_alt} style={{ width: '100%', maxHeight: 300, objectFit: 'cover', borderRadius: 12, border: '1px solid #1e293b' }}
                  onError={e => { e.target.style.display = 'none' }} />
              </div>
            )}
          </div>
        )}

        {/* PASO 6: Schema */}
        {paso === 6 && (
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>Paso 6 — Parametrización de Datos Estructurados</h3>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>El sistema genera el JSON-LD de LegalService automáticamente con estos datos. No necesitas tocar código.</p>
            <div style={field}>
              <label style={label}>Nombre exacto del servicio</label>
              <input value={form.nombre_servicio} onChange={e => set('nombre_servicio', e.target.value)}
                placeholder="Ej: Representación en Procesos Ejecutivos en Bogotá" style={inp} />
            </div>
            <div style={field}>
              <label style={label}>Área de cobertura</label>
              <input value={form.area_cobertura} onChange={e => set('area_cobertura', e.target.value)}
                placeholder="Bogotá, Colombia" style={inp} />
            </div>
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>JSON-LD generado</div>
              <pre style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: 12, padding: 16, fontSize: 12, color: '#94a3b8', overflow: 'auto', maxHeight: 300, lineHeight: 1.7 }}>
                {JSON.stringify(schemaPreview, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* PASO 7: Publicación */}
        {paso === 7 && (
          <div>
            <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: 'Montserrat, sans-serif' }}>Paso 7 — Cierre de Conversión y Publicación</h3>
            <p style={{ color: '#64748b', fontSize: 13, marginBottom: 24 }}>Configura el llamado a la acción y publica. Al publicar, la URL se añade al sitemap automáticamente.</p>
            <div style={field}>
              <label style={label}>Tipo de CTA (Call to Action)</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'formulario', label: 'Formulario de contacto' },
                  { id: 'ambos', label: 'WhatsApp + Formulario' },
                ].map(c => (
                  <button key={c.id} onClick={() => set('cta_tipo', c.id)}
                    style={{ flex: '1 1 140px', border: `2px solid ${form.cta_tipo === c.id ? '#f59e0b' : '#1e293b'}`, borderRadius: 12, padding: '12px 16px', background: form.cta_tipo === c.id ? 'rgba(245,158,11,0.1)' : '#020617', color: form.cta_tipo === c.id ? '#f59e0b' : '#475569', fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all .2s' }}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={field}>
              <label style={label}>Estado de publicación</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[
                  { id: 'borrador', label: 'Borrador', sub: 'No visible' },
                  { id: 'programado', label: 'Programado', sub: 'Se publica solo' },
                  { id: 'publicado', label: 'Publicado', sub: 'Visible ahora' },
                ].map(s => (
                  <button key={s.id} onClick={() => set('status', s.id)}
                    style={{ flex: '1 1 140px', border: `2px solid ${form.status === s.id ? '#f59e0b' : '#1e293b'}`, borderRadius: 12, padding: '12px 16px', background: form.status === s.id ? 'rgba(245,158,11,0.1)' : '#020617', color: form.status === s.id ? '#f59e0b' : '#475569', cursor: 'pointer', transition: 'all .2s', textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{s.label}</div>
                    <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2 }}>{s.sub}</div>
                  </button>
                ))}
              </div>
              {form.status === 'programado' && (
                <div style={{ marginTop: 14 }}>
                  <label style={label}>Fecha y hora de publicación *</label>
                  <input type="datetime-local" value={form.publish_at} onChange={e => set('publish_at', e.target.value)} style={inp} />
                  {!form.publish_at && (
                    <div style={{ fontSize: 11, color: '#ef4444', marginTop: 4 }}>Requerida para programar la publicación.</div>
                  )}
                </div>
              )}
              <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: 12, padding: '14px 18px', marginTop: 14, fontSize: 12, color: '#64748b', lineHeight: 1.6 }}>
                {form.status === 'borrador' && 'No visible en el sitio ni en Google. Puedes guardar y publicar después.'}
                {form.status === 'programado' && 'Se guarda oculto y se publica automáticamente en la fecha indicada (la primera visita o revisión del sitemap después de esa fecha la activa).'}
                {form.status === 'publicado' && 'Visible en el sitio y en Google inmediatamente al guardar.'}
              </div>
            </div>
            {/* Resumen */}
            <div style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 14, padding: '16px 20px', marginTop: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Resumen de la página</div>
              {[
                ['URL', `litesco.com.co/${form.linea_negocio}/${form.slug}`],
                ['H1', form.h1],
                ['Título SEO', form.seo_title],
                ['FAQs', `${form.faqs.length} preguntas`],
                ['CTA', form.cta_tipo],
                ['Estado', form.status === 'programado' ? `Programado · ${form.publish_at || 'sin fecha'}` : form.status],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', gap: 12, marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: '#475569', minWidth: 90 }}>{k}</span>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{v || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navegación */}
      <div style={{ padding: '16px 28px 24px', display: 'flex', gap: 12, justifyContent: 'space-between', borderTop: '1px solid #1e293b' }}>
        <button onClick={() => paso > 1 ? setPaso(p => p - 1) : onCancel()}
          style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid #1e293b', borderRadius: 11, padding: '10px 20px', color: '#94a3b8', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
          <FaArrowLeft /> {paso === 1 ? 'Cancelar' : 'Anterior'}
        </button>

        {paso < 7 ? (
          <button onClick={() => canNext() && setPaso(p => p + 1)} disabled={!canNext()}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: canNext() ? 'linear-gradient(135deg,#f59e0b,#d97706)' : '#1e293b', border: 'none', borderRadius: 11, padding: '10px 24px', color: canNext() ? '#020617' : '#475569', fontWeight: 800, fontSize: 13, cursor: canNext() ? 'pointer' : 'not-allowed' }}>
            Siguiente <FaArrowRight />
          </button>
        ) : (
          <button onClick={() => canSave() && onSave(form)} disabled={saving || !canSave()}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: (saving || !canSave()) ? '#1e293b' : 'linear-gradient(135deg,#10b981,#059669)', border: 'none', borderRadius: 11, padding: '10px 24px', color: (saving || !canSave()) ? '#475569' : '#fff', fontWeight: 800, fontSize: 13, cursor: (saving || !canSave()) ? 'not-allowed' : 'pointer' }}>
            <FaSave /> {saving ? 'Guardando…' : form.status === 'publicado' ? 'Publicar servicio' : form.status === 'programado' ? 'Programar publicación' : 'Guardar borrador'}
          </button>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function ServiciosCMSPage() {
  const [token, setTokenState] = useState(null)
  const [servicios, setServicios] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editTarget, setEditTarget] = useState(null) // null = lista, {} = nuevo, {id,...} = editar
  const [toast, setToast] = useState(null)

  const showToast = (msg, ok = true) => {
    setToast({ msg, ok })
    setTimeout(() => setToast(null), 3500)
  }

  // Cargar token desde sessionStorage
  useEffect(() => {
    const t = getToken()
    if (t) {
      fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'validate_session', token: t }) })
        .then(r => r.json())
        .then(d => { if (d.valid) setTokenState(t); else clearToken() })
        .catch(() => clearToken())
    }
  }, [])

  const loadServicios = useCallback(async (t) => {
    const tk = t || token
    if (!tk) return
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}?action=list&token=${tk}`)
      const data = await res.json()
      if (data.success) setServicios(data.servicios || [])
    } catch { }
    setLoading(false)
  }, [token])

  useEffect(() => { if (token) loadServicios(token) }, [token])

  const handleLogin = (t) => { setToken(t); setTokenState(t); loadServicios(t) }

  const handleLogout = async () => {
    await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'logout', token }) }).catch(() => {})
    clearToken(); setTokenState(null); setServicios([])
  }

  const handleSave = async (form) => {
    setSaving(true)
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, action: 'save', token }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Error al guardar')
      showToast('Servicio guardado correctamente')
      setEditTarget(null)
      await loadServicios()
    } catch (e) {
      showToast(e.message, false)
    }
    setSaving(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este servicio? Esta acción no se puede deshacer.')) return
    try {
      const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'delete', token, id }) })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      showToast('Servicio eliminado')
      await loadServicios()
    } catch (e) { showToast(e.message, false) }
  }

  const handleToggle = async (id) => {
    try {
      const res = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'toggle_publish', token, id }) })
      const data = await res.json()
      if (!data.success) throw new Error(data.message)
      await loadServicios()
    } catch (e) { showToast(e.message, false) }
  }

  if (!token) return <LoginScreen onLogin={handleLogin} />

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f0f4f8' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999, background: toast.ok ? '#10b981' : '#ef4444', color: '#fff', borderRadius: 12, padding: '12px 20px', fontWeight: 700, fontSize: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.3)', animation: 'fadeIn .3s' }}>
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside style={{ width: 240, background: 'linear-gradient(180deg,#0A1628 0%,#0F2744 100%)', display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '28px 20px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)', flexShrink: 0 }}>
              <img src="/favicon.webp" alt="LITESCO" width={88} height={88} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 17, fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.5px' }}>LITESCO</div>
              <div style={{ color: '#f59e0b', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, marginTop: 1 }}>CMS Servicios</div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 20px 8px' }} />

        {/* Nav */}
        <nav style={{ flex: 1, padding: '4px 12px' }}>
          <div style={{ fontSize: 10, color: 'rgba(148,163,184,0.5)', padding: '8px 12px 10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5 }}>Menú Principal</div>
          {[
            { id: 'lista',  label: 'Servicios',      Icon: FaBriefcase },
            { id: 'nuevo',  label: 'Nuevo servicio',  Icon: FaPlus      },
          ].map(({ id, label, Icon }) => {
            const isActive = id === 'lista' ? editTarget === null : (editTarget !== null && !editTarget?.id)
            return (
              <button key={id} onClick={() => id === 'nuevo' ? setEditTarget({}) : setEditTarget(null)}
                style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', marginBottom: 4, borderRadius: 12, background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent', border: 'none', cursor: 'pointer', color: isActive ? '#fff' : 'rgba(148,163,184,0.8)', fontWeight: isActive ? 700 : 500, fontSize: 13, transition: 'all .2s', textAlign: 'left' }}>
                {isActive && <span style={{ position: 'absolute', left: 0, top: '20%', height: '60%', width: 3, background: '#f59e0b', borderRadius: '0 3px 3px 0' }} />}
                <Icon style={{ fontSize: 13, color: isActive ? '#f59e0b' : 'rgba(148,163,184,0.5)', flexShrink: 0 }} />
                {label}
              </button>
            )
          })}
        </nav>

        {/* Admin user */}
        <div style={{ padding: '0 16px 12px' }}>
          <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.18)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 900, fontSize: 14, color: '#0A1628' }}>G</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>Administrador</div>
              <div style={{ color: '#f59e0b', fontSize: 10, opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>gerencia@litesco.com.co</div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, overflow: 'hidden' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', color: 'rgba(148,163,184,0.75)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
              <FaGlobeAmericas style={{ fontSize: 12, flexShrink: 0 }} /> Ver sitio
            </a>
            <button onClick={handleLogout}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', width: '100%', background: 'none', border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(248,113,113,0.8)', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
              <FaSignOutAlt style={{ fontSize: 12, flexShrink: 0 }} /> Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{ background: '#fff', borderBottom: '1px solid #e8edf4', padding: '20px 32px', position: 'sticky', top: 0, zIndex: 30, boxShadow: '0 2px 12px rgba(10,22,40,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: '#0A1628', fontWeight: 900, fontSize: 22, letterSpacing: '-0.5px' }}>
              {editTarget === null ? 'Gestión de Servicios' : editTarget?.id ? 'Editando Servicio' : 'Nuevo Servicio'}
            </div>
            <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>
              {editTarget === null ? `${servicios.length} servicios registrados` : 'Complete los pasos del asistente'}
            </div>
          </div>
          {editTarget === null && (
            <button onClick={() => setEditTarget({})}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'linear-gradient(135deg,#f59e0b,#d97706)', border: 'none', borderRadius: 10, padding: '10px 20px', color: '#0A1628', fontWeight: 800, fontSize: 13, cursor: 'pointer', boxShadow: '0 4px 16px rgba(245,158,11,0.25)' }}>
              <FaPlus style={{ fontSize: 11 }} /> Nuevo servicio
            </button>
          )}
        </header>

        {/* Content */}
        <div style={{ padding: 32, flex: 1 }}>
          {editTarget !== null ? (
            <ServiceWizard initial={editTarget} onSave={handleSave} onCancel={() => setEditTarget(null)} saving={saving} />
          ) : (
            <>
              {/* Banner de bienvenida */}
              <div style={{ background: 'linear-gradient(135deg,#0A1628 0%,#0F2744 100%)', borderRadius: 18, padding: '24px 28px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 24px rgba(10,22,40,0.12)', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ color: 'rgba(245,158,11,0.75)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 6 }}>
                    {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                  <div style={{ color: '#fff', fontSize: 20, fontWeight: 800, fontFamily: 'Montserrat, sans-serif', letterSpacing: '-0.3px', marginBottom: 4 }}>
                    Servicios Legales LITESCO
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13 }}>
                    {servicios.filter(s => s.published).length} publicados&nbsp;&nbsp;·&nbsp;&nbsp;{servicios.filter(s => !s.published).length} en borrador&nbsp;&nbsp;·&nbsp;&nbsp;{servicios.length} total
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
                  {LINEAS.map(l => {
                    const LinIcon = l.icon
                    const pub = servicios.filter(s => s.linea_negocio === l.id && s.published).length
                    return (
                      <div key={l.id} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '10px 14px', minWidth: 64 }}>
                        <LinIcon style={{ color: l.color, fontSize: 18, marginBottom: 5 }} />
                        <div style={{ color: '#fff', fontWeight: 900, fontSize: 20, fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>{pub}</div>
                        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 3 }}>{l.label.split(' ')[0]}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Métricas principales */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 14 }}>
                {[
                  { label: 'Total de servicios', val: servicios.length, sub: 'en todas las líneas de negocio', accent: '#0A1628', bg: '#fff' },
                  { label: 'Publicados y activos', val: servicios.filter(s => s.published).length, sub: 'visibles en el sitio web', accent: '#059669', bg: '#f0fdf4' },
                  { label: 'En borrador', val: servicios.filter(s => !s.published).length, sub: 'pendientes de revisión', accent: '#64748b', bg: '#fff' },
                ].map(m => (
                  <div key={m.label} style={{ background: m.bg, border: '1px solid #e8edf4', borderRadius: 14, padding: '20px 22px', boxShadow: '0 2px 8px rgba(10,22,40,0.04)' }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#b0bec5', textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>{m.label}</div>
                    <div style={{ fontSize: 44, fontWeight: 900, color: m.accent, fontFamily: 'Montserrat, sans-serif', lineHeight: 1, marginBottom: 6 }}>{m.val}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8' }}>{m.sub}</div>
                  </div>
                ))}
              </div>

              {/* Por línea de negocio */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 28 }}>
                {LINEAS.map(l => {
                  const total = servicios.filter(s => s.linea_negocio === l.id).length
                  const pub   = servicios.filter(s => s.linea_negocio === l.id && s.published).length
                  const pct   = total > 0 ? Math.round(pub / total * 100) : 0
                  const LIcon = l.icon
                  return (
                    <div key={l.id} style={{ background: '#fff', border: '1px solid #e8edf4', borderRadius: 14, padding: '18px 20px', boxShadow: '0 2px 8px rgba(10,22,40,0.04)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${l.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <LIcon style={{ color: l.color, fontSize: 16 }} />
                        </div>
                        <div>
                          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 14 }}>{l.label}</div>
                          <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 1 }}>{pub} publicados de {total}</div>
                        </div>
                      </div>
                      <div style={{ height: 5, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: l.color, borderRadius: 99, transition: 'width .5s ease' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                        <span style={{ fontSize: 10, color: '#b0bec5', fontWeight: 500 }}>tasa de publicación</span>
                        <span style={{ fontSize: 10, color: l.color, fontWeight: 800 }}>{pct}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <ServiceList
                servicios={servicios}
                onNew={() => setEditTarget({})}
                onEdit={(srv) => setEditTarget(srv)}
                onDelete={handleDelete}
                onToggle={handleToggle}
                loading={loading}
                token={token}
              />
            </>
          )}
        </div>
      </main>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence } from 'framer-motion'
import { FaTimes, FaArrowRight } from 'react-icons/fa'

/**
 * Vista previa de un servicio antes de navegar a su subpágina completa.
 * Reutilizable entre Corporativo, Litis y Recuperación.
 *
 * Se monta vía createPortal a document.body: las secciones de estas páginas
 * usan framer-motion con overflow-hidden/transform, lo que crea un containing
 * block que recortaría o desalinearía un modal `position: fixed` si viviera
 * dentro de ese árbol.
 *
 * La navegación real usa <a href> (no next/link): estas rutas /{linea}/{slug}
 * no son páginas de Next (el sitio es export estático) sino servicios-articulo.php
 * servido vía reescritura de .htaccess, así que necesitan una navegación completa.
 */
export default function ServicioPreviewModal({ servicio, onClose, accentFrom = 'from-amber-500', accentTo = 'to-amber-600' }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!servicio) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [servicio, onClose])

  if (!mounted) return null

  const nombre = servicio?.nombre_servicio || servicio?.h1
  const descripcion = servicio?.resumen_rapido || servicio?.meta_desc

  return createPortal(
    <AnimatePresence>
      {servicio && (
        <m.div
          className="fixed inset-0 z-[9999] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <m.div
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={nombre}
            className="relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-3xl"
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar vista previa"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow hover:bg-white"
            >
              <FaTimes />
            </button>

            {servicio.imagen_url && (
              <div className="h-44 w-full flex-shrink-0 overflow-hidden sm:h-52">
                <img
                  src={servicio.imagen_url}
                  alt={servicio.imagen_alt || nombre || ''}
                  className="h-full w-full object-cover"
                />
              </div>
            )}

            <div className="overflow-y-auto p-6 sm:p-8">
              {servicio.subcategoria && (
                <div
                  className={`mb-3 inline-block rounded-full bg-gradient-to-r px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white ${accentFrom} ${accentTo}`}
                >
                  {servicio.subcategoria}
                </div>
              )}
              <h3 className="mb-3 text-xl font-black leading-snug text-slate-900 sm:text-2xl">{nombre}</h3>
              {descripcion && (
                <p className="mb-6 text-sm leading-relaxed text-slate-600 sm:text-base">{descripcion}</p>
              )}
              <a
                href={`/${servicio.linea_negocio}/${servicio.slug}`}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r px-6 py-3.5 font-bold text-white shadow-lg transition-all hover:shadow-xl sm:w-auto ${accentFrom} ${accentTo}`}
              >
                Ver servicio completo <FaArrowRight />
              </a>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

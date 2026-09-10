'use client'

import { FaArrowRight } from 'react-icons/fa'

/**
 * Tarjeta grande y clicable para un servicio dentro de un área de especialización.
 * Reutilizable entre Corporativo, Litis y Recuperación.
 * Al hacer clic dispara onClick (normalmente abre ServicioPreviewModal) en vez de
 * navegar directo, para que el usuario pueda previsualizar antes de entrar.
 */
export default function ServicioCard({
  servicio,
  icon: Icon,
  iconPosition = 'start', // 'start' (Corporativo) | 'end' (Litis: "logotipo al final de la tarjeta")
  accentFrom = 'from-amber-500',
  accentTo = 'to-amber-600',
  accentText = 'text-amber-600',
  accentBorder = 'hover:border-amber-300',
  onClick,
}) {
  const nombre = servicio.nombre_servicio || servicio.h1
  const resumen = servicio.resumen_rapido || servicio.meta_desc || ''

  const iconBox = Icon && (
    <div
      className={`flex h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br shadow-lg ${accentFrom} ${accentTo}`}
    >
      <Icon className="text-xl sm:text-2xl text-white" />
    </div>
  )

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 sm:gap-5 rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] ${accentBorder}`}
    >
      {iconPosition === 'start' && iconBox}
      <div className="min-w-0 flex-1">
        <div className="text-base sm:text-lg font-black leading-snug text-slate-900">{nombre}</div>
        {resumen && <p className="mt-1 line-clamp-2 text-xs sm:text-sm text-slate-500">{resumen}</p>}
      </div>
      {iconPosition === 'end' ? (
        iconBox
      ) : (
        <FaArrowRight
          className={`flex-shrink-0 text-base opacity-60 transition-all group-hover:translate-x-1 group-hover:opacity-100 ${accentText}`}
        />
      )}
    </button>
  )
}

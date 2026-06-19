'use client'

import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import {
  FaBars, FaTimes, FaChevronDown,
  FaBriefcase, FaGavel, FaHandHoldingUsd, FaArrowRight,
} from 'react-icons/fa'

// ─── Datos estáticos fuera del componente — no se re-crean en cada render ────
const SERVICES = [
  {
    href: '/corporativo',
    title: 'Corporativo',
    description: 'Blindaje jurídico y consultoría para grandes empresas.',
    icon: FaBriefcase,
  },
  {
    href: '/litis',
    title: 'Litis',
    description: 'Representación experta en resolución de conflictos.',
    icon: FaGavel,
  },
  {
    href: '/recuperacion',
    title: 'Recuperación',
    description: 'Estrategias efectivas para la gestión de cartera.',
    icon: FaHandHoldingUsd,
  },
]

const SERVICE_PATHS = SERVICES.map((s) => s.href)

// ─── Subcomponentes memoizados ────────────────────────────────────────────────

const NavLink = memo(({ href, isActive, children }) => (
  <Link
    href={href}
    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
      isActive
        ? 'text-amber-400'
        : 'text-slate-300 hover:text-white'
    }`}
  >
    {children}
    {/* Punto indicador activo */}
    <span
      aria-hidden="true"
      className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full transition-all duration-300 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
    />
  </Link>
))
NavLink.displayName = 'NavLink'

const ServiceLink = memo(({ href, title, description, Icon }) => (
  <Link
    href={href}
    className="group relative flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-slate-800 hover:bg-slate-900 hover:translate-x-1 transition-all duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.03] transition-colors duration-200"
    />
    <div className="relative flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-800 text-slate-400 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-amber-700 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)]">
      <Icon size={18} />
    </div>
    <div className="relative z-10 flex flex-col justify-center min-w-0">
      <span className="text-sm font-bold text-slate-200 group-hover:text-amber-100 transition-colors duration-200">
        {title}
      </span>
      <span className="text-[11px] leading-snug text-slate-500 group-hover:text-slate-400 transition-colors duration-200 mt-0.5">
        {description}
      </span>
    </div>
  </Link>
))
ServiceLink.displayName = 'ServiceLink'

const MobileNavLink = memo(({ href, isActive, children, isSubItem }) => (
  <Link
    href={href}
    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
      isActive
        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
    } ${isSubItem ? 'ml-3 text-[13px]' : ''}`}
  >
    {children}
    {isActive && (
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)] flex-shrink-0"
      />
    )}
  </Link>
))
MobileNavLink.displayName = 'MobileNavLink'

// ─── Componente principal ─────────────────────────────────────────────────────
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()

  const dropdownRef = useRef(null)
  const servicesBtnRef = useRef(null)

  // Cerrar todo al cambiar de ruta
  useEffect(() => {
    setIsOpen(false)
    setServicesOpen(false)
  }, [pathname])

  // Bloquear scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Cerrar dropdown con click fuera — usando ref en lugar de closest()
  useEffect(() => {
    if (!servicesOpen) return
    const handlePointerDown = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        servicesBtnRef.current && !servicesBtnRef.current.contains(e.target)
      ) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [servicesOpen])

  // Cerrar dropdown con Escape
  useEffect(() => {
    if (!servicesOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setServicesOpen(false)
        servicesBtnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [servicesOpen])

  const isActive = useCallback((path) => pathname === path, [pathname])
  const isServicesActive = SERVICE_PATHS.includes(pathname)

  const toggleServices = useCallback(() => setServicesOpen((v) => !v), [])
  const toggleMenu = useCallback(() => setIsOpen((v) => !v), [])

  return (
    <nav
      role="navigation"
      aria-label="Navegación principal"
      className="fixed top-0 left-0 right-0 bg-slate-950 border-b border-slate-800 shadow-lg"
      style={{ zIndex: 10000 }}
    >
      {/* ── Barra principal ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="group relative z-20 flex items-center gap-3 min-w-0 flex-shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
            aria-label="LITESCO — Ir al inicio"
          >
            {/* Imagen */}
            <div className="relative flex-shrink-0 rounded-full overflow-hidden w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 border-2 border-slate-800 ring-2 ring-slate-700 shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:ring-amber-500/50 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.45)]">
              <Image
                src="/favicon.webp"
                alt=""
                aria-hidden="true"
                width={48}
                height={48}
                priority
                className="w-full h-full object-cover"
              />
              {/* Shimmer — usa translateX en lugar de left para GPU acceleration */}
              <span
                aria-hidden="true"
                className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/35 to-transparent group-hover:translate-x-[250%] transition-transform duration-700 ease-out"
              />
            </div>

            {/* Texto */}
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter text-white group-hover:text-amber-500 transition-colors duration-300 leading-none">
                LITESCO
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  aria-hidden="true"
                  className="h-px w-3 bg-amber-500 group-hover:w-6 transition-all duration-500 rounded-full"
                />
                {/* Texto truncado con tooltip para pantallas muy pequeñas */}
                <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase group-hover:text-amber-200/70 transition-colors duration-300 truncate max-w-[140px] sm:max-w-none">
                  Litigio Estratégico Colombiano
                </span>
              </div>
            </div>
          </Link>

          {/* ── Menú desktop ──────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-0.5" role="menubar">

            <NavLink href="/" isActive={isActive('/')}>Inicio</NavLink>
            <NavLink href="/sobre-nosotros" isActive={isActive('/sobre-nosotros')}>Nosotros</NavLink>

            {/* Dropdown Servicios */}
            <div className="relative px-1">
              <button
                ref={servicesBtnRef}
                onClick={toggleServices}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                aria-controls="services-dropdown"
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                  isServicesActive || servicesOpen
                    ? 'bg-slate-900 text-amber-500 border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border-transparent'
                }`}
              >
                Servicios
                <FaChevronDown
                  aria-hidden="true"
                  className={`text-[10px] transition-transform duration-300 ${servicesOpen ? '-rotate-180 text-amber-500' : ''}`}
                />
              </button>

              {/* Panel desplegable */}
              <div
                id="services-dropdown"
                ref={dropdownRef}
                role="menu"
                aria-label="Servicios legales"
                // Visibilidad: CSS transitions sin pointer-events cuando cerrado
                className={`absolute top-full mt-4 w-80 xl:w-96 transition-all duration-300 ease-out origin-top z-50 ${
                  servicesOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 scale-95 -translate-y-3 pointer-events-none'
                }`}
                // Centrado pero sin salirse del viewport
                style={{ left: '50%', transform: servicesOpen ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0.95)' }}
              >
                {/* Flecha */}
                <div
                  aria-hidden="true"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 border-t border-l border-slate-800 rotate-45 z-0"
                />
                {/* Panel */}
                <div className="relative bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10">
                  <div
                    aria-hidden="true"
                    className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
                  />
                  <div className="p-2 space-y-0.5" role="group">
                    {SERVICES.map(({ href, title, description, icon: Icon }) => (
                      <ServiceLink
                        key={href}
                        href={href}
                        title={title}
                        description={description}
                        Icon={Icon}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <NavLink href="/blog" isActive={isActive('/blog')}>Blog</NavLink>
            <NavLink href="/faq" isActive={isActive('/faq')}>FAQ</NavLink>

            {/* CTA */}
            <div className="ml-4 pl-4 border-l border-slate-800">
              <Link
                href="/contacto"
                className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 shadow-md hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                Contáctanos
                <FaArrowRight
                  aria-hidden="true"
                  className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* ── Botón hamburger ───────────────────────────────────────── */}
          <button
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="lg:hidden flex-shrink-0 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {isOpen
              ? <FaTimes aria-hidden="true" size={20} />
              : <FaBars aria-hidden="true" size={20} />
            }
          </button>
        </div>
      </div>

      {/* ── Menú móvil — pantalla completa ──────────────────────────── */}
      {/*
        Fixed + inset-0 = ocupa TODO el viewport.
        opacity + pointer-events para transición suave sin layout thrashing.
        El contenido usa flex-col con justify-between para
        logo arriba → links centrados → contacto abajo.
      */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`lg:hidden fixed inset-0 flex flex-col transition-all duration-500 ease-in-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: '#0a1628', zIndex: 9999 }}
      >

        {/* ── LOGO + NOMBRE centrado arriba ─── */}
        <div className={`flex flex-col justify-center items-center pt-14 pb-6 transition-all duration-700 delay-100 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <Link href="/" aria-label="LITESCO — inicio" onClick={() => setIsOpen(false)} className="flex flex-col items-center gap-3">
            <div className="relative rounded-full overflow-hidden w-20 h-20 border-2 border-amber-500/40 shadow-[0_0_32px_rgba(245,158,11,0.25)]">
              <Image src="/favicon.webp" alt="LITESCO" width={80} height={80} priority className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl font-black tracking-[0.15em] text-white">LITESCO</span>
              <div className="flex items-center gap-2">
                <span className="h-px w-8 bg-amber-500/60 rounded-full" />
                <span className="text-[9px] font-bold tracking-[0.22em] text-amber-500/70 uppercase">Litigio Estratégico</span>
                <span className="h-px w-8 bg-amber-500/60 rounded-full" />
              </div>
            </div>
          </Link>
        </div>

        {/* ── LINKS centrados — con separadores ─── */}
        <nav className="flex-1 flex flex-col justify-center px-10" aria-label="Menú principal móvil">
          {[
            { href: '/', label: 'Inicio' },
            { href: '/sobre-nosotros', label: 'Nosotros' },
            { href: '/corporativo', label: 'Corporativo' },
            { href: '/litis', label: 'Litis' },
            { href: '/recuperacion', label: 'Recuperación' },
            { href: '/blog', label: 'Blog' },
            { href: '/faq', label: 'FAQ' },
            { href: '/contacto', label: 'Contacto' },
          ].map(({ href, label }, i) => {
            const active = isActive(href)
            return (
              <div
                key={href}
                className={`transition-all duration-500 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                style={{ transitionDelay: isOpen ? `${120 + i * 55}ms` : '0ms' }}
              >
                <Link
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-center gap-3 text-center py-4 text-xl font-bold tracking-widest uppercase transition-colors duration-200 focus-visible:outline-none ${
                    active ? 'text-amber-400' : 'text-white/85 hover:text-amber-400'
                  }`}
                >
                  {label}
                  {active && (
                    <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,1)]" />
                  )}
                </Link>
                {i < 7 && (
                  <div aria-hidden="true" className="h-px mx-auto" style={{ width: '40%', background: 'rgba(255,255,255,0.07)' }} />
                )}
              </div>
            )
          })}
        </nav>

        {/* Espaciado inferior */}
        <div className="pb-10" />
      </div>
    </nav>
  )
}

export default Navbar
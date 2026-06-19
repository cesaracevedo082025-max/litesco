'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowUp,
  FaChevronRight,
  FaExternalLinkAlt
} from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500)
    }
    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const socialLinks = [
    { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://www.linkedin.com/company/litesco/posts/?feedView=all', bg: 'bg-[#0077B5]', hover: 'hover:bg-[#005fa3]' },
    { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/litesco.co', bg: 'bg-gradient-to-tr from-[#fd5949] to-[#d6249f]', hover: 'hover:opacity-90' },
    { name: 'Facebook', icon: FaFacebookF, url: 'https://www.facebook.com/share/1a1fApiY65/', bg: 'bg-[#1877F2]', hover: 'hover:bg-[#166fe5]' },
    { name: 'TikTok', icon: FaTiktok, url: 'https://tiktok.com/@litesco.co', bg: 'bg-[#000000]', hover: 'hover:bg-[#222222]' },
    { name: 'WhatsApp', icon: FaWhatsapp, url: 'https://wa.me/573132037572', bg: 'bg-[#25D366]', hover: 'hover:bg-[#20bd5a]' }
  ]

  const servicios = [
    { name: 'Corporativo', link: '/corporativo' },
    { name: 'Litis', link: '/litis' },
    { name: 'Recuperación', link: '/recuperacion' }
  ]

  const enlaces = [
    { name: 'Inicio', link: '/' },
    { name: 'Sobre Nosotros', link: '/sobre-nosotros' },
    { name: 'Blog', link: '/blog' },
    { name: 'FAQ', link: '/faq' },
    { name: 'Contacto', link: '/contacto' }
  ]

  return (
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden font-sans border-t border-slate-800">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl opacity-40 mix-blend-screen"></div>
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-40 mix-blend-screen"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* === COLUMNA 1: Identidad y Redes === */}
          <div className="space-y-6">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <img
                src="/favicon.webp"
                alt="LITESCO Logo"
                className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="flex flex-col justify-center">
                <span className="text-xl font-bold tracking-widest text-slate-100 group-hover:text-amber-500 transition-colors duration-300">
                  LITESCO
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-slate-500 uppercase">
                  Litigio Estratégico
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 pr-4 border-l-2 border-amber-500/30 pl-4">
              Firma legal de vanguardia especializada en soluciones corporativas complejas, litigio estratégico y recuperación de activos.
            </p>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Síguenos</h5>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-md transition-all duration-300 ${social.bg} ${social.hover} hover:-translate-y-1 hover:shadow-lg`}
                    aria-label={social.name}
                  >
                    <social.icon className="text-lg z-10" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* === COLUMNA 2: Servicios === */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-8 pb-2 border-b border-slate-800 inline-block">
              Áreas de Práctica
            </h4>
            <ul className="space-y-4">
              {servicios.map((servicio) => (
                <li key={servicio.name}>
                  <Link
                    href={servicio.link}
                    className="group flex items-center justify-between p-3 rounded-lg bg-slate-900/50 hover:bg-slate-800 transition-all duration-300 border border-slate-800/50 hover:border-amber-500/30"
                  >
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">
                      {servicio.name}
                    </span>
                    <FaArrowUp className="text-xs text-slate-600 group-hover:text-amber-500 rotate-45 transition-all opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === COLUMNA 3: Enlaces === */}
          <div>
             <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-8 pb-2 border-b border-slate-800 inline-block">
              Navegación
            </h4>
            <ul className="space-y-2">
              {enlaces.map((enlace) => (
                <li key={enlace.name}>
                  <Link
                    href={enlace.link}
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 py-1.5 transition-colors"
                  >
                    <FaChevronRight className="text-[10px] text-slate-600 group-hover:text-amber-500/80 transition-colors" />
                    {enlace.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* === COLUMNA 4: Contacto === */}
          <div>
             <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-8 pb-2 border-b border-slate-800 inline-block">
              Contacto
            </h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shadow-sm">
                  <FaMapMarkerAlt className="text-amber-500" size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Ubicación</p>
                  <a href="https://maps.app.goo.gl/XkUARcXNmhDdeXhH9" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2 group">
                    Edificio Colseguros, Bogotá <FaExternalLinkAlt size={10} className="opacity-0 group-hover:opacity-100 transition-opacity"/>
                  </a>
                  <span className="text-xs text-slate-500 block mt-0.5">CRA 7 #17-01</span>
                </div>
              </li>

              <li className="flex gap-4">
                 <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shadow-sm">
                  <FaPhoneAlt className="text-amber-500" size={16} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Teléfono</p>
                  <a href="tel:+573132037572" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors">
                    +57 313 203 7572
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                 <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shadow-sm">
                  <FaEnvelope className="text-amber-500" size={16} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Email</p>
                  <a href="mailto:gerencia@litesco.com.co" className="text-sm font-medium text-slate-300 hover:text-amber-400 transition-colors truncate block">
                    gerencia@litesco.com.co
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-slate-800/80 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {currentYear} <span className="text-slate-400 font-bold">LITESCO S.A.S.</span> Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="hover:text-amber-500 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/cookies" className="hover:text-amber-500 transition-colors">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-28 right-8 z-50 w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all duration-300 border border-amber-400/50"
          aria-label="Volver arriba"
        >
          <FaArrowUp className="text-lg" />
        </button>
      )}
    </footer>
  )
}

export default Footer

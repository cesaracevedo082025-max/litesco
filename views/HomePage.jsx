'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// OPTIMIZACIÓN: Importamos componentes optimizados de framer-motion
import { m, LazyMotion, domAnimation, useScroll, AnimatePresence } from 'framer-motion'
import { 
  FaArrowRight, 
  FaCheckCircle, 
  FaShieldAlt, 
  FaAward, 
  FaHandshake, 
  FaBriefcase,
  FaGavel,
  FaCoins,
  FaChevronRight,
  FaCalendarAlt,
  FaWhatsapp,
  FaBalanceScale,
  FaLightbulb,
  FaClock,
  FaLock,
  FaScroll,
  FaBuilding,
  FaUsers
} from 'react-icons/fa'
import { generateEventId, fbqLead } from '@/components/ui/MetaPixel'

const heroVideo = '/videos/fondoHome1.mp4'
const imagenCorporativo = '/images/servicios/corporativo.webp'
const imagenLitis = '/images/servicios/litis.webp'
const imagenRecuperacion = '/images/servicios/recuperacion.webp'

const BLOG_CATEGORIES = {
  civil: { name: 'Civil', icon: FaBalanceScale, color: 'amber' },
  laboral: { name: 'Laboral', icon: FaBriefcase, color: 'amber' },
  comercial: { name: 'Comercial', icon: FaBriefcase, color: 'indigo' },
  administrativo: { name: 'Administrativo', icon: FaBuilding, color: 'slate' },
  familia: { name: 'Familia', icon: FaUsers, color: 'emerald' },
  penal: { name: 'Penal', icon: FaLock, color: 'red' },
  constitucional: { name: 'Constitucional', icon: FaScroll, color: 'purple' },
}

const BLOG_API_URL = 'https://www.litesco.com.co/blog-api.php'

const HomePage = () => {
  const { scrollY } = useScroll()
  const videoRef = useRef(null)

  // ✅ OPTIMIZACIÓN: Cargar video solo después de que el poster sea visible (LCP)
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Esperar a que el poster sea pintado, luego cargar y reproducir el video
    const timer = setTimeout(() => {
      video.load()
      video.play().catch(() => {})
    }, 1500)

    return () => clearTimeout(timer)
  }, [])
  
  const [blogArticles, setBlogArticles] = useState([])

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const response = await fetch(`${BLOG_API_URL}?action=featured`)
        const data = await response.json()
        if (data.success && data.articles) {
          setBlogArticles(data.articles.slice(0, 3))
        }
      } catch (error) {
        console.error('Error loading blog articles:', error)
      }
    }
    loadArticles()
  }, [])
  
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    servicio: '',
    mensaje: ''
  })

  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  const rotatingTexts = [
    {
      title: 'Liderando el asesoramiento jurídico en Colombia',
      subtitle: ''
    },
    {
      title: 'Litesco Corporativo',
      subtitle: 'Asesoría empresarial y societaria'
    },
    {
      title: 'Litesco Litis',
      subtitle: 'Representación legal especializada'
    },
    {
      title: 'Litesco Recuperación',
      subtitle: 'Gestión integral de cobranza'
    }
  ]

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const trustBadges = [
    { icon: FaShieldAlt, label: 'Disciplina'},
    { icon: FaAward, label: 'Pasión '},
    { icon: FaHandshake, label: 'Innovación'},
  ]

  const lineasNegocio = [
    {
      id: 'corporativo',
      icon: FaBriefcase,
      titulo: 'LITESCO CORPORATIVO',
      descripcion: 'Esta propuesta nace para responder a las necesidades de los entornos empresariales en Colombia, con la finalidad de brindar respaldo y acompañamiento en asuntos societarios, contractuales, laborales y de negocios.',
      cta: '¡Conoce más sobre Litesco Corporativo, para emprender tu viaje en el mundo de los negocios!',
      link: '/corporativo',
      imagen: imagenCorporativo,
      colores: {
        bgAccent: 'bg-amber-500/20'
      }
    },
    {
      id: 'litis',
      icon: FaGavel,
      titulo: 'LITESCO LITIS',
      descripcion: 'Brindamos una representación legal especializada en conflictos de diversas áreas del derecho, como lo es civil, comercial, laboral, administrativo, entre otros campos. Nuestra intención es otorgar soluciones efectivas tanto desde la vía extrajudicial como judicial.',
      cta: '¡Conoce más sobre Litesco Litis y las soluciones que necesitas!',
      link: '/litis',
      imagen: imagenLitis,
      colores: {
        bgAccent: 'bg-slate-500/20'
      }
    },
    {
      id: 'recuperacion',
      icon: FaCoins,
      titulo: 'LITESCO RECUPERACIÓN',
      descripcion: 'Brindamos una tercerización integral de cobranza, para que puedas recuperar tu cartera sin riesgos. Entendemos que tu emprendimiento o empresa necesita liquidez y recuperar sus activos entregados sin recaudo, por ende, queremos poner a tu disposición un equipo especializado en el modelo BPO.',
      cta: '¡Conoce más sobre Litesco Recuperación y nuestro modelo BPO!',
      link: '/recuperacion',
      imagen: imagenRecuperacion,
      colores: {
        bgAccent: 'bg-amber-500/20'
      }
    }
  ]

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage({ type: '', text: '' })

    const metaEventId = generateEventId('lead')

    try {
      const response = await fetch('https://www.litesco.com.co/send-email-simple.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, meta_event_id: metaEventId })
      })

      const data = await response.json()

      if (data.success) {
        // El evento Lead lo confirma send-email-simple.php server-side; aquí solo
        // disparamos el pixel de navegador con el mismo event_id para deduplicar.
        fbqLead(metaEventId, formData.servicio || 'Formulario Inicio')
        setSubmitMessage({
          type: 'success',
          text: data.message || '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.'
        })
        setFormData({ nombre: '', empresa: '', email: '', telefono: '', servicio: '', mensaje: '' })
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: data.message || 'Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.' 
        })
      }
    } catch (error) {
      console.error('Error:', error)
      setSubmitMessage({ 
        type: 'error', 
        text: 'Error de conexión. Por favor, verifica tu conexión a internet e intenta nuevamente.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* OPTIMIZACIÓN: Envoltura de LazyMotion para reducir JS */}
      <LazyMotion features={domAnimation}>
        <main className="relative min-h-screen bg-white overflow-x-hidden">
          
          {/* SECCIÓN HERO CON VIDEO */}
          <section className="relative h-screen min-h-[500px] sm:min-h-[600px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* ✅ OPTIMIZACIÓN CRÍTICA: poster muestra imagen inmediata, video carga diferido */}
              <video 
  ref={videoRef}
  loop
  muted
  playsInline
  preload="none"
  poster="/images/hero-poster.webp"
  className="h-full w-full object-cover"
  suppressHydrationWarning /* 👈 Esto evita que extensiones del navegador congelen tu web */
>
  <source src={heroVideo} type="video/mp4" />
  Tu navegador no soporta videos HTML5.
</video>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 py-12 lg:px-8">
              <section className="max-w-2xl space-y-4">
                <m.div
                  initial={{ opacity: 0, y: 40,  }}
                  animate={{ opacity: 1, y: 0,  }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-1"
                  >
                    <AnimatePresence mode="wait">
                      <m.div
                        key={currentTextIndex}
                        initial={{ opacity: 0, y: 20,  }}
                        animate={{ opacity: 1, y: 0,  }}
                        exit={{ opacity: 0, y: -20,  }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 backdrop-blur-none">
                          <div className="h-2 w-2  rounded-full bg-amber-500" />
                          <span className="text-sm font-medium text-amber-400">
                            {rotatingTexts[currentTextIndex].title}
                          </span>
                        </div>
                        {rotatingTexts[currentTextIndex].subtitle && (
                          <m.p
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="text-xs text-slate-400 ml-6"
                          >
                            {rotatingTexts[currentTextIndex].subtitle}
                          </m.p>
                        )}
                      </m.div>
                    </AnimatePresence>
                  </m.div>

                  {/* CAMBIO REALIZADO: H1 Optimizado para SEO */}
                  <m.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
                  >
                    LITIGIOS
                    <br />
                    <span className="text-amber-500">ASESORÍA LEGAL</span>
                    <br />
                    <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-slate-300">
                       & COBRANZA BPO
                    </span>
                  </m.h1>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-xl leading-relaxed text-slate-300 md:text-2xl"
                  >
                    Somos su aliado estratégico en la toma de decisiones jurídicas, con soluciones modernas y efectivas para empresas y personas.
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4"
                  >
                    <m.a
                      href="https://calendly.com/gerencialitigioestrategicocolombiano"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-5 sm:px-8 py-3 sm:py-4 font-bold text-white shadow-2xl hover:shadow-amber-500/30 relative overflow-hidden text-sm sm:text-base"
                    >
                      <m.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <FaCalendarAlt className="text-xl relative z-10" />
                      <span className="relative z-10">Agenda tu Consulta</span>
                      <FaArrowRight className="text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </m.a>

                    <m.a
                      href="#contacto"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-5 sm:px-8 py-3 sm:py-4 font-bold text-white backdrop-blur-none hover:border-white/50 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
                    >
                      <span>Contáctanos</span>
                      <FaArrowRight className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
                    </m.a>
                  </m.div>
                </m.div>
              </section>
            </div>
          </section>

        {/* --- VALORES CORPORATIVOS VERSIÓN PROFESIONAL Y CREATIVA --- */}
<section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
  
  {/* Elementos decorativos de fondo */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid sutil */}
    <div className="absolute inset-0 opacity-[0.02]">
      <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,#0f172a_1px,transparent_1px)] [background-size:24px_24px]"></div>
    </div>
    
    {/* Círculos decorativos con colores de la página */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl"></div>
  </div>

  {/* Título de sección */}
  <m.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center mb-12 px-4"
  >
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
      Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">Valores</span>
    </h2>
    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
      Comprometidos con la excelencia y la innovación en cada caso
    </p>
  </m.div>

  {/* Carrusel infinito con diseño glassmorphism */}
  <div className="relative flex items-center h-32 sm:h-36 md:h-40">
    
    {/* Gradientes laterales para efecto fade */}
    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10 pointer-events-none"></div>
    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-100 via-slate-100/80 to-transparent z-10 pointer-events-none"></div>
    
    <m.div
      className="flex gap-6 sm:gap-8 px-4 w-max"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ 
        repeat: Infinity, 
        ease: "linear", 
        duration: 45,
        repeatType: "loop"
      }}
    >
      {[
        { text: 'Transparencia', icon: FaCheckCircle, gradient: 'from-amber-400 to-amber-600' },
        { text: 'Respaldo Jurídico', icon: FaBalanceScale, gradient: 'from-slate-500 to-slate-700' },
        { text: 'Ética Profesional', icon: FaGavel, gradient: 'from-amber-500 to-amber-700' },
        { text: 'Disciplina', icon: FaShieldAlt, gradient: 'from-slate-600 to-slate-800' },
        { text: 'Pasión', icon: FaAward, gradient: 'from-amber-400 to-amber-600' },
        { text: 'Innovación', icon: FaLightbulb, gradient: 'from-slate-500 to-slate-700' },
        { text: 'Estrategia Legal', icon: FaBriefcase, gradient: 'from-amber-500 to-amber-700' },
        { text: 'Excelencia', icon: FaAward, gradient: 'from-slate-600 to-slate-800' },
        { text: 'Compromiso', icon: FaHandshake, gradient: 'from-amber-400 to-amber-600' },
        // Duplicado para efecto infinito seamless
        { text: 'Transparencia', icon: FaCheckCircle, gradient: 'from-amber-400 to-amber-600' },
        { text: 'Respaldo Jurídico', icon: FaBalanceScale, gradient: 'from-slate-500 to-slate-700' },
        { text: 'Ética Profesional', icon: FaGavel, gradient: 'from-amber-500 to-amber-700' },
        { text: 'Disciplina', icon: FaShieldAlt, gradient: 'from-slate-600 to-slate-800' },
        { text: 'Pasión', icon: FaAward, gradient: 'from-amber-400 to-amber-600' },
        { text: 'Innovación', icon: FaLightbulb, gradient: 'from-slate-500 to-slate-700' },
        { text: 'Estrategia Legal', icon: FaBriefcase, gradient: 'from-amber-500 to-amber-700' },
        { text: 'Excelencia', icon: FaAward, gradient: 'from-slate-600 to-slate-800' },
        { text: 'Compromiso', icon: FaHandshake, gradient: 'from-amber-400 to-amber-600' }
      ].map((item, index) => (
        <m.div
          key={index}
          whileHover={{ 
            scale: 1.05, 
            y: -8,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          className="group relative flex items-center gap-4 px-6 sm:px-8 py-5 sm:py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          
          {/* Brillo sutil en hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          {/* Borde con gradiente en hover */}
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10`}></div>
          
          {/* Ícono con diseño glassmorphism */}
          <div className={`relative z-10 p-3 rounded-xl bg-gradient-to-br ${item.gradient} shadow-lg group-hover:scale-110 transition-transform duration-500`}>
            <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" />
          </div>
          
          {/* Texto principal */}
          <span className="relative z-10 text-sm sm:text-base lg:text-lg font-bold tracking-wide uppercase text-slate-800 group-hover:text-slate-900 transition-colors duration-300 whitespace-nowrap">
            {item.text}
          </span>

          {/* Efecto de resplandor inferior */}
          <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 rounded-full bg-gradient-to-r ${item.gradient} group-hover:w-3/4 transition-all duration-500 shadow-lg`}></div>
          
          {/* Partículas flotantes en hover */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className={`absolute top-2 right-2 w-1 h-1 rounded-full bg-gradient-to-r ${item.gradient} animate-ping`}></div>
            <div className={`absolute bottom-2 left-2 w-1 h-1 rounded-full bg-gradient-to-r ${item.gradient} animate-ping delay-100`}></div>
          </div>

        </m.div>
      ))}
    </m.div>
  </div>

</section>
          {/* LÍNEAS DE NEGOCIO - VERSIÓN MEJORADA CON ANIMACIONES PROFESIONALES */}
<section className="relative py-16 sm:py-24 lg:py-32 bg-white overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute top-1/4 right-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-amber-500/5 rounded-full blur-xl" />
    <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-slate-500/5 rounded-full blur-xl" />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12 sm:mb-16 lg:mb-20"
    >
      <m.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-block mb-6"
      >
        <span className="px-6 py-3 bg-slate-900 rounded-full text-amber-500 font-bold text-sm tracking-wider uppercase">
          Nuestras Soluciones
        </span>
      </m.div>
      
      <m.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4"
      >
        Líneas de{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
          Negocio
        </span>
      </m.h2>

      <m.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto px-4"
      >
        Soluciones especializadas para cada necesidad legal
      </m.p>
    </m.div>

    <div className="space-y-12 sm:space-y-16 lg:space-y-24">
      {lineasNegocio.map((linea, index) => (
        <m.div
          key={linea.id}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center ${index % 2 === 0 ? '' : 'lg:grid-flow-dense'}`}>
            
            {/* IMAGEN CON ANIMACIONES MEJORADAS */}
            <m.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                ease: [0.22, 1, 0.36, 1] 
              }}
              className={`relative ${index % 2 === 0 ? '' : 'lg:col-start-2'}`}
            >
              <div className="relative group">
                {/* Contenedor de la imagen con efectos mejorados */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  
                  {/* Imagen con parallax y zoom suave */}
                  <m.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="aspect-[4/3] overflow-hidden"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${linea.imagen})` }}
                      loading="lazy"
                    />
                    
                    {/* Overlay gradiente base */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60" />
                    
                    {/* Overlay hover con efecto de brillo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Efecto de shine (brillo diagonal) en hover */}
                    <m.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                      whileHover={{ x: ["0%", "200%"] }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                  </m.div>

                  {/* Borde animado en hover */}
                  <div className="absolute inset-0 border-4 border-amber-500/0 group-hover:border-amber-500/30 rounded-2xl sm:rounded-3xl transition-all duration-700 pointer-events-none"></div>

                  {/* Número con animación mejorada */}
                  <m.div
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.4, 
                      type: "spring", 
                      stiffness: 200,
                      damping: 15
                    }}
                    className="absolute top-6 left-6 z-10"
                  >
                    <m.div 
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      className="w-14 h-14 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border-2 border-amber-500/20"
                    >
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-500 to-amber-700">
                        0{index + 1}
                      </span>
                    </m.div>
                  </m.div>

                  {/* Icono animado en esquina superior derecha */}
                  <m.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-6 right-6 z-10"
                  >
                    <m.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="w-12 h-12 flex items-center justify-center bg-amber-500/90 backdrop-blur-sm rounded-xl shadow-lg"
                    >
                      <linea.icon className="text-white text-xl" />
                    </m.div>
                  </m.div>
                </div>

                {/* Glow effect decorativo */}
                <div
                  className={`absolute -bottom-6 ${index % 2 === 0 ? '-left-6' : '-right-6'} w-32 h-32 ${linea.colores.bgAccent} rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10`}
                />
              </div>
            </m.div>

            {/* CONTENIDO DE TEXTO */}
            <m.div
              initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`space-y-6 ${index % 2 === 0 ? '' : 'lg:col-start-1 lg:row-start-1'}`}
            >
              {/* Badge de categoría */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <m.span 
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-600 font-semibold text-sm uppercase tracking-wide cursor-default"
                >
                  {linea.id === 'corporativo' ? 'LITESCO CORPORATIVO' : linea.id === 'litis' ? 'LITESCO LITIS' : 'LITESCO RECUPERACIÓN'}
                </m.span>
              </m.div>

              {/* Título */}
              <m.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
              >
                {linea.titulo}
              </m.h3>

              {/* Línea decorativa animada */}
              <m.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="h-1 w-20 sm:w-24 md:w-32 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full origin-left"
              />

              {/* Descripción */}
              <m.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed"
              >
                {linea.descripcion}
              </m.p>

              {/* CTA en cursiva */}
              <m.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-slate-500 italic border-l-4 border-amber-500/50 pl-4"
              >
                {linea.cta}
              </m.p>

              {/* BOTÓN CON ANIMACIONES PROFESIONALES Y CORPORATIVAS */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                
                <Link href={linea.link} onClick={() => window.scrollTo(0, 0)}>
  <m.button
    whileHover={{ 
                      scale: 1.05, 
                      x: 8,
                      transition: { 
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1]
                      }
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      transition: { duration: 0.1 }
                    }}
                    className="group relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:via-amber-700 hover:to-amber-800 px-8 py-4 font-bold text-white shadow-lg hover:shadow-2xl hover:shadow-amber-500/40 overflow-hidden transition-all duration-500"
                  >
                    {/* Brillo animado de fondo */}
                    <m.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ 
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Efecto de onda en hover */}
                    <m.div
                      className="absolute inset-0 bg-white/10 rounded-2xl"
                      initial={{ scale: 0, opacity: 1 }}
                      whileHover={{ 
                        scale: 1.5, 
                        opacity: 0,
                        transition: { duration: 0.6 }
                      }}
                    />

                    {/* Contenido del botón */}
                    <span className="relative z-10 tracking-wide">Conocer más</span>
                    
                    {/* Ícono con animación */}
                    <m.div
                      className="relative z-10"
                      animate={{
                        x: [0, 4, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <FaChevronRight className="text-lg" />
                    </m.div>

                    {/* Borde brillante en hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
                  </m.button>
                </Link>
              </m.div>
            </m.div>

          </div>
        </m.div>
      ))}
    </div>
  </div>
</section>

          {/* Sección de Blog Premium */}
          <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
            <div className="absolute inset-0">
              <div className="absolute inset-0 opacity-[0.015]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" className="text-slate-900"/>
                </svg>
              </div>
              
              <div className="absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-gradient-to-br from-amber-400/5 to-orange-500/5 rounded-full blur-xl" />
              <div className="absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-gradient-to-tr from-slate-400/5 to-slate-600/5 rounded-full blur-xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-10 sm:mb-14 lg:mb-20"
              >
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-6 sm:mb-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-md opacity-30 "></div>
                    <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-slate-900 to-slate-800 border border-amber-500/30 shadow-xl">
                      <div className="w-2 h-2 rounded-full bg-amber-400 "></div>
                      <span className="text-sm font-bold uppercase tracking-widest text-amber-400">
                        Actualidad Legal
                      </span>
                      <FaBalanceScale className="text-amber-400" />
                    </div>
                  </div>
                </m.div>

                <m.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-4 sm:mb-6 leading-[1.1] tracking-tight"
                >
                  Noticias &{' '}
                  <span className="relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500">
                      Análisis
                    </span>
                    <m.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full origin-left"
                    />
                  </span>
                </m.h2>

                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light px-4"
                >
                  Información jurídica actualizada para mantener tu empresa 
                  <span className="font-semibold text-slate-800"> protegida y competitiva</span>
                </m.p>
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {blogArticles.length > 0 ? (
                  blogArticles.map((article, index) => {
                    const category = BLOG_CATEGORIES[article.category] || BLOG_CATEGORIES.civil
                    const CategoryIcon = category.icon
                    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })

                    return (
                      <m.article
                        key={article.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                        className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all cursor-pointer group"
                      >
                        <Link href={`/blog/${article.slug || article.id}`} className="block">
                          <div className="relative h-52 overflow-hidden">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              // OPTIMIZACIÓN: Lazy load
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                            
                            {article.featured && (
                              <span className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full uppercase shadow-lg">
                                Destacado
                              </span>
                            )}
                            
                            <div className="absolute bottom-4 left-4">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-none text-slate-800 text-xs font-semibold rounded-lg">
                                <CategoryIcon className="text-amber-500" /> {category.name}
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center gap-3 text-slate-400 text-sm mb-3">
                              <span className="flex items-center gap-1.5">
                                <FaCalendarAlt className="text-amber-500" /> {formatDate(article.date)}
                              </span>
                            </div>
                            
                            <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition line-clamp-2 leading-snug">
                              {article.title}
                            </h3>
                            
                            <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                              <span className="text-slate-400 text-sm">{article.author}</span>
                              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-lg group-hover:shadow-lg transition-all">
                                Leer <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      </m.article>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FaBalanceScale className="text-slate-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Próximamente</h3>
                    <p className="text-slate-500">Estamos preparando contenido legal de valor para ti</p>
                  </div>
                )}
              </div>

              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-center mt-16"
              >
                <Link href="/blog">
                  <m.button
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <m.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    <div className="absolute inset-0 rounded-2xl border border-amber-500/30"></div>
                    
                    <span className="relative z-10">Explorar Todos los Artículos</span>
                    <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 group-hover:bg-amber-400 transition-colors">
                      <FaArrowRight className="text-slate-900 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </m.button>
                </Link>
              </m.div>
            </div>
          </section>

          {/* Sección de Formulario de Contacto */}
          <section id="contacto" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-slate-950 border-t border-slate-900">
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(255, 255, 255) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                
                <m.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4 sm:space-y-6"
                >
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                      <FaCalendarAlt />
                      Agenda tu Consulta
                    </span>
                  </m.div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    ¿Necesitas{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                      Asesoría Legal?
                    </span>
                  </h2>

                  <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed">
                    Contáctanos hoy mismo y recibe atención personalizada de nuestro equipo de expertos. Estamos listos para ayudarte con tus necesidades jurídicas.
                  </p>

                  <div className="space-y-4 pt-4">
                    <m.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <FaCheckCircle className="text-amber-500" />
                      </div>
                      <span className="text-slate-200 font-medium">Respuesta en menos de 24 horas</span>
                    </m.div>

                    <m.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <FaShieldAlt className="text-amber-500" />
                      </div>
                      <span className="text-slate-200 font-medium">Confidencialidad garantizada</span>
                    </m.div>

                    <m.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <FaAward className="text-amber-500" />
                      </div>
                      <span className="text-slate-200 font-medium">Asesoría especializada</span>
                    </m.div>
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-2xl blur-md opacity-20"></div>
                    
                    <form 
                      onSubmit={handleSubmit}
                      className="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6"
                    >
                      <div className="space-y-2">
                        <label htmlFor="nombre" className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                          Nombre Completo *
                        </label>
                        <input
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 font-medium"
                          placeholder="Juan Pérez"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 font-medium"
                          placeholder="juan@ejemplo.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="telefono" className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 font-medium"
                          placeholder="+57 300 123 4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="mensaje" className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                          Mensaje *
                        </label>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          rows="4"
                          value={formData.mensaje}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border-2 border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-all duration-200 resize-none font-medium"
                          placeholder="Cuéntanos brevemente sobre tu caso..."
                        ></textarea>
                      </div>

                      <AnimatePresence>
                        {submitMessage.text && (
                          <m.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-lg border-2 ${
                              submitMessage.type === 'success'
                                ? 'bg-green-50 border-green-500 text-green-800'
                                : 'bg-red-50 border-red-500 text-red-800'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {submitMessage.type === 'success' ? (
                                <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                              ) : (
                                <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                              <p className="text-sm font-medium">{submitMessage.text}</p>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>

                      <m.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className={`w-full group relative overflow-hidden rounded-xl px-6 py-4 font-bold text-white shadow-lg transition-all duration-300 ${
                          isSubmitting 
                            ? 'bg-slate-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:shadow-xl'
                        }`}
                      >
                        {!isSubmitting && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        )}
                        
                        <span className="relative flex items-center justify-center gap-2 text-base uppercase tracking-wide">
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Enviando...
                            </>
                          ) : (
                            <>
                              Enviar Mensaje
                              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </span>
                      </m.button>

                      <p className="text-xs text-slate-500 text-center">
                        <FaShieldAlt className="inline mr-1 text-green-600" />
                        Tus datos están protegidos y serán tratados con total confidencialidad
                      </p>
                    </form>
                  </div>
                </m.div>

              </div>
            </div>
          </section>


          {/* Sección de Ubicación con Mapa */}
          <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-8 sm:mb-10 lg:mb-12"
              >
                <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
                  UBICACIÓN
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3 sm:mb-4">
                  Encuéntranos
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto px-4">
                  Visítanos en nuestra oficina en el centro de Bogotá
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-6 sm:mb-8"
              >
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-xl sm:rounded-2xl blur-xl opacity-20"></div>
                  
                  <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden h-full">
                    {/* CAMBIO REALIZADO: Mapa corregido con URL válida de Embed */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.995646399623!2d-74.0743262241516!3d4.605634642557457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a0f6c44445%3A0x6293910c0c16999a!2sCra.%207%20%2317-1%2C%20Bogot%C3%A1!5e0!3m2!1ses!2sco!4v1709234567890!5m2!1ses!2sco"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      title="Ubicación LITESCO - Edificio Colseguros"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                    ></iframe>

                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-none rounded-lg shadow-lg px-4 py-2 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 "></div>
                        <span className="text-xs font-semibold text-slate-700">Oficina Principal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-slate-100 hover:shadow-xl transition-shadow h-full">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-1 text-sm sm:text-base">Dirección</h3>
                        <p className="text-slate-600 text-xs sm:text-sm">CRA 7 #17-01</p>
                        <p className="text-slate-600 text-xs sm:text-sm">Centro de Bogotá, Colombia</p>
                        <a
                          href="https://maps.app.goo.gl/v8q3agWvipxMs7TD9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group mt-2 sm:mt-3 text-xs sm:text-sm"
                        >
                          <span>Cómo llegar</span>
                          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                        <FaClock className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-2">Horario de atención</h3>
                        <div className="space-y-1 text-sm">
                          <p className="text-slate-600">Lunes - Viernes</p>
                          <p className="font-semibold text-amber-600">8:00 AM - 6:00 PM</p>
                          <p className="text-slate-500 text-xs mt-2">Sábados con cita previa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                        <FaWhatsapp className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-2">Contáctanos</h3>
                        <a href="https://wa.me/57+573132037572" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 group">
                          <span>WhatsApp</span>
                          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-slate-600 text-sm mt-1">+57 3132037572</p>
                      </div>
                    </div>
                  </div>
                </m.div>

              </div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex justify-center mb-8"
              >
                <m.a
                  href="https://maps.app.goo.gl/v8q3agWvipxMs7TD9"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <span className="relative flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 013.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Obtener direcciones en Google Maps
                  </span>
                </m.a>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl p-6 border border-amber-200"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                      <FaLightbulb className="text-white text-xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-1">¿Cómo llegar?</h3>
                    <p className="text-slate-600 text-sm">
                      Estamos ubicados en el centro de Bogotá, cerca de la Avenida Jiménez y la Carrera 7. 
                      Puedes llegar fácilmente en TransMilenio (estación más cercana: Las Aguas) o en SITP.
                    </p>
                  </div>
                </div>
              </m.div>

            </div>
          </section>

        </main>
      </LazyMotion>
    </>
  )
}

export default HomePage
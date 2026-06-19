'use client'

import React, { useState } from 'react'
// IMPORTANTE: Helmet para SEO
// Usamos m, LazyMotion y domAnimation para reducir peso del bundle drásticamente
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaWhatsapp,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowRight,
  FaSpinner,
  FaUser,
  FaExclamationCircle,
  FaBuilding
} from 'react-icons/fa'

const heroImage = '/images/fondos/fondoContacto.webp'

// --- COMPONENTES Y CONSTANTES ---

// Componente InputField simplificado
const InputField = React.memo(({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <Icon className="w-5 h-5" />
      </div>
      <input
        {...props}
        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-300 bg-white text-slate-900 focus:outline-none font-medium placeholder-slate-400"
      />
    </div>
  </div>
));

// --- DATOS ACTUALIZADOS (AQUÍ ESTÁ EL CAMBIO) ---
const INFO_CONTACTO_DATA = [
  {
    icon: FaMapMarkerAlt,
    titulo: 'Sede Principal',
    contenido: 'Edificio Colseguros',
    detalle: 'CRA 7 #17-01, Bogotá',
    link: 'https://maps.app.goo.gl/v8q3agWvipxMs7TD9',
    actionText: 'Ver ubicación'
  },
  {
    icon: FaPhone, 
    titulo: 'Contacto Telefónico',
    contenido: 'Línea Corporativa',
    detalle: 'Clic para contactar',
    // CAMBIO: Enlace directo a WhatsApp
    link: 'https://wa.me/573132037572', 
    actionText: 'Contactar por WhatsApp'
  },
  {
    icon: FaEnvelope,
    titulo: 'Correo Electrónico',
    contenido: 'Atención al Cliente',
    detalle: 'gerencia@litesco.com.co',
    // CAMBIO: Enlace mailto asegurado
    link: 'mailto:gerencia@litesco.com.co',
    actionText: 'Enviar correo'
  },
  {
    icon: FaClock,
    titulo: 'Horario de Atención',
    contenido: 'Lun - Vie: 8am - 6pm',
    detalle: 'Sábados: 9am - 1pm',
    // Sin link
  }
];

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })

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

    try {
      const response = await fetch('https://www.litesco.com.co/send-email-simple.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ 
          type: 'success', 
          text: data.message || '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.' 
        })
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
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
      <LazyMotion features={domAnimation}>
        <main className="relative min-h-screen bg-white">
          
          {/* SECCIÓN HERO */}
          <section className="relative h-screen min-h-[600px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="Fondo de contacto"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center px-6 py-12 lg:px-8">
              <section className="max-w-4xl space-y-8 text-center">
                <m.div
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <m.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex justify-center"
                  >
                    <div className="inline-flex items-center gap-3 rounded-full border border-amber-500/30 bg-amber-500/10 px-6 py-3 backdrop-blur-sm">
                      <m.div 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-2 w-2 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" 
                      />
                      <span className="text-sm font-semibold text-amber-400 tracking-wide">
                        Estamos Aquí para Ti
                      </span>
                    </div>
                  </m.div>

                  <m.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
                  >
                    Contáctanos
                    <br />
                    <m.span 
                      className="inline-block text-amber-500"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      Hoy Mismo
                    </m.span>
                  </m.h1>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-xl leading-relaxed text-slate-300 md:text-2xl max-w-2xl mx-auto"
                  >
                    Nuestro equipo de expertos está listo para brindarte 
                    <span className="text-amber-400 font-semibold"> soluciones legales profesionales</span>
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-wrap gap-4 pt-6 justify-center"
                  >
                    <m.a
                      href="https://calendly.com/gerencialitigioestrategicocolombiano"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-8 py-4 font-bold text-white shadow-2xl shadow-amber-500/20 hover:shadow-amber-500/40 relative overflow-hidden"
                    >
                      <m.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <FaCalendarAlt className="text-xl relative z-10" />
                      <span className="relative z-10">Agenda tu Consulta</span>
                      <m.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <FaArrowRight className="text-lg relative z-10" />
                      </m.div>
                    </m.a>

                    <m.a
                      href="https://wa.me/573132037572"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="group inline-flex items-center gap-3 rounded-2xl bg-white/10 border-2 border-white/20 px-8 py-4 font-bold text-white backdrop-blur-sm hover:bg-white/15 hover:border-white/30 relative overflow-hidden"
                    >
                      <FaWhatsapp className="text-xl relative z-10" />
                      <span className="relative z-10">WhatsApp</span>
                      <FaArrowRight className="text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </m.a>
                  </m.div>
                </m.div>
              </section>
            </div>
          </section>

          {/* SECCIÓN DE FORMULARIO */}
          <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white to-slate-50">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a05_1px,transparent_1px),linear-gradient(to_bottom,#0f172a05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                
                {/* Columna Izquierda - Información */}
                <m.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-600 text-xs font-bold uppercase tracking-wider">
                      <FaCalendarAlt />
                      Agenda tu Consulta
                    </span>
                  </m.div>

                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                    ¿Necesitas{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                      Asesoría Legal?
                    </span>
                  </h2>

                  <p className="text-lg text-slate-600 leading-relaxed">
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
                      <span className="text-slate-700 font-medium">Respuesta en menos de 24 horas</span>
                    </m.div>

                    <m.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <FaCheckCircle className="text-amber-500" />
                      </div>
                      <span className="text-slate-700 font-medium">Confidencialidad garantizada</span>
                    </m.div>

                    <m.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <FaCheckCircle className="text-amber-500" />
                      </div>
                      <span className="text-slate-700 font-medium">Asesoría especializada</span>
                    </m.div>
                  </div>
                </m.div>

                {/* Columna Derecha - Formulario */}
                <m.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-2xl blur-lg opacity-20"></div>
                    
                    <form 
                      onSubmit={handleSubmit}
                      className="relative bg-white rounded-2xl shadow-2xl p-8 space-y-6 border border-slate-200"
                    >
                      <div className="space-y-2">
                        <label htmlFor="nombre" className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                          Nombre Completo *
                        </label>
                        <InputField
                          icon={FaUser}
                          type="text"
                          id="nombre"
                          name="nombre"
                          value={formData.nombre}
                          onChange={handleChange}
                          required
                          placeholder="Juan Pérez"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                          Correo Electrónico *
                        </label>
                        <InputField
                          icon={FaEnvelope}
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="juan@ejemplo.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="telefono" className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                          Teléfono *
                        </label>
                        <InputField
                          icon={FaPhone}
                          type="tel"
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          required
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
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-300 bg-white text-slate-900 focus:outline-none resize-none font-medium placeholder-slate-400"
                          placeholder="Cuéntanos brevemente sobre tu caso..."
                        />
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
                                <FaExclamationCircle className="text-red-600 text-xl flex-shrink-0" />
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
                              <m.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <FaSpinner className="text-xl" />
                              </m.div>
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
                        <FaCheckCircle className="inline mr-1 text-green-600" />
                        Tus datos están protegidos y serán tratados con total confidencialidad
                      </p>
                    </form>
                  </div>
                </m.div>

              </div>
            </div>
          </section>

          {/* INFORMACIÓN DE CONTACTO - SECCIÓN ACTUALIZADA */}
          <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-32 overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-900/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-16 text-center"
              >
                <m.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block"
                >
                  <div className="inline-flex items-center gap-2 px-5 py-2 bg-slate-900 rounded-full mb-6">
                    <m.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-amber-500 rounded-full"
                    />
                    <span className="text-amber-500 font-semibold text-sm tracking-wide uppercase">
                      Nuestros Datos
                    </span>
                  </div>
                </m.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  Información de
                  <span className="block bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                    Contacto
                  </span>
                </h2>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Múltiples canales para estar siempre conectados contigo
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {INFO_CONTACTO_DATA.map((info, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -12, scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
                    
                    <div className="relative h-full rounded-3xl bg-white p-8 shadow-lg border-2 border-slate-200 group-hover:border-amber-500/50 transition-all duration-500 overflow-hidden flex flex-col items-center text-center">
                      <m.div 
                        className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Contenido Card */}
                      <div className="relative z-10 w-full flex flex-col items-center h-full">
                        <m.div 
                          whileHover={{ scale: 1.15, rotate: 360 }}
                          transition={{ type: "spring", stiffness: 260, damping: 20 }}
                          className="rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-6 group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-500 shadow-lg group-hover:shadow-amber-500/50 mb-6"
                        >
                          <info.icon className="h-8 w-8 text-slate-700 group-hover:text-white transition-colors duration-500" />
                        </m.div>
                        
                        <div className="space-y-2 flex-1 w-full">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-amber-600 transition-colors duration-300">
                            {info.titulo}
                          </p>
                          <p className="text-xl font-bold text-slate-900 leading-tight">
                            {info.contenido}
                          </p>
                          <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                            {info.detalle}
                          </p>
                        </div>
                        
                        {info.link && (
                          <div className="mt-6">
                            <m.a
                              href={info.link}
                              target={info.link.startsWith('http') ? '_blank' : '_self'}
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors group/link px-4 py-2 rounded-lg bg-amber-50 group-hover:bg-amber-100"
                            >
                              <span>{info.actionText || 'Contactar'}</span>
                              <m.div
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <FaArrowRight className="text-xs" />
                              </m.div>
                            </m.a>
                          </div>
                        )}
                      </div>

                      <m.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      />
                    </div>
                  </m.div>
                ))}
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-16 text-center"
              >
                <div className="inline-flex flex-col md:flex-row items-center gap-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      ¿Listo para comenzar?
                    </h3>
                    <p className="text-slate-300">
                      Agenda una consulta gratuita con nuestro equipo de expertos
                    </p>
                  </div>
                  <m.a
                    href="https://calendly.com/gerencialitigioestrategicocolombiano"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 px-8 py-4 rounded-xl text-white font-bold shadow-lg shadow-amber-500/30 transition-all duration-300 whitespace-nowrap"
                  >
                    <FaCalendarAlt className="text-xl" />
                    Agendar Consulta
                    <m.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <FaArrowRight className="text-lg" />
                    </m.div>
                  </m.a>
                </div>
              </m.div>
            </div>
          </section>

          {/* MAPA */}
          <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-600 text-xs font-bold uppercase tracking-wider mb-4">
                  UBICACIÓN
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                  Encuéntranos
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Visítanos en nuestra oficina en el centro de Bogotá
                </p>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="relative h-[500px] md:h-[600px]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-2xl blur-xl opacity-20"></div>
                  
                  <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden h-full">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1988.4!2d-74.07162!3d4.60157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a872155b35%3A0x53edc15948b7fd6a!2sLITESCO!5e0!3m2!1ses!2sco!4v1703348400000!5m2!1ses!2sco&z=18"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0 w-full h-full"
                    />

                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 border border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-xs font-semibold text-slate-700">Oficina Principal</span>
                      </div>
                    </div>
                  </div>
                </div>
              </m.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-shadow h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-md">
                        <FaBuilding className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-800 mb-1">Dirección</h3>
                        <p className="text-slate-600 text-sm">CRA 7 #17-01</p>
                        <p className="text-slate-600 text-sm">Centro de Bogotá, Colombia</p>
                        <a
                          href="https://maps.app.goo.gl/v8q3agWvipxMs7TD9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group mt-3 text-sm"
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
                          <p className="text-slate-600">Lunes-Viernes</p>
                          <p className="font-semibold text-amber-600"> 8:00 AM - 6:00 PM </p>
                          <p className="text-slate-500 text-xs mt-2">Sábados 9am - 1pm</p>
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
                        <a href="https://wa.me/573132037572" target="_blank" rel="noopener noreferrer" className="text-sm text-amber-600 hover:text-amber-700 font-medium flex items-center gap-2 group">
                          <span>WhatsApp</span>
                          <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                        </a>
                        <p className="text-slate-600 text-sm mt-1">Línea de Respuesta Rápida</p>
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
                  href=" https://maps.app.goo.gl/v8q3agWvipxMs7TD9"
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

            </div>
          </section>

        </main>
      </LazyMotion>
    </>
  )
}

export default ContactoPage
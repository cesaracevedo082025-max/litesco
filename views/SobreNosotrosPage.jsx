'use client'

import React from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import { 
  FaArrowRight, 
  FaShieldAlt, 
  FaBalanceScale, 
  FaLightbulb, 
  FaHeart, 
  FaUsers, 
  FaRocket, 
  FaCalendarAlt 
} from 'react-icons/fa'
import { 
  Scale, 
  Shield, 
  Users, 
  Lightbulb, 
  Rocket, 
  Heart, 
  Sparkles 
} from 'lucide-react'

const heroVideo = '/videos/fondoNosotros.mp4'
const imagenMision = '/images/nosotros/Mision.webp'
const imagenVision = '/images/nosotros/Vision.webp'

 
const SobreNosotrosPage = () => {
  const valores = [
    { 
      icon: Scale, 
      label: 'Ética', 
      description: 'Integridad en cada decisión', 
      color: 'from-amber-500 to-amber-600', 
      iconColor: 'text-amber-600', 
      bgColor: 'bg-amber-50', 
      delay: 0 
    },
    { 
      icon: Shield, 
      label: 'Transparencia', 
      description: 'Claridad y honestidad', 
      color: 'from-amber-500 to-amber-600', 
      iconColor: 'text-amber-600', 
      bgColor: 'bg-amber-50', 
      delay: 0.1 
    },
    { 
      icon: Users, 
      label: 'Prevención', 
      description: 'Anticipación y cuidado', 
      color: 'from-amber-500 to-amber-600', 
      iconColor: 'text-amber-600', 
      bgColor: 'bg-amber-50', 
      delay: 0.2 
    },
    { 
      icon: Lightbulb, 
      label: 'Creatividad', 
      description: 'Innovación constante', 
      color: 'from-amber-500 to-amber-600', 
      iconColor: 'text-amber-600', 
      bgColor: 'bg-amber-50', 
      delay: 0.3 
    },
    { 
      icon: Rocket, 
      label: 'Innovación', 
      description: 'Soluciones de vanguardia', 
      color: 'from-amber-500 to-amber-600', 
      iconColor: 'text-amber-600', 
      bgColor: 'bg-amber-50', 
      delay: 0.4 
    },
    { 
      icon: Heart, 
      label: 'Fidelización', 
      description: 'Compromiso duradero', 
      color: 'from-amber-500 to-amber-600', 
      iconColor: 'text-amber-600', 
      bgColor: 'bg-amber-50', 
      delay: 0.5 
    },
  ]

  return (
    <>
      <LazyMotion features={domAnimation}>
        <main className="relative min-h-screen bg-white overflow-x-hidden">
          
          {/* SECCIÓN HERO */}
          {/* SECCIÓN HERO */}
<section className="relative h-screen min-h-[500px] sm:min-h-[600px] overflow-hidden">
  <div className="absolute inset-0 z-0">
    <video
      src={heroVideo}
      autoPlay
      loop
      muted
      playsInline
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
  </div>
  
  {/* El resto del contenido de la sección Hero se mantiene igual... */}

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 lg:px-8">
              <section className="max-w-2xl space-y-3 sm:space-y-4 text-center">
                <m.div
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-3 sm:space-y-4"
                >
                  <m.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center"
                  >
                    <a 
                      href="#quienes-somos"
                      className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm hover:bg-amber-500/20 transition-all cursor-pointer group"
                    >
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-amber-500" />
                      <span className="text-xs sm:text-sm font-medium text-amber-400 group-hover:text-amber-300">
                        Conoce Nuestro Equipo
                      </span>
                      <FaArrowRight className="text-amber-400 text-xs opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all" />
                    </a>
                  </m.div>

                  <m.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-white"
                  >
                    Sobre
                    <br />
                    <span className="text-amber-500">Nosotros</span>
                  </m.h1>

                  <m.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-xl md:text-2xl leading-relaxed text-slate-300 px-4 sm:px-0"
                  >
                    Litigio Estratégico Colombiano 
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-wrap gap-3 sm:gap-4 pt-3 sm:pt-4 justify-center"
                  >
                    <m.a
                      href="https://calendly.com/gerencialitigioestrategicocolombiano"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-5 sm:px-8 py-3 sm:py-4 font-bold text-white shadow-2xl hover:shadow-amber-500/30 relative overflow-hidden text-sm sm:text-base"
                    >
                      <m.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <FaCalendarAlt className="text-lg sm:text-xl relative z-10" />
                      <span className="relative z-10">Agenda tu Consulta</span>
                      <FaArrowRight className="text-base sm:text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </m.a>
                  </m.div>
                </m.div>
              </section>
            </div>
          </section>

          {/* QUIÉNES SOMOS */}
          <section id="quienes-somos" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-white scroll-mt-20">
            <div className="absolute inset-0">
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                viewport={{ once: true }}
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500 to-transparent"
              />
              <m.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-10 sm:top-20 right-5 sm:right-20 w-40 sm:w-72 h-40 sm:h-72 bg-amber-500/5 rounded-full blur-3xl"
              />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                
                <m.div
                  initial={{ opacity: 0, x: -100, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group order-2 lg:order-1"
                >
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                      <img 
                        src="/images/nosotros/innovacion.webp"
                        alt="innovacion"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <m.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8"
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/50">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg sm:rounded-xl flex-shrink-0">
                            <FaUsers className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-lg font-bold text-slate-900">Equipo Especializado</h3>
                            <p className="text-xs sm:text-sm text-slate-600">Profesionales apasionados</p>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  </div>

                  <m.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-32 sm:w-48 h-32 sm:h-48 bg-amber-500/10 rounded-full blur-2xl -z-10"
                  />
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5 sm:space-y-8 order-1 lg:order-2"
                >
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 font-semibold text-xs sm:text-sm">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse" />
                      Nuestra Esencia
                    </span>
                  </m.div>

                  <m.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
                  >
                    Innovación Legal{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                      Hecha a tu Medida
                    </span>
                  </m.h2>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed"
                  >
                    Somos abogados <span className="font-semibold text-slate-900">especializados, creativos y apasionados</span> por el derecho, las finanzas, la tecnología y otros campos interdisciplinarios. Por eso, <span className="font-bold text-amber-600">LITESCO</span> nace para ofrecer soluciones jurídicas modernas, confiables y hechas a la medida de cada colombiano.
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="grid gap-3 sm:gap-4"
                  >
                    {[
                      { icon: FaBalanceScale, text: "Derecho Digital y Financiero" },
                      { icon: FaShieldAlt, text: "Protección de Datos Personales" },
                      { icon: FaLightbulb, text: "Soluciones Tecnológicas Innovadoras" }
                    ].map((feature, index) => (
                      <m.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-500/50 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
                          <feature.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <span className="text-sm sm:text-base text-slate-700 font-medium">{feature.text}</span>
                      </m.div>
                    ))}
                  </m.div>
                </m.div>

              </div>
            </div>
          </section>

          {/* NUESTRO COMPROMISO */}
          <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 to-white">
            <div className="absolute inset-0">
              <m.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.05 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-amber-500 to-transparent"
              />
              <m.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-10 sm:bottom-20 left-5 sm:left-20 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500/10 rounded-full blur-3xl"
              />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                
                <m.div
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-5 sm:space-y-8 order-1"
                >
                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-600 font-semibold text-xs sm:text-sm">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse" />
                      Nuestro Compromiso
                    </span>
                  </m.div>

                  <m.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight"
                  >
                    Confianza y{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                      Excelencia Profesional
                    </span>
                  </m.h2>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed"
                  >
                    Operamos bajo un modelo basado en la <span className="font-semibold text-slate-900">confianza en nuestro equipo</span> que es absolutamente profesional, generando <span className="font-semibold text-slate-900">impacto social y de prevención</span> sobre litigios que a la postre afectan a colombianos en general.
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-2 gap-3 sm:gap-6"
                  >
                    {[
                      { icon: FaRocket, title: "Mejoramiento", subtitle: "Continuo" },
                      { icon: FaUsers, title: "Impacto", subtitle: "Social" },
                      { icon: FaHeart, title: "Compromiso", subtitle: "Total" },
                      { icon: FaShieldAlt, title: "Prevención", subtitle: "Efectiva" }
                    ].map((stat, index) => (
                      <m.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:border-amber-300 transition-all duration-300"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 flex items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                          <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-0.5 sm:mb-1">{stat.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600">{stat.subtitle}</p>
                      </m.div>
                    ))}
                  </m.div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 100, scale: 0.8 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group order-2"
                >
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                    <div className="aspect-[4/3] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                      <img 
                        src="/images/nosotros/confianza.webp"
                        alt="Compromiso profesional"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    <m.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8"
                    >
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-200/50">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg sm:rounded-xl flex-shrink-0">
                            <FaShieldAlt className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-sm sm:text-lg font-bold text-slate-900">Confianza Total</h3>
                            <p className="text-xs sm:text-sm text-slate-600">Profesionalismo garantizado</p>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  </div>

                  <m.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-32 sm:w-48 h-32 sm:h-48 bg-amber-500/15 rounded-full blur-2xl -z-10"
                  />
                </m.div>

              </div>
            </div>
          </section>

          {/* MISIÓN Y VISIÓN - COLOR ACTUALIZADO A bg-slate-950 */}
          <section className="relative py-16 sm:py-24 lg:py-32 bg-slate-950 overflow-hidden border-y border-slate-900">
            <div className="absolute inset-0">
              <m.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.05, 0.08, 0.05],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500 rounded-full blur-[100px]"
              />
              <m.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.04, 0.07, 0.04],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-amber-500 rounded-full blur-[100px]"
              />
            </div>

            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/20 to-transparent hidden lg:block" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12 sm:mb-16 lg:mb-24"
              >
                <m.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-block mb-4 sm:mb-6"
                >
                  <span className="px-4 sm:px-6 py-2 sm:py-3 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-bold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-sm">
                    Nuestro Rumbo
                  </span>
                </m.div>
                
                <m.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                >
                  De Dónde Venimos,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 block sm:inline mt-1 sm:mt-0">
                    Hacia Dónde Vamos
                  </span>
                </m.h2>
              </m.div>

              <div className="space-y-16 sm:space-y-24 lg:space-y-32">

                {/* MISIÓN */}
                <m.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                    
                    <m.div
                      initial={{ opacity: 0, x: -100, rotateY: -15 }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="relative lg:pr-12"
                    >
                      <m.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="absolute -right-0 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-2xl shadow-amber-500/50 hidden lg:flex items-center justify-center z-10 border-4 border-slate-900"
                      >
                        <FaRocket className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </m.div>

                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                          <m.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            className="aspect-[4/3]"
                          >
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${imagenMision})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-amber-800/50 to-transparent" />
                          </m.div>

                          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="absolute top-4 sm:top-6 left-4 sm:left-6"
                          >
                            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg">
                              <span className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                                HOY
                              </span>
                            </div>
                          </m.div>
                        </div>

                        <m.div
                          animate={{
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl"
                        />
                      </div>
                    </m.div>

                    <m.div
                      initial={{ opacity: 0, x: 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-4 sm:space-y-6 lg:pl-12"
                    >
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
                          01 • Nuestra Misión
                        </span>
                      </m.div>

                      <m.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
                      >
                        MISIÓN
                      </m.h3>

                      <m.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="h-1 w-24 sm:w-32 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full origin-left"
                      />

                      <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed"
                      >
                      <span className="text-amber-400 font-semibold">LITESCO</span> tiene como misión impactar en el campo legal, con la prestación de servicios jurídicos mediante sus líneas de negocio. Queremos <span className="text-amber-400 font-semibold">asesorar, acompañar y respaldar</span> a las empresas PYMES, personas jurídicas y personas naturales. Nos distinguimos en que <span className="text-amber-400 font-semibold">entendemos las necesidades legales</span> de los emprendedores de nuestro país y de cada uno de nuestros clientes.
                      </m.p>

                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4"
                      >
                        {['Innovación', 'Calidad', 'Compromiso', 'Transparencia'].map((tag, index) => (
                          <m.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs sm:text-sm text-white font-medium hover:bg-amber-500/20 hover:border-amber-500/40 transition-all duration-300"
                          >
                            {tag}
                          </m.span>
                        ))}
                      </m.div>
                    </m.div>

                  </div>
                </m.div>

                {/* VISIÓN */}
                <m.div
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                    
                    <m.div
                      initial={{ opacity: 0, x: -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="space-y-4 sm:space-y-6 lg:pr-12 order-2 lg:order-1"
                    >
                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-400 font-semibold text-xs sm:text-sm mb-4 sm:mb-6">
                          02 • Nuestra Visión
                        </span>
                      </m.div>

                      <m.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight"
                      >
                        VISIÓN
                      </m.h3>

                      <m.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="h-1 w-24 sm:w-32 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full origin-left"
                      />

                      <m.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed"
                      >
                        Con base en nuestros valores corporativos, para el <span className="text-amber-400 font-semibold">2028</span> queremos liderar en el campo legal con nuestras líneas de negocio. Ser una sociedad <span className="text-amber-400 font-semibold">competitiva a la luz de las tecnologías emergentes</span> y ofreciendo soluciones integrales combinando el expertise jurídico, tecnología, precios justos y atención personalizada.
                      </m.p>

                      <m.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4"
                      >
                        {[
                          { number: '2028', label: 'Meta' },
                          { number: '100%', label: 'Compromiso' }
                        ].map((stat, index) => (
                          <m.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-500/50 transition-all duration-300"
                          >
                            <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 mb-1 sm:mb-2">
                              {stat.number}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
                          </m.div>
                        ))}
                      </m.div>
                    </m.div>

                    <m.div
                      initial={{ opacity: 0, x: 100, rotateY: 15 }}
                      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="relative lg:pl-12 order-1 lg:order-2"
                    >
                      <m.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        className="absolute -left-0 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 shadow-2xl shadow-amber-500/50 hidden lg:flex items-center justify-center z-10 border-4 border-slate-900"
                      >
                        <FaLightbulb className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                      </m.div>

                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                          <m.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            className="aspect-[4/3]"
                          >
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${imagenVision})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/70 via-amber-800/50 to-transparent" />
                          </m.div>

                          <div className="absolute inset-0 bg-gradient-to-t from-amber-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                          <m.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="absolute top-4 sm:top-6 right-4 sm:right-6"
                          >
                            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg">
                              <span className="text-lg sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                                2028
                              </span>
                            </div>
                          </m.div>
                        </div>

                        <m.div
                          animate={{
                            rotate: [360, 0],
                          }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-amber-500/20 to-transparent rounded-full blur-2xl"
                        />
                      </div>
                    </m.div>

                  </div>
                </m.div>

              </div>
            </div>
          </section>

          {/* VALORES */}
          <section className="relative py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <m.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full blur-3xl"
              />
              <m.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.02, 0.05, 0.02],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] lg:w-[600px] h-[300px] sm:h-[400px] lg:h-[600px] bg-gradient-to-tr from-slate-300 via-slate-200 to-slate-100 rounded-full blur-3xl"
              />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mb-12 sm:mb-16 lg:mb-24 text-center"
              >
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                  className="inline-block mb-6 sm:mb-10"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    
                    <div className="relative inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-2 sm:py-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-full shadow-2xl border border-amber-500/20">
                      <m.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                      </m.div>
                      <span className="text-amber-400 font-bold text-xs sm:text-sm tracking-wider uppercase">
                        Nuestros Valores
                      </span>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full animate-pulse" />
                    </div>
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                    <span className="text-slate-900">Valores </span>
                    <span className="relative inline-block">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500">
                        Corporativos
                      </span>
                      <m.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent origin-center"
                      />
                    </span>
                  </h2>
                </m.div>
                
                <m.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-base sm:text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
                >
                  Los <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">principios fundamentales</span> que{' '}
                  definen nuestra identidad y guían cada decisión estratégica
                </m.p>
              </m.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
                {valores.map((valor, index) => {
                  const IconComponent = valor.icon;
                  
                  return (
                    <m.div
                      key={valor.label}
                      initial={{ opacity: 0, y: 100, rotateX: -15 }}
                      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ 
                        delay: valor.delay,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      className="group relative"
                    >
                      <m.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className={`absolute -inset-1 bg-gradient-to-r ${valor.color} rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                      />

                      <m.div
                        whileHover={{ y: -10, scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative h-full"
                      >
                        <div className="relative bg-white backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-slate-200/80 group-hover:border-amber-300/60 group-hover:shadow-2xl transition-all duration-500 h-full overflow-hidden">
                          <m.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "200%" }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent skew-x-12"
                          />

                          <div className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity duration-500">
                            <div className="absolute inset-0" style={{
                              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
                              backgroundSize: '24px 24px',
                              color: '#f59e0b'
                            }} />
                          </div>

                          <div className="relative flex flex-col items-center text-center space-y-4 sm:space-y-5 lg:space-y-7">
                            <div className="relative">
                              <m.div
                                animate={{
                                  scale: [1, 1.15, 1],
                                  opacity: [0.15, 0, 0.15],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${valor.color} blur-lg`}
                              />
                              
                              <m.div
                                animate={{
                                  scale: [1, 1.25, 1],
                                  opacity: [0.1, 0, 0.1],
                                }}
                                transition={{
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                  delay: 0.8,
                                }}
                                className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${valor.color} blur-xl`}
                              />

                              <m.div
                                whileHover={{ 
                                  y: -4,
                                  transition: { type: "spring", stiffness: 400, damping: 10 }
                                }}
                                className="relative"
                              >
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white to-slate-50 shadow-2xl border border-slate-200/50 group-hover:border-amber-400/50 transition-all duration-500 overflow-hidden">
                                  <div className={`absolute inset-0 bg-gradient-to-br ${valor.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                  
                                  <div className="absolute inset-0 opacity-[0.02]">
                                    <div className="w-full h-full" style={{
                                      backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
                                      backgroundSize: '20px 20px'
                                    }} />
                                  </div>

                                  <div className="relative w-full h-full flex items-center justify-center">
                                    <m.div
                                      whileHover={{ 
                                        scale: 1.15,
                                        transition: { type: "spring", stiffness: 400, damping: 15 }
                                      }}
                                    >
                                      <div className="relative">
                                        <div className={`absolute inset-0 bg-gradient-to-r ${valor.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                                        
                                        <IconComponent 
                                          className={`relative w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 ${valor.iconColor} group-hover:scale-110 transition-all duration-500`}
                                          strokeWidth={1.8}
                                          style={{
                                            filter: 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.15))'
                                          }}
                                        />
                                      </div>
                                    </m.div>
                                  </div>

                                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500 rounded-t-2xl sm:rounded-t-3xl" />
                                </div>
                              </m.div>

                              {[...Array(3)].map((_, i) => (
                                <m.div
                                  key={i}
                                  className={`absolute w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-gradient-to-r ${valor.color}`}
                                  animate={{
                                    scale: [0, 1, 0],
                                    opacity: [0, 0.6, 0],
                                    x: [0, Math.cos(i * 120 * Math.PI / 180) * 50],
                                    y: [0, Math.sin(i * 120 * Math.PI / 180) * 50],
                                  }}
                                  transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                    ease: "easeOut"
                                  }}
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                  }}
                                />
                              ))}
                            </div>

                            <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                              <m.h3
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-600 group-hover:to-amber-500 transition-all duration-500"
                              >
                                {valor.label}
                              </m.h3>
                              
                              <m.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: valor.delay + 0.3, duration: 0.6 }}
                                className={`h-0.5 w-16 sm:w-20 mx-auto rounded-full bg-gradient-to-r ${valor.color}`}
                              />

                              <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed pt-1">
                                {valor.description}
                              </p>
                            </div>

                            <m.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: valor.delay + 0.5, type: "spring" }}
                              className="absolute top-4 right-4 sm:top-6 sm:right-6"
                            >
                              <div className="relative">
                                <div className={`absolute inset-0 bg-gradient-to-r ${valor.color} blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full`} />
                                
                                <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center shadow-sm border border-slate-200/50 group-hover:border-amber-300/50 transition-all duration-500">
                                  <span className="text-slate-400 group-hover:text-amber-600 font-bold text-[10px] sm:text-xs tracking-wider transition-colors duration-500">
                                    {String(index + 1).padStart(2, '0')}
                                  </span>
                                </div>
                              </div>
                            </m.div>
                          </div>

                          <div className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className={`absolute inset-0 bg-gradient-to-tl ${valor.color} opacity-5 rounded-tl-2xl sm:rounded-tl-3xl`} />
                            <div className="absolute bottom-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400/20" />
                            <div className="absolute bottom-2 right-5 sm:right-6 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-400/15" />
                          </div>
                        </div>
                      </m.div>
                    </m.div>
                  );
                })}
              </div>

              <m.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 1.5 }}
                className="mt-16 sm:mt-20 lg:mt-24 relative"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                <m.div
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 left-0 w-1/4 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"
                />
              </m.div>
            </div>
          </section>

          {/* CTA FINAL */}
          <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center mb-8 sm:mb-12"
              >
                <m.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 bg-slate-800 rounded-full mb-4 sm:mb-6"
                >
                  <span className="text-amber-500 font-semibold text-xs sm:text-sm tracking-wide uppercase">
                    Contáctanos
                  </span>
                </m.div>

                <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                  ¿Quieres conocer más?
                </h2>
                
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
                  Descubre cómo podemos ayudarte con nuestras soluciones legales integrales
                </p>

                <m.a
                  href="https://calendly.com/gerencialitigioestrategicocolombiano"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-6 sm:px-8 py-3 sm:py-4 font-bold text-white shadow-2xl hover:shadow-amber-500/30 relative overflow-hidden text-sm sm:text-base"
                >
                  <m.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <FaCalendarAlt className="text-lg sm:text-xl relative z-10" />
                  <span className="relative z-10">Agenda tu Consulta</span>
                  <FaArrowRight className="text-base sm:text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </m.a>
              </m.div>
            </div>
          </section>

        </main>
      </LazyMotion>
    </>
  )
}

export default SobreNosotrosPage
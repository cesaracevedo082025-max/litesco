'use client'

import React, { useState, useRef } from 'react'
// IMPORTANTE: Helmet para SEO
// OPTIMIZACIÓN: Imports ligeros para mejorar rendimiento
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { 
  FaChevronDown, 
  FaQuestionCircle,
  FaBriefcase,
  FaCoins,
  FaGavel,
  FaCheckCircle,
  FaArrowRight,
  FaCalendarAlt
} from 'react-icons/fa'

const heroImage = '/images/fondos/fondoPreguntas.webp'

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const [activeSection, setActiveSection] = useState('corporativo')
  const questionRefs = useRef({})

  const faqs = {
    corporativo: {
      titulo: 'LITESCO CORPORATIVO',
      subtitulo: 'Asesoría Legal In-House',
      icon: FaBriefcase,
      preguntas: [
        {
          pregunta: '¿Cuál es la diferencia entre un abogado in-house y consultar abogados por proyecto?',
          respuesta: 'El abogado in-house tiene continuidad, conoce tu negocio y trabaja de forma preventiva. Los abogados por proyecto suelen intervenir cuando el problema ya existe, siendo reactivos en lugar de preventivos. Con nuestro modelo in-house, garantizamos un acompañamiento cercano cada 15 días, adaptado a la realidad de tu negocio.',
          tag: 'Modelo In-House'
        },
        {
          pregunta: '¿Qué pasa si no quiero continuar después del primer semestre?',
          respuesta: 'Puedes terminar sin penalización. Si decides continuar, se pueden ofrecer beneficios de fidelización según el plan acordado, como descuentos en servicios adicionales. Nuestro objetivo es que la relación sea mutuamente beneficiosa.',
          tag: 'Flexibilidad'
        },
        {
          pregunta: '¿Los honorarios incluyen gastos como certificados o trámites?',
          respuesta: 'No. Los honorarios cubren el servicio legal profesional. Gastos de terceros (certificados, derechos de copia, registros en cámaras de comercio) se presupuestan y autorizan por separado para total transparencia. Recibirás un desglose claro antes de cualquier gasto adicional.',
          tag: 'Transparencia'
        },
        {
          pregunta: '¿LITESCO redacta y revisa contratos de carácter comercial?',
          respuesta: 'Sí, mediante la figura de Abogado In House se proyectan, revisan y negocian contratos relacionados con el objeto de la empresa.',
          tag: 'Contratos Comerciales'
        },
        {
          pregunta: '¿Cuánto vale una asesoría legal para empresas ubicadas a nivel nacional?',
          respuesta: 'Depende de tu necesidad, si requieres acompañamiento permanente te ofrecemos los servicios de Abogado In House, adicionalmente, contamos con servicios independientes que se componen de asesorías puntuales las cuales oscilan entre el 20% y 100% de 1 SMLMV, lo anterior, se determina con base a la asesoría correspondiente.',
          tag: 'Inversión'
        },
        {
          pregunta: 'Necesito crear empresa y dejar todo en orden legalmente desde el principio. ¿Cómo puedo hacer?',
          respuesta: 'LITESCO te ofrece los servicios integrales para la creación y formalización de sociedades.',
          tag: 'Formalización'
        }
      ]
    },
    recuperacion: {
      titulo: 'LITESCO RECUPERACIÓN',
      subtitulo: 'Modelo BPO de Cobranza',
      icon: FaCoins,
      preguntas: [
        {
          pregunta: '¿Cómo es que solo pagamos si recuperan?',
          respuesta: 'Se usa un modelo success fee: honorarios proporcionales a lo recuperado, más un retainer operativo para sostener la gestión constante. Esto alinea nuestros intereses con los tuyos - solo ganamos si tú ganas. Nuestro modelo garantiza que trabajemos con el máximo compromiso en cada caso.',
          tag: 'Success Fee'
        },
        {
          pregunta: '¿Qué tan rápido empieza la gestión?',
          respuesta: 'Tras firmar contrato y entregar la base de datos, iniciamos contacto con deudores en un plazo aproximado de 3 días hábiles, garantizando respuesta inmediata. Implementamos un tablero de control para que visualices en tiempo real el estado de cada caso.',
          tag: 'Respuesta Rápida'
        },
        {
          pregunta: '¿Afecta la reputación de mi empresa?',
          respuesta: 'No, porque trabajamos con protocolo ético, priorizando acuerdos y comunicación respetuosa antes de la vía judicial. Protegemos tu imagen corporativa en todo momento. Ofrecemos capacitación a deudores para que comprendan sus obligaciones antes de judicializar, manteniendo relaciones comerciales sanas.',
          tag: 'Protocolo Ético'
        },
        {
          pregunta: 'Mis clientes no me han pagado la facturación desde hace 10 meses. ¿Qué puedo hacer?',
          respuesta: 'Desde LITESCO Recuperación te brindamos el servicio BPO para que puedas recuperar la cartera y así vuelvas a tener el control de tu solvencia.',
          tag: 'Recuperación de Cartera'
        },
        {
          pregunta: '¿Cuándo conviene pasar de "recordatorios" a cobro jurídico?',
          respuesta: 'Cuando ya hubo intentos de acuerdos de pago y no se cumplieron, este tema se evalúa por etapa y con diagnóstico del caso en concreto.',
          tag: 'Escalamiento'
        },
        {
          pregunta: '¿Los honorarios de cobranza están regulados o lo establece cada empresa?',
          respuesta: 'No están regulados expresamente en la ley, por ende, cada sociedad establece dichas tarifas. LITESCO Recuperación cuenta con tarifas justas y competitivas en el mercado.',
          tag: 'Honorarios'
        },
        {
          pregunta: '¿LITESCO también hacen acuerdos de pago antes de demandar?',
          respuesta: 'Sí, el ideal es abarcar de la manera más eficiente cada una de las etapas jurídicas para recuperar dichos saldos.',
          tag: 'Acuerdos de Pago'
        }
      ]
    },
    litis: {
      titulo: 'LITESCO LITIS',
      subtitulo: 'Litigio Estratégico',
      icon: FaGavel,
      preguntas: [
        {
          pregunta: '¿Cuánto tiempo tarda un litigio en resolverse?',
          respuesta: 'Depende de la complejidad del caso. Una primera instancia puede tardar entre 8 y 18 meses; una segunda instancia, entre 12 y 24 meses. Te asesoramos sobre los plazos esperados en cada fase y proporcionamos reportes mensuales del estado del proceso para mantener total transparencia.',
          tag: 'Plazos'
        },
        {
          pregunta: '¿Qué pasa si pierdo el caso?',
          respuesta: 'Desde el inicio explicamos la viabilidad y riesgos mediante nuestra matriz de riesgos legales. Si el riesgo es alto, lo decimos claramente. Si aún así decides litigar, te acompañamos de principio a fin con total transparencia, representación especializada y seguimiento constante.',
          tag: 'Matriz de Riesgos'
        },
        {
          pregunta: '¿Puedo iniciar mediación antes de demandar?',
          respuesta: 'Sí, y es nuestra recomendación. Intentamos mecanismos prejudiciales (conciliación, mediación, negociación directa) antes del proceso formal, ahorrando tiempo y costos. Nuestra estrategia siempre es resolver antes de acudir ante un juez de la República de Colombia.',
          tag: 'Prejudicial'
        },
        {
          pregunta: '¿LITESCO en qué se diferencia de otras sociedades que se encargan de prestar servicios jurídicos?',
          respuesta: 'Mediante nuestra disciplina, compromiso y ética implementamos las mejores herramientas jurídicas para resolver de la manera más eficiente los conflictos de nuestros clientes, asesoramos para la proyección y crecimiento de su empresa, entendiendo sus necesidades de primera mano.',
          tag: 'Diferenciación'
        }
      ]
    }
  }

  const toggleFAQ = (section, index) => {
    const key = `${section}-${index}`
    const newOpenIndex = openIndex === key ? null : key
    setOpenIndex(newOpenIndex)
    
    if (newOpenIndex && questionRefs.current[key]) {
      setTimeout(() => {
        questionRefs.current[key].scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }, 150)
    }
  }

  const currentSection = faqs[activeSection]

  return (
    <>
      <LazyMotion features={domAnimation}>
        <main className="relative min-h-screen bg-white">
          
          {/* SECCIÓN HERO */}
          <section className="relative h-[60vh] sm:h-[70vh] md:min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={heroImage}
                alt="Fondo Preguntas Frecuentes"
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(0.3)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-slate-950/80"></div>
            </div>

            <div className="absolute inset-0 hidden md:block">
              <m.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"
              />
              <m.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center px-4 sm:px-6 py-8 lg:px-8">
              <section className="max-w-4xl space-y-4 sm:space-y-6 md:space-y-8 text-center">
                <m.div
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 sm:space-y-6"
                >
                  <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="flex justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm">
                      <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-amber-500" />
                      <span className="text-xs sm:text-sm font-medium text-amber-400">Preguntas Frecuentes</span>
                    </div>
                  </m.div>

                  <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
                    Resolvemos tus<br />
                    <span className="text-amber-500">Dudas</span>
                  </m.h1>

                  <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-300 px-4">
                    Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
                  </m.p>

                  <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex items-center justify-center gap-4 pt-2 sm:pt-4">
                    <FaQuestionCircle className="text-amber-500 text-2xl sm:text-3xl animate-bounce" />
                  </m.div>
                </m.div>
              </section>
            </div>
          </section>

          {/* SECCIÓN DE TABS Y PREGUNTAS */}
          <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-amber-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-0 w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-slate-900/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              
              {/* HEADER TABS */}
              <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-8 sm:mb-12 md:mb-16">
                <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border-2 border-amber-500/30 bg-amber-500/5 px-3 py-1.5 sm:px-5 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 animate-pulse rounded-full bg-amber-500" />
                  <span className="text-xs sm:text-sm font-bold text-amber-600 uppercase tracking-wider">Nuestras Líneas de Servicio</span>
                </m.div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-2 sm:mb-4 tracking-tight">
                  Elige tu área de <span className="text-amber-600">interés</span>
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
                  Selecciona la línea de servicio que mejor se adapte a tus necesidades
                </p>
              </m.div>

              <m.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="flex overflow-x-auto pb-4 sm:pb-0 sm:grid sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-14 md:mb-20 scrollbar-hide snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {Object.keys(faqs).map((sectionKey, idx) => {
                  const section = faqs[sectionKey]
                  const Icon = section.icon
                  const isActive = activeSection === sectionKey

                  return (
                    <m.button
                      key={sectionKey}
                      onClick={() => { setActiveSection(sectionKey); setOpenIndex(null) }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative flex-shrink-0 w-[280px] sm:w-auto snap-center overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 font-bold shadow-xl transition-all duration-500 ${
                        isActive
                          ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-2xl shadow-amber-500/40 scale-[1.02] sm:scale-105'
                          : 'bg-white text-slate-700 hover:bg-slate-50 hover:shadow-2xl border-2 border-slate-200 hover:border-amber-200'
                      }`}
                    >
                      <m.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.7 }} />
                      <div className={`absolute inset-0 opacity-10 ${isActive ? 'opacity-20' : ''}`}><div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-current rounded-full blur-3xl" /></div>
                      <div className="relative z-10 flex flex-col items-center text-center gap-2 sm:gap-4">
                        <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-500 ${isActive ? 'bg-white/20 backdrop-blur-sm' : 'bg-gradient-to-br from-amber-50 to-amber-100 group-hover:from-amber-100 group-hover:to-amber-200'}`}>
                          <Icon className={`text-2xl sm:text-3xl md:text-4xl transition-all duration-500 ${isActive ? 'text-white scale-110' : 'text-amber-600 group-hover:scale-110'}`} />
                        </div>
                        <div>
                          <div className={`text-[10px] sm:text-xs font-bold mb-0.5 sm:mb-1 uppercase tracking-wider ${isActive ? 'text-amber-100' : 'text-amber-600'}`}>{section.subtitulo}</div>
                          <div className="text-sm sm:text-base md:text-xl font-black">{section.titulo}</div>
                        </div>
                        {isActive && <m.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-0.5 sm:h-1 bg-white rounded-full" />}
                      </div>
                    </m.button>
                  )
                })}
              </m.div>

              {/* === NUEVO DISEÑO PROFESIONAL DE PREGUNTAS AQUÍ === */}
              <AnimatePresence mode="wait">
                <m.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 gap-4 sm:gap-5"
                >
                  {currentSection.preguntas.map((faq, index) => {
                    const key = `${activeSection}-${index}`
                    const isOpen = openIndex === key

                    return (
                      <m.div
                        layout
                        key={key}
                        ref={el => questionRefs.current[key] = el}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        className="scroll-mt-4"
                      >
                        <button
                          onClick={() => toggleFAQ(activeSection, index)}
                          className={`relative w-full text-left p-6 sm:p-8 rounded-2xl border transition-all duration-500 group ${
                            isOpen 
                              ? 'bg-white border-amber-300 shadow-[0_8px_30px_rgb(0,0,0,0.06)] z-10' 
                              : 'bg-white border-slate-200 hover:border-amber-200 hover:shadow-[0_8px_20px_rgb(0,0,0,0.03)] z-0'
                          }`}
                        >
                          {/* Barra vertical izquierda corporativa */}
                          <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-500 rounded-l-2xl ${
                            isOpen ? 'bg-amber-500' : 'bg-transparent group-hover:bg-amber-300'
                          }`} />

                          <div className="flex items-start gap-5 sm:gap-6 ml-1 sm:ml-2 relative z-10">
                            
                            {/* Número Minimalista */}
                            <div className="hidden xs:flex flex-col items-center mt-1">
                              <span className={`text-sm sm:text-base font-bold font-mono transition-colors duration-500 ${
                                isOpen ? 'text-amber-600' : 'text-slate-300 group-hover:text-amber-400'
                              }`}>
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              {isOpen && (
                                <m.div 
                                  initial={{ height: 0 }}
                                  animate={{ height: '100%' }}
                                  transition={{ duration: 0.5 }}
                                  className="w-px min-h-[40px] mt-3 bg-slate-100" 
                                />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-2">
                                  {/* Tag estilo corporativo */}
                                  <span className={`w-fit inline-flex px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-500 ${
                                    isOpen
                                      ? 'bg-amber-50 text-amber-700'
                                      : 'bg-slate-50 text-slate-500 group-hover:bg-amber-50/50 group-hover:text-amber-600'
                                  }`}>
                                    {faq.tag}
                                  </span>
                                  
                                  <m.h3 
                                    layout="position"
                                    className={`text-base sm:text-lg md:text-xl font-bold transition-colors duration-500 leading-snug pr-2 ${
                                      isOpen ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
                                    }`}
                                  >
                                    {faq.pregunta}
                                  </m.h3>
                                </div>
                                
                                {/* Icono Interactivo Sutil */}
                                <m.div
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  className={`flex-shrink-0 mt-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    isOpen 
                                      ? 'bg-amber-100 text-amber-600' 
                                      : 'bg-slate-50 text-slate-400 group-hover:bg-amber-100 group-hover:text-amber-600'
                                  }`}
                                >
                                  <FaChevronDown className="text-xs sm:text-sm" />
                                </m.div>
                              </div>

                              <AnimatePresence>
                                {isOpen && (
                                  <m.div
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-4 mt-4">
                                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                        {faq.respuesta}
                                      </p>
                                      
                                      {/* Insignia de Confianza estilo sello legal */}
                                      <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                        <FaCheckCircle className="text-amber-500 text-sm" />
                                        <span className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest">
                                          Respuesta avalada por equipo legal LITESCO
                                        </span>
                                      </div>
                                    </div>
                                  </m.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </button>
                      </m.div>
                    )
                  })}
                </m.div>
              </AnimatePresence>
              {/* === FIN DISEÑO PROFESIONAL DE PREGUNTAS === */}

            </div>
          </section>

          {/* CTA FINAL */}
          <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-slate-50">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
              <m.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="text-center mb-8 sm:mb-10 md:mb-12">
                <m.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 bg-slate-800 rounded-full mb-4 sm:mb-6">
                  <span className="text-amber-500 font-semibold text-xs sm:text-sm tracking-wide uppercase">¿Tienes más preguntas?</span>
                </m.div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4 leading-tight">
                  ¿No encuentras tu respuesta?
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
                  Contáctanos directamente y uno de nuestros especialistas resolverá tus dudas de manera personalizada
                </p>

                <m.a
                  href="https://calendly.com/gerencialitigioestrategicocolombiano"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="group inline-flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-5 py-3 sm:px-6 sm:py-3.5 md:px-8 md:py-4 font-bold text-white shadow-2xl hover:shadow-amber-500/30 relative overflow-hidden text-sm sm:text-base"
                >
                  <m.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" initial={{ x: '-100%' }} whileHover={{ x: '100%' }} transition={{ duration: 0.6 }} />
                  <FaCalendarAlt className="text-base sm:text-lg md:text-xl relative z-10" />
                  <span className="relative z-10">Agenda tu Consulta</span>
                  <FaArrowRight className="text-sm sm:text-base md:text-lg relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                </m.a>
              </m.div>
            </div>
          </section>

        </main>
      </LazyMotion>
    </>
  )
}

export default FAQPage
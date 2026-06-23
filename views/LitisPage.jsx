'use client'

import React, { useState, useEffect } from 'react'
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { 
  FaGavel, 
  FaBalanceScale,
  FaHandshake,
  FaChartBar,
  FaFileContract,
  FaShieldAlt,
  FaCheckCircle,
  FaBell,
  FaUsers,
  FaArrowRight,
  FaClipboardCheck,
  FaCalendarAlt,
  FaPhone,
  FaWhatsapp, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaLightbulb,
  FaAward,
  FaBook,
  FaChartLine,
  FaTrophy,
  FaRocket,
  FaChartPie
} from 'react-icons/fa'
import { Sparkles } from 'lucide-react'


const heroImage = '/images/fondos/fondoLitis.webp'
const imagenLitis1 = '/images/servicios/Que es Litesco Litis.webp'
const imagenLitis2 = '/images/servicios/procesos.webp'
const imagenLitis3 = '/images/servicios/Riesgos Legales.webp'

const LitisPage = () => {
  // SOLUCIÓN: Fuerza a la página a cargar en la posición superior (0,0) apenas se abre
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [expandedArea, setExpandedArea] = useState(null)

  const areas = [
    { 
      nombre: 'Civil', 
      icon: FaUsers,
      descripcion: 'Conflictos patrimoniales, responsabilidad civil, acciones de tutela.',
      casos: ['Ejecutivos', 'Declarativos', 'Responsabilidad contractual y extracontractual', 'Divisorios', 'Prescripción adquisitiva de dominio (pertenencia)', 'Monitorio'],
      color: 'from-amber-500 to-amber-600'
    },
    { 
      nombre: 'Comercial', 
      icon: FaFileContract,
      descripcion: 'Disputas mercantiles, societarias, títulos valores.',
      casos: ['Levantamiento del velo corporativo', 'Competencia desleal', 'Propiedad intelectual', 'Demandas ante la Superintendencia de sociedades', 'Acciones cambiarias', 'Controversias societarias'],
      color: 'from-amber-500 to-amber-600'
    },
    { 
      nombre: 'Laboral', 
      icon: FaHandshake,
      descripcion: 'Procesos laborales ordinarios, especiales y ejecutivos.',
      casos: ['Despidos injustificados', 'Reclamaciones prestacionales', 'Acoso laboral', 'Accidentes de trabajo', 'Conflicto de derecho laboral colectivo'],
      color: 'from-amber-500 to-amber-600'
    },
    { 
      nombre: 'Administrativo', 
      icon: FaShieldAlt,
      descripcion: 'Acciones contra el Estado, procesos disciplinarios.',
      casos: ['Nulidad y restablecimiento del derecho', 'Reparación directa', 'Acción de repetición', 'Acción popular y de grupo', 'Acción de tutela'],
      color: 'from-amber-500 to-amber-600'
    },
    { 
      nombre: 'Superintendencias', 
      icon: FaBalanceScale, 
      descripcion: 'Acciones ante delegaturas jurisdiccionales de SIC y Superfinanciera.',
      casos: ['Protección al consumidor', 'Prácticas comerciales', 'Servicios financieros', 'Protección de datos'],
      color: 'from-amber-500 to-amber-600'
    },
    { 
      nombre: 'Otras áreas', 
      icon: FaGavel, 
      descripcion: 'Contáctanos para consultar sobre tu caso específico.',
      casos: ['Consulta personalizada'],
      color: 'from-slate-500 to-slate-600'
    }
  ]

  const diferenciadores = [
    {
      title: 'Diagnóstico Integral',
      description: 'Análisis profundo de fortalezas, debilidades y riesgos de tu caso antes de iniciar cualquier actuación judicial.',
      icon: FaClipboardCheck,
      color: 'from-amber-500 to-amber-600'
    },
    {
      title: 'Estrategia Prejudicial',
      description: 'Intentamos resolver mediante conciliación, mediación o arreglo directo antes de acudir ante un juez.',
      icon: FaHandshake,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Representación Especializada',
      description: 'Abogados especializados con amplia experiencia en cada área del derecho que conocen los tribunales.',
      icon: FaAward,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Transparencia de Tarifas',
      description: 'Desglose claro de honorarios, costos procesales y plazos estimados desde el primer día.',
      icon: FaFileContract,
      color: 'from-yellow-500 to-amber-600'
    },
    {
      title: 'Seguimiento Periódico',
      description: 'Reportes mensuales del estado del proceso, audiencias y actuaciones realizadas.',
      icon: FaBell,
      color: 'from-pink-500 to-pink-600'
    },
    {
      title: 'Post-Sentencia',
      description: 'Apoyo en ejecución de sentencia favorable, recursos de apelación y cumplimiento de decisiones.',
      icon: FaCheckCircle,
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const procesoPaso = [
    {
      numero: '01',
      titulo: 'Consulta Inicial',
      descripcion: 'Analizamos tu caso y definimos la viabilidad jurídica',
      icon: FaUsers
    },
    {
      numero: '02',
      titulo: 'Diagnóstico Legal',
      descripcion: 'Evaluamos fortalezas, debilidades y riesgos del proceso',
      icon: FaClipboardCheck
    },
    {
      numero: '03',
      titulo: 'Estrategia Prejudicial',
      descripcion: 'Buscamos solución mediante mediación o conciliación',
      icon: FaHandshake
    },
    {
      numero: '04',
      titulo: 'Representación Judicial',
      descripcion: 'Iniciamos el proceso legal con toda la documentación',
      icon: FaGavel
    },
    {
      numero: '05',
      titulo: 'Seguimiento Constante',
      descripcion: 'Actualizaciones periódicas sobre el estado del caso',
      icon: FaChartLine
    },
    {
      numero: '06',
      titulo: 'Ejecución de Sentencia',
      descripcion: 'Garantizamos el cumplimiento de la decisión favorable',
      icon: FaCheckCircle
    }
  ]

  return (
    <>
      <LazyMotion features={domAnimation}>
        <main className="relative min-h-screen bg-white">
          
          {/* SECCIÓN HERO CON IMAGEN DE FONDO */}
          <section className="relative h-screen min-h-[600px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              <m.img
                src={heroImage}
                alt="Fondo Litigio Estratégico"
                className="h-full w-full object-cover"
                fetchPriority="high"
                initial={{ scale: 1.15 }} 
                animate={{ scale: 1 }}    
                transition={{
                  duration: 35,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
               {/* Overlay de gradientes para asegurar legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center px-6 py-12 lg:px-8">
              <section className="max-w-5xl space-y-8 text-center">
                <m.div
                  initial={{ opacity: 0, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <m.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center"
                  >
                    <div className="inline-flex items-center gap-3 rounded-full border-2 border-amber-400/40 bg-amber-500/15 px-6 py-3 backdrop-blur-md shadow-2xl">
                      <m.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-2.5 w-2.5 rounded-full bg-amber-400"
                      />
                      <span className="text-base font-bold text-amber-300 tracking-wide">
                        LITIGIO ESTRATÉGICO PROFESIONAL
                      </span>
                    </div>
                  </m.div>

                  <m.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
                  >
                    LITESCO
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                      LITIS
                    </span><a href="/cms-servicios" title="Panel Admin" className="inline-block text-amber-400 opacity-0 hover:opacity-100 transition-opacity ml-2 align-middle" style={{fontSize:'0.2em'}}><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg></a>
                  </m.h1>

                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg leading-relaxed text-amber-100 md:text-xl lg:text-2xl font-medium"
                  >
                    Litigio Estratégico: Defensa y Representación en Conflictos Complejos
                  </m.p>

                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
                  >
                    Representación legal experta en conflictos civiles, comerciales, laborales y administrativos con enfoque estratégico que protege tus intereses desde la perspectiva preventiva hasta la ejecución de la sentencia o decisión.
                  </m.p>

                  <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4 pt-6 justify-center"
                  >
                    <m.a
                      href="https://calendly.com/gerencialitigioestrategicocolombiano"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-10 py-5 font-black text-white shadow-2xl hover:shadow-amber-500/40 relative overflow-hidden text-lg"
                    >
                      <m.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <FaCalendarAlt className="text-2xl relative z-10" />
                      <span className="relative z-10">Consulta Legal Gratuita</span>
                      <FaArrowRight className="text-xl relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
                    </m.a>

                    <m.a
                      href="https://wa.me/573132037572"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-3 rounded-2xl border-2 border-white/30 bg-white/10 px-10 py-5 font-black text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 transition-all duration-300 text-lg"
                    >
                      <FaWhatsapp className="text-2xl" />
                      <span>WhatsApp</span>
                    </m.a>
                  </m.div>
                </m.div>
              </section>
            </div>
          </section>

          {/* QUÉ ES LITESCO LITIS - CON IMAGEN */}
          <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-amber-50">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Contenido */}
                <m.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div>
                    <m.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-bold uppercase tracking-wider mb-4"
                    >
                      Nuestra Propuesta
                    </m.span>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                      ¿Qué es
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700"> Litesco Litis</span>?
                    </h2>
                    
                    <p className="text-xl text-slate-600 leading-relaxed mb-8">
                      Es una línea de negocio conformada por <strong>abogados especializados y apasionados</strong> por brindar soluciones integrales a controversias en materia legal y jurídica. 
                    </p>

                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                      Aplicamos estrategias procesales y jurídicas en las siguientes áreas del derecho, con un enfoque preventivo y resolutivo que busca proteger los intereses de nuestros clientes en cada etapa del proceso.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 border-2 border-amber-200">
                    <FaLightbulb className="text-5xl text-amber-600 mb-4" />
                    <h3 className="text-2xl font-black text-slate-900 mb-3">Nuestro Enfoque</h3>
                    <p className="text-slate-700 leading-relaxed">
                      Brindamos una representación legal especializada en conflictos de diversas áreas del derecho. Nuestra intención es otorgar <strong>soluciones efectivas tanto desde la vía extrajudicial como judicial</strong>, priorizando siempre el mejor resultado para nuestros clientes.
                    </p>
                  </div>
                </m.div>

                {/* Imagen */}
                <m.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[650px]">
                    <img 
                      src={imagenLitis1} 
                      alt="Tribunal y justicia" 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                            <FaGavel className="text-white text-3xl" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-600">Nuestro Enfoque</div>
                            <div className="text-2xl font-black text-slate-900">Herramientas Jurídicas Idóneas</div>
                            <div className="text-sm text-slate-600 mt-1">Para obtener éxito en tu caso</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <m.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"
                  />
                </m.div>
              </div>
            </div>
          </section>

          {/* ÁREAS DEL DERECHO */}
          <section className="relative py-32 overflow-hidden bg-white">
            <div className="absolute inset-0">
              <m.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.03, 0.05, 0.03] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"
              />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <m.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-6 py-3 bg-slate-900 rounded-full mb-6"
                >
                  <span className="text-amber-400 font-bold text-sm tracking-widest uppercase">
                    Nuestras Áreas
                  </span>
                </m.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                  Áreas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Especialización</span>
                </h2>
                
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Aplicamos estrategias procesales y jurídicas en múltiples campos del derecho
                </p>
              </m.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {areas.map((area, index) => (
                  <m.div
                    key={area.nombre}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <m.div
                      whileHover={{ y: -8 }}
                      onClick={() => setExpandedArea(expandedArea === index ? null : index)}
                      className="cursor-pointer rounded-3xl bg-gradient-to-br from-white to-amber-50 p-8 shadow-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-500 hover:shadow-2xl"
                    >
                      <div className="flex flex-col items-center text-center space-y-4">
                        <m.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center shadow-lg`}
                        >
                          <area.icon className="text-3xl text-white" />
                        </m.div>
                        
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black text-slate-900">{area.nombre}</h3>
                          <p className="text-slate-600 leading-relaxed">{area.descripcion}</p>
                        </div>

                        <AnimatePresence mode="wait">
                          {expandedArea === index && (
                            <m.div
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="w-full pt-6 border-t border-amber-300 overflow-hidden"
                            >
                              <p className="text-sm font-bold text-slate-700 mb-4 text-left">Casos que atendemos:</p>
                              <ul className="space-y-3 text-left">
                                {area.casos.map((caso, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-start gap-3">
                                    <FaCheckCircle className="text-green-600 flex-shrink-0 text-xs mt-1" />
                                    <span className="leading-relaxed">{caso}</span>
                                  </li>
                                ))}
                              </ul>
                            </m.div>
                          )}
                        </AnimatePresence>

                        <button className="text-amber-600 hover:text-amber-700 text-sm font-semibold flex items-center gap-2 transition-colors mt-4">
                          {expandedArea === index ? 'Ver menos' : 'Ver más'}
                          <FaArrowRight className={`text-xs transition-transform duration-300 ${expandedArea === index ? 'rotate-90' : ''}`} />
                        </button>
                      </div>
                    </m.div>
                  </m.div>
                ))}
              </div>

              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <div className="inline-block bg-gradient-to-r from-amber-100 to-amber-100 rounded-2xl p-8 border-2 border-amber-300">
                  <FaBook className="text-5xl text-amber-700 mx-auto mb-4" />
                  <p className="text-2xl text-slate-900 font-black mb-2">
                    ¿Tu caso no está en la lista?
                  </p>
                  <p className="text-amber-800 text-lg">¡Consúltanos! Tenemos experiencia en diversas áreas del derecho colombiano</p>
                </div>
              </m.div>
            </div>
          </section>

          {/* PROCESO PASO A PASO CON IMAGEN */}
          <section className="relative py-32 bg-gradient-to-b from-amber-50 to-white overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                  Nuestro <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Proceso</span>
                </h2>
                
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  De la consulta inicial a la ejecución de sentencia
                </p>
              </m.div>

              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div className="grid md:grid-cols-2 gap-6">
                  {procesoPaso.map((paso, index) => (
                    <m.div
                      key={paso.numero}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 h-full">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-amber-600">
                            {paso.numero}
                          </div>
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                            <paso.icon className="text-xl text-white" />
                          </div>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">{paso.titulo}</h3>
                        <p className="text-slate-600 leading-relaxed text-sm">{paso.descripcion}</p>
                      </div>
                    </m.div>
                  ))}
                </div>

                <m.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[700px]">
                    <img 
                      src={imagenLitis2} 
                      alt="Proceso legal profesional" 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8">
                        <h3 className="text-2xl font-black text-slate-900 mb-4">Etapas Transparentes</h3>
                        <p className="text-slate-700 mb-4 leading-relaxed">
                          Te acompañamos en cada etapa con total transparencia y comunicación directa, mediante:
                        </p>
                        <ul className="space-y-2">
                          <li className="text-slate-700 flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>Mecanismos alternativos para solución de conflictos</span>
                          </li>
                          <li className="text-slate-700 flex items-start gap-2">
                            <span className="text-amber-600 font-bold">•</span>
                            <span>Procesos judiciales</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </m.div>
              </div>
            </div>
          </section>

          {/* MATRIZ DE RIESGOS CON IMAGEN */}
          <section className="relative py-32 overflow-hidden bg-white">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                <m.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]">
                    <img 
                      src={imagenLitis3} 
                      alt="Análisis estratégico" 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                            <FaChartBar className="text-white text-2xl" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-600">Precisión en Análisis</div>
                            <div className="text-2xl font-black text-slate-900">95% Efectividad</div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">
                          Nuestra matriz de riesgos te permite tomar decisiones informadas
                        </p>
                      </div>
                    </div>
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                    Herramienta Estratégica
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                    Matriz de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Riesgos Legales</span>
                  </h2>

                  <p className="text-xl text-slate-600 leading-relaxed">
                    LITESCO LITIS cuenta con una matriz de riesgos legales. Con dicha herramienta se busca <strong>analizar de manera previa a iniciar un proceso contencioso</strong> qué opciones eficientes y viables tiene el cliente para darle solución a la controversia.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-500">
                      <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-black text-slate-900 mb-2 text-lg">Evaluación de Viabilidad</h4>
                        <p className="text-slate-600">Analizamos la probabilidad de éxito antes de iniciar el proceso</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-500">
                      <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-black text-slate-900 mb-2 text-lg">Análisis de Costos vs Beneficios</h4>
                        <p className="text-slate-600">Comparamos los costos del litigio con los beneficios esperados</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 bg-amber-50 rounded-2xl p-6 border-l-4 border-amber-500">
                      <FaCheckCircle className="text-green-600 text-2xl flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-black text-slate-900 mb-2 text-lg">Alternativas de Solución</h4>
                        <p className="text-slate-600">Exploramos opciones extrajudiciales más eficientes</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white">
                    <FaChartPie className="text-5xl mb-4" />
                    <h4 className="text-2xl font-black mb-3">Toma de Decisiones Informadas</h4>
                    <p className="text-amber-100">
                      Minimiza riesgos y maximiza resultados con análisis profesional basado en datos
                    </p>
                  </div>
                </m.div>
              </div>
            </div>
          </section>

          {/* =======================================================
              DIFERENCIADORES CLAVE (ESTILO CORPORATIVO PREMIUM)
             ======================================================= */}
          <section className="relative py-24 lg:py-32 bg-slate-950 overflow-hidden">
            {/* Fondo Elegante */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-800/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header de Sección */}
              <m.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16 lg:mb-20"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-500 text-xs font-bold tracking-widest uppercase">
                    Nuestras Ventajas
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                  Diferenciadores <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Clave</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto font-light">
                  Lo que nos distingue en litigio estratégico: experiencia, transparencia y resultados.
                </p>
              </m.div>

              {/* Grid de Diferenciadores */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {diferenciadores.map((item, index) => (
                  <m.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="group relative h-full"
                  >
                    <div className="relative h-full bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm hover:bg-slate-800/80 hover:border-amber-500/30 transition-all duration-500 flex flex-col">
                      
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-amber-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center group-hover:border-amber-500/50 transition-colors duration-300">
                          <item.icon className="text-2xl text-amber-500" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-slate-400 leading-relaxed text-sm flex-grow">
                        {item.description}
                      </p>

                      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Sparkles className="w-5 h-5 text-amber-500/50" />
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA FINAL - VERSIÓN BLANCA Y LIMPIA */}
          <section className="relative py-20 lg:py-28 bg-white overflow-hidden border-t border-slate-200">
            {/* Fondo y Ambientación */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Patrón de puntos sutil (Gris claro) */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Glow Dorado muy sutil */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col items-center text-center">
                
                {/* Badge Flotante */}
                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-50 text-amber-600 text-xs font-bold tracking-widest uppercase shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Contáctanos
                  </span>
                </m.div>

                {/* Título Principal */}
                <m.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight max-w-4xl"
                >
                  ¿Necesitas resolver un <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                    conflicto legal?
                  </span>
                </m.h2>
                
                <m.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                  Contáctanos para una consulta inicial y evaluemos juntos la mejor estrategia para tu caso.
                </m.p>

                {/* Botones de Acción */}
                <m.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto mb-16"
                >
                  <m.a
                    href="https://calendly.com/gerencialitigioestrategicocolombiano"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 text-white font-bold rounded-xl overflow-hidden transition-all hover:bg-amber-600 shadow-xl shadow-amber-500/20"
                  >
                    <FaCalendarAlt className="text-lg" />
                    <span>Agendar Consulta Legal</span>
                    <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                  </m.a>

                  <m.a
                    href="https://wa.me/573132037572"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 border border-slate-800 text-white font-bold rounded-xl transition-all hover:bg-slate-800 shadow-lg"
                  >
                    <FaWhatsapp className="text-xl text-amber-400" />
                    <span>WhatsApp</span>
                  </m.a>
                </m.div>

                {/* Footer de Información - Tarjeta Clara y Profesional */}
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="w-full max-w-5xl"
                >
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
                      
                      {/* Ubicación */}
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-amber-300 transition-colors">
                          <FaMapMarkerAlt className="text-amber-500 text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">Visítanos</h4>
                          <p className="text-sm text-slate-600">CRA 7 #17-01<br/>Edificio Colseguros, Bogotá</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-amber-300 transition-colors">
                          <FaEnvelope className="text-amber-500 text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">Escríbenos</h4>
                          <p className="text-sm text-slate-600 break-words">gerencia@litesco.com.co</p>
                        </div>
                      </div>

                      {/* Horario */}
                      <div className="flex items-start gap-4 group sm:col-span-2 md:col-span-1">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-amber-300 transition-colors">
                          <FaClock className="text-amber-500 text-xl" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">Horario</h4>
                          <p className="text-sm text-slate-600">Lun-Vie: 7:00am - 6:00pm<br/>Sáb: 9:00am - 1:00pm</p>
                        </div>
                      </div>

                    </div>
                  </div>
                </m.div>

              </div>
            </div>
          </section>

        </main>
      </LazyMotion>
    </>
  )
}

export default LitisPage
'use client'

import React, { useState } from 'react'
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { 
  FaBriefcase, 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaShieldAlt, 
  FaChartLine, 
  FaBell,
  FaUsers,
  FaFileContract,
  FaBalanceScale,
  FaHandshake,
  FaArrowRight,
  FaBuilding,
  FaClock,
  FaLightbulb,
  FaGraduationCap,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa'
import { Sparkles } from 'lucide-react'


const heroImage = '/images/servicios/corporativo.webp'
const imagenCorporativa1 = '/images/servicios/In-House.webp'
const imagenCorporativa2 = '/images/servicios/In-House.webp'
const imagenCorporativa3 = '/images/servicios/Societario.webp'
const imagenCorporativa4 = '/images/servicios/Compliance.webp'
const imagenCorporativa5 = '/images/servicios/Contractual.webp'
const imagenCorporativa6 = '/images/servicios/Laboral.webp'

const CorporativoPage = () => {
  const [activeTab, setActiveTab] = useState(0)

  const areas = [
    { 
      title: 'Societario', 
      icon: FaBriefcase, 
      description: 'Constitución, reformas y liquidación de sociedades. Estructuración corporativa y gobernanza empresarial.',
      servicios: [
        'Constitución de sociedades',
        'Reformas estatutarias',
        'Fusiones y adquisiciones',
        'Liquidación de sociedades',
        'Gobierno corporativo',
        'Entre Otros Procesos'
      ]
    },
    { 
      title: 'Compliance / Cumplimiento', 
      icon: FaShieldAlt, 
      description: 'Auditorías legales, cumplimiento normativo y prevención de riesgos regulatorios.',
      servicios: [
        'Programas de cumplimiento',
        'Auditorías legales',
        'Prevención de lavado de activos',
        'Protección de datos personales',
        'Ética corporativa',
        'Entre Otros Procesos'
      ]
    },
    { 
      title: 'Contractual', 
      icon: FaFileContract, 
      description: 'Elaboración, revisión y negociación de contratos y negocios jurídicos.',
      servicios: [
        'Contratos comerciales',
        'Acuerdos de confidencialidad',
        'Negociación contractual',
        'Revisión de cláusulas',
        'Entre Otros Procesos'
      ]
    },
    { 
      title: 'Laboral', 
      icon: FaUsers, 
      description: 'Contratación, relaciones laborales y resolución de conflictos con empleados.',
      servicios: [
        'Contratos laborales',
        'Reglamentos internos',
        'Resolución de conflictos',
        'Auditorías laborales',
        'Entre Otros Procesos'
      ]
    }
  ]

  // DATOS ACTUALIZADOS PARA EL NUEVO DISEÑO
  const diferenciadores = [
    {
      title: 'Diagnóstico Legal Gratuito',
      description: 'Antes de iniciar cualquier servicio, realizamos una valoración integral de tu situación legal actual.',
      icon: FaShieldAlt
    },
    {
      title: 'Respuesta en 3 Días Hábiles',
      description: 'Una vez contrates nuestros servicios, cumplimos con tiempos óptimos sobre proyección, revisión y emisión de conceptos.',
      icon: FaClock
    },
    {
      title: 'Presencia Quincenal',
      description: 'Continuidad y cercanía mediante visitas programadas a tus instalaciones.',
      icon: FaBriefcase
    },
    {
      title: 'Prevención + Estrategia',
      description: 'Enfoque preventivo que evita costos legales futuros mayores.',
      icon: FaLightbulb
    },
    {
      title: 'Fidelización',
      description: 'Descuentos exclusivos en otras asesorías legales externas al plan in-house.',
      icon: FaHandshake
    },
    {
      title: 'Actualizaciones Legales',
      description: 'Acceso a boletines de actualización legal de acuerdo al sector industrial de cada cliente.',
      icon: FaBell
    }
  ]

  const beneficiosInHouse = [
    {
      title: 'Continuidad',
      description: 'Un profesional que conoce tu negocio a fondo',
      icon: FaChartLine
    },
    {
      title: 'Prevención',
      description: 'Actuamos antes de que surjan problemas costosos',
      icon: FaShieldAlt
    },
    {
      title: 'Cercanía',
      description: 'Visitas presenciales cada 15 días',
      icon: FaUsers
    },
    {
      title: 'Especialización',
      description: 'Expertos en derecho corporativo colombiano',
      icon: FaGraduationCap
    }
  ]

  const imagenesPorArea = [
  imagenCorporativa3, // Se mostrará cuando activeTab sea 0
  imagenCorporativa4, // Se mostrará cuando activeTab sea 1
  imagenCorporativa5, // Se mostrará cuando activeTab sea 2
  imagenCorporativa6  // Se mostrará cuando activeTab sea 3
];
  return (
    <>
      <LazyMotion features={domAnimation}>
        <main className="relative min-h-screen bg-white overflow-x-hidden">
          
          {/* SECCIÓN HERO CON IMAGEN DE FONDO ANIMADA */}
          <section className="relative h-screen min-h-[500px] sm:min-h-[600px] overflow-hidden">
            <div className="absolute inset-0 z-0">
              {/* MODIFICACIÓN: Se cambió <img> por <m.img> y se agregaron props de animación */}
              <m.img
                src={heroImage}
                alt="Fondo Corporativo"
                className="h-full w-full object-cover"
                fetchPriority="high"
                // Animación: Comienza un 15% más grande y se aleja lentamente
                initial={{ scale: 1.15 }} 
                animate={{ scale: 1 }}    
                transition={{
                  duration: 35,         // Duración muy larga (35 seg) para un efecto sutil y profesional
                  ease: "linear",       // Velocidad constante
                  repeat: Infinity,     // Se repite por siempre
                  repeatType: "reverse" // Va y vuelve suavemente (zoom out <-> zoom in)
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 lg:px-8">
              <section className="max-w-5xl space-y-4 sm:space-y-6 lg:space-y-8 text-center">
                <m.div
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-4 sm:space-y-6"
                >
                  <m.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex justify-center"
                  >
                    <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border-2 border-amber-500/30 bg-amber-500/10 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-md">
                      <m.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-400"
                      />
                      <span className="text-xs sm:text-sm md:text-base font-bold text-amber-300 tracking-[0.15em] uppercase">
                        ASESORÍA CORPORATIVA PROFESIONAL
                      </span>
                    </div>
                  </m.div>

                  <m.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-black leading-tight text-white"
                  >
                    LITESCO
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                      CORPORATIVO
                    </span>
                  </m.h1>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-tight text-white font-bold px-4 sm:px-0"
                  >
                    Tu Abogado In-House
                  </m.p>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                  >
                    Asesoría Legal Preventiva especializada en asuntos societarios, laborales y contractuales
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6 justify-center px-4 sm:px-0"
                  >
                    <m.a
                      href="https://calendly.com/gerencialitigioestrategicocolombiano"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="group inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 font-black text-white shadow-2xl hover:shadow-amber-500/40 relative overflow-hidden text-sm sm:text-base lg:text-lg"
                    >
                      <m.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <FaCalendarAlt className="text-lg sm:text-xl lg:text-2xl relative z-10" />
                      <span className="relative z-10">Diagnóstico Gratuito</span>
                      <FaArrowRight className="text-base sm:text-lg lg:text-xl relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
                    </m.a>

                    <m.a
                      href="https://wa.me/573132037572"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border-2 border-white/30 bg-white/10 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 font-black text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/20 transition-all duration-300 text-sm sm:text-base lg:text-lg"
                    >
                      <FaWhatsapp className="text-lg sm:text-xl lg:text-2xl" />
                      <span>WhatsApp</span>
                    </m.a>
                  </m.div>
                </m.div>
              </section>
            </div>
          </section>

          {/* PROPUESTA DE VALOR */}
          <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                
                <m.div
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative order-2 lg:order-1"
                >
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={imagenCorporativa1} 
                      alt="Entorno Corporativo" 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                            <FaBuilding className="text-white text-lg sm:text-xl lg:text-2xl" />
                          </div>
                          <div>
                            <div className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900">Queremos ser tu mano derecha</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <m.div
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-24 sm:w-32 h-24 sm:h-32 bg-amber-500/20 rounded-full blur-3xl"
                  />
                </m.div>

                <m.div
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="space-y-5 sm:space-y-6 lg:space-y-8 order-1 lg:order-2"
                >
                  <div>
                    <m.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 sm:mb-4"
                    >
                      Propuesta de Valor
                    </m.span>
                    
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 leading-tight">
                      ¿Por qué necesitas un
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700"> Abogado In-House</span>?
                    </h2>
                    
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed mb-6 sm:mb-8">
                      LITESCO Corporativo nace para responder a una necesidad en el entorno empresarial: <strong>la ausencia de acompañamiento jurídico constante y especializado</strong> en asuntos societarios, laborales y de negocios. Nuestro servicio se ofrece a través del modelo abogado in-house.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {beneficiosInHouse.map((beneficio, index) => (
                      <m.div
                        key={beneficio.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg border border-slate-200 hover:border-amber-300 hover:shadow-xl transition-all duration-300"
                      >
                        <beneficio.icon className="text-2xl sm:text-3xl text-amber-600 mb-2 sm:mb-3" />
                        <h4 className="font-bold text-slate-900 mb-1 sm:mb-2 text-sm sm:text-base">{beneficio.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600">{beneficio.description}</p>
                      </m.div>
                    ))}
                  </div>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-l-4 border-amber-500"
                  >
                    <p className="text-sm sm:text-base lg:text-lg text-slate-700 italic">
                      <FaLightbulb className="inline text-amber-600 mr-2" />
                      "El abogado in-house es un profesional especializado que asistirá presencialmente a las instalaciones del cliente cada 15 días, garantizando un acompañamiento cercano, continuo y adaptado a la realidad del negocio."
                    </p>
                  </m.div>
                </m.div>
              </div>
            </div>
          </section>
{/* QUÉ ES EL MODELO IN HOUSE - INTERACCIÓN HOVER AÑADIDA */}
<section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-slate-950 border-y border-slate-900">
  <div className="absolute inset-0">
    <m.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
      transition={{ duration: 8, repeat: Infinity }}
      className="absolute top-10 sm:top-20 right-10 sm:right-20 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-amber-500 rounded-full blur-[120px]"
    />
  </div>

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-10 sm:mb-12 lg:mb-16 text-center"
    >
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4 sm:mb-6"
      >
        <span className="text-amber-500 font-bold text-xs sm:text-sm tracking-widest uppercase">
          Nuestro Modelo
        </span>
      </m.div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
        ¿Qué es el Modelo <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">In-House</span>?
      </h2>
      
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-400 max-w-4xl mx-auto px-4 sm:px-0">
        Un profesional del derecho dedicado exclusivamente a proteger y hacer crecer tu empresa
      </p>
    </m.div>

    <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-10 sm:mb-16">
      <m.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-4 sm:space-y-6"
      >
        {/* TARJETAS PASOS: Se añadió la clase 'group' para controlar el hover */}
        {[
          { num: "1", title: "Valoración Legal Gratuita", desc: "LITESCO realiza una valoración legal corporativa gratuita previamente para conocer y analizar cada escenario legal del cliente." },
          { num: "2", title: "Diagnóstico y Socialización", desc: "Una vez identificado el diagnóstico será socializado con la sociedad para iniciar con el plan de trabajo." },
          { num: "3", title: "Acompañamiento Continuo", desc: "El abogado in-house asistirá presencialmente a las instalaciones cada 15 días o según el plan de trabajo establecido." }
        ].map((item, idx) => (
          <div key={idx} className="group bg-slate-900/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 border border-slate-800 shadow-xl hover:border-amber-500/30 transition-all duration-300 cursor-default">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg shadow-amber-500/20">
                <span className="text-slate-950 font-black text-lg sm:text-xl">{item.num}</span>
              </div>
              <div>
                {/* CAMBIO PRINCIPAL: group-hover:text-amber-400 */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white mb-1 sm:mb-2 group-hover:text-amber-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </m.div>

      <m.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl h-[400px] sm:h-[500px] lg:h-[700px] border border-slate-800 group">
          <img 
            src={imagenCorporativa3} 
            alt="Abogados profesionales trabajando" 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-amber-500/30 transition-colors duration-300">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-500">Mitigación</div>
                <div className="text-xs sm:text-sm text-slate-400 font-semibold">Gestión proactiva de riesgos</div>
              </div>
              <div className="bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-lg sm:rounded-xl p-3 sm:p-4 hover:border-amber-500/30 transition-colors duration-300">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-500">Gobernanza</div>
                <div className="text-xs sm:text-sm text-slate-400 font-semibold">Cumplimiento legal garantizado</div>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </div>
  </div>
</section>

          {/* ÁREAS QUE ABORDAMOS */}
          <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-10 sm:mb-12 lg:mb-16 text-center"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6">
                  Áreas de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Especialización</span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto px-4 sm:px-0">
                  Los servicios de Litesco Corporativo se clasifican en cuatro áreas principales
                </p>
              </m.div>

              <div className="mb-8 sm:mb-10 lg:mb-12">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
                  {areas.map((area, index) => (
                    <m.button
                      key={area.title}
                      onClick={() => setActiveTab(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 ${
                        activeTab === index
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xl'
                          : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-amber-300'
                      }`}
                    >
                      <area.icon className={`inline mr-1.5 sm:mr-2 text-base sm:text-lg lg:text-xl ${activeTab === index ? 'text-white' : 'text-amber-600'}`} />
                      <span className="hidden xs:inline">{area.title}</span>
                      <span className="xs:hidden">{area.title.split(' ')[0]}</span>
                    </m.button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <m.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-2xl border-2 border-slate-200"
                >
                  <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                          {React.createElement(areas[activeTab].icon, { className: "text-xl sm:text-2xl lg:text-3xl text-white" })}
                        </div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900">{areas[activeTab].title}</h3>
                      </div>
                      
                      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 leading-relaxed mb-6 sm:mb-8">
                        {areas[activeTab].description}
                      </p>

                      <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-l-4 border-amber-500">
                        <h4 className="font-bold text-slate-900 mb-3 sm:mb-4 text-base sm:text-lg">Servicios incluidos:</h4>
                        <ul className="space-y-2 sm:space-y-3">
                          {areas[activeTab].servicios.map((servicio, idx) => (
                            <m.li
                              key={servicio}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-slate-700"
                            >
                              <FaCheckCircle className="text-green-600 flex-shrink-0 text-sm sm:text-base" />
                              <span>{servicio}</span>
                            </m.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="relative h-[250px] sm:h-[350px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                      <img 
                        src={imagenesPorArea[activeTab]}
                        alt={areas[activeTab].title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </m.div>
              </AnimatePresence>
            </div>
          </section>

          {/* =======================================================
              DIFERENCIADORES CLAVE (SECCIÓN REDISEÑADA PROFESIONAL)
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
                      Ventajas Competitivas
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                    Diferenciadores <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Clave</span>
                  </h2>
                  <p className="text-lg text-slate-400 max-w-3xl mx-auto font-light">
                    Elevamos el estándar de la asesoría legal corporativa con un enfoque preventivo y estratégico.
                  </p>
                </m.div>

                {/* Grid de Diferenciadores Premium */}
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
                        {/* Tarjeta Glass Dark */}
                        <div className="relative h-full bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-sm hover:bg-slate-800/80 hover:border-amber-500/30 transition-all duration-500 flex flex-col">
                           
                           {/* Icono con Glow */}
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

                           {/* Decoración de esquina */}
                           <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <Sparkles className="w-5 h-5 text-amber-500/50" />
                           </div>
                        </div>
                     </m.div>
                   ))}
                </div>
             </div>
          </section>

          {/* PLANES EXCLUSIVOS */}
          <section className="bg-gradient-to-b from-white to-amber-50/50 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-5xl mx-auto"
              >
                <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 lg:p-16 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-amber-500/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-amber-600/5 rounded-full blur-3xl" />
                  
                  <div className="relative">
                    <m.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="mb-6 sm:mb-8 flex justify-center"
                    >
                      <FaBalanceScale className="text-amber-600 text-5xl sm:text-6xl lg:text-8xl" />
                    </m.div>
                    
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 sm:mb-6 text-center leading-tight">
                      Planes Exclusivos y Ajustados a Tu Medida
                    </h3>
                    
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 leading-relaxed mb-6 sm:mb-8 text-center max-w-3xl mx-auto">
                      Contamos con planes exclusivos y ajustados a las necesidades de tu empresa, emprendimiento o negocio.
                    </p>

                    <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 border border-slate-100 shadow-sm">
                      <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <li className="flex items-center gap-2 sm:gap-3 text-slate-700">
                          <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Planes mensuales</span>
                        </li>

                        <li className="flex items-center gap-2 sm:gap-3 text-slate-700">
                          <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Diagnóstico inicial gratuito</span>
                        </li>

                        <li className="flex items-center gap-2 sm:gap-3 text-slate-700">
                          <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Planes Bimensual</span>
                        </li>

                        <li className="flex items-center gap-2 sm:gap-3 text-slate-700">
                          <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Acompañamiento personalizado</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3 text-slate-700">
                          <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Planes Trimestrales Flexibles</span>
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3 text-slate-700">
                          <FaCheckCircle className="text-green-600 text-lg sm:text-xl flex-shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Sin costos ocultos</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-xl sm:text-2xl lg:text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700 px-4 sm:px-0">
                      Contáctanos y permítenos acompañarte en tu desarrollo empresarial
                    </p>
                  </div>
                </div>
              </m.div>
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
                  Agenda una consulta inicial con nuestros expertos y evaluemos juntos la estrategia jurídica más efectiva para tu caso.
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
                    <span>Agendar Consulta</span>
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
                          <p className="text-sm text-slate-600">Lun-Vie: 8:00am - 6:00pm<br/>Sáb: 9:00am - 1:00pm</p>
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

export default CorporativoPage
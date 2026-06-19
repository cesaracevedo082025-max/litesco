'use client'

import React, { useState } from 'react'
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { 
  FaCoins, 
  FaChartLine, 
  FaShieldAlt,
  FaUsers,
  FaBell,
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaHandshake,
  FaArrowRight,
  FaBuilding,
  FaHospital,
  FaShoppingCart,
  FaCalendarAlt,
  FaPhone,
  FaWhatsapp, // Nuevo icono
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaChartPie,
  FaHeadset,
  FaLock,
  FaRocket,
  FaTrophy
} from 'react-icons/fa'
import { Sparkles } from 'lucide-react'


// Asegúrate de tener estas imágenes en tu carpeta assets
const heroImage = '/images/fondos/fondoRecuperacion.webp'
const imagenRecuperacion1 = '/images/servicios/liquidez inmediata.webp'
const imagenRecuperacion2 = '/images/servicios/In-House.webp'

const RecuperacionPage = () => {
  const [activeBenefit, setActiveBenefit] = useState(0)

  const procesoBPO = [
    {
      title: 'Gestión pre-jurídica multicanal',
      description: 'Contacto estratégico a través de múltiples canales de comunicación',
      icon: FaHeadset
    },
    {
      title: 'Negociación de acuerdos de pago',
      description: 'Planes de pago flexibles adaptados a cada deudor',
      icon: FaHandshake
    },
    {
      title: 'Ejecución de cláusulas penales',
      description: 'Aplicación efectiva de cláusulas contractuales',
      icon: FaFileInvoiceDollar
    },
    {
      title: 'Litigio estratégico',
      description: 'Acción judicial cuando otras vías se agotan',
      icon: FaShieldAlt
    },
    {
      title: 'Tablero de control personalizado',
      description: 'Reglas de negocio adaptadas a tu empresa',
      icon: FaChartPie
    },
    {
      title: 'Reportería en tiempo real',
      description: 'Dashboard con métricas actualizadas constantemente',
      icon: FaChartLine
    }
  ]

  const diferenciadores = [
    {
      title: 'Tablero de Control',
      description: 'Visualización real de tu cartera por estado de mora, promesas de pago y recuperación efectiva con analytics avanzados.',
      icon: FaChartLine,
      stats: '100% Transparencia'
    },
    {
      title: 'Multicanal',
      description: 'Gestión coordinada a través de llamadas, emails, SMS, WhatsApp y otros canales de comunicación efectivos.',
      icon: FaBell,
      stats: '+5 Canales'
    },
    {
      title: 'Protocolo Ético',
      description: 'Gestión que protege tu reputación y relaciones comerciales con enfoque profesional y humano.',
      icon: FaShieldAlt,
      stats: '98% Satisfacción'
    },
    {
      title: 'Capacitación al Deudor',
      description: 'Ofrecemos espacio para que deudores entiendan obligaciones antes de judicializar, evitando costos innecesarios.',
      icon: FaUsers,
      stats: '70% Evitan Juicio'
    },
    {
      title: 'Cumplimiento Normativo',
      description: 'Adherencia total a leyes de protección al consumidor (Ley 1581 de 2012) y datos personales (RGPD).',
      icon: FaLock,
      stats: '100% Legal'
    },
    {
      title: 'Success Fee',
      description: 'Solo pagas cuando recuperamos. Modelo de éxito compartido que alinea nuestros intereses con los tuyos.',
      icon: FaDollarSign,
      stats: 'Pago por Resultado'
    }
  ]

  const segmentos = [
    { 
      nombre: 'Financiero', 
      descripcion: 'Bancos, cooperativas, fintech y entidades de crédito con alta cartera vencida.',
      icon: FaBuilding,
      ejemplos: ['Bancos comerciales', 'Cooperativas', 'Fintech', 'Fondos de inversión']
    },
    { 
      nombre: 'Seguros', 
      descripcion: 'Aseguradoras y empresas de servicios financieros con siniestros pendientes.',
      icon: FaShieldAlt,
      ejemplos: ['Aseguradoras', 'Corredores', 'Empresas de seguros']
    },
    { 
      nombre: 'Sector Salud', 
      descripcion: 'IPS, EPS, clínicas y centros médicos con cuentas por cobrar.',
      icon: FaHospital,
      ejemplos: ['IPS', 'EPS', 'Clínicas', 'Centros médicos']
    },
    { 
      nombre: 'B2B/B2C', 
      descripcion: 'Empresas con ventas a crédito: distribuidoras, retail y comercio.',
      icon: FaShoppingCart,
      ejemplos: ['Distribuidoras', 'Retail', 'E-commerce', 'Mayoristas']
    },
    { 
      nombre: 'Telecomunicaciones', 
      descripcion: 'Operadores con facturación recurrente y morosidad acumulada.',
      icon: FaBell,
      ejemplos: ['Operadores móviles', 'ISPs', 'Cable']
    },
    { 
      nombre: 'Cualquier Sector', 
      descripcion: 'Organizaciones con alto volumen de cartera vencida y necesidad de liquidez.',
      icon: FaCoins,
      ejemplos: ['Empresas de servicios', 'Educación', 'Otros sectores']
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
                alt="Fondo Recuperación de Cartera"
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
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            </div>

            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center px-6 py-12 lg:px-8">
              <section className="max-w-5xl space-y-8 text-center">
                <m.div
                  initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <m.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="flex justify-center"
                  >
                    <div className="inline-flex items-center gap-3 rounded-full border-2 border-amber-500/40 bg-amber-500/15 px-6 py-3 backdrop-blur-md shadow-2xl">
                      <m.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-2.5 w-2.5 rounded-full bg-amber-400"
                      />
                      <span className="text-base font-bold text-amber-300 tracking-wide">
                        RECUPERACIÓN DE CARTERA PROFESIONAL
                      </span>
                    </div>
                  </m.div>

                  <m.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
                  >
                    LITESCO
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
                      RECUPERACIÓN
                    </span>
                  </m.h1>

                  <m.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg leading-relaxed text-amber-100 md:text-xl lg:text-2xl font-medium"
                  >
                    Tercerización Integral de Cobranza: Recupera tu Cartera sin Riesgos
                  </m.p>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-3xl border border-white/20"
                  >
                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-2">
                      "Convertimos tus deudas en dinero efectivo"
                    </p>
                    <p className="text-lg text-slate-300">
                      Modelo BPO especializado con tecnología avanzada y estrategias éticas
                    </p>
                  </m.div>

                  <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                      <span className="relative z-10">Solicitar Propuesta BPO</span>
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

          {/* PROPUESTA DE VALOR CON IMAGEN */}
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
                      Propuesta de Valor
                    </m.span>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight">
                      Entendemos tu necesidad de
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700"> liquidez inmediata</span>
                    </h2>
                    
                    <p className="text-xl text-slate-600 leading-relaxed mb-6">
                      Entendemos que tu emprendimiento o empresa necesita <strong>liquidez y recuperar sus activos entregados sin recaudo</strong>. Por ende, mediante nuestro modelo BPO te brindamos soluciones eficientes mitigando riesgos de insolvencia del deudor.
                    </p>

                    <p className="text-lg text-slate-600 leading-relaxed">
                      Brindamos una tercerización integral de cobranza, para que puedas recuperar tu cartera sin riesgos. Ponemos a tu disposición un equipo especializado en el modelo BPO.
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
                      src={imagenRecuperacion1} 
                      alt="Recuperación de cartera" 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-8 left-8 right-8 space-y-4">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                            <FaCoins className="text-white text-3xl" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-600">Tasa de Recuperación</div>
                            <div className="text-3xl font-black text-slate-900">65% - 89%</div>
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

          {/* QUÉ ES EL MODELO BPO */}
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
                  <span className="text-amber-500 font-bold text-sm tracking-widest uppercase">
                    Modelo BPO
                  </span>
                </m.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
                  ¿Qué es el Modelo <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">BPO de Recuperación</span>?
                </h2>
                
                <p className="text-xl text-slate-600 max-w-4xl mx-auto">
                  Business Process Outsourcing especializado en recuperación de cartera mediante estrategias integrales
                </p>
              </m.div>

              {/* Proceso BPO con Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {procesoBPO.map((item, index) => (
                  <m.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="h-full rounded-3xl bg-gradient-to-br from-white to-amber-50 p-8 shadow-xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-500 hover:shadow-2xl">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="text-2xl text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-600 leading-relaxed text-sm">{item.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-amber-200">
                        <div className="flex items-center gap-2 text-amber-600">
                          <FaCheckCircle />
                          <span className="text-sm font-semibold">Implementado y probado</span>
                        </div>
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>

              {/* CTA del Modelo BPO */}
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-12 text-center shadow-2xl"
              >
                <h3 className="text-4xl font-black text-white mb-4">
                  ¿Listo para recuperar tu cartera?
                </h3>
                <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
                  Si tu empresa tiene cartera vencida y altos costos de cobranza, solicita una propuesta de tercerización a la medida de tus necesidades
                </p>
                <m.a
                  href="https://calendly.com/gerencialitigioestrategicocolombiano"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 font-black text-amber-700 shadow-xl hover:shadow-2xl transition-all text-lg"
                >
                  <FaCalendarAlt className="text-2xl" />
                  <span>Solicitar Propuesta de Recuperación</span>
                  <FaArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-2" />
                </m.a>
              </m.div>
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
                    Ventajas Competitivas
                  </span>
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                  Diferenciadores <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Clave</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-3xl mx-auto font-light">
                  Lo que nos hace únicos en recuperación de cartera con tecnología y ética.
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
                        {item.stats && (
                          <div className="absolute top-0 right-0 px-2 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20">
                            <span className="text-[10px] font-bold text-amber-400">{item.stats}</span>
                          </div>
                        )}
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

          {/* SEGMENTOS DE CLIENTES */}
          <section className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-slate-50">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6">
                  Segmentos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700">Clientes</span>
                </h2>
                
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                  Atendemos diversos sectores con necesidades de recuperación de cartera
                </p>
              </m.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {segmentos.map((segmento, index) => (
                  <m.div
                    key={segmento.nombre}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="relative group"
                  >
                    <div className="h-full rounded-3xl bg-white p-8 shadow-xl border-2 border-slate-200 hover:border-amber-300 transition-all duration-500 hover:shadow-2xl">
                      <div className="flex flex-col space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <segmento.icon className="text-3xl text-white" />
                          </div>
                          <h3 className="text-2xl font-black text-slate-900">{segmento.nombre}</h3>
                        </div>
                        
                        <p className="text-slate-600 leading-relaxed">{segmento.descripcion}</p>

                        <div className="pt-4 border-t border-slate-200">
                          <p className="text-sm font-bold text-slate-700 mb-2">Ejemplos:</p>
                          <div className="flex flex-wrap gap-2">
                            {segmento.ejemplos.map((ejemplo, idx) => (
                              <span key={idx} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold">
                                {ejemplo}
                              </span>
                            ))}
                          </div>
                        </div>
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
                    Comienza Hoy
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
                  ¿Listo para recuperar <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                    tu cartera?
                  </span>
                </m.h2>
                
                <m.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                  Solicita una propuesta personalizada de nuestro modelo BPO de recuperación y comienza a convertir deudas en efectivo.
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
                    <span>Solicitar Propuesta BPO</span>
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

export default RecuperacionPage
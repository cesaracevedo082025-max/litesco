'use client'

import React from 'react'
import { m, LazyMotion, domAnimation } from 'framer-motion'
import {
  FaShieldAlt,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaChevronRight,
} from 'react-icons/fa'

const SECTIONS = [
  { id: 'objeto', title: '1. Objeto y Alcance' },
  { id: 'definiciones', title: '2. Definiciones Clave' },
  { id: 'principios', title: '3. Principios Rectores' },
  { id: 'recoleccion', title: '4. Recolección de Datos' },
  { id: 'finalidades', title: '5. Finalidades del Tratamiento' },
  { id: 'derechos', title: '6. Derechos de los Titulares' },
  { id: 'secreto', title: '7. Secreto Profesional' },
  { id: 'transmision', title: '8. Transmisión de Datos a Terceros' },
  { id: 'seguridad', title: '9. Medidas de Seguridad' },
  { id: 'retencion', title: '10. Retención y Eliminación' },
  { id: 'pqrs', title: '11. Ejercicio de Derechos (PQRS)' },
  { id: 'cookies', title: '12. Cookies y Rastreo' },
  { id: 'menores', title: '13. Política para Menores' },
  { id: 'cambios', title: '14. Cambios a esta Política' },
  { id: 'autoridades', title: '15. Solicitudes de Autoridades' },
  { id: 'contacto', title: '16. Contacto y Consultas' },
  { id: 'nna', title: '17. Niñas, Niños y Adolescentes' },
  { id: 'vigencia', title: '18. Vigencia' },
]

const H2 = ({ id, children }) => (
  <h2 id={id} className="scroll-mt-28 text-xl sm:text-2xl font-black text-slate-900 mb-4 pb-3 border-b-2 border-amber-100 flex items-center gap-3">
    <span className="w-1.5 h-6 rounded-full bg-amber-500 flex-shrink-0" />
    {children}
  </h2>
)

const H3 = ({ children }) => (
  <h3 className="text-base sm:text-lg font-bold text-slate-800 mt-6 mb-2">{children}</h3>
)

const P = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">{children}</p>
)

const UL = ({ items }) => (
  <ul className="space-y-2 mb-4">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 text-sm sm:text-base text-slate-600 leading-relaxed">
        <FaChevronRight className="text-amber-500 mt-1.5 flex-shrink-0" size={10} />
        <span>{item}</span>
      </li>
    ))}
  </ul>
)

const Section = ({ children }) => (
  <section className="mb-10 sm:mb-12">{children}</section>
)

const PrivacidadPage = () => {
  return (
    <LazyMotion features={domAnimation}>
      <main className="relative min-h-screen bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-20 md:py-28">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 backdrop-blur-sm mb-6"
            >
              <FaShieldAlt className="text-amber-500" size={14} />
              <span className="text-xs sm:text-sm font-medium text-amber-400 uppercase tracking-wider">Protección de Datos Personales</span>
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4"
            >
              Política de Privacidad
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto"
            >
              LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. — Conforme a la Ley 1581 de 2012, el Decreto 1377 de 2013 y las directrices de la Superintendencia de Industria y Comercio (SIC).
            </m.p>

            <m.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xs text-slate-500 mt-4"
            >
              Vigente a partir del 01 de julio de 2026 · NIT 902.000.031-0
            </m.p>
          </div>
        </section>

        {/* CONTENIDO */}
        <section className="relative py-12 sm:py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 lg:gap-16">

              {/* TABLA DE CONTENIDO */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Contenido</p>
                  <nav className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
                    {SECTIONS.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="block text-sm text-slate-500 hover:text-amber-600 py-1.5 border-l-2 border-transparent hover:border-amber-500 pl-3 transition-colors"
                      >
                        {s.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* TEXTO LEGAL */}
              <div className="min-w-0">

                <Section>
                  <H2 id="objeto">1. Objeto y Alcance</H2>
                  <P>
                    La presente Política de Protección de Datos Personales y Privacidad (en adelante, la "Política") tiene por objeto informar a los clientes, proveedores, colaboradores y terceros interesados que la sociedad LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. recolecta, utiliza, almacena y protege los datos personales en cumplimiento de la Ley Estatutaria 1581 de 2012, el Decreto Reglamentario 1377 de 2013, las directrices de la Superintendencia de Industria y Comercio (SIC) y demás normas aplicables.
                  </P>
                  <P>
                    LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. garantiza la protección de datos personales y la confidencialidad de la información de sus clientes, proveedores, colaboradores, ex colaboradores y terceros. Las reglas de esta política aplican al tratamiento de cualquier información de carácter personal sobre la cual LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. tenga posesión y control, almacenada en sus bases de datos, aplicativos de IT, archivos físicos u otros sistemas. Esta Política es de obligatorio cumplimiento por parte de todos los colaboradores de LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. y terceros que obren en nombre de la sociedad mencionada.
                  </P>
                  <P>
                    Cabe resaltar que el incumplimiento de la presente Política originará sanciones de tipo laboral o responsabilidad contractual según sea el caso, sin perjuicio del deber de responder patrimonialmente por los perjuicios o daños que se le causen a los titulares de los datos personales.
                  </P>
                </Section>

                <Section>
                  <H2 id="definiciones">2. Definiciones Clave</H2>
                  <P>
                    Con base en lo establecido en los artículos 15 y 20 de la Constitución Política de Colombia, la Ley 1581 de 2012, la legislación vigente sobre protección de datos personales y demás normas que las modifiquen, deroguen o sustituyan, se definen los siguientes conceptos:
                  </P>
                  <UL items={[
                    <><strong>Dato Personal:</strong> cualquier información vinculada a una persona natural determinada o determinable.</>,
                    <><strong>Dato Sensible:</strong> datos personales que afectan la intimidad del titular, tal como ideología, religión, opinión política, pertenencia a sindicatos, salud física o mental, datos biométricos, vida sexual, o que puedan causar discriminación.</>,
                    <><strong>Datos Semipúblicos:</strong> información que no es pública, pero es conocida por sectores específicos y requiere autorización para su tratamiento.</>,
                    <><strong>Titular:</strong> persona natural cuyos datos personales son objeto de tratamiento.</>,
                    <><strong>Responsable del Tratamiento:</strong> LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. o terceros que determinan los fines y medios del tratamiento de datos personales.</>,
                    <><strong>Encargado del Tratamiento:</strong> persona natural o jurídica que procesa datos en nombre del responsable, bajo instrucciones y mediante vínculo contractual.</>,
                    <><strong>Tratamiento:</strong> cualquier operación sobre datos personales, incluyendo recolección, almacenamiento, uso, acceso, transmisión, rectificación, actualización o supresión.</>,
                    <><strong>Responsabilidad Demostrada (Accountability):</strong> principio que obliga a la Sociedad a demostrar, mediante documentación y auditorías, que las medidas de seguridad y privacidad se implementan efectivamente.</>,
                    <><strong>Bases de datos:</strong> conjunto organizado físico o electrónico de datos personales objeto del tratamiento.</>,
                    <><strong>Aviso de privacidad:</strong> comunicación dirigida al titular en la cual se informa su autorización y la finalidad del uso de los datos personales.</>,
                    <><strong>Reclamo:</strong> solicitud que puede elevar el titular o su representante para corregir, actualizar o suprimir información, o ante un incumplimiento del responsable o encargado del tratamiento.</>,
                    <><strong>Transmisión:</strong> tratamiento que implica la comunicación de datos dentro o fuera del país para que el encargado los trate por cuenta del responsable.</>,
                    <><strong>Transferencia:</strong> ocurre cuando el responsable o encargado envía los datos a un receptor que a su vez es responsable del tratamiento, dentro o fuera del país.</>,
                  ]} />
                </Section>

                <Section>
                  <H2 id="principios">3. Principios Rectores</H2>
                  <P>El tratamiento de datos personales que realiza LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. conforme a la norma, se rige por los siguientes principios:</P>
                  <UL items={[
                    <><strong>Legalidad:</strong> solo se recolectan y tratan datos para fines lícitos, autorizados por ley o consentimiento del titular.</>,
                    <><strong>Finalidad:</strong> los datos se recolectan solo para los fines explícitamente comunicados al titular, con autorización previa y expresa.</>,
                    <><strong>Libertad:</strong> el suministro de datos es voluntario, bajo consentimiento previo, expreso e informado, excepto cuando el dato es indispensable para el servicio jurídico.</>,
                    <><strong>Veracidad:</strong> se procura mantener actualizada y exacta la información; el titular responde por la precisión de los datos que proporciona.</>,
                    <><strong>Transparencia:</strong> el titular siempre conoce quién procesa su información y con qué propósito.</>,
                    <><strong>Acceso y Circulación Restringida:</strong> los datos solo circulan entre áreas internas que los necesiten; no se comparten con terceros sin autorización previa.</>,
                    <><strong>Seguridad:</strong> se implementan medidas técnicas, administrativas y físicas contra acceso, pérdida, alteración, destrucción o divulgación no autorizados.</>,
                    <><strong>Necesidad:</strong> solo se tratan los datos estrictamente necesarios para el objeto social de la Sociedad.</>,
                    <><strong>Temporalidad:</strong> los datos se conservan solo por el tiempo razonable para cumplir su finalidad; cumplida esta, se suprimen.</>,
                  ]} />
                </Section>

                <Section>
                  <H2 id="recoleccion">4. Recolección de Datos</H2>
                  <H3>4.1 ¿Qué datos recolectamos?</H3>
                  <UL items={[
                    <><strong>Datos de identificación:</strong> nombre completo, documento de identidad (cédula, pasaporte, NIT), fecha de nacimiento, género, entre otros.</>,
                    <><strong>Datos de contacto:</strong> correo electrónico, teléfono(s), dirección de correspondencia, entre otros.</>,
                    <><strong>Datos comerciales/patrimoniales:</strong> propiedad de bienes, estado de cuentas o patrimonio, deudas u obligaciones, información de empresas o negocios, entre otros.</>,
                    <><strong>Datos de antecedentes jurídicos:</strong> antecedentes penales o disciplinarios, procesos judiciales o administrativos en curso, sentencias o resoluciones, conflictos laborales, comerciales, civiles o administrativos.</>,
                    <><strong>Datos de salud o sensibles:</strong> condiciones de discapacidad relevantes para el servicio, antecedentes médico-legales, entre otros.</>,
                    <><strong>Información de empleados y colaboradores:</strong> perfil profesional, antecedentes laborales, nómina, seguridad social y pensión, entre otros.</>,
                  ]} />
                  <H3>4.2 Formas de recolección</H3>
                  <UL items={[
                    'Formularios en la página web',
                    'Correos electrónicos de consulta',
                    'Formularios físicos firmados en la oficina',
                    'Entrevistas y reuniones',
                    'Documentos aportados por clientes, proveedores o terceros',
                    'Bases de datos públicas (registros) consultadas para fines del servicio',
                    'Información de terceros con autorización del titular (entidades financieras, juzgados, notarías, entre otros)',
                  ]} />
                  <H3>4.3 Tratamiento de datos personales</H3>
                  <P>
                    LITIGIO ESTRATÉGICO COLOMBIANO S.A.S., de manera directa o indirecta, como responsable del tratamiento, tratará los datos conforme a la normatividad: recolectará, utilizará, almacenará, transmitirá, suprimirá y podrá realizar operaciones manuales y automatizadas sobre los datos personales de titulares —personas naturales y jurídicas— con quienes tiene o ha tenido relación.
                  </P>
                </Section>

                <Section>
                  <H2 id="finalidades">5. Finalidades del Tratamiento</H2>
                  <H3>5.1 Finalidades principales</H3>
                  <UL items={[
                    <><strong>Prestación de servicios jurídicos:</strong> asesoría en asuntos civiles, comerciales, laborales, administrativos, penales u otras áreas; representación judicial y administrativa; elaboración de documentos legales; consultoría y análisis de casos; seguimiento de expedientes; procesos de debida diligencia.</>,
                    <><strong>Cumplimiento de obligaciones legales:</strong> facturación y cobranza; conservación de registros; obligaciones tributarias y laborales; respuesta a requerimientos de autoridades.</>,
                    <><strong>Gestión de relaciones con clientes:</strong> propuestas comerciales, comunicación del estado de casos, recordatorios y notificaciones, solicitud de documentación, gestión de pagos y facturación.</>,
                    <><strong>Mejora de servicios:</strong> análisis de satisfacción, evaluación de calidad, capacitación interna.</>,
                    <><strong>Gestión de relaciones con proveedores o contratistas:</strong> selección y contratación, gestión de obligaciones contractuales, acreditación ante terceros.</>,
                    <><strong>Accionistas:</strong> cumplimiento de obligaciones societarias, programas de transparencia y buen gobierno corporativo, operaciones crediticias, grabación de reuniones de órganos sociales para su legalización.</>,
                  ]} />
                  <P>
                    Lo anterior se desarrolla en virtud de la suscripción inicial de un contrato de prestación de servicios profesionales, que contempla la confidencialidad de la información recolectada y el cumplimiento de las normas de protección de datos. La Sociedad también atiende quejas, reclamos y peticiones de clientes, proveedores o terceros a través de sus canales de contacto.
                  </P>
                  <H3>5.2 Finalidades secundarias</H3>
                  <P>La Sociedad <strong>no utilizará</strong> los datos para:</P>
                  <UL items={[
                    'Envío de publicidad comercial o promociones (salvo autorización expresa del titular)',
                    'Venta o comercialización a terceros',
                    'Elaboración de perfiles o análisis de comportamiento',
                    'Investigaciones de mercado o análisis estadísticos que identifiquen al titular',
                  ]} />
                  <P>Si desea conocer o retirar esta autorización, comuníquese al correo: <a href="mailto:gerencia@litesco.com.co" className="text-amber-600 font-semibold hover:underline">gerencia@litesco.com.co</a></P>
                </Section>

                <Section>
                  <H2 id="derechos">6. Derechos de los Titulares</H2>
                  <P>Conforme a la Ley 1581 de 2012 y demás normas aplicables, todo titular tiene derecho a:</P>
                  <UL items={[
                    <><strong>Acceso:</strong> acceder de forma clara y completa a los datos personales recolectados, su historial de tratamiento y las medidas de seguridad implementadas, de forma sencilla y gratuita.</>,
                    <><strong>Rectificación:</strong> solicitar la corrección o actualización de datos incompletos, inexactos, ambiguos o alterados.</>,
                    <><strong>Supresión:</strong> solicitar la eliminación de datos cuando se retire el consentimiento, ya no sean necesarios, se hayan obtenido ilícitamente o así lo exija la ley (con las limitaciones legales aplicables, como obligaciones tributarias o laborales, o defensa en procesos judiciales).</>,
                    <><strong>Conocer la finalidad:</strong> saber exactamente para qué se usan sus datos y con quién se comparten.</>,
                    <><strong>Presentar peticiones:</strong> quejas o reclamos sobre el tratamiento de sus datos, sin represalias ni discriminación.</>,
                    <><strong>Retracto:</strong> revocar en cualquier momento la autorización previamente otorgada.</>,
                  ]} />
                </Section>

                <Section>
                  <H2 id="secreto">7. Secreto Profesional e Información Privilegiada</H2>
                  <P>
                    La Sociedad, como despacho jurídico, está sujeta a obligaciones de secreto profesional conforme a las normas deontológicas de la abogacía en Colombia. Toda información compartida por un cliente o tercero con propósito de obtener asesoramiento jurídico se considera privilegiada y confidencial. La Sociedad no la divulgará a terceros, salvo:
                  </P>
                  <UL items={[
                    'Consentimiento expreso del cliente, proveedor o tercero',
                    'Orden de autoridad judicial o administrativa competente',
                    'Cuando sea necesario para prevenir un delito o proteger la vida de personas',
                    'Cuando el cliente o tercero haya divulgado públicamente la información',
                  ]} />
                </Section>

                <Section>
                  <H2 id="transmision">8. Transmisión de Datos a Terceros</H2>
                  <H3>8.1 Encargados del tratamiento</H3>
                  <P>La Sociedad puede compartir datos con terceros en calidad de Encargados, tales como:</P>
                  <UL items={[
                    'Proveedores de servicios tecnológicos: hosting, correo, almacenamiento en la nube, gestión documental, videoconferencia, seguridad informática',
                    'Servicios profesionales: contadores, revisores fiscales, auditores externos, aseguradoras, mensajería',
                    'Entidades cooperantes: juzgados, tribunales, autoridades administrativas, notarías, registradurías, superintendencias',
                  ]} />
                  <P>
                    LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. firma Contratos de Transmisión de Datos con todos los Encargados, asegurando el cumplimiento de las medidas de seguridad de la norma y de esta Política.
                  </P>
                  <H3>8.2 Responsables independientes</H3>
                  <P>La Sociedad no comparte datos con terceros responsables para fines comerciales o de marketing sin consentimiento previo del titular.</P>
                  <H3>8.3 Transferencia internacional</H3>
                  <P>La Sociedad no realiza transferencias internacionales de datos personales, salvo casos excepcionales con autorización del titular y garantías de seguridad equivalentes.</P>
                </Section>

                <Section>
                  <H2 id="seguridad">9. Medidas de Seguridad y Protección</H2>
                  <H3>9.1 Medidas técnicas</H3>
                  <UL items={[
                    'Encriptación SSL/TLS en toda transmisión de datos en la web',
                    'Firewalls y sistemas de detección de intrusos',
                    'Contraseñas seguras y autenticación multifactor para datos sensibles',
                    'Backups regulares en servidores independientes',
                    'Cifrado de datos en reposo y segregación de datos críticos',
                  ]} />
                  <H3>9.2 Medidas administrativas</H3>
                  <UL items={[
                    'Políticas de acceso bajo principio de mínimo privilegio',
                    'Registros de acceso (bitácoras)',
                    'Capacitación anual del personal en protección de datos',
                    'Cláusulas de confidencialidad en contratos laborales, civiles y comerciales',
                    'Evaluación de proveedores antes de su contratación',
                  ]} />
                  <H3>9.3 Medidas físicas</H3>
                  <UL items={[
                    'Vigilancia (CCTV) en áreas de información sensible',
                    'Almacenamiento seguro en bóvedas o cajas fuertes',
                    'Destrucción segura mediante trituración o incineración certificada',
                    'Política de escritorio limpio',
                  ]} />
                  <H3>9.4 Responsabilidad demostrada</H3>
                  <UL items={[
                    'Política de privacidad documentada y actualizada, publicada en el sitio web',
                    'Registros de autorizaciones y consentimientos',
                    'Auditorías internas semestrales',
                    'Mapeo de datos e inventario de tratamiento',
                    'Registro de incidentes de seguridad y acciones correctivas',
                    'Plan de respuesta a incidentes, incluyendo notificación a la SIC si es necesario',
                  ]} />
                </Section>

                <Section>
                  <H2 id="retencion">10. Retención y Eliminación de Datos</H2>
                  <H3>10.1 Plazos de retención</H3>
                  <UL items={[
                    'Clientes activos: vigencia de la relación contractual más 5 años después de finalizado el contrato',
                    'Obligaciones tributarias: 5 años, conforme a normas fiscales',
                    'Obligaciones laborales: 12 años después de terminada la relación laboral',
                    'Expedientes judiciales: entre 5 y 10 años, según reglas de retención documental del área jurídica correspondiente',
                    'Empleados: vigencia de la relación laboral más 10 años después de la desvinculación',
                  ]} />
                  <H3>10.2 Procedimiento de eliminación</H3>
                  <P>Cuando expira el plazo de retención, se evalúa que no existan obligaciones legales de conservación, se notifica al titular si aplica, se procede a la eliminación física o digital segura de los datos, y se documenta el proceso para eventual auditoría.</P>
                  <H3>10.3 Excepciones a la eliminación</H3>
                  <P>La Sociedad puede retener datos más allá del plazo cuando exista solicitud de acceso en un proceso judicial, sea necesario para una investigación administrativa o judicial, o así lo exija una norma legal.</P>
                </Section>

                <Section>
                  <H2 id="pqrs">11. Ejercicio de Derechos (PQRS)</H2>
                  <P>
                    Todo titular puede ejercer sus derechos de acceso, rectificación, supresión o consulta mediante una solicitud escrita (Petición, Queja, Reclamo o Solicitud) al correo <a href="mailto:gerencialitesco@gmail.com" className="text-amber-600 font-semibold hover:underline">gerencialitesco@gmail.com</a>, o por escrito a la Carrera 7 No. 17-01, Oficina 937, Edificio Colseguros, teléfono 313 203 7572.
                  </P>
                  <H3>11.2 Contenido de la solicitud</H3>
                  <UL items={[
                    'Nombre completo e identificación del titular',
                    'Derecho que desea ejercer (acceso, rectificación, supresión, etc.)',
                    'Descripción clara de lo solicitado',
                    'Datos de contacto (correo y teléfono)',
                    'Copia del documento de identidad y soportes documentales que considere necesarios',
                  ]} />
                  <H3>11.3 Plazo de respuesta</H3>
                  <P>
                    La Sociedad responde en un plazo máximo de 10 días hábiles desde la recepción. Si requiere investigación adicional, se informará al titular una prórroga de hasta 5 días hábiles más. En ningún caso el plazo total superará los 15 días hábiles.
                  </P>
                  <H3>11.5 Derecho a recurrir</H3>
                  <P>Si el titular no está conforme con la respuesta, puede presentar una reclamación ante la Superintendencia de Industria y Comercio (SIC).</P>
                </Section>

                <Section>
                  <H2 id="cookies">12. Cookies y Tecnologías de Rastreo</H2>
                  <P>Las cookies son pequeños archivos de texto que la página web guarda en el navegador del visitante para recordar preferencias, analizar comportamiento o permitir el funcionamiento de ciertas funciones.</P>
                  <H3>12.2 Tipos de cookies utilizadas</H3>
                  <UL items={[
                    <><strong>Técnicas:</strong> mantienen la sesión y el funcionamiento básico del sitio; no requieren consentimiento previo.</>,
                    <><strong>De análisis:</strong> recopilan información de uso del sitio para mejorar la experiencia; requieren consentimiento previo.</>,
                    <><strong>De publicidad:</strong> permiten anuncios personalizados en otras plataformas; requieren consentimiento y pueden rechazarse.</>,
                    <><strong>De terceros:</strong> provienen de dominios externos (redes sociales o publicidad); requieren consentimiento previo.</>,
                  ]} />
                  <P>
                    La página web incluye un banner de cookies con opciones de "Aceptar" o "Rechazar". El usuario debe aceptar activamente las cookies no técnicas antes de que se instalen; el rechazo no afecta la funcionalidad básica del sitio. Ver también la <a href="/cookies" className="text-amber-600 font-semibold hover:underline">Política de Cookies</a>.
                  </P>
                </Section>

                <Section>
                  <H2 id="menores">13. Política para Menores de Edad</H2>
                  <P>
                    La página web de la Sociedad está dirigida a mayores de 18 años. Si por algún motivo una persona menor de edad accede, los menores de 18 años no deben proporcionar datos personales sin consentimiento de sus padres o representantes legales. Si la Sociedad identifica que recibió datos de un menor sin autorización parental, procederá a eliminar esa información de inmediato.
                  </P>
                  <P>
                    De ser necesario recolectar datos de un menor, se requiere consentimiento expreso por escrito de los padres o representantes legales, copia de sus documentos de identidad y prueba del registro civil de nacimiento del menor.
                  </P>
                </Section>

                <Section>
                  <H2 id="cambios">14. Cambios a esta Política</H2>
                  <P>
                    La Sociedad se reserva el derecho de actualizar esta Política en cualquier momento para cumplir con nuevas normas legales o resoluciones de la SIC, mejorar medidas de seguridad o incorporar nuevas tecnologías. Cualquier cambio significativo será comunicado mediante publicación en la página web oficial y, cuando se considere necesario, por correo electrónico a clientes activos. Los cambios rigen a partir de la fecha de publicación; el uso continuado del sitio o servicios implica aceptación de la Política actualizada.
                  </P>
                </Section>

                <Section>
                  <H2 id="autoridades">15. Solicitudes de Autoridades y Procesos Judiciales</H2>
                  <P>
                    La Sociedad cumplirá con órdenes legales de autoridades judiciales, administrativas o de policía para divulgar datos personales cuando exista orden escrita de un juez o autoridad competente, se siga el debido proceso y la solicitud sea específica y clara. Se verificará la autenticidad y legalidad de la orden, se notificará al titular a menos que la ley lo prohíba, y se entregarán únicamente los datos solicitados por la autoridad.
                  </P>
                </Section>

                <Section>
                  <H2 id="contacto">16. Contacto y Consultas</H2>
                  <P>Para cualquier duda, consulta, reclamo o solicitud relacionada con esta Política de Protección de Datos:</P>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <FaEnvelope className="text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">Correo</p>
                        <a href="mailto:gerencia@litesco.com.co" className="text-sm font-semibold text-slate-700 hover:text-amber-600">gerencia@litesco.com.co</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <FaPhone className="text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">Teléfono</p>
                        <p className="text-sm font-semibold text-slate-700">313 203 7572</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <FaMapMarkerAlt className="text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">Dirección</p>
                        <p className="text-sm font-semibold text-slate-700">CRA 7 No. 17-01, Oficina 937, Edificio Colseguros, Bogotá</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <FaClock className="text-amber-500 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400">Horario</p>
                        <p className="text-sm font-semibold text-slate-700">Lunes a viernes, 8:00 a.m. a 5:00 p.m.</p>
                      </div>
                    </div>
                  </div>
                  <P>
                    <span className="block mt-4"><strong>Responsables de Protección de Datos:</strong> Laura María Ricaurte Cáceres y Nicolás Contreras Zabala.</span>
                  </P>
                </Section>

                <Section>
                  <H2 id="nna">17. Disposiciones Especiales para Niñas, Niños y Adolescentes</H2>
                  <P>
                    LITIGIO ESTRATÉGICO COLOMBIANO S.A.S. en principio no necesita recolectar, almacenar o tratar datos personales de niños, niñas y/o adolescentes. Solo lo hará cuando el caso específico lo amerite, se trate de datos públicos, o se cumplan los siguientes requisitos: que se respete el interés superior del menor y sus derechos fundamentales, y que la Sociedad cuente con la autorización del representante legal, teniendo en cuenta el derecho del menor a ser escuchado sobre el asunto que se esté tratando.
                  </P>
                </Section>

                <Section>
                  <H2 id="vigencia">18. Vigencia</H2>
                  <P>
                    La presente Política entra en vigencia a partir del 01 de julio de 2026 y es de cumplimiento obligatorio para todos los visitantes y usuarios de la página web y servicios de la Sociedad. Al hacer clic en el botón "Acepto" en el formulario de contacto de la página web, o al proporcionar datos personales a la Sociedad, el titular confirma que ha leído, comprendido y acepta los términos de esta Política, que autoriza el tratamiento de sus datos conforme a lo aquí descrito, que es mayor de 18 años o cuenta con autorización de sus padres o representantes si es menor de edad, y que puede ejercer sus derechos en cualquier momento contactando a <a href="mailto:gerencia@litesco.com.co" className="text-amber-600 font-semibold hover:underline">gerencia@litesco.com.co</a>.
                  </P>
                  <div className="mt-6 p-6 rounded-2xl bg-slate-900 text-slate-300 text-sm">
                    <p className="font-bold text-white mb-1">LITIGIO ESTRATÉGICO COLOMBIANO S.A.S.</p>
                    <p>NIT: 902.000.031-0</p>
                    <p>Representante Legal: Laura María Ricaurte Cáceres</p>
                  </div>
                </Section>

              </div>
            </div>
          </div>
        </section>
      </main>
    </LazyMotion>
  )
}

export default PrivacidadPage

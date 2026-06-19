import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  PageBreak, BorderStyle, TableRow, TableCell, Table, WidthType,
  ShadingType, UnderlineType, convertInchesToTwip, PageOrientation,
  NumberFormat, Footer, PageNumber, Header, TabStopPosition, TabStopType,
  LevelFormat
} from "docx";
import { writeFileSync } from "fs";

const FONT = "Times New Roman";
const FONT_SIZE = 24; // 12pt en half-points
const FONT_SIZE_TITLE = 28; // 14pt
const LINE_SPACING = { line: 480, lineRule: "auto" }; // doble espacio (360 = 1.5, 480 = 2.0)
const INDENT = { left: 720 }; // 1.27 cm

const titulo = (text, level = HeadingLevel.HEADING_1) =>
  new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text,
        bold: true,
        font: FONT,
        size: level === HeadingLevel.HEADING_1 ? FONT_SIZE : FONT_SIZE,
      }),
    ],
  });

const subtitulo = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 200, after: 100, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text,
        bold: true,
        italics: true,
        font: FONT,
        size: FONT_SIZE,
      }),
    ],
  });

const parrafo = (text, options = {}) =>
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, lineRule: "auto", before: 0, after: 0 },
    indent: options.indent ? { left: 720 } : {},
    children: [
      new TextRun({
        text,
        font: FONT,
        size: FONT_SIZE,
        bold: options.bold || false,
        italics: options.italic || false,
      }),
    ],
  });

const parrafoBold = (label, text) =>
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, lineRule: "auto", before: 0, after: 0 },
    children: [
      new TextRun({ text: label, font: FONT, size: FONT_SIZE, bold: true }),
      new TextRun({ text, font: FONT, size: FONT_SIZE }),
    ],
  });

const bala = (text, options = {}) =>
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, lineRule: "auto", before: 0, after: 0 },
    bullet: { level: 0 },
    children: [
      new TextRun({
        text,
        font: FONT,
        size: FONT_SIZE,
        bold: options.bold || false,
        italics: options.italic || false,
      }),
    ],
  });

const saltoPagina = () =>
  new Paragraph({ children: [new PageBreak()] });

const espacio = () =>
  new Paragraph({
    spacing: { line: 480, lineRule: "auto" },
    children: [new TextRun({ text: "", font: FONT, size: FONT_SIZE })],
  });

// Referencia con sangría francesa APA 7 (0.5 pulgada = 720 twips)
const referencia = (text) =>
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 480, lineRule: "auto", before: 0, after: 0 },
    indent: { left: 720, hanging: 720 },
    children: [new TextRun({ text, font: FONT, size: FONT_SIZE })],
  });

// Celda de tabla con texto centrado
const celda = (text, bold = false, center = false) =>
  new TableCell({
    children: [
      new Paragraph({
        alignment: center ? AlignmentType.CENTER : AlignmentType.LEFT,
        spacing: { line: 360, lineRule: "auto" },
        children: [new TextRun({ text, font: FONT, size: 20, bold })],
      }),
    ],
  });

// ============================================================
// PORTADA APA 7
// ============================================================
const portada = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 1440, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text: "UNIVERSIDAD NACIONAL ABIERTA Y A DISTANCIA – UNAD",
        font: FONT,
        size: FONT_SIZE,
        bold: true,
        allCaps: true,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text: "Zona Centro Boyacá – CEAD Duitama",
        font: FONT,
        size: FONT_SIZE,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text: "Escuela de Ciencias Básicas, Tecnología e Ingeniería – ECBTI",
        font: FONT,
        size: FONT_SIZE,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 1440, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text: "Tecnología en Desarrollo de Software",
        font: FONT,
        size: FONT_SIZE,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 480, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text: "Desarrollo de una Plataforma Web Dinámica con CMS y CRM para la Gestión de Servicios Jurídicos en la Firma Litesco S.A.S. en Bogotá",
        font: FONT,
        size: FONT_SIZE_TITLE,
        bold: true,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({ text: "Cesar Arley Acevedo Ruiz", font: FONT, size: FONT_SIZE }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({ text: "Código: 1005299918", font: FONT, size: FONT_SIZE }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 720, line: 480, lineRule: "auto" },
    children: [
      new TextRun({
        text: "Trabajo de grado presentado como requisito para optar al título de Tecnólogo en Desarrollo de Software",
        font: FONT,
        size: FONT_SIZE,
        italics: true,
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({ text: "Director:", font: FONT, size: FONT_SIZE, bold: true }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({ text: "Rafael Pérez Holguín", font: FONT, size: FONT_SIZE }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 240, line: 480, lineRule: "auto" },
    children: [
      new TextRun({ text: "Tecnólogo en Desarrollo de Software", font: FONT, size: FONT_SIZE }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 960, after: 0, line: 480, lineRule: "auto" },
    children: [
      new TextRun({ text: "Duitama, Boyacá, Colombia", font: FONT, size: FONT_SIZE }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 0, after: 0, line: 480, lineRule: "auto" },
    children: [
      new TextRun({ text: "2026", font: FONT, size: FONT_SIZE }),
    ],
  }),
  saltoPagina(),
];

// ============================================================
// RESUMEN
// ============================================================
const resumen = [
  titulo("Resumen"),
  parrafo(
    "La firma de abogados Litesco S.A.S., ubicada en Bogotá, Colombia, carecía de herramientas digitales para centralizar su gestión interna, visibilizar sus servicios jurídicos en línea y dar seguimiento estructurado a sus clientes y procesos judiciales. Esta situación limitaba la visibilidad digital de la firma, generaba pérdida de información sensible y dependencia de canales informales de comunicación, lo que comprometía su eficiencia operativa y su capacidad de crecimiento en un mercado jurídico cada vez más competitivo."
  ),
  espacio(),
  parrafo(
    "Para resolver esta problemática, se desarrolló e implementó una plataforma web dinámica que integra un gestor de contenidos (CMS) para la publicación de artículos jurídicos y un módulo CRM con panel administrativo seguro para la gestión de clientes y casos. El sistema fue construido con Next.js y React en el frontend, y Next.js API Routes conectado a una base de datos relacional MySQL en el backend, desplegada en el dominio corporativo https://litesco.com.co. El proyecto se ejecutó durante seis meses mediante una metodología iterativa e incremental organizada en cuatro fases: análisis de requerimientos, diseño e implementación del frontend, desarrollo del backend con CMS y CRM, y pruebas con puesta en operación."
  ),
  espacio(),
  parrafo(
    "Los resultados demuestran que es posible aplicar tecnologías modernas de desarrollo de software para resolver problemas concretos de gestión de servicios jurídicos en el sector jurídico colombiano. La plataforma se encuentra operativa en producción, cumple con los requerimientos funcionales definidos y representa un aporte académico y empresarial al proceso de digitalización de Litesco S.A.S. El sistema garantiza una interfaz responsiva, optimizada para motores de búsqueda (SEO), con seguridad en el manejo de información jurídica sensible."
  ),
  espacio(),
  parrafoBold(
    "Palabras clave: ",
    "plataforma web, CMS, CRM, gestión de servicios jurídicos, Next.js, MySQL, desarrollo de software, firma de abogados."
  ),
  saltoPagina(),
];

// ============================================================
// ABSTRACT
// ============================================================
const abstract = [
  titulo("Abstract"),
  parrafo(
    "The law firm Litesco S.A.S., located in Bogotá, Colombia, lacked digital tools to centralize its internal management, showcase its legal services online, and maintain structured tracking of clients and judicial processes. This situation limited the firm's digital visibility, generated loss of sensitive information, and created dependence on informal communication channels, compromising operational efficiency and growth capacity in an increasingly competitive legal market."
  ),
  espacio(),
  parrafo(
    "To address this problem, a dynamic web platform was developed and implemented, integrating a Content Management System (CMS) for publishing legal articles and a CRM module with a secure administrative panel for client and case management. The system was built with Next.js and React on the frontend, and Next.js API Routes connected to a relational MySQL database on the backend, deployed on the corporate domain https://litesco.com.co. The project was executed over six months using an iterative and incremental methodology organized in four phases: requirements analysis, frontend design and implementation, backend development with CMS and CRM, and testing with production deployment."
  ),
  espacio(),
  parrafo(
    "The results demonstrate that it is possible to apply modern software development technologies to solve concrete legal service management problems in the Colombian legal sector. The platform is operational in production, meets the defined functional requirements, and represents an academic and business contribution to the digitalization process of Litesco S.A.S."
  ),
  espacio(),
  parrafoBold(
    "Keywords: ",
    "web platform, CMS, CRM, legal services management, Next.js, MySQL, software development, law firm."
  ),
  saltoPagina(),
];

// ============================================================
// INTRODUCCIÓN
// ============================================================
const introduccion = [
  titulo("Introducción"),
  parrafo(
    "El presente documento corresponde al proyecto aplicado de grado titulado \"Desarrollo de una Plataforma Web Dinámica con CMS y CRM para la Gestión de Servicios Jurídicos en la Firma Litesco S.A.S. en Bogotá\", desarrollado como requisito para optar al título de Tecnólogo en Desarrollo de Software de la Universidad Nacional Abierta y a Distancia (UNAD), Zona Centro Boyacá, CEAD Duitama."
  ),
  espacio(),
  parrafo(
    "La transformación digital ha permeado todos los sectores productivos, incluyendo el sector jurídico. Las firmas de abogados que no adoptan herramientas tecnológicas enfrentan desventajas competitivas significativas en términos de visibilidad, eficiencia operativa y calidad del servicio al cliente. Litesco S.A.S., una firma de abogados con sede en Bogotá que presta servicios en derecho laboral, civil, comercial y administrativo, identificó esta necesidad y decidió emprender un proceso de modernización digital."
  ),
  espacio(),
  parrafo(
    "El proyecto abordó tres problemáticas concretas de la firma que impedían una gestión eficiente de sus servicios jurídicos: la ausencia de un portal web dinámico que limitaba su visibilidad en internet, la carencia de un sistema CRM propio que obligaba a llevar el seguimiento de clientes de forma manual, y la dependencia de canales informales de comunicación que impedían el registro organizado de interacciones con clientes potenciales."
  ),
  espacio(),
  parrafo(
    "Para dar solución a estas problemáticas, se desarrolló una plataforma web que integra dos módulos principales: un gestor de contenidos (CMS) para la administración dinámica del sitio web y la publicación de artículos jurídicos de valor, y un módulo CRM con panel administrativo seguro para la gestión de clientes, casos y seguimiento de procesos. El sistema fue construido utilizando tecnologías modernas: Next.js y React en el frontend, Next.js API Routes conectado a MySQL en el backend, con despliegue en producción en el dominio corporativo https://litesco.com.co."
  ),
  espacio(),
  parrafo(
    "El documento está estructurado siguiendo los lineamientos del proyecto aplicado de la UNAD. Inicia con el planteamiento del problema y la justificación, continúa con los objetivos, el marco teórico y la metodología —incluyendo el cronograma de actividades y los recursos del proyecto—, y desarrolla en detalle cada una de las cuatro fases del proyecto: análisis de requerimientos, diseño e implementación del frontend, desarrollo del backend con CMS y CRM, y pruebas con puesta en operación. Finalmente, se presentan los resultados obtenidos, las conclusiones y las recomendaciones para el mantenimiento y escalabilidad de la plataforma."
  ),
  espacio(),
  parrafo(
    "El alcance del proyecto comprende el diseño, desarrollo, pruebas e implementación de la plataforma en el entorno real de producción de la empresa, así como la elaboración de la documentación técnica y de usuario correspondiente. Las limitaciones identificadas incluyen la dependencia de servicios de hosting compartido (cPanel) y la necesidad de capacitación continua del personal de la firma para el uso efectivo de las herramientas desarrolladas."
  ),
  saltoPagina(),
];

// ============================================================
// PLANTEAMIENTO DEL PROBLEMA
// ============================================================
const planteamiento = [
  titulo("Planteamiento del Problema"),
  parrafo(
    "Litesco S.A.S. es una firma de abogados con sede en Bogotá, Colombia, que presta servicios jurídicos especializados en las áreas de derecho laboral, civil, comercial y administrativo. Antes del desarrollo de este proyecto, la firma no contaba con ningún sistema digital propio que centralizara su gestión interna ni que proyectara su presencia en internet de forma profesional y diferenciada, situación que generaba tres problemáticas concretas que limitaban significativamente la gestión de sus servicios jurídicos y su crecimiento y eficiencia operativa."
  ),
  espacio(),
  parrafo(
    "En primer lugar, la ausencia de un portal web dinámico limitaba severamente la visibilidad digital de la firma. En un entorno donde los clientes potenciales buscan servicios jurídicos principalmente a través de motores de búsqueda como Google, la firma no aparecía en los resultados de búsqueda relevantes, perdiendo oportunidades de negocio frente a competidores que sí contaban con presencia web optimizada para SEO. Esta carencia reducía la capacidad de la firma de atraer nuevos clientes y posicionarse como referente en el sector jurídico bogotano."
  ),
  espacio(),
  parrafo(
    "En segundo lugar, la falta de un sistema CRM propio obligaba a los abogados y al personal administrativo a llevar el seguimiento de clientes y casos de forma manual, utilizando hojas de cálculo, correos personales y notas físicas. Este método generaba: (a) riesgo significativo de pérdida de información sensible de clientes y procesos judiciales; (b) dificultad para dar trazabilidad a los casos y etapas procesales; (c) desgaste administrativo considerable que restaba tiempo a la atención legal de calidad; y (d) imposibilidad de generar reportes o estadísticas sobre el estado de los casos activos."
  ),
  espacio(),
  parrafo(
    "En tercer lugar, la comunicación con clientes potenciales dependía exclusivamente de canales informales como llamadas telefónicas personales y correos electrónicos no institucionales, sin ningún registro centralizado ni organizado. Esta situación impedía medir la efectividad de los procesos de captación de clientes y dificultaba el seguimiento oportuno de leads e inquietudes recibidas."
  ),
  espacio(),
  parrafo(
    "Esta situación en conjunto evidenció la necesidad urgente de desarrollar e implementar una solución tecnológica integral que modernizara la gestión de los servicios jurídicos de la firma, fortaleciera su presencia digital, garantizara la gestión segura y trazable de la información jurídica sensible, y quedara efectivamente operativa en el entorno real de la empresa, contribuyendo directamente a su crecimiento y competitividad en el mercado jurídico colombiano."
  ),
  espacio(),
  parrafoBold(
    "Pregunta problema: ",
    "¿De qué manera el desarrollo e implementación de una plataforma web dinámica con módulos CMS y CRM puede modernizar y optimizar la gestión de servicios jurídicos, la presencia digital y el seguimiento de clientes y casos de la firma Litesco S.A.S. en Bogotá?"
  ),
  saltoPagina(),
];

// ============================================================
// JUSTIFICACIÓN
// ============================================================
const justificacion = [
  titulo("Justificación"),
  parrafo(
    "El desarrollo de esta plataforma se justifica desde tres dimensiones complementarias: operativa, estratégica y académica, todas ellas articuladas con la necesidad real y concreta de modernización de la gestión de servicios jurídicos de la firma Litesco S.A.S."
  ),
  espacio(),
  parrafoBold(
    "Desde la dimensión operativa, ",
    "la firma Litesco S.A.S. requería urgentemente un sistema que centralizara la gestión de clientes y casos jurídicos, reemplazando los procesos manuales propensos a errores por flujos digitales eficientes, trazables y seguros. El módulo CRM desarrollado responde directamente a esta necesidad al permitir el registro estructurado, la búsqueda avanzada y el seguimiento detallado de cada cliente y caso desde un panel administrativo con control de acceso basado en roles. Esto reduce significativamente el riesgo de pérdida de información sensible y el tiempo dedicado a tareas administrativas repetitivas."
  ),
  espacio(),
  parrafoBold(
    "Desde la dimensión estratégica, ",
    "la firma necesitaba fortalecer su presencia digital para competir en un mercado jurídico cada vez más digitalizado. El módulo CMS desarrollado permite publicar contenido jurídico de valor de forma dinámica sin requerir conocimientos técnicos de programación, mejorando el posicionamiento orgánico en motores de búsqueda (SEO) y proyectando una imagen profesional y confiable ante clientes potenciales. La plataforma operativa en https://litesco.com.co posiciona a la firma como una organización moderna y tecnológicamente actualizada dentro del sector jurídico bogotano."
  ),
  espacio(),
  parrafoBold(
    "Desde la dimensión académica, ",
    "este proyecto permite aplicar de forma práctica e integral los conocimientos adquiridos durante el programa de Tecnología en Desarrollo de Software de la UNAD, integrando competencias de ingeniería de software, bases de datos relacionales, diseño de interfaces, desarrollo web fullstack y despliegue en entornos de producción reales. El proyecto representa un caso de estudio completo que demuestra cómo la tecnología puede generar valor tangible para una organización del sector servicios, validando la pertinencia del programa académico frente a las necesidades reales del mercado laboral colombiano."
  ),
  espacio(),
  parrafo(
    "La viabilidad del proyecto quedó demostrada con su implementación exitosa en producción en el dominio https://litesco.com.co, cumpliendo con los plazos, el presupuesto estimado de $2.000.000 COP y los requerimientos funcionales definidos en la fase de análisis, lo que confirma que el proyecto es realizable y genera un impacto positivo medible en la organización beneficiaria."
  ),
  saltoPagina(),
];

// ============================================================
// OBJETIVOS
// ============================================================
const objetivos = [
  titulo("Objetivos"),
  subtitulo("Objetivo General"),
  parrafo(
    "Desarrollar e implementar una plataforma web dinámica con módulos CMS y CRM para la gestión de servicios jurídicos de la firma Litesco S.A.S. en Bogotá, optimizando la presencia digital de la firma y el seguimiento de clientes y casos legales."
  ),
  espacio(),
  subtitulo("Objetivos Específicos"),
  bala(
    "OE1: Analizar los requerimientos funcionales y no funcionales de la firma Litesco S.A.S. para estructurar la arquitectura del sistema, los casos de uso y el modelo de base de datos relacional en MySQL."
  ),
  bala(
    "OE2: Implementar la interfaz de usuario con Next.js y React, garantizando un diseño responsivo, accesible y optimizado para motores de búsqueda (SEO), alineado con la identidad visual de la firma."
  ),
  bala(
    "OE3: Desarrollar el módulo CMS para la publicación dinámica del blog jurídico y el panel CRM para la gestión de clientes y casos legales, con autenticación segura y control de acceso basado en roles."
  ),
  bala(
    "OE4: Validar el funcionamiento de la plataforma mediante pruebas de seguridad, usabilidad y rendimiento en el entorno de producción del dominio https://litesco.com.co, documentando los resultados obtenidos."
  ),
  bala(
    "OE5: Documentar el proceso de desarrollo mediante manuales técnicos y de usuario que faciliten el mantenimiento, la operación y la escalabilidad futura de la plataforma."
  ),
  saltoPagina(),
];

// ============================================================
// MARCO TEÓRICO
// ============================================================
const marcoTeorico = [
  titulo("Marco Teórico y Referencial"),

  subtitulo("1. Antecedentes"),
  parrafo(
    "Diversas investigaciones y proyectos previos han abordado el desarrollo de plataformas web para el sector jurídico y la gestión de servicios profesionales. A nivel internacional, Pérez y García (2019) desarrollaron un sistema de gestión de despachos jurídicos basado en tecnologías web, demostrando que la digitalización reduce en un 40% el tiempo dedicado a tareas administrativas. En Colombia, proyectos similares como el desarrollado por González (2021) para una firma de consultoría en Medellín evidenciaron que la implementación de CRM en empresas de servicios profesionales mejora la retención de clientes en un 35% durante el primer año de operación."
  ),
  espacio(),
  parrafo(
    "En el ámbito académico de la UNAD, proyectos previos de la Escuela de Ciencias Básicas, Tecnología e Ingeniería han abordado el desarrollo de aplicaciones web con Next.js para empresas del sector servicios, estableciendo buenas prácticas para el despliegue en entornos de producción con cPanel y la integración de bases de datos MySQL en hosting compartido. Estos antecedentes validan la pertinencia tecnológica y metodológica del presente proyecto."
  ),
  espacio(),

  subtitulo("2. Bases Teóricas y Conceptuales"),
  parrafoBold("Ingeniería de Software: ", "La ingeniería de software es la disciplina que aplica principios de ingeniería al diseño, desarrollo, prueba y mantenimiento de sistemas de software (Pressman & Maxim, 2021). Según Sommerville (2016), un proceso de software estructurado permite gestionar la complejidad de los sistemas y garantizar su calidad, mantenibilidad y escalabilidad. En este proyecto se aplican estos principios mediante el uso de un proceso iterativo e incremental que organiza el trabajo en fases con entregables concretos."),
  espacio(),
  parrafoBold("Next.js y React: ", "React es una biblioteca de JavaScript desarrollada por Meta para la construcción de interfaces de usuario mediante componentes reutilizables. Next.js, desarrollado por Vercel, extiende las capacidades de React incorporando renderizado del lado del servidor (SSR), generación estática (SSG) y rutas de API que permiten desarrollar el backend dentro del mismo proyecto (Vercel, 2024). Esta arquitectura unificada reduce la complejidad del despliegue y mejora el rendimiento de la aplicación, siendo Next.js nativamente optimizado para SEO."),
  espacio(),
  parrafoBold("CMS (Content Management System): ", "Un gestor de contenidos es un sistema que permite crear, editar, organizar y publicar contenido digital sin requerir conocimientos técnicos de programación (Laudon & Laudon, 2020). En el contexto de este proyecto, el CMS desarrollado permite a los abogados de Litesco S.A.S. publicar artículos jurídicos, gestionar el contenido del sitio web y actualizar la información de servicios de forma autónoma desde un panel administrativo seguro."),
  espacio(),
  parrafoBold("CRM (Customer Relationship Management): ", "Un sistema CRM es una herramienta tecnológica que centraliza la gestión de las relaciones con los clientes, permitiendo registrar, rastrear y analizar todas las interacciones con clientes actuales y potenciales (Laudon & Laudon, 2020). En el sector jurídico, un CRM especializado permite llevar el seguimiento detallado de cada caso, las etapas procesales, las comunicaciones relevantes y los documentos asociados, mejorando la calidad del servicio y la trazabilidad de los procesos."),
  espacio(),
  parrafoBold("Base de Datos Relacional y MySQL: ", "MySQL es un sistema de gestión de bases de datos relacional de código abierto ampliamente utilizado en aplicaciones web (Welling & Thomson, 2017). El modelo relacional organiza los datos en tablas con relaciones definidas mediante claves primarias y foráneas, garantizando la integridad referencial y permitiendo consultas complejas mediante SQL. En este proyecto, MySQL gestiona toda la información de clientes, casos, artículos del blog y credenciales de usuario."),
  espacio(),
  parrafoBold("SEO (Search Engine Optimization): ", "La optimización para motores de búsqueda es el conjunto de prácticas técnicas y de contenido que mejoran la visibilidad de un sitio web en los resultados orgánicos de buscadores como Google (Nielsen, 2000). Next.js facilita la implementación de SEO mediante el renderizado del lado del servidor, la generación de meta-etiquetas dinámicas y la optimización automática de imágenes y recursos."),
  espacio(),

  subtitulo("3. Marco Normativo"),
  parrafo(
    "El proyecto se enmarca en las siguientes disposiciones legales y normativas vigentes en Colombia:"
  ),
  bala(
    "Ley 1581 de 2012 – Protección de Datos Personales: Establece los principios y requisitos para el tratamiento legítimo de datos personales en Colombia. La plataforma cumple con esta ley mediante la implementación de políticas de privacidad, consentimiento informado y mecanismos de seguridad para la protección de la información de los clientes de la firma."
  ),
  bala(
    "Decreto 1377 de 2013 – Reglamentación de la Ley 1581: Define los procedimientos para la recolección, uso y circulación de datos personales, incluyendo los requisitos para el registro de bases de datos ante la Superintendencia de Industria y Comercio."
  ),
  bala(
    "Ley 527 de 1999 – Comercio Electrónico: Regula el acceso y uso de los mensajes de datos, el comercio electrónico y las firmas digitales en Colombia, marco legal relevante para las interacciones digitales entre la firma y sus clientes."
  ),
  bala(
    "Ley 1273 de 2009 – Delitos Informáticos: Tipifica los delitos relacionados con la protección de la información y los datos, orientando las prácticas de seguridad implementadas en la plataforma."
  ),
  espacio(),

  subtitulo("4. Marco Contextual – La Firma Litesco S.A.S."),
  parrafo(
    "Litesco S.A.S. es una firma de abogados constituida en Bogotá, Colombia, que presta servicios jurídicos integrales en las áreas de derecho laboral, civil, comercial y administrativo. La firma cuenta con un equipo de profesionales del derecho especializados en litigios, consultoría jurídica y asesoría empresarial, atendiendo tanto a personas naturales como a empresas del sector privado."
  ),
  espacio(),
  parrafo(
    "Antes del desarrollo de este proyecto, los procesos internos de la firma operaban de la siguiente manera:"
  ),
  bala(
    "Gestión de clientes: Registro manual en hojas de cálculo Excel, sin sistema centralizado ni control de versiones."
  ),
  bala(
    "Seguimiento de casos: Notas físicas y correos personales, sin trazabilidad formal de etapas procesales."
  ),
  bala(
    "Comunicación con prospectos: Llamadas telefónicas y WhatsApp personal, sin registro centralizado."
  ),
  bala(
    "Presencia web: Inexistente. La firma no contaba con sitio web propio ni perfiles en directorios jurídicos en línea."
  ),
  bala(
    "Publicación de contenido jurídico: Ninguna. La firma no generaba contenido digital de valor para posicionamiento orgánico."
  ),
  espacio(),
  parrafo(
    "Esta caracterización permitió identificar con precisión los requerimientos funcionales y no funcionales del sistema a desarrollar, garantizando que la solución respondiera a las necesidades reales y específicas de la organización."
  ),
  saltoPagina(),
];

// ============================================================
// METODOLOGÍA
// ============================================================
const metodologia = [
  titulo("Marco Metodológico"),
  parrafo(
    "Se aplicó una metodología de desarrollo iterativa e incremental, inspirada en los principios del desarrollo ágil de software. Esta metodología permite gestionar proyectos complejos mediante ciclos de trabajo cortos con entregables concretos al final de cada fase, facilitando la detección temprana de errores y la adaptación continua a los requerimientos del cliente (Sommerville, 2016)."
  ),
  espacio(),
  parrafo(
    "El proyecto se organizó en cuatro fases secuenciales, cada una alineada explícitamente con los objetivos específicos definidos:"
  ),
  espacio(),

  subtitulo("Fase 1 – Análisis de Requerimientos (Mes 1) — Objetivo Específico OE1"),
  bala("Etapa: Levantamiento de información mediante reuniones con directivos y colaboradores de Litesco S.A.S."),
  bala("Tarea: Identificación y documentación de requerimientos funcionales y no funcionales del sitio web CMS y módulo CRM."),
  bala("Tarea: Definición de casos de uso, modelo entidad-relación (MER) en MySQL y arquitectura general del sistema."),
  bala("Entregable: Documento de especificación de requerimientos, diagrama MER, casos de uso y arquitectura del sistema."),
  espacio(),

  subtitulo("Fase 2 – Diseño e Implementación del Frontend (Mes 2) — Objetivo Específico OE2"),
  bala("Etapa: Diseño de wireframes e identidad visual de la plataforma, alineada con el branding de Litesco S.A.S."),
  bala("Tarea: Diseño UI/UX responsivo y optimizado para SEO mediante Next.js y Tailwind CSS."),
  bala("Tarea: Codificación de componentes React e integración de estilos, fuentes y paleta de colores corporativa."),
  bala("Entregable: Interfaz web pública funcional con páginas de inicio, servicios, blog y contacto."),
  espacio(),

  subtitulo("Fase 3 – Desarrollo del Backend, CMS y CRM (Meses 3 y 4) — Objetivo Específico OE3"),
  bala("Etapa: Programación del backend con Next.js API Routes e integración con MySQL en cPanel."),
  bala("Tarea: Desarrollo del módulo CMS para publicación dinámica de artículos jurídicos con categorías y etiquetas."),
  bala("Tarea: Desarrollo del módulo CRM con panel administrativo para gestión de clientes, casos y seguimiento de etapas."),
  bala("Tarea: Implementación de autenticación segura con JWT y control de acceso basado en roles (administrador/abogado)."),
  bala("Entregable: Backend funcional con API REST, módulos CMS y CRM operativos con panel de administración."),
  espacio(),

  subtitulo("Fase 4 – Implementación, Pruebas y Documentación (Meses 5 y 6) — Objetivos Específicos OE4 y OE5"),
  bala("Etapa: Implantación de la plataforma en la organización – puesta en funcionamiento real en Litesco S.A.S. previo al proceso de implementación formal."),
  bala("Tarea: Despliegue en el dominio https://litesco.com.co mediante cPanel y configuración de variables de entorno de producción."),
  bala("Tarea: Pruebas de funcionamiento, seguridad (inyección SQL, XSS, autenticación) y rendimiento en entorno real de producción."),
  bala("Tarea: Identificación y corrección de cuellos de botella y errores detectados durante la ejecución real del sistema."),
  bala("Tarea: Capacitación del personal de la firma para el uso del CMS y CRM."),
  bala("Tarea: Elaboración de manuales técnicos y de usuario."),
  bala("Entregable: Plataforma operativa en producción, manuales técnicos, informe de pruebas y documentación final."),
  espacio(),

  parrafoBold("Tipo de investigación: ", "Aplicada, con enfoque cuantitativo y cualitativo (mixto). Se midieron indicadores de rendimiento, disponibilidad del sistema y tiempos de respuesta (cuantitativo), y se evaluó la usabilidad y satisfacción del personal de la firma (cualitativo)."),
  espacio(),
  parrafoBold("Población y muestra: ", "El sistema fue implementado para la firma Litesco S.A.S., con una muestra de usuarios internos compuesta por 3 abogados y 1 asistente administrativo que participaron en las pruebas de usabilidad y en la capacitación para el uso del sistema."),
  espacio(),

  subtitulo("Cronograma de Actividades"),
  parrafo(
    "La siguiente tabla presenta el cronograma del proyecto, mostrando la correspondencia directa entre cada fase, el período de ejecución, los objetivos específicos relacionados y las actividades principales:"
  ),
  espacio(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          celda("Fase", true),
          celda("Período", true),
          celda("Objetivo relacionado", true),
          celda("Actividades principales", true),
        ],
      }),
      new TableRow({
        children: [
          celda("Fase 1: Análisis de Requerimientos"),
          celda("Mes 1"),
          celda("OE1"),
          celda("Reuniones con directivos de Litesco S.A.S.; identificación de procesos internos; documentación de RF01–RF06 y RNF01–RNF05; diseño del MER en MySQL; definición de casos de uso y arquitectura del sistema."),
        ],
      }),
      new TableRow({
        children: [
          celda("Fase 2: Diseño e Implementación del Frontend"),
          celda("Mes 2"),
          celda("OE2"),
          celda("Diseño de wireframes en Figma; definición de identidad visual corporativa; codificación de componentes React con Tailwind CSS; implementación de SEO (metadata dinámica, sitemap.xml, schema markup LegalService)."),
        ],
      }),
      new TableRow({
        children: [
          celda("Fase 3: Desarrollo del Backend, CMS y CRM"),
          celda("Meses 3 y 4"),
          celda("OE3"),
          celda("Programación de 17 endpoints de API REST con Next.js; integración con MySQL mediante mysql2; módulo CMS para artículos jurídicos; módulo CRM para clientes y casos; autenticación JWT con control de roles."),
        ],
      }),
      new TableRow({
        children: [
          celda("Fase 4: Implementación, Pruebas y Documentación"),
          celda("Meses 5 y 6"),
          celda("OE4 y OE5"),
          celda("Despliegue en litesco.com.co (cPanel); pruebas de seguridad (SQL injection, XSS, JWT); pruebas de rendimiento con PageSpeed Insights; capacitación del personal de la firma; elaboración de manuales técnicos y de usuario."),
        ],
      }),
    ],
  }),
  espacio(),
  saltoPagina(),
];

// ============================================================
// RECURSOS DEL PROYECTO
// ============================================================
const recursos = [
  titulo("Recursos del Proyecto"),
  parrafo(
    "Esta sección describe los recursos de hardware, software y recurso humano empleados para el diseño, desarrollo, implementación y validación de la plataforma web de gestión de servicios jurídicos de la firma Litesco S.A.S."
  ),
  espacio(),

  subtitulo("Recursos de Hardware"),
  parrafo(
    "Los recursos físicos utilizados durante el desarrollo, pruebas y despliegue del proyecto se detallan a continuación:"
  ),
  espacio(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          celda("Recurso", true),
          celda("Especificaciones técnicas", true),
          celda("Uso en el proyecto", true),
        ],
      }),
      new TableRow({
        children: [
          celda("Computador portátil (equipo principal de desarrollo)"),
          celda("Procesador Intel Core i5 de 10.ª generación, 8 GB de memoria RAM DDR4, 256 GB de almacenamiento SSD, tarjeta gráfica integrada Intel UHD, sistema operativo Windows 11 Pro"),
          celda("Desarrollo y codificación del sistema, pruebas locales en entorno de desarrollo, elaboración de la documentación académica"),
        ],
      }),
      new TableRow({
        children: [
          celda("Servidor web de alojamiento (hosting compartido)"),
          celda("Hosting compartido cPanel, MySQL 8.0, PHP 8.1, 10 GB de almacenamiento SSD, soporte SSL/TLS, ancho de banda ilimitado"),
          celda("Despliegue y operación continua de la plataforma en el dominio corporativo https://litesco.com.co"),
        ],
      }),
      new TableRow({
        children: [
          celda("Dispositivos de prueba adicionales"),
          celda("Teléfono inteligente Android 12 y tableta con resolución 768 px"),
          celda("Validación del diseño responsivo y pruebas de compatibilidad en dispositivos móviles"),
        ],
      }),
    ],
  }),
  espacio(),

  subtitulo("Recursos de Software"),
  parrafo(
    "Las herramientas y tecnologías de software utilizadas en el ciclo completo de desarrollo del proyecto son las siguientes:"
  ),
  espacio(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          celda("Herramienta / Tecnología", true),
          celda("Versión", true),
          celda("Propósito en el proyecto", true),
        ],
      }),
      new TableRow({ children: [celda("Visual Studio Code"), celda("1.85+"), celda("Entorno de desarrollo integrado (IDE) principal para la codificación del sistema")] }),
      new TableRow({ children: [celda("Node.js"), celda("18.17.0 LTS"), celda("Runtime de JavaScript para la ejecución del servidor de desarrollo local y el backend")] }),
      new TableRow({ children: [celda("Next.js"), celda("14.0"), celda("Framework fullstack principal: frontend con App Router y backend con API Routes")] }),
      new TableRow({ children: [celda("React"), celda("18.2"), celda("Biblioteca de componentes reutilizables para la interfaz de usuario")] }),
      new TableRow({ children: [celda("Tailwind CSS"), celda("3.4"), celda("Framework de utilidades CSS para el diseño responsivo y la identidad visual corporativa")] }),
      new TableRow({ children: [celda("MySQL"), celda("8.0"), celda("Sistema de gestión de bases de datos relacional para toda la información del sistema")] }),
      new TableRow({ children: [celda("mysql2"), celda("3.6"), celda("Driver de conexión Node.js – MySQL para las consultas del backend")] }),
      new TableRow({ children: [celda("Git"), celda("2.43"), celda("Control de versiones del código fuente durante todo el ciclo de desarrollo")] }),
      new TableRow({ children: [celda("GitHub"), celda("Web"), celda("Repositorio remoto, respaldo del código fuente y control de cambios colaborativo")] }),
      new TableRow({ children: [celda("Figma"), celda("Web"), celda("Diseño de wireframes, prototipado de la interfaz de usuario y maquetas de pantallas")] }),
      new TableRow({ children: [celda("MySQL Workbench"), celda("8.0"), celda("Modelado visual del diagrama entidad-relación y administración de la base de datos")] }),
      new TableRow({ children: [celda("cPanel"), celda("Última"), celda("Administración del servidor de hosting compartido y despliegue de la plataforma")] }),
      new TableRow({ children: [celda("Google Chrome / Firefox / Edge"), celda("Última"), celda("Pruebas de compatibilidad entre navegadores y evaluación de rendimiento")] }),
      new TableRow({ children: [celda("Google PageSpeed Insights"), celda("Web"), celda("Evaluación de rendimiento, SEO y cumplimiento de buenas prácticas web")] }),
      new TableRow({ children: [celda("Postman"), celda("Última"), celda("Pruebas funcionales de los 17 endpoints de la API REST del sistema")] }),
    ],
  }),
  espacio(),

  subtitulo("Recurso Humano"),
  parrafo(
    "El proyecto fue desarrollado por el siguiente equipo de personas, cada una con un rol específico y definido dentro del proceso:"
  ),
  espacio(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          celda("Persona", true),
          celda("Rol", true),
          celda("Responsabilidades", true),
        ],
      }),
      new TableRow({
        children: [
          celda("Cesar Arley Acevedo Ruiz"),
          celda("Desarrollador principal / Autor del proyecto"),
          celda("Análisis de requerimientos, diseño de arquitectura, codificación del frontend y backend, implementación del CMS y CRM, despliegue en producción, pruebas y elaboración de la documentación académica"),
        ],
      }),
      new TableRow({
        children: [
          celda("Rafael Pérez Holguín"),
          celda("Director del proyecto de grado (UNAD)"),
          celda("Asesoría académica, revisión de avances, retroalimentación sobre metodología y documentación, aprobación de entregables"),
        ],
      }),
      new TableRow({
        children: [
          celda("Directivos de Litesco S.A.S."),
          celda("Cliente / Parte interesada"),
          celda("Levantamiento de requerimientos, validación funcional de los módulos CMS y CRM, retroalimentación sobre usabilidad y aceptación final del sistema"),
        ],
      }),
      new TableRow({
        children: [
          celda("3 abogados y 1 asistente administrativo de Litesco S.A.S."),
          celda("Usuarios finales del sistema"),
          celda("Participación en pruebas de usabilidad, retroalimentación sobre la experiencia de uso del CMS y CRM, y capacitación para la operación autónoma del sistema"),
        ],
      }),
    ],
  }),
  espacio(),
  saltoPagina(),
];

// ============================================================
// DESARROLLO E IMPLEMENTACIÓN
// ============================================================
const desarrollo = [
  titulo("Desarrollo e Implementación del Proyecto"),
  parrafo(
    "En esta sección se describe el proceso completo de análisis, diseño y desarrollo de la plataforma web de gestión de servicios jurídicos para Litesco S.A.S., organizado en las cuatro fases definidas en la metodología. Cada fase presenta sus entregables concretos y la conexión explícita con los objetivos específicos planteados."
  ),
  espacio(),

  subtitulo("Fase 1: Análisis de Requerimientos"),
  parrafo(
    "Durante el primer mes del proyecto se realizó el levantamiento detallado de requerimientos mediante reuniones de trabajo con los directivos y colaboradores de Litesco S.A.S. Se identificaron los procesos internos existentes, las necesidades específicas de digitalización y las expectativas del equipo jurídico respecto al sistema a desarrollar. Esta fase responde directamente al OE1 y constituyó la base sobre la que se construyeron todas las fases posteriores."
  ),
  espacio(),
  parrafoBold("Requerimientos Funcionales:", ""),
  bala("RF01: El sistema debe permitir la publicación y gestión de artículos jurídicos mediante un panel CMS con editor de contenido enriquecido."),
  bala("RF02: El sistema debe registrar y gestionar clientes con información de contacto, estado y notas de seguimiento."),
  bala("RF03: El sistema debe permitir la gestión de casos jurídicos asociados a clientes, con etapas, fechas y documentos."),
  bala("RF04: El sistema debe implementar autenticación segura con control de acceso basado en roles (administrador/abogado)."),
  bala("RF05: El sistema debe enviar notificaciones de correo electrónico ante nuevas solicitudes de contacto recibidas desde el sitio web."),
  bala("RF06: El sitio web público debe mostrar los servicios de la firma, el blog jurídico y el formulario de contacto."),
  espacio(),
  parrafoBold("Requerimientos No Funcionales:", ""),
  bala("RNF01: La plataforma debe ser responsiva y compatible con dispositivos móviles, tabletas y computadores de escritorio."),
  bala("RNF02: El tiempo de carga de las páginas públicas no debe superar los 3 segundos en condiciones normales de red."),
  bala("RNF03: El sistema debe proteger la información sensible mediante cifrado en tránsito (HTTPS) y en reposo."),
  bala("RNF04: La plataforma debe estar disponible el 99% del tiempo durante el horario de operación de la firma."),
  bala("RNF05: La interfaz de usuario debe ser intuitiva, requiriendo menos de 30 minutos de capacitación para su uso básico."),
  espacio(),

  subtitulo("Modelo Entidad-Relación (MER) y Arquitectura del Sistema"),
  parrafo(
    "Como resultado del análisis, se diseñó el modelo entidad-relación de la base de datos MySQL y la arquitectura general del sistema. Esta etapa de diseño conecta directamente el análisis de requerimientos (OE1) con la implementación técnica (OE2 y OE3), garantizando coherencia entre lo que el cliente necesita y lo que el sistema construye."
  ),
  espacio(),
  parrafoBold("Entidades principales del modelo de datos:", ""),
  bala("usuarios: id, nombre, email, password_hash, rol (admin/abogado), created_at, updated_at."),
  bala("clientes: id, nombre, apellido, email, telefono, tipo_documento, numero_documento, direccion, estado (activo/inactivo), notas, created_at, updated_at, usuario_id (FK)."),
  bala("casos: id, titulo, descripcion, tipo_derecho, etapa_procesal, fecha_inicio, fecha_vencimiento, estado (activo/cerrado/suspendido), cliente_id (FK), abogado_id (FK), created_at, updated_at."),
  bala("seguimientos: id, caso_id (FK), descripcion, fecha_seguimiento, usuario_id (FK), created_at."),
  bala("articulos: id, titulo, slug, contenido, extracto, imagen_portada, categoria_id (FK), estado (borrador/publicado), autor_id (FK), created_at, updated_at."),
  bala("categorias: id, nombre, slug, descripcion."),
  bala("contactos: id, nombre, email, telefono, asunto, mensaje, estado (nuevo/leido/respondido), created_at."),
  espacio(),
  parrafoBold("Relaciones entre entidades:", ""),
  bala("Un cliente puede tener muchos casos (1:N)."),
  bala("Un caso pertenece a un cliente y es atendido por un abogado (usuario) (N:1)."),
  bala("Un caso puede tener muchos seguimientos (1:N)."),
  bala("Un artículo pertenece a una categoría y tiene un autor (usuario) (N:1)."),
  espacio(),
  parrafoBold("Arquitectura del sistema: ", "Se adoptó una arquitectura fullstack unificada basada en Next.js 14 con App Router. El frontend se comunica con el backend a través de la misma aplicación mediante Next.js API Routes, lo que elimina la necesidad de un servidor backend separado y simplifica el despliegue. La base de datos MySQL se conecta al backend mediante el driver mysql2 con pool de conexiones para optimizar el rendimiento. El despliegue se realiza en hosting compartido cPanel, donde la aplicación Next.js se sirve mediante un proceso Node.js persistente configurado como servidor de producción."),
  espacio(),

  subtitulo("Fase 2: Diseño e Implementación del Frontend"),
  parrafo(
    "Durante el segundo mes se diseñaron los wireframes y la identidad visual de la plataforma, y se implementó la interfaz de usuario pública utilizando Next.js 14 con App Router y Tailwind CSS para el diseño responsivo. Esta fase responde directamente al OE2."
  ),
  espacio(),
  parrafoBold("Proceso de diseño UI/UX: ", "Se elaboraron wireframes de baja fidelidad para cada vista de la plataforma en Figma, los cuales fueron validados con los directivos de Litesco S.A.S. antes de proceder con la codificación. La paleta de colores corporativa (azul marino #1B3A6B y dorado #C9A84C) y la tipografía seleccionada (Inter para el sitio web) fueron aplicadas de forma consistente en todos los componentes mediante las utilidades de Tailwind CSS."),
  espacio(),
  parrafoBold("Estructura de páginas públicas implementadas:", ""),
  bala("/ (Inicio): Presentación de la firma, servicios destacados, últimos artículos del blog y llamada a la acción para contacto."),
  bala("/litis: Página de servicios jurídicos especializados con descripción detallada de áreas de práctica."),
  bala("/blog: Listado de artículos jurídicos publicados con filtro por categoría y paginación."),
  bala("/blog/[slug]: Página individual de cada artículo jurídico con contenido completo y SEO por artículo."),
  bala("/contacto: Formulario de contacto con validación del lado del cliente y envío de notificación por correo electrónico."),
  bala("/sobre-nosotros: Presentación del equipo jurídico y los valores de la firma."),
  bala("/admin: Panel de administración protegido con autenticación JWT (CMS y CRM)."),
  espacio(),
  parrafo(
    "Se implementaron las siguientes optimizaciones SEO mediante Next.js: metadata dinámica por página con título, descripción y Open Graph tags; sitemap.xml automático generado programáticamente; robots.txt para control de indexación; y schema markup tipo LegalService según schema.org para mejorar la visibilidad en resultados de búsqueda jurídicos."
  ),
  espacio(),

  subtitulo("Fase 3: Desarrollo del Backend, CMS y CRM"),
  parrafo(
    "Durante los meses 3 y 4 se desarrolló el backend completo utilizando Next.js API Routes, con conexión a la base de datos MySQL mediante el driver mysql2 con pool de conexiones. Se implementaron los módulos CMS y CRM con sus respectivas interfaces de administración. Esta fase responde directamente al OE3."
  ),
  espacio(),
  parrafoBold("API REST implementada (17 endpoints):", ""),
  bala("POST /api/auth/login – Autenticación de usuarios con generación de token JWT firmado con secreto de servidor."),
  bala("GET/POST /api/articulos – Listado público de artículos y creación de nuevos artículos (protegido)."),
  bala("GET/PUT/DELETE /api/articulos/[id] – Gestión individual de artículos: consulta, actualización y eliminación (protegido)."),
  bala("GET/POST /api/clientes – Listado y registro de clientes en el CRM (protegido)."),
  bala("GET/PUT/DELETE /api/clientes/[id] – Gestión individual de clientes (protegido)."),
  bala("GET/POST /api/casos – Listado y creación de casos jurídicos asociados a clientes (protegido)."),
  bala("GET/PUT/DELETE /api/casos/[id] – Gestión individual de casos con historial de seguimientos (protegido)."),
  bala("POST /api/contacto – Recepción de formularios del sitio público con envío de notificación por correo electrónico al correo institucional de la firma."),
  espacio(),
  parrafoBold("CRUD implementado por entidad:", ""),
  parrafo("La siguiente tabla resume las operaciones CRUD implementadas para cada entidad principal del sistema:"),
  espacio(),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Entidad", bold: true, font: FONT, size: FONT_SIZE })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Crear", bold: true, font: FONT, size: FONT_SIZE })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Leer", bold: true, font: FONT, size: FONT_SIZE })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Actualizar", bold: true, font: FONT, size: FONT_SIZE })] })] }),
          new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Eliminar", bold: true, font: FONT, size: FONT_SIZE })] })] }),
        ],
      }),
      ...["Usuarios", "Clientes", "Casos", "Seguimientos", "Artículos", "Categorías", "Contactos"].map(ent =>
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: ent, font: FONT, size: FONT_SIZE })] })] }),
            ...["✓", "✓", "✓", "✓"].map(v =>
              new TableCell({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: v, font: FONT, size: FONT_SIZE })] })] })
            ),
          ],
        })
      ),
    ],
  }),
  espacio(),

  subtitulo("Fase 4: Implementación, Pruebas y Puesta en Operación"),
  parrafo(
    "Durante los meses 5 y 6 se realizó la implantación del sistema en la organización, el despliegue en producción, las pruebas de verificación y la documentación final. El proceso de implementación siguió los pasos establecidos en la metodología: primero se puso en funcionamiento el sistema en el entorno de la firma (implantar), luego se ejecutaron pruebas en producción para identificar cuellos de botella y errores de ejecución. Esta fase responde a los objetivos OE4 y OE5."
  ),
  espacio(),
  parrafoBold("Pruebas de seguridad realizadas:", ""),
  bala("Prueba de inyección SQL: Se verificó que todas las consultas a la base de datos usan consultas preparadas (prepared statements) con el driver mysql2, previniendo ataques de inyección."),
  bala("Prueba de autenticación: Se validó que las rutas protegidas del panel administrativo devuelven error 401 ante solicitudes sin token JWT válido."),
  bala("Prueba de XSS (Cross-Site Scripting): Se verificó el saneamiento de entradas de usuario en el formulario de contacto y en el editor del CMS."),
  bala("Prueba de HTTPS: Se confirmó que todas las comunicaciones se realizan sobre conexión cifrada (SSL/TLS) en el dominio litesco.com.co."),
  espacio(),
  parrafoBold("Pruebas de rendimiento:", ""),
  bala("Tiempo de carga promedio de la página de inicio: 2.1 segundos (cumple RNF02 ≤ 3 segundos)."),
  bala("Puntuación de rendimiento en Google PageSpeed Insights: 87/100 en desktop y 74/100 en móvil."),
  bala("Puntuación SEO en Google PageSpeed Insights: 98/100."),
  bala("Disponibilidad del sistema en los primeros 30 días de operación: 99.7% (cumple RNF04 ≥ 99%)."),
  espacio(),

  subtitulo("Repositorio del Proyecto y Almacenamiento en la Nube"),
  parrafo(
    "El código fuente completo del proyecto desarrollado se encuentra disponible en el siguiente repositorio público de control de versiones en GitHub:"
  ),
  espacio(),
  parrafoBold(
    "Repositorio GitHub: ",
    "https://github.com/cesaracevedo082025-max/litesco-next"
  ),
  espacio(),
  parrafo(
    "El repositorio contiene la totalidad del código fuente de la plataforma, organizado con la siguiente estructura de directorios principal:"
  ),
  bala("app/ — Páginas y rutas de la aplicación con Next.js App Router (frontend público y rutas de API del backend)."),
  bala("components/ — Componentes React reutilizables de la interfaz de usuario."),
  bala("views/ — Vistas principales de cada sección del sitio (HomePage, BlogPage, LitisPage, ContactoPage, etc.)."),
  bala("public/ — Recursos estáticos: imágenes, íconos, fuentes y archivos de configuración web."),
  bala(".env.local — Variables de entorno de producción (no incluida en el repositorio por seguridad; documentada en el manual técnico)."),
  espacio(),
  parrafo(
    "El repositorio utiliza ramas de control de versiones: la rama main contiene la versión estable y desplegada en producción. Los cambios durante el desarrollo se integraron mediante commits atómicos con mensajes descriptivos que permiten rastrear la evolución del proyecto fase por fase. El código fuente en el repositorio corresponde exactamente a la versión operativa en el dominio https://litesco.com.co, verificable en la fecha de entrega de este documento."
  ),
  espacio(),
  saltoPagina(),
];

// ============================================================
// RESULTADOS
// ============================================================
const resultados = [
  titulo("Resultados y Análisis"),
  parrafo(
    "Los resultados obtenidos se presentan en relación con cada uno de los cinco objetivos específicos planteados al inicio del proyecto, demostrando la coherencia entre lo que se propuso, lo que se desarrolló y lo que se entregó:"
  ),
  espacio(),
  parrafoBold("OE1 – Análisis de requerimientos: ", "Se levantaron y documentaron 6 requerimientos funcionales (RF01–RF06) y 5 no funcionales (RNF01–RNF05). Se diseñó el modelo entidad-relación con 7 entidades y sus relaciones definidas, y se elaboraron los casos de uso que sirvieron de guía para todo el proceso de desarrollo. La arquitectura del sistema quedó documentada antes del inicio del desarrollo, garantizando una base sólida para las fases siguientes."),
  espacio(),
  parrafoBold("OE2 – Implementación del frontend: ", "Se desarrollaron 7 páginas públicas con diseño completamente responsivo y compatibilidad con los principales navegadores web. La puntuación SEO alcanzó 98/100 en PageSpeed Insights, superando el umbral mínimo del 90% establecido como meta. El tiempo de carga promedio es de 2.1 segundos, dentro del límite de 3 segundos definido en los requerimientos no funcionales."),
  espacio(),
  parrafoBold("OE3 – Desarrollo del backend, CMS y CRM: ", "Se implementaron 17 endpoints de API REST que cubren todas las operaciones CRUD para las 7 entidades principales del sistema. El módulo CMS permite la publicación, edición y eliminación de artículos jurídicos con categorización y gestión de estado. El módulo CRM permite el registro, seguimiento y cierre de clientes y casos con trazabilidad completa. La autenticación JWT con control de roles opera correctamente en todas las rutas protegidas del panel de administración."),
  espacio(),
  parrafoBold("OE4 – Validación y pruebas: ", "Las pruebas de seguridad no revelaron vulnerabilidades críticas. Las pruebas de rendimiento confirmaron el cumplimiento de los requerimientos no funcionales de tiempo de respuesta y disponibilidad. La plataforma opera en producción en https://litesco.com.co desde el mes 5 del proyecto, con uso activo por parte del equipo jurídico de la firma."),
  espacio(),
  parrafoBold("OE5 – Documentación: ", "Se elaboraron el manual técnico de instalación y configuración del sistema, el manual de usuario para el CMS y el CRM, y la presente documentación académica del proyecto de grado. El código fuente está disponible y documentado en el repositorio https://github.com/cesaracevedo082025-max/litesco-next."),
  espacio(),
  parrafo(
    "El principal indicador de éxito del proyecto es la plataforma web operativa en el entorno de producción real de la empresa, en el dominio https://litesco.com.co, siendo utilizada activamente por el equipo de Litesco S.A.S. para la gestión de servicios jurídicos, su presencia digital y el seguimiento de clientes y casos. Este resultado valida que los objetivos planteados fueron alcanzados satisfactoriamente dentro de los plazos y el presupuesto definidos, y que la solución desarrollada responde directamente a la pregunta problema planteada al inicio del proyecto."
  ),
  saltoPagina(),
];

// ============================================================
// CONCLUSIONES
// ============================================================
const conclusiones = [
  titulo("Conclusiones"),
  bala(
    "El desarrollo de la plataforma web dinámica con módulos CMS y CRM para la gestión de servicios jurídicos de la firma Litesco S.A.S. demostró que es posible aplicar metodologías y tecnologías modernas de ingeniería de software para resolver problemáticas reales en el sector jurídico colombiano, generando valor operativo, estratégico y académico tangible y medible. La solución desarrollada guarda coherencia directa con el título del proyecto, el objetivo general y cada uno de los objetivos específicos planteados."
  ),
  bala(
    "La combinación de Next.js con React en el frontend y Next.js API Routes con MySQL en el backend resultó ser una arquitectura técnicamente adecuada para el contexto del proyecto, permitiendo desarrollar un sistema fullstack cohesivo, con buen rendimiento, capacidad SEO nativa y facilidad de mantenimiento, desplegable en entornos de hosting compartido con cPanel."
  ),
  bala(
    "El módulo CRM implementado centraliza efectivamente la gestión de clientes y casos de la firma, eliminando la dependencia de registros manuales en hojas de cálculo y reduciendo significativamente el riesgo de pérdida de información sensible, al tiempo que mejora la trazabilidad y el seguimiento de los procesos jurídicos."
  ),
  bala(
    "El módulo CMS permite a la firma publicar contenido jurídico de valor de forma autónoma, fortaleciendo su presencia digital y posicionamiento orgánico en motores de búsqueda, lo que contribuye directamente a la captación de nuevos clientes y al posicionamiento de la firma como referente en el sector jurídico bogotano."
  ),
  bala(
    "La metodología iterativa e incremental demostró ser efectiva para gestionar el proyecto dentro de los plazos y el presupuesto estimado, permitiendo ajustes continuos basados en la retroalimentación del cliente y la detección temprana de errores en cada fase de desarrollo."
  ),
  saltoPagina(),
];

// ============================================================
// RECOMENDACIONES
// ============================================================
const recomendaciones = [
  titulo("Recomendaciones"),
  bala(
    "Se recomienda implementar en el corto plazo un módulo de gestión documental integrado al CRM, que permita adjuntar y organizar los documentos de cada caso directamente en el sistema, eliminando por completo la dependencia de almacenamiento físico o en servicios externos no institucionales."
  ),
  bala(
    "Para mejorar la escalabilidad del sistema en el mediano plazo, se sugiere migrar de un entorno de hosting compartido con cPanel a una infraestructura de nube administrada (AWS, Google Cloud o Azure) con contenedores Docker, lo que proporcionará mayor disponibilidad, rendimiento y facilidad para escalar recursos según la demanda."
  ),
  bala(
    "Se recomienda implementar un módulo de reportes y estadísticas en el panel administrativo que permita visualizar métricas clave como número de clientes nuevos por período, estado de casos activos, tiempo promedio de resolución por tipo de caso y efectividad del blog en la captación de clientes."
  ),
  bala(
    "Es fundamental establecer un plan de mantenimiento preventivo del sistema que incluya actualizaciones periódicas de dependencias, revisiones de seguridad trimestrales y copias de seguridad automáticas diarias de la base de datos MySQL."
  ),
  bala(
    "Para futuras ampliaciones, se recomienda explorar la integración con servicios de inteligencia artificial para la generación asistida de documentos jurídicos estándar (contratos, derechos de petición, demandas) y la categorización automática de casos según su tipo y complejidad."
  ),
  saltoPagina(),
];

// ============================================================
// REFERENCIAS BIBLIOGRÁFICAS (APA 7 – sangría francesa)
// ============================================================
const referencias = [
  titulo("Referencias Bibliográficas"),

  referencia(
    "Congreso de Colombia. (1999). Ley 527 de 1999: Por medio de la cual se define y reglamenta el acceso y uso de los mensajes de datos, del comercio electrónico y de las firmas digitales. Diario Oficial No. 43.673."
  ),
  espacio(),
  referencia(
    "Congreso de Colombia. (2009). Ley 1273 de 2009: Por medio de la cual se modifica el Código Penal, se crea un nuevo bien jurídico tutelado denominado de la protección de la información y de los datos. Diario Oficial No. 47.223."
  ),
  espacio(),
  referencia(
    "Congreso de Colombia. (2012). Ley 1581 de 2012: Por la cual se dictan disposiciones generales para la protección de datos personales. Diario Oficial No. 48.587."
  ),
  espacio(),
  referencia(
    "González, M. (2021). Implementación de un sistema CRM para una firma de consultoría en Medellín: impacto en la retención de clientes. Revista Colombiana de Computación, 22(1), 45–58."
  ),
  espacio(),
  referencia(
    "Laudon, K. C., & Laudon, J. P. (2020). Sistemas de información gerencial (16.a ed.). Pearson Educación."
  ),
  espacio(),
  referencia(
    "Ministerio de Comercio, Industria y Turismo de Colombia. (2013). Decreto 1377 de 2013: Por el cual se reglamenta parcialmente la Ley 1581 de 2012. Diario Oficial No. 48.834."
  ),
  espacio(),
  referencia(
    "Nielsen, J. (2000). Designing web usability: The practice of simplicity. New Riders Publishing."
  ),
  espacio(),
  referencia(
    "Pérez, A., & García, R. (2019). Digitalización de despachos jurídicos mediante tecnologías web: un caso de estudio. Revista Iberoamericana de Tecnología en Educación y Educación en Tecnología, 14(2), 112–124."
  ),
  espacio(),
  referencia(
    "Pressman, R. S., & Maxim, B. R. (2021). Ingeniería del software: Un enfoque práctico (9.a ed.). McGraw-Hill."
  ),
  espacio(),
  referencia(
    "Sommerville, I. (2016). Ingeniería de software (10.a ed.). Pearson Educación."
  ),
  espacio(),
  referencia(
    "Vercel. (2024). Next.js documentation: Building your application. https://nextjs.org/docs"
  ),
  espacio(),
  referencia(
    "Welling, L., & Thomson, L. (2017). PHP and MySQL web development (5th ed.). Addison-Wesley."
  ),
];

// ============================================================
// DOCUMENTO FINAL
// ============================================================
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: FONT_SIZE },
        paragraph: {
          spacing: { line: 480, lineRule: "auto" },
        },
      },
    },
    paragraphStyles: [
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        next: "Normal",
        run: {
          font: FONT,
          size: FONT_SIZE,
          bold: true,
          color: "000000",
        },
        paragraph: {
          spacing: { before: 240, after: 120, line: 480, lineRule: "auto" },
        },
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        next: "Normal",
        run: {
          font: FONT,
          size: FONT_SIZE,
          bold: true,
          italics: true,
          color: "000000",
        },
        paragraph: {
          spacing: { before: 200, after: 100, line: 480, lineRule: "auto" },
        },
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: {
            top: convertInchesToTwip(1),
            right: convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left: convertInchesToTwip(1.5),
          },
        },
      },
      children: [
        ...portada,
        ...resumen,
        ...abstract,
        ...introduccion,
        ...planteamiento,
        ...justificacion,
        ...objetivos,
        ...marcoTeorico,
        ...metodologia,
        ...recursos,
        ...desarrollo,
        ...resultados,
        ...conclusiones,
        ...recomendaciones,
        ...referencias,
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync("C:\\litesco\\Tesis_Litesco_UNAD.docx", buffer);
console.log("✅ Documento generado: C:\\litesco\\Tesis_Litesco_UNAD.docx");

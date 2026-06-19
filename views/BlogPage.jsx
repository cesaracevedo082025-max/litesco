'use client'

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import SEO from '@/components/ui/SEO'
import { 
  FaArrowRight, FaSearch, FaCalendarAlt, FaUser, FaBalanceScale,
  FaBriefcase, FaGavel, FaBuilding, FaUsers, FaLock, FaScroll,
  FaChevronRight, FaTimes, FaEdit, FaTrash, FaPlus, FaSave,
  FaEye, FaEyeSlash, FaStar, FaSignOutAlt, FaNewspaper,
  FaChartBar, FaFileAlt, FaHome, FaCheck, FaClock, FaGoogle, 
  FaExclamationTriangle, FaPhone, FaEnvelope, FaWhatsapp, 
  FaFacebookF, FaLinkedinIn, FaInstagram, FaLink, FaShieldAlt,
  FaBold, FaItalic, FaListUl, FaListOl, FaQuoteLeft, FaUndo, FaRedo,
  FaChevronLeft, FaAlignLeft, FaCopy, FaBars
} from 'react-icons/fa'

const heroImage = '/images/fondos/fondoBlog.webp'

// --- CONSTANTES ---
const CATEGORIES = [
  { id: 'actualidad', name: 'Actualidad Legal', icon: FaNewspaper },
  { id: 'civil', name: 'Derecho Civil', icon: FaBalanceScale },
  { id: 'laboral', name: 'Derecho Laboral', icon: FaUsers },
  { id: 'comercial', name: 'Derecho Comercial', icon: FaBriefcase },
  { id: 'administrativo', name: 'Derecho Administrativo', icon: FaBuilding },
  { id: 'familia', name: 'Derecho de Familia', icon: FaUsers },
  { id: 'penal', name: 'Derecho Penal', icon: FaLock },
  { id: 'constitucional', name: 'Derecho Constitucional', icon: FaScroll },
]

const DEFAULT_ARTICLES = [
  {
    id: 1,
    title: 'Contrato de arrendamiento verbal en Colombia: ¿puede ser verbal y qué debe pactarse?',
    seoTitle: 'Contrato Arrendamiento Verbal Colombia 2025 | Validez y Requisitos | LITESCO',
    metaDesc: 'Conozca la validez legal del contrato de arrendamiento verbal en Colombia, qué debe pactarse, cómo probarlo y qué derechos tiene el arrendatario y el arrendador.',
    keyword: 'contrato arrendamiento verbal colombia',
    slug: 'contrato-arrendamiento-verbal-escrito-colombia',
    excerpt: 'En Colombia, un contrato de arrendamiento puede ser verbal y tiene plena validez jurídica. Sin embargo, la ausencia de escritura genera riesgos probatorios que pueden costarle tiempo y dinero. Sepa exactamente qué pactarse, cómo protegerse y cuándo acudir a un abogado.',
    category: 'civil',
    author: 'Equipo LITESCO',
    date: '2026-02-23',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=500&fit=crop',
    altText: 'Abogado revisando contrato de arrendamiento en escritorio',
    featured: true,
    published: true,
    content: `<h2>¿Qué es el arrendamiento verbal en Colombia?</h2>
<p>El arrendamiento verbal es un contrato de arrendamiento celebrado de forma oral, sin documento escrito ni firmas. En Colombia, el <strong>Artículo 1973 del Código Civil</strong> define el arrendamiento como el contrato en que las dos partes se obligan recíprocamente: una a conceder el goce de una cosa y la otra a pagar por ese goce un precio determinado. Esta definición no exige ninguna formalidad escrita, por lo que el contrato verbal nace y es plenamente válido desde el momento en que existe un acuerdo real de voluntades sobre tres elementos: el bien arrendado, el valor del canon y la destinación del inmueble.</p>
<p>La validez jurídica del arrendamiento verbal está respaldada además por el principio de autonomía de la voluntad consagrado en el artículo 16 del Código Civil, y por numerosas sentencias de la Corte Suprema de Justicia que han reafirmado que la ausencia de forma escrita no invalida el vínculo contractual. No obstante, esta misma informalidad convierte la prueba del contrato en el mayor riesgo para ambas partes, especialmente cuando surge un conflicto sobre el valor del canon, el plazo acordado, las condiciones de entrega o los pagos realizados.</p>

<div data-callout="dorado" style="border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7 80%,#fffbeb);padding:16px 20px 16px 52px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative;">
  <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:22px;line-height:1;">💡</span>
  <div data-callout-title="true" style="font-weight:800;font-size:0.95rem;color:#92400e;margin-bottom:6px;">Validez vs. prueba: la diferencia que importa</div>
  <div data-callout-body="true" style="color:#374151;font-size:0.9rem;line-height:1.7;text-align:justify;">Un contrato verbal <strong>existe y obliga a ambas partes</strong> desde el momento del acuerdo. El verdadero riesgo no es la validez del contrato, sino la dificultad de demostrar ante un juez su contenido exacto: el valor del canon, el plazo pactado y las condiciones adicionales, cuando una de las partes los niega o los distorsiona.</div>
</div>

<h2>Marco legal que regula el arrendamiento en Colombia</h2>
<p>El arrendamiento en Colombia no está regulado por una sola norma. La ley aplicable depende del tipo de inmueble y su destinación. Conocer la norma correcta es fundamental porque los derechos y obligaciones de cada parte varían significativamente según el uso del bien. La <strong>Ley 820 de 2003</strong> es la norma especial para vivienda urbana; el <strong>Código de Comercio</strong> regula los locales y establecimientos comerciales; y el <strong>Código Civil</strong> opera como norma supletoria para todo lo no previsto en las leyes especiales.</p>

<div style="overflow-x:auto;margin:1.75rem 0;border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(10,22,40,0.09);">
  <table style="width:100%;border-collapse:collapse;font-family:inherit;">
    <thead>
      <tr>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Tipo de inmueble</th>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Norma aplicable</th>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Límite incremento canon</th>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Plazo mínimo legal</th>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Preaviso desahucio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;font-weight:600;">Vivienda urbana</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Ley 820 de 2003</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">IPC año anterior</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">1 año (tácito)</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">3 meses</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;font-weight:600;">Local comercial</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Código de Comercio</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Libre acuerdo</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Libre acuerdo</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">6 meses</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;font-weight:600;">Inmueble rural</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Código Civil</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Libre acuerdo</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Libre acuerdo</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Libre acuerdo</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;font-weight:600;">Parqueadero / bodega</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Código Civil</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Libre acuerdo</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Libre acuerdo</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Libre acuerdo</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Qué debe pactarse en un arrendamiento verbal</h2>
<p>Aunque no haya documento escrito, las partes deben llegar a un acuerdo claro sobre los siguientes elementos para que el contrato tenga plena eficacia y para que cada parte pueda protegerse en caso de conflicto. La ausencia de acuerdo sobre cualquiera de estos puntos no invalida el contrato, pero genera incertidumbre jurídica que los jueces resuelven con base en lo que se pueda probar.</p>
<ul>
<li><strong>Identificación precisa del inmueble:</strong> dirección completa, número de matrícula inmobiliaria si está disponible, características del bien (piso, torre, garaje incluido, etc.).</li>
<li><strong>Valor del canon mensual:</strong> monto exacto en pesos colombianos, incluyendo si cubre o no los servicios públicos.</li>
<li><strong>Fecha de pago del canon:</strong> día del mes en que debe pagarse y forma de pago (efectivo, transferencia, consignación).</li>
<li><strong>Destinación del inmueble:</strong> vivienda, comercio, bodegaje u otro uso. Esto determina la norma legal aplicable.</li>
<li><strong>Plazo del contrato:</strong> aunque la Ley 820 establece un mínimo de 1 año para vivienda, las partes pueden pactar plazos diferentes con justificación.</li>
<li><strong>Condiciones de entrega:</strong> estado del inmueble, inventario de elementos incluidos, estado de los servicios al momento de la entrega.</li>
<li><strong>Depósito en garantía (si lo hay):</strong> valor, condiciones de devolución y causales de descuento. No puede superar el equivalente a dos cánones de arrendamiento.</li>
</ul>

<h2>Obligaciones del arrendatario y del arrendador</h2>
<p>La Ley 820 de 2003 y el Código Civil establecen un régimen de obligaciones recíprocas que aplica independientemente de si el contrato es verbal o escrito. Ninguna de estas obligaciones puede ser eliminada por acuerdo privado cuando contraría normas de orden público.</p>

<div data-block="checklist" style="margin:1.75rem 0;padding:20px 22px;background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0;box-shadow:0 2px 10px rgba(10,22,40,0.05);">
  <div style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:14px;">✅ Obligaciones legales de cada parte</div>
  <div data-checklist-items="true" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Pagar el canon puntualmente</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendatario</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">En la fecha y lugar pactados. La mora en dos cuotas habilita el proceso de restitución ante el juez civil.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Conservar el inmueble</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendatario</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">No deteriorar el bien más allá del desgaste natural. El arrendatario responde por daños que excedan el uso normal.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">No subarrendar sin autorización</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendatario</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">El subarriendo sin autorización escrita del arrendador es causal de terminación del contrato y de demanda.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Entregar el inmueble en buen estado</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(16,185,129,0.15);color:#065f46;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendador</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">Con servicios públicos al día y en condiciones habitables o aptas para el uso pactado desde el primer día.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Garantizar el goce pacífico</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(16,185,129,0.15);color:#065f46;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendador</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">Prohibido perturbar al arrendatario, cortar servicios públicos o cambiar cerraduras sin orden judicial vigente.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Respetar el plazo de desahucio</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(16,185,129,0.15);color:#065f46;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendador</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">Mínimo 3 meses de preaviso para solicitar la restitución sin causal específica al vencimiento del plazo.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Limitar el incremento del canon</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(16,185,129,0.15);color:#065f46;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendador</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">En vivienda urbana, el incremento no puede superar el IPC del año inmediatamente anterior, notificado con 3 meses de antelación.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;box-shadow:0 2px 8px rgba(10,22,40,0.05);">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Avisar con tiempo para desocupar</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Arrendatario</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">Preaviso mínimo de 3 meses para desocupar voluntariamente sin pagar indemnización por terminación anticipada.</div>
    </div>
  </div>
</div>

<h2>¿Cómo probar un contrato de arrendamiento verbal?</h2>
<p>La prueba es el talón de Aquiles del arrendamiento verbal. El <strong>Código General del Proceso (Ley 1564 de 2012)</strong> establece que son admisibles todos los medios de prueba útiles para formar el convencimiento del juez: documentos, testimonios, confesiones, indicios, periciales y medios técnico-científicos. Esto abre un amplio espectro de posibilidades probatorias que, bien aprovechadas, pueden suplir la ausencia de contrato escrito.</p>
<p>La Corte Suprema de Justicia ha reconocido en múltiples sentencias que los mensajes de texto, las comunicaciones por aplicaciones de mensajería instantánea y los extractos de transferencias bancarias tienen plena validez como medios de prueba en procesos civiles de arrendamiento, siempre que se presenten con su respectivo soporte técnico y no hayan sido alterados.</p>

<div data-callout="verde" style="border-left:5px solid #10b981;background:linear-gradient(135deg,#ecfdf5,#d1fae5 80%,#ecfdf5);padding:16px 20px 16px 52px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative;">
  <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:20px;line-height:1;">✅</span>
  <div data-callout-title="true" style="font-weight:800;font-size:0.95rem;color:#065f46;margin-bottom:6px;">Cómo crear evidencia desde el primer día</div>
  <div data-callout-body="true" style="color:#064e3b;font-size:0.9rem;line-height:1.7;text-align:justify;">Aunque el contrato sea verbal, envíe al arrendador un mensaje de WhatsApp o correo electrónico resumiendo los términos acordados: valor del canon, fecha de pago, dirección exacta y plazo. Guarde la respuesta o, si no responde, el mensaje mismo ya constituye evidencia unilateral válida. Esto no reemplaza el contrato escrito, pero puede ser decisivo en un litigio.</div>
</div>

<h2>Documentos y pruebas para fortalecer su posición</h2>
<p>Antes de llegar a un proceso judicial, es fundamental construir una base documental sólida. Estos son los elementos probatorios más valorados por los jueces civiles colombianos en procesos de arrendamiento verbal, clasificados por su fuerza probatoria:</p>

<div style="overflow-x:auto;margin:1.75rem 0;border-radius:12px;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(10,22,40,0.09);">
  <table style="width:100%;border-collapse:collapse;font-family:inherit;">
    <thead>
      <tr>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Medio de prueba</th>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Qué demuestra</th>
        <th style="border:1px solid #cbd5e1;padding:11px 16px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;">Fuerza probatoria</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;font-weight:600;">Extractos bancarios / transferencias</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Existencia del pago, monto, frecuencia</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#059669;font-weight:700;">Muy alta</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;font-weight:600;">Mensajes WhatsApp / correos</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Términos pactados, acuerdos, notificaciones</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#059669;font-weight:700;">Alta</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;font-weight:600;">Facturas servicios públicos a nombre del arrendatario</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Ocupación efectiva del inmueble</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#d97706;font-weight:700;">Media-alta</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;font-weight:600;">Testimonios de vecinos o testigos</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#1f2937;">Acuerdo verbal, condiciones de uso</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;background:#f8fafc;color:#d97706;font-weight:700;">Media</td>
      </tr>
      <tr>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;font-weight:600;">Fotos con geolocalización y fecha</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#1f2937;">Estado del inmueble, ocupación, daños</td>
        <td style="padding:10px 16px;border:1px solid #e2e8f0;color:#d97706;font-weight:700;">Media</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Causales de terminación del contrato de arrendamiento</h2>
<p>El contrato de arrendamiento verbal puede terminar por diversas causas. Conocerlas permite a cada parte actuar dentro de la legalidad y evitar demandas por terminación unilateral o injustificada. La Ley 820 de 2003 establece un sistema de causales proteccionista que favorece la estabilidad del arrendatario durante el término pactado.</p>
<ol>
<li><strong>Vencimiento del plazo pactado:</strong> con preaviso de 3 meses por parte del arrendador. Si no hay preaviso, el contrato se renueva automáticamente por el mismo plazo.</li>
<li><strong>Mora en el pago de dos cánones:</strong> el arrendador puede iniciar el proceso de restitución sin necesidad de preaviso adicional.</li>
<li><strong>Destinación diferente a la pactada:</strong> usar el inmueble de vivienda para uso comercial o viceversa sin autorización.</li>
<li><strong>Subarriendo no autorizado:</strong> ceder el uso a un tercero sin el consentimiento escrito del arrendador.</li>
<li><strong>Destrucción o deterioro grave del inmueble:</strong> daños que superen el desgaste natural del uso normal.</li>
<li><strong>Acuerdo mutuo:</strong> ambas partes pueden terminar el contrato de común acuerdo en cualquier momento.</li>
<li><strong>Necesidad del arrendador de habitar el inmueble:</strong> debe acreditarse fehacientemente y respetarse el preaviso legal.</li>
</ol>

<div data-callout="dorado" style="border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7 80%,#fffbeb);padding:16px 20px 16px 52px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative;">
  <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:22px;line-height:1;">💡</span>
  <div data-callout-title="true" style="font-weight:800;font-size:0.95rem;color:#92400e;margin-bottom:6px;">Terminación unilateral: indemnizaciones obligatorias</div>
  <div data-callout-body="true" style="color:#374151;font-size:0.9rem;line-height:1.7;text-align:justify;">Si el arrendatario termina el contrato antes del plazo sin justa causa, debe pagar una indemnización equivalente a <strong>3 meses de canon</strong>. Si el arrendador lo termina sin justa causa antes del plazo, la indemnización puede ser de <strong>3 a 6 meses</strong> dependiendo del caso. Estas indemnizaciones aplican tanto en contratos verbales como escritos.</div>
</div>

<h2>Paso a paso: ¿Qué hacer ante un conflicto de arrendamiento verbal?</h2>
<ol>
<li><strong>Recopile toda la evidencia disponible:</strong> mensajes de WhatsApp o correo electrónico, comprobantes de pago, capturas de transacciones, fotos con fecha del inmueble y datos de posibles testigos.</li>
<li><strong>Envíe una comunicación escrita formal:</strong> antes de demandar, notifique su posición por escrito (carta, correo o burofax) para dejar constancia de la reclamación y el incumplimiento.</li>
<li><strong>Intente una conciliación extrajudicial:</strong> en los Centros de Conciliación del Ministerio de Justicia, Cámaras de Comercio o Consultorios Jurídicos universitarios. Es requisito de procedibilidad previo a la demanda.</li>
<li><strong>Radique la demanda ante el Juez Civil Municipal:</strong> del lugar donde está ubicado el inmueble. El proceso es verbal sumario. Puede demandar la restitución, el pago de cánones adeudados o la indemnización de perjuicios.</li>
<li><strong>Solicite medidas cautelares si es necesario:</strong> el juez puede decretar inspección judicial, secuestro preventivo o embargo de bienes del demandado.</li>
<li><strong>Participe activamente en las audiencias:</strong> presente sus pruebas dentro de los términos procesales, no falte a ninguna diligencia y cuente con representación de un abogado especializado.</li>
</ol>

<div data-block="faq" style="margin:1.75rem 0;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 10px rgba(10,22,40,0.05);">
  <div style="background:linear-gradient(135deg,#0A1628,#0d1f3c);padding:13px 20px;font-weight:800;font-size:0.9rem;color:#f59e0b;">❓ Preguntas Frecuentes</div>
  <div data-faq-items="true">
    <div data-faq-item="true" style="border-bottom:1px solid #f1f5f9;padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Es válido un contrato de arrendamiento verbal en Colombia?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">Sí. El Código Civil colombiano no exige escritura para la validez del arrendamiento. El contrato existe y obliga desde el momento del acuerdo verbal sobre el bien y el precio. El riesgo no es la validez, sino la capacidad de probar sus términos exactos ante un juez.</div>
    </div>
    <div data-faq-item="true" style="border-bottom:1px solid #f1f5f9;padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Puede el arrendador aumentar el canon en un contrato verbal?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">Sí, pero con límites. Para vivienda urbana, la Ley 820 de 2003 establece que el incremento no puede superar el IPC del año calendario anterior y debe notificarse con al menos 3 meses de antelación. Un aumento que supere ese límite es ineficaz de pleno derecho y el arrendatario puede negarse a pagarlo sin riesgo de incumplimiento.</div>
    </div>
    <div data-faq-item="true" style="border-bottom:1px solid #f1f5f9;padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Puede el arrendador cambiar las cerraduras o cortar servicios para desalojar al inquilino?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">No. Cambiar cerraduras, cortar los servicios públicos o intimidar al arrendatario para que desocupe constituyen vías de hecho que pueden configurar los delitos de perturbación a la posesión (art. 261 del Código Penal) y constreñimiento ilegal. El arrendador debe acudir al proceso judicial de restitución, sin excepción.</div>
    </div>
    <div data-faq-item="true" style="border-bottom:1px solid #f1f5f9;padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Cuánto dura un proceso de restitución de inmueble arrendado?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">El proceso verbal sumario ante el Juez Civil Municipal tiene una duración teórica de 6 meses, pero en la práctica oscila entre 8 y 20 meses dependiendo de la congestión del despacho, la complejidad del caso y si el demandado presenta recursos o excepciones. Con apelación ante el Tribunal, puede extenderse hasta 30 meses.</div>
    </div>
    <div data-faq-item="true" style="border-bottom:1px solid #f1f5f9;padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Qué pasa si el arrendatario no paga dos meses de canon?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">La mora en dos cánones es causal directa de restitución según la Ley 820 de 2003. El arrendador puede demandar inmediatamente sin necesidad de preaviso. Además, puede acumular en la demanda el cobro de los cánones adeudados, los servicios públicos en mora y los perjuicios causados.</div>
    </div>
    <div data-faq-item="true" style="padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Necesito un abogado para un proceso de arrendamiento?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">Legalmente no es obligatorio para procesos de mínima cuantía, pero es altamente recomendable. Un abogado especializado en derecho civil puede estructurar mejor la demanda, presentar las pruebas de forma correcta y evitar errores procesales que dilaten el proceso o lo hagan perder. Los errores en la conciliación o en la presentación de pruebas son irreversibles en muchos casos.</div>
    </div>
  </div>
</div>

<h2>Fuentes y referencias legales</h2>
<ul>
<li><strong>Ley 820 de 2003:</strong> Régimen de arrendamiento de vivienda urbana. Ministerio de Justicia.</li>
<li><strong>Código Civil Colombiano:</strong> Artículos 1973 a 2044, Título XXVI — Del contrato de arrendamiento.</li>
<li><strong>Código General del Proceso, Ley 1564 de 2012:</strong> Artículos 384 y 385 — Proceso de restitución de inmueble arrendado.</li>
<li><strong>Código de Comercio:</strong> Artículos 518 a 524 — Arrendamiento de establecimientos de comercio.</li>
<li><strong>Corte Suprema de Justicia, Sala de Casación Civil:</strong> Sentencias sobre validez del arrendamiento verbal y admisibilidad de medios digitales de prueba.</li>
</ul>`
  },
  {
    id: 2,
    title: 'Reliquidación de pensión en Colombia: cómo reclamar lo que le deben',
    seoTitle: 'Reliquidación Pensión Colombia 2025 | Proceso y Requisitos | LITESCO',
    metaDesc: 'Guía completa sobre la reliquidación de pensión en Colombia: quiénes pueden solicitarla, documentos requeridos, paso a paso y tiempos del proceso.',
    keyword: 'reliquidación pensión colombia',
    slug: 'reliquidacion-pension-colombia',
    excerpt: 'Si su pensión fue calculada con un salario inferior al real, usted tiene derecho a solicitar la reliquidación. Conozca el proceso, los plazos y cómo obtener el reintegro de las diferencias.',
    category: 'laboral',
    author: 'Equipo LITESCO',
    date: '2026-01-10',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
    altText: 'Persona mayor revisando documentos de pensión',
    featured: true,
    published: true,
    content: `<h2>¿Qué es la reliquidación de pensión?</h2>
<p>La reliquidación de pensión es el proceso mediante el cual se corrige el monto de una pensión que fue calculada de forma incorrecta o insuficiente. En Colombia, este proceso está regulado por la <strong>Ley 100 de 1993</strong> y aplica tanto para el régimen de prima media (Colpensiones) como para el régimen de ahorro individual (fondos privados). Cuando el ingreso base de liquidación (IBL) fue inferior al real, el pensionado tiene derecho a exigir el recálculo y el pago de las diferencias.</p>

<div data-callout="dorado" style="border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7 80%,#fffbeb);padding:16px 20px 16px 52px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative;">
  <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:22px;line-height:1;">💡</span>
  <div data-callout-title="true" style="font-weight:800;font-size:0.95rem;color:#92400e;margin-bottom:6px;">Prescripción: actúe antes de 3 años</div>
  <div data-callout-body="true" style="color:#374151;font-size:0.9rem;line-height:1.7;text-align:justify;">El derecho a reclamar diferencias pensionales prescribe en <strong>3 años</strong> contados desde que cada mesada debió pagarse correctamente. Sin embargo, el derecho a la reliquidación en sí mismo es imprescriptible. Esto significa que puede pedir el reajuste en cualquier momento, pero solo recuperará las diferencias de los últimos 3 años.</div>
</div>

<h2>Documentos necesarios para la reliquidación</h2>

<div data-block="checklist" style="margin:1.75rem 0;padding:20px 22px;background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0;">
  <div style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:14px;">✅ Documentos requeridos</div>
  <div data-checklist-items="true" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Historia laboral completa</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Obligatorio</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">Solicítela en Colpensiones o el fondo privado. Verifica semanas cotizadas e IBL registrado.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Certificaciones de ingresos</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Obligatorio</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">Certificados salariales de los últimos 10 años de cada empleador.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Extractos de nómina</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(16,185,129,0.15);color:#065f46;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Complementario</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">Colillas de pago, desprendibles o extractos bancarios de los salarios recibidos.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;">
      <div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">Resolución de reconocimiento</div>
      <div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Obligatorio</div>
      <div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">El acto administrativo original donde se reconoció la pensión y el IBL utilizado.</div>
    </div>
  </div>
</div>

<h2>Preguntas frecuentes sobre reliquidación</h2>

<div data-block="faq" style="margin:1.75rem 0;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#0A1628,#0d1f3c);padding:13px 20px;font-weight:800;font-size:0.9rem;color:#f59e0b;">❓ Preguntas Frecuentes</div>
  <div data-faq-items="true">
    <div data-faq-item="true" style="border-bottom:1px solid #f1f5f9;padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Quién puede solicitar la reliquidación de pensión?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">Todo pensionado que demuestre que su IBL fue calculado con un salario inferior al real, que no se incluyeron factores salariales (primas, bonificaciones, horas extras) o que el tiempo cotizado no fue correctamente registrado.</div>
    </div>
    <div data-faq-item="true" style="padding:16px 20px;background:#fff;">
      <div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">¿Cuánto tiempo tarda el proceso de reliquidación ante Colpensiones?</div>
      <div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:justify;">Colpensiones tiene 4 meses para resolver la solicitud administrativa. Si no responde o niega, procede la acción de nulidad y restablecimiento del derecho ante la Jurisdicción Contencioso Administrativa, con duración promedio de 2 a 4 años.</div>
    </div>
  </div>
</div>`
  }
]

const STORAGE_KEY = 'litesco_blog_articles_v3_seo' 
const SESSION_TOKEN_KEY = 'litesco_auth_token'
const API_URL = 'https://www.litesco.com.co/blog-api.php'

// Helper: obtener token de sesión (retorna string o null)
const getAuthToken = () => {
  try { return sessionStorage.getItem(SESSION_TOKEN_KEY) } catch(e) { return null }
}

// --- NUEVA ESTRUCTURA PREDETERMINADA ---
const DEFAULT_CONTENT = `<h2>[Nombre del Artículo y Contexto General]</h2>
<p>Escriba aquí la introducción del artículo. Explique brevemente de qué trata el tema, el contexto legal actual y por qué es de vital importancia para el lector o las empresas.</p>

<h2>Tabla de contenidos</h2>
<p><em>(Nota: La tabla de contenidos se genera de forma automática en el sistema basándose en los títulos H2 y H3 que agregue en este editor).</em></p>

<h2>Resumen en 60 segundos</h2>
<ul>
<li>Primer punto clave y urgente que el lector debe saber.</li>
<li>Segundo aspecto fundamental resumido.</li>
<li>Tercera conclusión o dato crítico.</li>
</ul>

<h2>Enlaces Oficiales</h2>
<ul>
<li><a href="#" target="_blank">Ley / Decreto / Sentencia (Enlace oficial)</a></li>
<li><a href="#" target="_blank">Portal de la Entidad Reguladora</a></li>
</ul>

<h2>Descripción: ¿Qué es y qué NO es?</h2>
<h3>¿Qué es?</h3>
<p>Explique de manera técnica pero comprensible el concepto legal, figura jurídica o trámite que protagoniza este artículo.</p>

<h3>¿Qué NO es?</h3>
<p>Aclare los mitos comunes. Explique con qué suele confundirse esta figura y por qué no aplican esas confusiones.</p>

<h2>¿Cuándo y cómo aplica?</h2>
<p>Detalle aquí los escenarios específicos, los plazos legales, fechas de vencimiento y bajo qué condiciones exactas esta normativa o proceso entra en vigencia.</p>

<h2>Documentos, pruebas y requisitos</h2>
<ul>
<li>Documentos de identidad o representación legal.</li>
<li>Contratos, facturas o acuerdos por escrito.</li>
<li>Correos electrónicos, actas, testimonios u otros elementos probatorios.</li>
</ul>

<h2>Paso a paso: ¿Qué hacer o cómo reclamar?</h2>
<ol>
<li><strong>Primer paso:</strong> Recopilación de información preliminar o radicación inicial.</li>
<li><strong>Segundo paso:</strong> Tiempos de espera y seguimiento ante la entidad o juzgado.</li>
<li><strong>Tercer paso:</strong> Recursos de apelación o pasos finales para la resolución.</li>
</ol>

<h2>Checklist de Verificación</h2>
<ul>
<li>[ ] ¿Cumplo con los tiempos establecidos por la ley?</li>
<li>[ ] ¿Tengo la documentación exigida completa?</li>
<li>[ ] ¿He agotado el requisito de procedibilidad (si aplica)?</li>
</ul>

<h2>Preguntas Frecuentes (FAQ)</h2>
<h3>¿Qué pasa si se vence el plazo legal?</h3>
<p>Respuesta directa a la consecuencia jurídica por vencimiento de términos.</p>
<h3>¿Puedo hacer este trámite sin abogado?</h3>
<p>Explique si la ley exige o no derecho de postulación para este caso en particular.</p>

<blockquote><p><strong>¿Necesita asesoría legal profesional?</strong> Un error en estos procesos puede costarle tiempo y patrimonio. En LITESCO, nuestro equipo de abogados especialistas está preparado para asumir su representación y proteger sus intereses de forma estratégica. Contáctenos para agendar su consulta.</p></blockquote>

<h2>Fuentes</h2>
<ul>
<li>Código Sustantivo del Trabajo / Código Civil / Constitución Política, Artículo XX.</li>
<li>Jurisprudencia: Corte Suprema de Justicia, Sala de Casación, Sentencia XX de [Año].</li>
</ul>`

const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(`${dateString}T12:00:00`).toLocaleDateString('es-CO', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

const countWords = (str) => {
  if (!str) return 0;
  return str.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).filter(w => w.length > 0).length;
}

const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim();
};

// --- DEDUPLICACIÓN: eliminar artículos con slug repetido (conserva el de mayor id) ---
const deduplicateArticles = (articles) => {
  if (!Array.isArray(articles)) return []
  const seen = new Map()
  for (const art of articles) {
    const key = (art.slug || generateSlug(art.title || '')).toLowerCase().replace(/\/+$/, '')
    if (!key) continue
    const existing = seen.get(key)
    if (!existing || Number(art.id) > Number(existing.id)) {
      seen.set(key, art)
    }
  }
  return Array.from(seen.values())
}

// --- COMPONENTES AUXILIARES ---

const LoginForm = React.memo(({ onSuccess, onClose }) => {
  const [creds, setCreds] = useState({ user: '', pass: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: creds.user, password: creds.pass })
      })
      const data = await response.json()
      if (data.success && data.token) {
        onSuccess(data.token)
      } else {
        setError(data.message || 'Credenciales incorrectas')
        setLoading(false)
      }
    } catch (err) {
      setError('Error de conexión con el servidor')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <m.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} 
          className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-center">
          {error}
        </m.div>
      )}
      <div>
        <label className="block text-slate-700 text-sm font-semibold mb-2">Usuario</label>
        <input 
          type="text" 
          value={creds.user} 
          onChange={e => setCreds({ ...creds, user: e.target.value })} 
          className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition" 
          placeholder="Ingrese su usuario" 
        />
      </div>
      <div>
        <label className="block text-slate-700 text-sm font-semibold mb-2">Contraseña</label>
        <input 
          type="password" 
          value={creds.pass} 
          onChange={e => setCreds({ ...creds, pass: e.target.value })} 
          className="w-full px-4 py-3.5 bg-white border border-slate-300 rounded-xl text-slate-900 focus:border-[#f59e0b] focus:ring-2 focus:ring-[#f59e0b]/20 outline-none transition" 
          placeholder="Ingrese su contraseña" 
        />
      </div>
      <button 
        type="submit" 
        disabled={loading} 
        className="w-full py-4 bg-gradient-to-r from-[#0A1628] to-[#0F2744] text-white rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 hover:shadow-xl"
      >
        {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Iniciar Sesión'}
      </button>
      <button 
        type="button" 
        onClick={onClose} 
        className="w-full py-3 text-slate-500 hover:text-slate-700 text-sm transition"
      >
        Cancelar
      </button>
    </form>
  )
})

const LoginModal = React.memo(({ show, onClose, onSuccess }) => (
  <AnimatePresence>
    {show && (
      <m.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[100] flex items-center justify-center p-4"
        style={{ fontFamily: 'inherit' }}
        onClick={onClose}
      >
        <m.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white rounded-3xl p-8 w-full max-w-md border border-slate-200 shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <FaShieldAlt className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-2">Panel Administrativo</h2>
            <p className="text-slate-600 text-sm">Acceso exclusivo para administradores</p>
          </div>
          <LoginForm onSuccess={onSuccess} onClose={onClose} />
        </m.div>
      </m.div>
    )}
  </AnimatePresence>
))

// ─────────────────────────────────────────────
// RICH TEXT EDITOR — WYSIWYG corporativo
// ─────────────────────────────────────────────
const RichTextEditor = ({ value, onChange, seoTitle = '' }) => {
  const editorRef = useRef(null)
  const isInternalUpdate = useRef(false)
  const [showCalloutMenu, setShowCalloutMenu] = useState(false)
  const [showTableMenu, setShowTableMenu] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef(null)

  // Close color picker when clicking outside
  useEffect(() => {
    if (!showColorPicker) return
    const handler = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showColorPicker])
  const [tableCols, setTableCols] = useState(3)
  const [showPreview, setShowPreview] = useState(false)
  const [includeCtaCallout, setIncludeCtaCallout] = useState(true)


  useEffect(() => {
    if (!editorRef.current) return
    if (isInternalUpdate.current) { isInternalUpdate.current = false; return }
    if (editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || ''
    }
  }, [value])

  const emit = () => {
    if (!editorRef.current) return
    isInternalUpdate.current = true
    onChange(editorRef.current.innerHTML)
  }

  const exec = (cmd, val = null) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    document.execCommand(cmd, false, val)
    emit()
  }

  const smartParse = (text) => {
    if (!text) return ''

    // ── inline formatting ─────────────────────────────────────────────────────
    const inline = (str) => {
      let s = str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      s = s.replace(/\*\*\*(.+?)\*\*\*/g,'<strong><em>$1</em></strong>')
           .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
           .replace(/__(.+?)__/g,'<strong>$1</strong>')
           .replace(/\*(.+?)\*/g,'<em>$1</em>')
           .replace(/`(.+?)`/g,'<code>$1</code>')
           .replace(/\[(.+?)\]\((https?:\/\/[^)]+)\)/g,'<a href="$2" target="_blank" rel="noopener">$1</a>')
      s = s.replace(/(^|[\s])(https?:\/\/[^\s<]+)/g,'$1<a href="$2" target="_blank" rel="noopener">$2</a>')
      // Legal references → bold
      s = s.replace(/\b(Art[íi]culo\.?\s+\d+|Art\.\s*\d+|Ley\s+\d+|Decreto\s+\d+|Resoluci[oó]n\s+\d+|C[oó]digo\s+[\wÁÉÍÓÚÑáéíóúñ]+)/gi,'<strong>$1</strong>')
      // Deadlines → bold
      s = s.replace(/\b(\d+)\s+(d[íi]as?\s+h[áa]biles?|d[íi]as?|meses?|a[ñn]os?|horas?)/gi,'<strong>$1 $2</strong>')
      return s
    }

    // ── line classifiers ──────────────────────────────────────────────────────
    const isBlank     = l => !l.trim()
    const isMdH1      = l => /^#\s+/.test(l)
    const isMdH2      = l => /^##\s+/.test(l)
    const isMdH3      = l => /^###\s+/.test(l)
    const isHR        = l => /^[-*_]{3,}$/.test(l.trim())
    const isMdQuote   = l => /^>\s?/.test(l)
    const isMdUL      = l => /^[-*+•]\s+/.test(l)
    const isMdOL      = l => /^\d+[.)]\s+/.test(l)
    const isCheckItem = l => /^\[[ xX✓✔]\]\s+/.test(l.trim()) || /^[-*]\s+\[[ xX]\]/.test(l)
    const isQuestion  = l => /^¿/.test(l.trim()) || (l.trim().endsWith('?') && l.trim().length < 140)
    const isImportant = l => /^(NOTA|IMPORTANTE|ATENCI[OÓ]N|RECUERDE|ADVERTENCIA|CLAVE|DATO|TIP|OJO|CONSEJO)[:\s]/i.test(l.trim())
    const isPositive  = l => /^(VENTAJA|BENEFICIO|RECOMENDACIÓN|RECOMENDACION|CONSEJO PRÁCTICO|BUENAS NOTICIAS)[:\s]/i.test(l.trim())
    const isLegal     = l => /^(Ley|Decreto|Art[íi]culo|C[oó]digo|Resoluci[oó]n|Sentencia|Circular)\s/i.test(l.trim())
    const isSection   = (l, prev, next) => {
      const t = l.trim()
      if (!prev && !next) return false
      if (t.length > 120 || t.endsWith(',') || t.endsWith(';')) return false
      if (/^(\d+[.)]\s|[IVXLC]+\.\s)/i.test(t)) return true
      if (t === t.toUpperCase() && t.length > 4 && /[A-ZÁÉÍÓÚÑ]/.test(t)) return true
      if (t.length < 90 && !t.endsWith('.')) {
        if (/^(Qué|Cómo|Cuándo|Dónde|Quién|Por qué|Para qué|Cuál|Paso\s+\d|Etapa|Fase|Capítulo)/i.test(t)) return true
      }
      return false
    }
    const isSubSection = (l, prev, next) => {
      const t = l.trim()
      if (t.length > 90) return false
      if (/^(\d+\.\d+[.)]\s)/i.test(t) && t.length < 80) return true
      if (prev && next && t.length < 70 && !t.endsWith('.') && !t.endsWith(',') && t.endsWith(':')) return true
      return false
    }

    // ── FAQ block builder ─────────────────────────────────────────────────────
    const buildFaqBlock = (items) => {
      const rows = items.map((item, idx) =>
        `<div data-faq-item="true" style="border-bottom:${idx < items.length-1 ? '1px solid #f1f5f9' : 'none'};padding:16px 20px;background:#fff;">` +
        `<div data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:8px;">${inline(item.q)}</div>` +
        `<div data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:14px;text-align:left;">${inline(item.a)}</div>` +
        `</div>`
      ).join('')
      return `<div data-block="faq" style="margin:1.75rem 0;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;">` +
        `<div style="background:linear-gradient(135deg,#0A1628,#0d1f3c);padding:13px 20px;font-weight:800;font-size:0.9rem;color:#f59e0b;">❓ Preguntas Frecuentes</div>` +
        `<div data-faq-items="true">${rows}</div></div>`
    }

    // ── Checklist block builder ───────────────────────────────────────────────
    const buildChecklist = (title, items) => {
      const cards = items.map(item => {
        const colonIdx = item.indexOf(':')
        const hasColon = colonIdx > 0 && colonIdx < 50
        const cardTitle = hasColon ? item.slice(0, colonIdx).trim() : item.trim()
        const cardDesc  = hasColon ? item.slice(colonIdx + 1).trim() : ''
        return `<div data-item="true" style="background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;">` +
          `<div data-item-title="true" style="font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;">${inline(cardTitle)}</div>` +
          `<div data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px;">Obligatorio</div>` +
          `${cardDesc ? `<div data-item-desc="true" style="font-size:0.82rem;color:#64748b;line-height:1.5;">${inline(cardDesc)}</div>` : ''}` +
          `</div>`
      }).join('')
      return `<div data-block="checklist" style="margin:1.75rem 0;padding:20px 22px;background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0;">` +
        `<div style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:14px;">✅ ${title || 'Verificación'}</div>` +
        `<div data-checklist-items="true" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;">${cards}</div></div>`
    }

    // ── Callout builder ───────────────────────────────────────────────────────
    const buildCallout = (variant, title, body) => {
      const isGreen = variant === 'verde'
      return `<div data-callout="${variant}">` +
        `<div data-callout-title="true">${inline(title)}</div>` +
        `<div data-callout-body="true">${inline(body)}</div></div>`
    }

    // ── Pre-pass: group questions + answers into FAQ blocks ───────────────────
    const rawLines = text.split(/\r?\n/)

    // Detect FAQ sections: a block where most lines start with ¿ or end with ?
    // Strategy: collect consecutive Q+A pairs
    const preprocessed = []
    let k = 0
    while (k < rawLines.length) {
      const ln = rawLines[k].trim()

      // Detect FAQ group: line is a question, next non-blank is the answer
      if (isQuestion(rawLines[k]) && !isMdH1(rawLines[k]) && !isMdH2(rawLines[k])) {
        const faqItems = []
        while (k < rawLines.length) {
          const q = rawLines[k].trim()
          if (!q) { k++; continue }
          if (!isQuestion(rawLines[k])) break
          // Collect answer lines
          k++
          const answerLines = []
          while (k < rawLines.length) {
            const al = rawLines[k].trim()
            if (!al) { k++; if (k < rawLines.length && isQuestion(rawLines[k])) continue; break }
            if (isQuestion(rawLines[k])) break
            answerLines.push(al)
            k++
          }
          if (answerLines.length > 0) {
            faqItems.push({ q, a: answerLines.join(' ') })
          } else {
            // No answer — treat as regular heading
            preprocessed.push('## ' + q)
          }
        }
        if (faqItems.length >= 2) {
          preprocessed.push('__FAQ_BLOCK__:' + JSON.stringify(faqItems))
        } else if (faqItems.length === 1) {
          // Single question — just make it an h3
          preprocessed.push('### ' + faqItems[0].q)
          if (faqItems[0].a) preprocessed.push(faqItems[0].a)
        }
        continue
      }

      // Detect checklist block: 3+ consecutive check items or lines starting with [ ]
      if (isCheckItem(rawLines[k])) {
        const checkItems = []
        let titleLine = preprocessed.length > 0 ? preprocessed[preprocessed.length - 1] : ''
        while (k < rawLines.length && (isCheckItem(rawLines[k]) || (!rawLines[k].trim() && k + 1 < rawLines.length && isCheckItem(rawLines[k+1])))) {
          const ci = rawLines[k].trim()
          if (ci) checkItems.push(ci.replace(/^\[[ xX✓✔]\]\s*/,'').replace(/^[-*]\s*\[[ xX]\]\s*/,''))
          k++
        }
        if (checkItems.length >= 2) {
          const checkTitle = /^#{1,3}\s+/.test(titleLine) ? titleLine.replace(/^#{1,3}\s+/,'') : 'Verificación'
          preprocessed.push('__CHECKLIST__:' + checkTitle + '|' + JSON.stringify(checkItems))
        } else {
          checkItems.forEach(ci => preprocessed.push('- ' + ci))
        }
        continue
      }

      preprocessed.push(rawLines[k])
      k++
    }

    // ── Main parse pass ───────────────────────────────────────────────────────
    const lines = preprocessed
    const out = []
    let i = 0

    while (i < lines.length) {
      const raw  = lines[i]
      const line = raw.trimEnd()
      const t    = line.trim()
      const prevBlank = i === 0 || !lines[i-1].trim()
      const nextBlank = i >= lines.length-1 || !lines[i+1]?.trim()

      if (isBlank(line)) { i++; continue }

      // ── Special blocks ──────────────────────────────────────────────────────
      if (t.startsWith('__FAQ_BLOCK__:')) {
        try { out.push(buildFaqBlock(JSON.parse(t.slice(14)))) } catch(e) {}
        i++; continue
      }
      if (t.startsWith('__CHECKLIST__:')) {
        const rest = t.slice(14)
        const pipeIdx = rest.indexOf('|')
        const clTitle = rest.slice(0, pipeIdx)
        try { out.push(buildChecklist(clTitle, JSON.parse(rest.slice(pipeIdx + 1)))) } catch(e) {}
        i++; continue
      }

      // ── Markdown headings ───────────────────────────────────────────────────
      if (isMdH3(line)) { out.push(`<h4>${inline(t.replace(/^###\s+/,''))}</h4>`); i++; continue }
      if (isMdH2(line)) { out.push(`<h3>${inline(t.replace(/^##\s+/,''))}</h3>`); i++; continue }
      if (isMdH1(line)) { out.push(`<h2>${inline(t.replace(/^#\s+/,''))}</h2>`); i++; continue }
      if (isHR(line))   { out.push('<hr/>'); i++; continue }

      // ── Blockquote / Markdown quote ─────────────────────────────────────────
      if (isMdQuote(line)) {
        const bq = []
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          bq.push(inline(lines[i].replace(/^>\s?/,'')))
          i++
        }
        out.push(`<blockquote><p>${bq.join(' ')}</p></blockquote>`)
        continue
      }

      // ── IMPORTANTE / TIP → callout dorado ──────────────────────────────────
      if (isImportant(line)) {
        // Collect body lines until blank
        const bodyLines = [t.replace(/^(NOTA|IMPORTANTE|ATENCI[OÓ]N|RECUERDE|ADVERTENCIA|CLAVE|DATO|TIP|OJO|CONSEJO)[:\s]*/i,'').trim()]
        i++
        while (i < lines.length && lines[i].trim() && !isBlank(lines[i])) {
          bodyLines.push(lines[i].trim())
          i++
        }
        const keyword = t.split(/[\s:]/)[0]
        out.push(buildCallout('dorado', keyword.charAt(0).toUpperCase() + keyword.slice(1).toLowerCase(), bodyLines.join(' ')))
        continue
      }

      // ── RECOMENDACIÓN / VENTAJA → callout verde ─────────────────────────────
      if (isPositive(line)) {
        const bodyLines = [t.replace(/^(VENTAJA|BENEFICIO|RECOMENDACIÓN|RECOMENDACION|CONSEJO PRÁCTICO|BUENAS NOTICIAS)[:\s]*/i,'').trim()]
        i++
        while (i < lines.length && lines[i].trim() && !isBlank(lines[i])) {
          bodyLines.push(lines[i].trim())
          i++
        }
        out.push(buildCallout('verde', 'Recomendación', bodyLines.join(' ')))
        continue
      }

      // ── Section/Title detection ─────────────────────────────────────────────
      if (isSection(line, prevBlank, nextBlank)) {
        out.push(`<h2>${inline(t)}</h2>`)
        i++; continue
      }
      if (isSubSection(line, prevBlank, nextBlank)) {
        out.push(`<h3>${inline(t)}</h3>`)
        i++; continue
      }

      // ── Legal references ────────────────────────────────────────────────────
      if (isLegal(line) && t.length < 100 && (prevBlank || nextBlank)) {
        out.push(`<p><strong>📌 ${inline(t)}</strong></p>`)
        i++; continue
      }

      // ── Unordered list ──────────────────────────────────────────────────────
      if (isMdUL(line)) {
        const items = []
        while (i < lines.length && isMdUL(lines[i].trimEnd())) {
          items.push(`<li>${inline(lines[i].trimEnd().replace(/^[-*+•]\s+/,''))}</li>`)
          i++
        }
        out.push(`<ul>${items.join('')}</ul>`)
        continue
      }

      // ── Ordered list ────────────────────────────────────────────────────────
      if (isMdOL(line)) {
        const items = []
        while (i < lines.length && isMdOL(lines[i].trimEnd())) {
          items.push(`<li>${inline(lines[i].trimEnd().replace(/^\d+[.)]\s+/,''))}</li>`)
          i++
        }
        out.push(`<ol>${items.join('')}</ol>`)
        continue
      }

      // ── Paragraph ───────────────────────────────────────────────────────────
      const paraLines = []
      while (
        i < lines.length && lines[i].trim() !== '' &&
        !isMdH1(lines[i]) && !isMdH2(lines[i]) && !isMdH3(lines[i]) &&
        !isHR(lines[i]) && !isMdQuote(lines[i]) &&
        !isMdUL(lines[i].trimEnd()) && !isMdOL(lines[i].trimEnd()) &&
        !isImportant(lines[i]) && !isPositive(lines[i]) &&
        !lines[i].startsWith('__FAQ_BLOCK__') && !lines[i].startsWith('__CHECKLIST__')
      ) {
        paraLines.push(inline(lines[i].trimEnd()))
        i++
      }
      if (paraLines.length) {
        out.push(`<p>${paraLines.join(' ')}</p>`)
      }
    }

    return out.join('\n')
  }

    const sanitizeHtml = (raw) => {
    // Remove script/style/iframe but keep all valid content tags
    return raw
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
      .replace(/<(meta|link|base)[^>]*>/gi, '')
      // Remove on* event attributes for security
      .replace(/\s+on\w+="[^"]*"/gi, '')
      .replace(/\s+on\w+='[^']*'/gi, '')
  }

  const handlePaste = (e) => {
    e.preventDefault()
    if (!editorRef.current) return

    // 1. Try to get rendered HTML from clipboard first (copy from browser/Word)
    const htmlData = e.clipboardData.getData('text/html')
    if (htmlData && htmlData.trim()) {
      let clean = sanitizeHtml(htmlData)
      // Remove browser fragment markers
      clean = clean.replace(/<!--[\s\S]*?-->/g, '').trim()
      // Extract body if it's a full document
      const bodyMatch = clean.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
      if (bodyMatch) clean = bodyMatch[1].trim()
      if (clean) {
        editorRef.current.focus()
        document.execCommand('insertHTML', false, clean)
        emit()
        return
      }
    }

    // 2. Check if plain text IS HTML code (e.g. copied from a .html file or text editor)
    const plain = e.clipboardData.getData('text/plain')
    if (!plain) return

    const trimmed = plain.trim()
    const looksLikeHtml = /^<(h[1-6]|p|div|ul|ol|table|section|article|blockquote)/i.test(trimmed)
      || (trimmed.includes('</h2>') || trimmed.includes('</p>') || trimmed.includes('</div>'))

    if (looksLikeHtml) {
      // Treat as raw HTML — sanitize and inject directly
      const clean = sanitizeHtml(trimmed)
      editorRef.current.focus()
      document.execCommand('insertHTML', false, clean)
      emit()
      return
    }

    // 3. Plain text → smartParse auto-format
    const html = smartParse(plain)
    editorRef.current.focus()
    document.execCommand('insertHTML', false, html)
    emit()
  }

  const handleInput = () => emit()

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') { e.preventDefault(); exec('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;') }
  }

  const insertBlock = (tag) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    const sel = window.getSelection()
    if (!sel || !sel.rangeCount) return
    const range = sel.getRangeAt(0)
    const el = document.createElement(tag)
    el.innerHTML = sel.toString() || (tag === 'blockquote' ? 'Cita o dato relevante...' : 'Nuevo título')
    range.deleteContents()
    range.insertNode(el)
    range.setStartAfter(el); range.setEndAfter(el)
    sel.removeAllRanges(); sel.addRange(range)
    emit()
  }

  const insertLink = () => {
    if (!editorRef.current) return
    editorRef.current.focus()
    const sel = window.getSelection()
    let selectedText = sel.toString()
    const url = prompt('🔗 Ingrese la URL del enlace (ej: https://www.litesco.com.co):')
    if (!url) return
    let text = selectedText
    if (!text) {
      text = prompt('📝 Ingrese el texto que será visible para este enlace:')
      if (!text) text = url
    }
    const linkHTML = `<a href="${url}" target="_blank" rel="noopener">${text}</a>`
    document.execCommand('insertHTML', false, linkHTML)
    emit()
  }

  const insertCallout = (variant) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    const isGreen = variant === 'verde'
    const html = `<div data-callout="${variant}" style="border-left:4px solid ${isGreen?'#10b981':'#f59e0b'};background:${isGreen?'linear-gradient(135deg,#ecfdf5,#d1fae5)':'linear-gradient(135deg,#fffbeb,#fef3c7)'};padding:14px 18px 14px 44px;margin:1.25rem 0;border-radius:0 10px 10px 0;position:relative;">
  <span style="position:absolute;left:12px;top:14px;font-size:18px">${isGreen?'✅':'💡'}</span>
  <div data-callout-title="true" contenteditable="true" style="font-weight:800;font-size:0.95rem;color:${isGreen?'#065f46':'#92400e'};margin-bottom:6px;">Título del callout</div>
  <div data-callout-body="true" contenteditable="true" style="color:${isGreen?'#064e3b':'#374151'};font-size:0.9rem;line-height:1.7;">Escriba aquí el contenido del callout...</div>
</div><p></p>`
    document.execCommand('insertHTML', false, html)
    setShowCalloutMenu(false)
    emit()
  }

  const insertTable = (cols) => {
    if (!editorRef.current) return
    editorRef.current.focus()
    const pct = Math.floor(100/cols)
    const headers = Array.from({length:cols}, (_,i) => `<th contenteditable="true" style="border:1px solid #cbd5e1;padding:10px 14px;background:#0A1628;color:#f59e0b;font-weight:700;font-size:0.85rem;text-align:left;width:${pct}%;word-break:break-word;">Columna ${i+1}</th>`).join('')
    const cells = Array.from({length:cols}, () => `<td contenteditable="true" style="border:1px solid #e2e8f0;padding:10px 14px;font-size:0.88rem;color:#1e293b;vertical-align:top;word-break:break-word;">Dato</td>`).join('')
    const html = `<div style="margin:1.25rem 0;border-radius:10px;border:1px solid #e2e8f0;box-shadow:0 2px 8px rgba(10,22,40,0.07);">
  <table style="width:100%;border-collapse:collapse;font-family:inherit;table-layout:fixed;">
    <thead><tr>${headers}</tr></thead>
    <tbody><tr>${cells}</tr><tr>${cells}</tr></tbody>
  </table>
</div><p></p>`
    document.execCommand('insertHTML', false, html)
    setShowTableMenu(false)
    emit()
  }

  const insertChecklist = () => {
    if (!editorRef.current) return
    editorRef.current.focus()
    const html = `<div data-block="checklist" style="margin:1.25rem 0;padding:18px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
  <div style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:12px;">✅ Checklist de Verificación</div>
  <div data-checklist-items="true" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;">
    <div data-item="true" style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #e8edf4;">
      <div contenteditable="true" data-item-title="true" style="font-weight:700;font-size:0.85rem;color:#0A1628;margin-bottom:3px;">Título del ítem</div>
      <div contenteditable="true" data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:1px 8px;border-radius:20px;margin-bottom:5px;">Etiqueta</div>
      <div contenteditable="true" data-item-desc="true" style="font-size:0.8rem;color:#64748b;line-height:1.5;">Descripción del punto.</div>
    </div>
    <div data-item="true" style="background:#fff;border-radius:10px;padding:12px 14px;border:1px solid #e8edf4;">
      <div contenteditable="true" data-item-title="true" style="font-weight:700;font-size:0.85rem;color:#0A1628;margin-bottom:3px;">Segundo ítem</div>
      <div contenteditable="true" data-item-tag="true" style="display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:1px 8px;border-radius:20px;margin-bottom:5px;">Etiqueta</div>
      <div contenteditable="true" data-item-desc="true" style="font-size:0.8rem;color:#64748b;line-height:1.5;">Descripción del punto.</div>
    </div>
  </div>
  <button type="button" onmousedown="event.preventDefault();var grid=this.previousElementSibling;var tpl=grid.querySelector('[data-item]').cloneNode(true);tpl.querySelectorAll('[contenteditable]').forEach(function(el){el.textContent=el.dataset.itemTitle!==undefined?'Nuevo ítem':el.dataset.itemTag!==undefined?'Etiqueta':'Descripción';});grid.appendChild(tpl);" style="margin-top:10px;padding:6px 14px;border-radius:8px;border:1px dashed #cbd5e1;background:transparent;color:#64748b;font-size:11px;font-weight:700;cursor:pointer;">+ Agregar ítem</button>
</div><p></p>`
    document.execCommand('insertHTML', false, html)
    emit()
  }

  const insertFAQ = () => {
    if (!editorRef.current) return
    editorRef.current.focus()
    const html = `<div data-block="faq" style="margin:1.25rem 0;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#0A1628,#0d1f3c);padding:12px 18px;display:flex;align-items:center;gap:8px;color:#f59e0b;font-weight:800;font-size:0.9rem;">❓ Preguntas Frecuentes</div>
  <div data-faq-items="true">
    <div data-faq-item="true" style="border-bottom:1px solid #f1f5f9;padding:14px 18px;background:#fff;">
      <div contenteditable="true" data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:6px;">¿Pregunta frecuente aquí?</div>
      <div contenteditable="true" data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:12px;">Respuesta clara y directa.</div>
    </div>
    <div data-faq-item="true" style="padding:14px 18px;background:#fff;">
      <div contenteditable="true" data-faq-q="true" style="font-weight:800;font-size:0.9rem;color:#0A1628;margin-bottom:6px;">¿Segunda pregunta?</div>
      <div contenteditable="true" data-faq-a="true" style="font-size:0.87rem;color:#475569;line-height:1.65;border-left:3px solid #f59e0b;padding-left:12px;">Segunda respuesta aquí.</div>
    </div>
  </div>
  <button type="button" onmousedown="event.preventDefault();var items=this.previousElementSibling;var tpl=items.querySelector('[data-faq-item]').cloneNode(true);tpl.style.borderBottom='1px solid #f1f5f9';tpl.querySelector('[data-faq-q]').textContent='¿Nueva pregunta?';tpl.querySelector('[data-faq-a]').textContent='Respuesta aquí.';items.appendChild(tpl);" style="width:100%;padding:8px;background:#f8fafc;border:none;border-top:1px dashed #e2e8f0;color:#64748b;font-size:11px;font-weight:700;cursor:pointer;">+ Agregar pregunta</button>
</div><p></p>`
    document.execCommand('insertHTML', false, html)
    emit()
  }

  const getPreviewHTML = () => {
    let html = value || ''
    if (includeCtaCallout) {
      html += `<div data-callout="dorado" style="border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7);padding:16px 20px 16px 52px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative;">
        <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:22px;">⚖️</span>
        <div style="font-weight:800;font-size:0.95rem;color:#92400e;margin-bottom:6px;">¿Necesita asesoría legal profesional?</div>
        <div style="color:#374151;font-size:0.9rem;line-height:1.7;">Un error en estos procesos puede costarle tiempo y patrimonio. En LITESCO, nuestro equipo de abogados está preparado para asumir su representación. Contáctenos para agendar su consulta.</div>
      </div>`
    }
    return html
  }

  const TBtn = ({ onClick, title, children, danger, active }) => (
    <button type="button" onMouseDown={e => { e.preventDefault(); onClick() }} title={title}
      style={{
        display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'4px',
        height:'30px', padding:'0 9px', borderRadius:'6px',
        border:`1px solid ${active?'rgba(245,158,11,0.5)':'transparent'}`, cursor:'pointer', fontSize:'11px', fontWeight:700,
        background: active ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.06)',
        color: danger ? '#f87171' : active ? '#f59e0b' : '#cbd5e1',
        transition:'all 0.15s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background='rgba(245,158,11,0.18)'; e.currentTarget.style.color='#f59e0b'; e.currentTarget.style.borderColor='rgba(245,158,11,0.3)' }}
      onMouseLeave={e => { e.currentTarget.style.background=active?'rgba(245,158,11,0.2)':'rgba(255,255,255,0.06)'; e.currentTarget.style.color=danger?'#f87171':active?'#f59e0b':'#cbd5e1'; e.currentTarget.style.borderColor=active?'rgba(245,158,11,0.5)':'transparent' }}
    >{children}</button>
  )
  const Sep = () => <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.12)',margin:'0 3px'}} />

  const wc = countWords(value)
  const wcColor = wc >= 800 ? '#34d399' : wc >= 400 ? '#fbbf24' : '#f87171'
  const wcBg    = wc >= 800 ? 'rgba(16,185,129,0.15)' : wc >= 400 ? 'rgba(245,158,11,0.15)' : 'rgba(248,113,113,0.15)'
  const wcBorder= wc >= 800 ? 'rgba(52,211,153,0.25)' : wc >= 400 ? 'rgba(251,191,36,0.25)' : 'rgba(248,113,113,0.25)'
  const wcIcon  = wc >= 800 ? '✓' : wc >= 400 ? '⚠' : '✕'
  const wcOk    = wc >= 1500

  return (
    <div style={{borderRadius:'14px', border:'1px solid rgba(245,158,11,0.25)', boxShadow:'0 8px 32px rgba(10,22,40,0.14)', transition:'border-color 0.2s'}}
      onFocusCapture={e => e.currentTarget.style.borderColor='#f59e0b'}
      onBlurCapture={e => e.currentTarget.style.borderColor='rgba(245,158,11,0.25)'}
    >
      {/* TOOLBAR */}
      <div style={{background:'linear-gradient(135deg,#0A1628 0%,#0d1f3c 100%)', padding:'8px 10px', display:'flex', alignItems:'center', flexWrap:'wrap', gap:'2px', borderBottom:'1px solid rgba(245,158,11,0.15)', position:'relative', borderRadius:'14px 14px 0 0'}}>
        <span style={{fontSize:'9px',color:'rgba(245,158,11,0.45)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.6px',marginRight:'3px'}}>Estructura</span>
        <TBtn onClick={() => insertBlock('h2')} title="Insertar título H2"><span style={{fontWeight:900,letterSpacing:'-0.5px',fontSize:'11px'}}>H2</span></TBtn>
        <TBtn onClick={() => insertBlock('h3')} title="Insertar subtítulo H3"><span style={{fontWeight:800,letterSpacing:'-0.5px',fontSize:'10px'}}>H3</span></TBtn>
        <TBtn onClick={() => exec('insertHorizontalRule')} title="Separador"><span style={{fontWeight:900,fontSize:'13px',letterSpacing:'-2px'}}>—</span></TBtn>
        <Sep/>
        <span style={{fontSize:'9px',color:'rgba(245,158,11,0.45)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.6px',marginRight:'3px'}}>Formato</span>
        <TBtn onClick={() => exec('bold')} title="Negrita"><FaBold style={{fontSize:'11px'}}/></TBtn>
        <TBtn onClick={() => exec('italic')} title="Cursiva"><FaItalic style={{fontSize:'11px'}}/></TBtn>
        <TBtn onClick={insertLink} title="Insertar enlace"><FaLink style={{fontSize:'11px'}}/></TBtn>

        {/* COLOR DE TEXTO */}
        <div style={{position:'relative'}} ref={colorPickerRef}>
          <button type="button"
            onMouseDown={e => { e.preventDefault(); setShowColorPicker(v=>!v); setShowCalloutMenu(false); setShowTableMenu(false) }}
            title="Color del texto"
            style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
              height:'30px', width:'28px', borderRadius:'6px', border:'1px solid transparent',
              cursor:'pointer', background:'rgba(255,255,255,0.06)', padding:'3px 6px',
              transition:'all 0.15s', gap:'2px',
            }}
            onMouseEnter={e=>{e.currentTarget.style.background='rgba(245,158,11,0.18)';e.currentTarget.style.borderColor='rgba(245,158,11,0.3)'}}
            onMouseLeave={e=>{e.currentTarget.style.background='rgba(255,255,255,0.06)';e.currentTarget.style.borderColor='transparent'}}
          >
            <span style={{fontSize:'11px',fontWeight:900,color:'#cbd5e1',lineHeight:1}}>A</span>
            <span id="color-indicator" style={{width:'16px',height:'3px',borderRadius:'2px',background:'#f59e0b',display:'block'}}/>
          </button>

          {showColorPicker && (
            <div style={{
              position:'absolute', top:'calc(100% + 8px)', left:0, zIndex:200,
              background:'#0f172a', border:'1px solid #1e293b', borderRadius:'12px',
              padding:'12px', boxShadow:'0 12px 40px rgba(2,6,23,0.7)',
              display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'5px', minWidth:'200px',
            }}>
              <div style={{gridColumn:'1/-1',fontSize:'10px',color:'#475569',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'4px'}}>Color del texto</div>
              {[
                '#f1f5f9','#94a3b8','#475569','#1e293b',
                '#ef4444','#f97316','#f59e0b','#84cc16',
                '#22c55e','#06b6d4','#3b82f6','#8b5cf6',
                '#ec4899','#78350f','#0c4a6e','#14532d',
                '#000000','#0A1628','#7c3aed','#be185d',
                '#dc2626','#16a34a','#2563eb','#d97706',
                '#ffffff','#fef9c3','#dbeafe','#dcfce7',
              ].map(color => (
                <button key={color} type="button"
                  onMouseDown={e => {
                    e.preventDefault()
                    exec('foreColor', color)
                    const ind = document.getElementById('color-indicator')
                    if (ind) ind.style.background = color
                    setShowColorPicker(false)
                  }}
                  title={color}
                  style={{
                    width:'22px', height:'22px', borderRadius:'5px', border:'1px solid rgba(255,255,255,0.1)',
                    background:color, cursor:'pointer', transition:'transform 0.1s',
                    outline: color==='#ffffff' ? '1px solid #334155' : 'none',
                  }}
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.2)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                />
              ))}
              <button type="button"
                onMouseDown={e => { e.preventDefault(); exec('removeFormat'); setShowColorPicker(false) }}
                style={{gridColumn:'1/-1',marginTop:'6px',padding:'5px',borderRadius:'7px',border:'1px solid #1e293b',background:'transparent',color:'#64748b',fontSize:'10px',fontWeight:600,cursor:'pointer'}}
                onMouseEnter={e=>e.currentTarget.style.color='#f59e0b'}
                onMouseLeave={e=>e.currentTarget.style.color='#64748b'}
              >↩ Quitar formato de color</button>
            </div>
          )}
        </div>

        <Sep/>
        <span style={{fontSize:'9px',color:'rgba(245,158,11,0.45)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.6px',marginRight:'3px'}}>Listas</span>
        <TBtn onClick={() => exec('insertUnorderedList')} title="Lista con viñetas"><FaListUl style={{fontSize:'11px'}}/></TBtn>
        <TBtn onClick={() => exec('insertOrderedList')} title="Lista numerada"><FaListOl style={{fontSize:'11px'}}/></TBtn>
        <Sep/>
        <span style={{fontSize:'9px',color:'rgba(245,158,11,0.45)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.6px',marginRight:'3px'}}>Especial</span>

        {/* CALLOUT DROPDOWN */}
        <div style={{position:'relative',display:'inline-block'}}>
          <TBtn active={showCalloutMenu} onClick={() => { setShowCalloutMenu(v=>!v); setShowTableMenu(false); setShowColorPicker(false) }} title="Insertar callout">
            <FaQuoteLeft style={{fontSize:'10px'}}/><span style={{fontSize:'10px'}}>Callout ▾</span>
          </TBtn>
          {showCalloutMenu && (
            <div style={{position:'absolute',top:'36px',left:0,zIndex:300,background:'#0d1f3c',border:'1px solid rgba(245,158,11,0.3)',borderRadius:'10px',padding:'6px',display:'flex',flexDirection:'column',gap:'4px',minWidth:'170px',boxShadow:'0 8px 24px rgba(10,22,40,0.4)'}}>
              <button type="button" onMouseDown={e=>{e.preventDefault();insertCallout('dorado')}}
                style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 12px',borderRadius:'7px',border:'none',background:'rgba(245,158,11,0.1)',color:'#fbbf24',fontSize:'12px',fontWeight:700,cursor:'pointer',width:'100%',textAlign:'left'}}>
                💡 Dorado <span style={{fontSize:'10px',color:'rgba(251,191,36,0.55)',fontWeight:400}}>advertencia / idea</span>
              </button>
              <button type="button" onMouseDown={e=>{e.preventDefault();insertCallout('verde')}}
                style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 12px',borderRadius:'7px',border:'none',background:'rgba(16,185,129,0.1)',color:'#34d399',fontSize:'12px',fontWeight:700,cursor:'pointer',width:'100%',textAlign:'left'}}>
                ✅ Verde <span style={{fontSize:'10px',color:'rgba(52,211,153,0.55)',fontWeight:400}}>consejo / confirmar</span>
              </button>
            </div>
          )}
        </div>

        {/* TABLA DROPDOWN */}
        <div style={{position:'relative',display:'inline-block'}}>
          <TBtn active={showTableMenu} onClick={() => { setShowTableMenu(v=>!v); setShowCalloutMenu(false); setShowColorPicker(false) }} title="Insertar tabla">
            <span style={{fontSize:'11px'}}>⊞</span><span style={{fontSize:'10px'}}>Tabla ▾</span>
          </TBtn>
          {showTableMenu && (
            <div style={{position:'absolute',top:'36px',left:0,zIndex:300,background:'#0d1f3c',border:'1px solid rgba(245,158,11,0.3)',borderRadius:'10px',padding:'12px',minWidth:'190px',boxShadow:'0 8px 24px rgba(10,22,40,0.4)'}}>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'10px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'8px'}}>Columnas</div>
              <div style={{display:'flex',gap:'5px',marginBottom:'10px'}}>
                {[2,3,4,5].map(n => (
                  <button key={n} type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>setTableCols(n)}
                    style={{flex:1,padding:'5px',borderRadius:'6px',border:'1px solid',borderColor:tableCols===n?'#f59e0b':'rgba(255,255,255,0.15)',background:tableCols===n?'rgba(245,158,11,0.2)':'transparent',color:tableCols===n?'#f59e0b':'#cbd5e1',fontSize:'12px',fontWeight:700,cursor:'pointer'}}>
                    {n}
                  </button>
                ))}
              </div>
              <button type="button" onMouseDown={e=>{e.preventDefault();insertTable(tableCols)}}
                style={{width:'100%',padding:'7px',borderRadius:'7px',border:'none',background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#0A1628',fontSize:'11px',fontWeight:800,cursor:'pointer'}}>
                Insertar tabla {tableCols}×2
              </button>
            </div>
          )}
        </div>

        {/* CHECKLIST */}
        <TBtn onClick={insertChecklist} title="Insertar checklist en tarjetas">
          <span style={{fontSize:'11px'}}>☑</span><span style={{fontSize:'10px'}}>Checklist</span>
        </TBtn>

        {/* FAQ */}
        <TBtn onClick={insertFAQ} title="Insertar bloque FAQ">
          <span style={{fontSize:'11px'}}>❓</span><span style={{fontSize:'10px'}}>FAQ</span>
        </TBtn>

        <Sep/>
        <TBtn onClick={() => exec('undo')} title="Deshacer"><FaUndo style={{fontSize:'10px'}}/></TBtn>
        <TBtn onClick={() => exec('redo')} title="Rehacer"><FaRedo style={{fontSize:'10px'}}/></TBtn>
        <TBtn danger onClick={() => { if(editorRef.current){editorRef.current.innerHTML='';onChange('')} }} title="Limpiar todo">
          <span style={{fontSize:'11px'}}>✕</span><span style={{fontSize:'10px'}}>Limpiar</span>
        </TBtn>
        <Sep/>
        <TBtn onClick={() => setShowPreview(true)} title="Vista previa del artículo publicado">
          <FaEye style={{fontSize:'11px'}}/><span style={{fontSize:'10px'}}>Vista previa</span>
        </TBtn>

        <TBtn onClick={() => {
          const modal = document.createElement('div')
          modal.style.cssText = 'position:fixed;inset:0;background:rgba(10,22,40,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px'
          modal.innerHTML = `<div style="background:#fff;border-radius:18px;padding:28px;width:100%;max-width:700px;box-shadow:0 24px 80px rgba(0,0,0,0.4)">
            <div style="font-weight:800;font-size:16px;color:#0A1628;margin-bottom:8px">Pegar código HTML</div>
            <div style="font-size:12px;color:#64748b;margin-bottom:14px">Pega tu HTML aquí. Se renderizará automáticamente en el editor.</div>
            <textarea id="html-input" style="width:100%;height:260px;border:1px solid #e2e8f0;border-radius:10px;padding:14px;font-family:monospace;font-size:13px;resize:vertical;outline:none;color:#1e293b;box-sizing:border-box" placeholder="&lt;h2&gt;Título...&lt;/h2&gt;&#10;&lt;p&gt;Contenido...&lt;/p&gt;"></textarea>
            <div style="display:flex;gap:10px;margin-top:14px;justify-content:flex-end">
              <button id="html-cancel" style="padding:10px 20px;border:1px solid #e2e8f0;background:#fff;border-radius:10px;cursor:pointer;font-weight:600;color:#64748b">Cancelar</button>
              <button id="html-insert" style="padding:10px 24px;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;border-radius:10px;cursor:pointer;font-weight:800;color:#0A1628">Insertar HTML</button>
            </div>
          </div>`
          document.body.appendChild(modal)
          const ta = modal.querySelector('#html-input')
          ta.focus()
          modal.querySelector('#html-cancel').onclick = () => document.body.removeChild(modal)
          modal.querySelector('#html-insert').onclick = () => {
            const raw = ta.value.trim()
            if (raw && editorRef.current) {
              editorRef.current.innerHTML = sanitizeHtml(raw)
              emit()
            }
            document.body.removeChild(modal)
          }
          modal.onclick = (ev) => { if(ev.target===modal) document.body.removeChild(modal) }
        }} title="Insertar HTML directamente">
          <span style={{fontSize:'11px',fontFamily:'monospace',fontWeight:900}}>&lt;/&gt;</span><span style={{fontSize:'10px'}}>HTML</span>
        </TBtn>

      </div>

      {/* EDITOR AREA */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onClick={() => { setShowCalloutMenu(false); setShowTableMenu(false) }}
        style={{minHeight:'420px',maxHeight:'520px',overflowY:'auto',padding:'28px 32px',outline:'none',fontSize:'0.96rem',lineHeight:'1.9',color:'#1e293b',fontFamily:'inherit',background:'#fff'}}
        data-placeholder="Escribe aquí, pega texto plano (se formatea automáticamente) o pega HTML directamente. Las etiquetas HTML se renderizan en tiempo real..."
      />

      {/* FOOTER */}
      <div style={{background:'#f8fafc',borderTop:'1px solid #e8edf4',padding:'8px 16px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
        <label style={{display:'flex',alignItems:'center',gap:'6px',cursor:'pointer',userSelect:'none'}}>
          <div onClick={()=>setIncludeCtaCallout(v=>!v)}
            style={{width:'16px',height:'16px',borderRadius:'4px',border:`2px solid ${includeCtaCallout?'#f59e0b':'#d1d5db'}`,background:includeCtaCallout?'#f59e0b':'transparent',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.15s',flexShrink:0}}>
            {includeCtaCallout && <FaCheck style={{color:'#fff',fontSize:'8px'}} />}
          </div>
          <input type="checkbox" checked={includeCtaCallout} onChange={e=>setIncludeCtaCallout(e.target.checked)} style={{display:'none'}} />
          <span style={{fontSize:'10px',color:'#64748b',fontWeight:600}}>Incluir callout final de asesoría legal</span>
        </label>
        <span style={{display:'inline-flex',alignItems:'center',gap:'5px',padding:'3px 10px',borderRadius:'20px',fontSize:'11px',fontWeight:700,background:wcBg,color:wcColor,border:`1px solid ${wcBorder}`}}>
          {wcIcon} {wc} palabras
        </span>
        <span style={{fontSize:'10px',color:wcOk?'#059669':'#d97706',fontWeight:600}}>
          {wcOk ? '✓ SEO óptimo' : `⚠ Faltan ${Math.max(0,1500-wc)} palabras`}
        </span>
      </div>

      {/* MODAL VISTA PREVIA */}
      {showPreview && (
        <div style={{position:'fixed',inset:0,background:'rgba(10,22,40,0.82)',backdropFilter:'blur(6px)',zIndex:9999,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'40px 20px',overflowY:'auto'}}
          onClick={()=>setShowPreview(false)}>
          <div style={{background:'#fff',borderRadius:'20px',width:'100%',maxWidth:'900px',overflow:'hidden',boxShadow:'0 24px 80px rgba(10,22,40,0.35)'}}
            onClick={e=>e.stopPropagation()}>
            <div style={{background:'linear-gradient(135deg,#0A1628,#0d1f3c)',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <FaEye style={{color:'#f59e0b',fontSize:'16px'}} />
                <div>
                  <div style={{color:'#fff',fontWeight:800,fontSize:'14px'}}>Vista previa del artículo publicado</div>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:'11px'}}>Layout de dos columnas</div>
                </div>
              </div>
              <button type="button" onClick={()=>setShowPreview(false)}
                style={{background:'rgba(255,255,255,0.1)',border:'none',borderRadius:'8px',padding:'6px 12px',color:'#fff',cursor:'pointer',fontSize:'12px',fontWeight:700}}>
                ✕ Cerrar
              </button>
            </div>
            <div className="ae-seo-grid" style={{}}>
            <style>{`.ae-seo-grid{display:grid;grid-template-columns:1fr 260px;gap:0}@media(max-width:768px){.ae-seo-grid{grid-template-columns:1fr}}`}</style>
              <div style={{padding:'28px 32px',borderRight:'1px solid #f1f5f9',maxHeight:'70vh',overflowY:'auto'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'18px'}}>Contenido principal</div>
                <div className="ac" dangerouslySetInnerHTML={{__html: getPreviewHTML()}} />
              </div>
              <div style={{padding:'22px',background:'#f8fafc',maxHeight:'70vh',overflowY:'auto'}}>
                <div style={{fontSize:'11px',fontWeight:700,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'14px'}}>Panel lateral</div>
                <div style={{background:'#fff',borderRadius:'12px',border:'1px solid #e2e8f0',padding:'14px',marginBottom:'14px'}}>
                  <div style={{fontWeight:800,fontSize:'12px',color:'#0A1628',marginBottom:'9px',display:'flex',alignItems:'center',gap:'6px'}}><span style={{color:'#f59e0b'}}>≡</span> Tabla de contenidos</div>
                  {(() => {
                    const tmp = document.createElement('div')
                    tmp.innerHTML = value || ''
                    const h2s = Array.from(tmp.querySelectorAll('h2'))
                    return h2s.length > 0
                      ? <ol style={{paddingLeft:'18px',margin:0}}>{h2s.map((h,i)=><li key={i} style={{fontSize:'11px',color:'#475569',marginBottom:'4px',lineHeight:1.5}}>{h.textContent}</li>)}</ol>
                      : <div style={{fontSize:'11px',color:'#94a3b8',fontStyle:'italic'}}>Los H2 del artículo aparecerán aquí</div>
                  })()}
                </div>
                <div style={{background:'linear-gradient(135deg,#0A1628,#0d1f3c)',borderRadius:'12px',padding:'14px'}}>
                  <div style={{fontWeight:800,fontSize:'12px',color:'#fff',marginBottom:'6px'}}>⚖️ ¿Necesita ayuda?</div>
                  <div style={{fontSize:'11px',color:'rgba(255,255,255,0.6)',marginBottom:'10px',lineHeight:1.5}}>Consulte con nuestros abogados especializados.</div>
                  <div style={{background:'linear-gradient(135deg,#f59e0b,#d97706)',borderRadius:'8px',padding:'8px 12px',textAlign:'center',fontSize:'11px',fontWeight:800,color:'#0A1628'}}>Agendar consulta gratuita</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        [data-placeholder]:empty:before { content:attr(data-placeholder); color:#94a3b8; pointer-events:none; font-style:italic; font-size:0.93rem; display:block; }
        [contenteditable]:focus { outline:none; }
        [contenteditable]::-webkit-scrollbar { width:5px; }
        [contenteditable]::-webkit-scrollbar-thumb { background:#e2e8f0; border-radius:10px; }
        [contenteditable] h2 { color:#0A1628; font-size:1.35rem; font-weight:800; margin:2rem 0 0.75rem; padding:12px 18px; background:linear-gradient(to right,rgba(10,22,40,0.05),transparent); border-left:5px solid #f59e0b; border-radius:0 10px 10px 0; }
        [contenteditable] h3 { color:#0A1628; font-size:1.15rem; font-weight:700; margin:1.5rem 0 0.6rem; padding:8px 14px; border-left:3px solid #f59e0b; border-radius:0 8px 8px 0; background:rgba(245,158,11,0.06); }
        [contenteditable] p { margin:0 0 1.1rem; color:#1e293b; line-height:1.85; }
        [contenteditable] strong { color:#92400e; font-weight:700; }
        [contenteditable] em { font-style:italic; color:#374151; }
        [contenteditable] ul { padding:0; margin-bottom:1rem; list-style:none; }
        [contenteditable] ul li { color:#1e293b; margin-bottom:5px; padding-left:1.4rem; position:relative; line-height:1.7; }
        [contenteditable] ul li::before { content:"▸"; color:#f59e0b; font-weight:900; position:absolute; left:0; }
        [contenteditable] ol { padding-left:1.5rem; margin-bottom:1rem; }
        [contenteditable] ol li { color:#1e293b; margin-bottom:5px; line-height:1.7; }
        [contenteditable] blockquote { border-left:4px solid #f59e0b; background:linear-gradient(135deg,#fffbeb,#fef3c7); padding:14px 18px 14px 44px; margin:1.25rem 0; border-radius:0 10px 10px 0; position:relative; }
        [contenteditable] blockquote::before { content:"💡"; position:absolute; left:12px; top:14px; font-size:18px; }
        [contenteditable] blockquote p { color:#374151; margin:0; }
        [contenteditable] hr { border:none; height:1px; background:linear-gradient(to right,transparent,#f59e0b,transparent); margin:1.5rem 0; }
        [contenteditable] code { background:#f1f5f9; color:#0A1628; padding:2px 6px; border-radius:5px; font-size:0.85rem; font-family:monospace; border:1px solid #e2e8f0; }
        [contenteditable] a { color:#b45309; text-decoration:underline; font-weight:600; }
        [contenteditable] table { width:100%; border-collapse:collapse; table-layout:fixed; }
        [contenteditable] th { background:#0A1628; color:#f59e0b; padding:10px 14px; font-size:0.85rem; border:1px solid #cbd5e1; text-align:left; word-break:break-word; }
        [contenteditable] td { padding:10px 14px; border:1px solid #e2e8f0; font-size:0.88rem; color:#1e293b; word-break:break-word; }
        [contenteditable] tr:nth-child(even) td { background:#f8fafc; }
      `}</style>
    </div>
  )
}

// ─── HELPERS OUTSIDE ArticleEditor ───────────
const AE_inputStyle = {
  border:'1px solid #e2e8f0', borderRadius:'10px', padding:'11px 14px',
  fontSize:'14px', color:'#1e293b', outline:'none', width:'100%',
  background:'#fff', transition:'border-color 0.15s,box-shadow 0.15s', boxSizing:'border-box',
}
const AE_focusIn  = e => { e.target.style.borderColor='#f59e0b'; e.target.style.boxShadow='0 0 0 3px rgba(245,158,11,0.12)' }
const AE_focusOut = e => { e.target.style.borderColor='#e2e8f0'; e.target.style.boxShadow='none' }

const AE_Card = ({ children, style={} }) => (
  <div style={{background:'#fff',borderRadius:'16px',border:'1px solid #e8edf4',boxShadow:'0 2px 16px rgba(10,22,40,0.06)',overflow:'hidden',...style}}>
    {children}
  </div>
)
const AE_CardHead = ({ icon, title, subtitle }) => (
  <div style={{background:'linear-gradient(135deg,#0A1628,#0d1f3c)',padding:'16px 22px',display:'flex',alignItems:'center',gap:'12px'}}>
    <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'rgba(245,158,11,0.15)',border:'1px solid rgba(245,158,11,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'16px',flexShrink:0}}>
      {icon}
    </div>
    <div>
      <div style={{color:'#fff',fontWeight:800,fontSize:'14px'}}>{title}</div>
      {subtitle && <div style={{color:'rgba(255,255,255,0.45)',fontSize:'11px',marginTop:'1px'}}>{subtitle}</div>}
    </div>
  </div>
)
const AE_FL = ({ num, label, hint, count, max, required }) => (
  <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'8px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
      {num && <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'22px',height:'22px',borderRadius:'6px',background:'#0A1628',color:'#f59e0b',fontSize:'10px',fontWeight:900,flexShrink:0}}>{num}</span>}
      <label style={{color:'#0A1628',fontSize:'13px',fontWeight:700}}>
        {label}{required && <span style={{color:'#f59e0b',marginLeft:'3px'}}>*</span>}
      </label>
      {hint && <span style={{fontSize:'11px',color:'#94a3b8'}}>{hint}</span>}
    </div>
    {count !== undefined && (
      <span style={{fontSize:'11px',fontWeight:700,fontFamily:'monospace',color:count>=(max*0.8)&&count<=max?'#059669':count>max?'#ef4444':'#94a3b8'}}>
        {count}/{max}
      </span>
    )}
  </div>
)

const ArticleEditor = ({ article, onSave, onCancel, isSaving = false }) => {
  const [form, setForm] = useState(article || {
    title:'', seoTitle:'', metaDesc:'', keyword:'', slug:'', excerpt:'', content: DEFAULT_CONTENT,
    category:'civil', author:'Equipo LITESCO',
    date: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0],
    image:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800',
    altText:'', imagePosition:'top', featured:false, published:false, contentAlign:'center',
  })
  const [validationErrors, setValidationErrors] = useState({})
  const [isDirty, setIsDirty] = useState(false)

  const setField = (updates) => {
    setForm(p => ({ ...p, ...updates }))
    setIsDirty(true)
  }

  const titleCount = form.seoTitle?.length || 0
  const metaCount  = form.metaDesc?.length  || 0
  const h1Count    = form.title?.length || 0
  const h1EqualsSeo = form.title?.trim() && form.seoTitle?.trim() &&
    form.title.trim().toLowerCase() === form.seoTitle.trim().toLowerCase()

  const handleSubmit = e => {
    e.preventDefault()
    const errs = {}
    if (!form.title.trim())    errs.title    = 'El H1 Principal es requerido'
    if (!form.seoTitle.trim()) errs.seoTitle = 'El Título SEO es requerido para posicionamiento'
    if (Object.keys(errs).length) { setValidationErrors(errs); return }
    setValidationErrors({})
    setIsDirty(false)
    onSave({ ...form, slug: form.slug || generateSlug(form.title) })
  }

  const handleCancel = () => {
    if (isDirty && !window.confirm('Tienes cambios sin guardar. ¿Salir de todos modos?')) return
    setIsDirty(false)
    onCancel()
  }

  return (
    <form onSubmit={handleSubmit} className="ae-form-grid" style={{paddingBottom:'80px',alignItems:'start'}}>
  <style>{`.ae-form-grid{display:grid;grid-template-columns:1fr 300px;gap:24px}@media(max-width:900px){.ae-form-grid{grid-template-columns:1fr;gap:16px}}@media(max-width:640px){.ae-form-grid{gap:12px}}`}</style>

      {/* COLUMNA PRINCIPAL */}
      <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>

        {isDirty && (
          <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 16px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)',borderRadius:'10px',marginBottom:'4px'}}>
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#f59e0b',flexShrink:0,boxShadow:'0 0 6px rgba(245,158,11,0.6)'}} />
            <span style={{fontSize:'12px',color:'#92400e',fontWeight:600}}>Cambios sin guardar — recuerde hacer clic en "Guardar Artículo"</span>
          </div>
        )}
        <AE_Card>
          <AE_CardHead icon="🔍" title="Optimización SEO" subtitle="Mejore la visibilidad en Google" />
          <div style={{padding:'22px'}}>
            <div style={{background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'12px',padding:'18px',marginBottom:'20px'}}>
              <div style={{fontSize:'10px',fontWeight:800,color:'#94a3b8',textTransform:'uppercase',letterSpacing:'0.8px',marginBottom:'10px'}}>Vista previa en Google</div>
              <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
                <div style={{width:'26px',height:'26px',background:'#0A1628',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',color:'#f59e0b',fontSize:'11px',fontWeight:900,flexShrink:0}}>L</div>
                <div>
                  <div style={{fontSize:'12px',color:'#1e293b',fontWeight:600}}>LITESCO</div>
                  <div style={{fontSize:'10px',color:'#64748b'}}>litesco.com.co › blog › <span style={{color:'#f59e0b'}}>{form.slug||'url-del-articulo'}</span></div>
                </div>
              </div>
              <div style={{fontSize:'18px',color:'#1a0dab',fontWeight:500,marginBottom:'4px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
                {form.seoTitle || 'Título SEO | LITESCO'}
              </div>
              <div style={{fontSize:'13px',color:'#4d5156',lineHeight:'1.5',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>
                <span style={{color:'#94a3b8'}}>{new Date(form.date).toLocaleDateString('es-CO')} — </span>
                {form.metaDesc || 'La descripción del artículo aparecerá aquí. Incluya su palabra clave principal...'}
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
              <div>
                <AE_FL num="1" label="Título SEO (Meta Title)" required count={titleCount} max={60} />
                <input style={AE_inputStyle} value={form.seoTitle} onFocus={AE_focusIn} onBlur={AE_focusOut}
                  onChange={e => { setField({seoTitle:e.target.value}); setValidationErrors(p=>({...p,seoTitle:''})) }}
                  placeholder="Ej: Contrato de Arrendamiento Colombia 2025 | LITESCO" />
                {validationErrors.seoTitle && (
                  <div style={{marginTop:'6px',display:'flex',alignItems:'center',gap:'6px',color:'#ef4444',fontSize:'11px',fontWeight:600}}>
                    <span>⚠</span> {validationErrors.seoTitle}
                  </div>
                )}
              </div>
              <div>
                <AE_FL num="2" label="URL amigable (Slug)" hint="— generada automáticamente" />
                <div style={{display:'flex',alignItems:'center',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'10px',overflow:'hidden'}}>
                  <span style={{padding:'11px 12px',fontSize:'12px',color:'#94a3b8',whiteSpace:'nowrap',borderRight:'1px solid #e2e8f0',background:'#f1f5f9'}}>litesco.com.co/blog/</span>
                  <input style={{flex:1,border:'none',outline:'none',padding:'11px 12px',fontSize:'13px',color:'#f59e0b',fontFamily:'monospace',background:'transparent'}}
                    value={form.slug} onChange={e => setField({slug:generateSlug(e.target.value)})}
                    placeholder="slug-automatico" />
                </div>
              </div>
              <div>
                <AE_FL num="3" label="Meta Descripción" required count={metaCount} max={160} />
                <textarea rows={3} style={{...AE_inputStyle,resize:'none',lineHeight:'1.6'}}
                  onFocus={AE_focusIn} onBlur={AE_focusOut}
                  value={form.metaDesc} onChange={e => setField({metaDesc:e.target.value})}
                  placeholder="Resumen atractivo para Google que incluya la palabra clave principal..." />
              </div>
              <div>
                <AE_FL num="4" label="Palabra Clave Principal" hint="— keyword focus" />
                <input style={AE_inputStyle} value={form.keyword} onFocus={AE_focusIn} onBlur={AE_focusOut}
                  onChange={e => setField({keyword:e.target.value})}
                  placeholder="Ej: contrato arrendamiento Colombia 2025" />
              </div>
            </div>
          </div>
        </AE_Card>

        <AE_Card>
          <AE_CardHead icon="✍️" title="Contenido del Artículo" subtitle="Editor visual con formato automático" />
          <div style={{padding:'22px',display:'flex',flexDirection:'column',gap:'18px'}}>
            <div>
              <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:'8px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                  <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:'22px',height:'22px',borderRadius:'6px',background:'#0A1628',color:'#f59e0b',fontSize:'10px',fontWeight:900,flexShrink:0}}>5</span>
                  <label style={{color:'#0A1628',fontSize:'13px',fontWeight:700}}>Título Principal (H1)<span style={{color:'#f59e0b',marginLeft:'3px'}}>*</span></label>
                </div>
                <span style={{fontSize:'11px',fontWeight:700,fontFamily:'monospace',color:h1Count>80?'#ef4444':h1Count>50?'#f59e0b':'#94a3b8'}}>{h1Count} car.</span>
              </div>
              <input style={{...AE_inputStyle,fontSize:'16px',fontWeight:700,padding:'13px 16px'}}
                onFocus={AE_focusIn} onBlur={AE_focusOut}
                value={form.title}
                onChange={e => { const t=e.target.value; setField({title:t, slug:!form.slug?generateSlug(t):form.slug}); setValidationErrors(p=>({...p,title:''})) }}
                placeholder="Ej: Contrato de arrendamiento verbal en Colombia: ¿qué debe pactarse?" />
              {validationErrors.title && (
                <div style={{marginTop:'6px',display:'flex',alignItems:'center',gap:'6px',color:'#ef4444',fontSize:'11px',fontWeight:600}}>
                  <span>⚠</span> {validationErrors.title}
                </div>
              )}
              {h1EqualsSeo && (
                <div style={{display:'flex',alignItems:'center',gap:'5px',marginTop:'6px',padding:'6px 10px',borderRadius:'7px',background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.2)'}}>
                  <FaExclamationTriangle style={{color:'#f59e0b',fontSize:'11px',flexShrink:0}} />
                  <span style={{fontSize:'11px',color:'#92400e',fontWeight:600}}>El H1 y el Título SEO son idénticos. Se recomienda variar la redacción para mejor posicionamiento.</span>
                </div>
              )}
            </div>
            <div>
              <AE_FL num="6" label="Cuerpo del Artículo" required />
              <RichTextEditor value={form.content} onChange={val => setField({content:val})} seoTitle={form.seoTitle} />
            </div>
            <div>
              <AE_FL num="7" label="Resumen / Extracto" hint="— aparece en las tarjetas del blog" />
              <textarea rows={3} style={{...AE_inputStyle,resize:'none',lineHeight:'1.6'}}
                onFocus={AE_focusIn} onBlur={AE_focusOut}
                value={form.excerpt} onChange={e => setField({excerpt:e.target.value})}
                placeholder="Breve resumen que el lector verá antes de abrir el artículo..." />
            </div>
          </div>
        </AE_Card>
      </div>

      {/* SIDEBAR DERECHA */}
      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>

        <AE_Card>
          <AE_CardHead icon="📋" title="Publicación" />
          <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
            {[
              {key:'featured', label:'Marcar como Destacado',    icon:'⭐', activeColor:'#f59e0b'},
              {key:'published', label:'Publicar inmediatamente', icon:'🌐', activeColor:'#10b981'},
            ].map(opt => (
              <label key={opt.key} style={{display:'flex',alignItems:'center',gap:'10px',cursor:'pointer',padding:'10px 12px',borderRadius:'10px',
                background:form[opt.key]?`rgba(${opt.key==='featured'?'245,158,11':'16,185,129'},0.07)`:'#f8fafc',
                border:`1px solid ${form[opt.key]?(opt.key==='featured'?'rgba(245,158,11,0.3)':'rgba(16,185,129,0.3)'):'#e2e8f0'}`,transition:'all 0.15s'}}>
                <div style={{width:'20px',height:'20px',borderRadius:'6px',border:`2px solid ${form[opt.key]?opt.activeColor:'#d1d5db'}`,background:form[opt.key]?opt.activeColor:'transparent',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.15s',flexShrink:0}}>
                  {form[opt.key] && <FaCheck style={{color:'#fff',fontSize:'9px'}} />}
                </div>
                <input type="checkbox" checked={form[opt.key]} onChange={e=>setField({[opt.key]:e.target.checked})} style={{display:'none'}} />
                <span style={{fontSize:'12px',fontWeight:600,color:'#374151'}}>{opt.icon} {opt.label}</span>
              </label>
            ))}
          </div>
        </AE_Card>



        <AE_Card>
          <AE_CardHead icon="🏷" title="Clasificación" />
          <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:'12px'}}>
            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:'#64748b',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Categoría</div>
              <select style={{...AE_inputStyle,fontSize:'13px'}} value={form.category} onFocus={AE_focusIn} onBlur={AE_focusOut}
                onChange={e=>setField({category:e.target.value})}>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:'#64748b',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Fecha de publicación</div>
              <input type="date" style={{...AE_inputStyle,fontSize:'13px'}} value={form.date} onFocus={AE_focusIn} onBlur={AE_focusOut}
                onChange={e=>setField({date:e.target.value})} />
            </div>
            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:'#64748b',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Autor</div>
              <input style={{...AE_inputStyle,fontSize:'13px'}} value={form.author} onFocus={AE_focusIn} onBlur={AE_focusOut}
                onChange={e=>setField({author:e.target.value})} />
            </div>
          </div>
        </AE_Card>

        <AE_Card>
          <AE_CardHead icon="🖼" title="Imagen destacada" />
          <div style={{padding:'16px',display:'flex',flexDirection:'column',gap:'10px'}}>
            {form.image && (
              <div style={{borderRadius:'10px',overflow:'hidden',border:'1px solid #e2e8f0',height:'140px'}}>
                <img src={form.image} alt="Preview" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              </div>
            )}
            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:'#64748b',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>URL de la imagen</div>
              <input type="url" style={{...AE_inputStyle,fontSize:'12px',fontFamily:'monospace'}} value={form.image}
                onFocus={AE_focusIn} onBlur={AE_focusOut}
                onChange={e=>setField({image:e.target.value})} placeholder="https://..." />
            </div>
            <div>
              <div style={{fontSize:'11px',fontWeight:700,color:'#64748b',marginBottom:'6px',textTransform:'uppercase',letterSpacing:'0.5px'}}>Alt text (SEO)</div>
              <input style={{...AE_inputStyle,fontSize:'12px'}} value={form.altText} onFocus={AE_focusIn} onBlur={AE_focusOut}
                onChange={e=>setField({altText:e.target.value})} placeholder="Descripción de la imagen" />
            </div>
          </div>
        </AE_Card>

        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          <button type="submit" disabled={isSaving} style={{width:'100%',padding:'14px',borderRadius:'12px',border:'none',
            cursor:isSaving?'wait':'pointer',
            background:isSaving?'linear-gradient(135deg,#94a3b8,#64748b)':'linear-gradient(135deg,#f59e0b,#d97706)',
            color:isSaving?'#e2e8f0':'#fff',fontWeight:900,fontSize:'14px',
            display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
            boxShadow:isSaving?'none':'0 6px 20px rgba(245,158,11,0.35)',
            transition:'all 0.2s', opacity:isSaving?0.8:1}}
            onMouseEnter={e=>{ if(!isSaving) e.currentTarget.style.boxShadow='0 8px 28px rgba(245,158,11,0.5)' }}
            onMouseLeave={e=>{ if(!isSaving) e.currentTarget.style.boxShadow='0 6px 20px rgba(245,158,11,0.35)' }}>
            {isSaving
              ? <><span style={{width:'14px',height:'14px',border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block',animation:'spin 0.7s linear infinite'}}/>Guardando...</>
              : <><FaSave style={{fontSize:'13px'}} /> Guardar Artículo</>
            }
          </button>
          <button type="button" onClick={handleCancel} style={{width:'100%',padding:'12px',borderRadius:'12px',cursor:'pointer',
            background:'transparent',border:'1px solid #e2e8f0',color:'#64748b',fontWeight:600,fontSize:'13px',transition:'all 0.15s'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='#0A1628';e.currentTarget.style.color='#0A1628'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='#e2e8f0';e.currentTarget.style.color='#64748b'}}>
            Cancelar
          </button>
        </div>
      </div>
    </form>
  )
}

const AdminPanel = React.memo(({ show, isAuthenticated, articles, onClose, onLogout, onSave, onDelete, onTogglePublish, onToggleFeatured, onDuplicate }) => {
  const [adminView, setAdminView] = useState('dashboard')
  const [editingArticle, setEditingArticle] = useState(null)
  const [editorKey, setEditorKey] = useState(0)
  const [dashFilter, setDashFilter] = useState('all')
  const [articleFilter, setArticleFilter] = useState('all')

  // 🔒 Bloquea el scroll del body mientras el panel está abierto
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (show && isAuthenticated) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [show, isAuthenticated])

  // Close sidebar on nav
  useEffect(() => { setSidebarOpen(false) }, [adminView])

  const stats = [
    { 
      label: 'Total Artículos', 
      value: articles.length, 
      icon: FaFileAlt, 
      color: 'text-[#0A1628]', 
      bg: 'bg-slate-100',
      filter: 'all',
      border: 'border-slate-200',
      accent: '#0A1628',
    },
    { 
      label: 'Publicados', 
      value: articles.filter(a => a.published).length, 
      icon: FaCheck, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      filter: 'published',
      border: 'border-emerald-200',
      accent: '#059669',
    },
    { 
      label: 'Borradores', 
      value: articles.filter(a => !a.published).length, 
      icon: FaClock, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      filter: 'draft',
      border: 'border-amber-200',
      accent: '#d97706',
    },
    { 
      label: 'Destacados', 
      value: articles.filter(a => a.featured).length, 
      icon: FaStar, 
      color: 'text-[#f59e0b]', 
      bg: 'bg-yellow-50',
      filter: 'featured',
      border: 'border-yellow-200',
      accent: '#f59e0b',
    },
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FaChartBar },
    { id: 'articles', label: 'Artículos', icon: FaNewspaper },
    { id: 'new', label: 'Nuevo Artículo', icon: FaPlus },
    { id: 'contacts', label: 'Contactos', icon: FaUsers },
  ]

  const [saveMsg, setSaveMsg] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // ── CRM State ──────────────────────────────────────
  const [contacts, setContacts] = useState([])
  const [contactsLoading, setContactsLoading] = useState(false)
  const [contactFilter, setContactFilter] = useState('all')
  const [contactSearch, setContactSearch] = useState('')
  const [editingContact, setEditingContact] = useState(null)

  const loadContacts = useCallback(async () => {
    setContactsLoading(true)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'contacts_list', token: getAuthToken() })
      })
      const data = await response.json()
      if (data.success) setContacts(data.contacts || [])
    } catch(e) { console.error('Error cargando contactos:', e) }
    finally { setContactsLoading(false) }
  }, [])

  useEffect(() => {
    if (adminView === 'contacts') loadContacts()
  }, [adminView, loadContacts])

  const updateContact = async (id, updates) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'contacts_update', token: getAuthToken(), id, ...updates })
      })
      const data = await response.json()
      if (data.success) {
        setContacts(prev => prev.map(c => c.id == id ? { ...c, ...updates } : c))
        return true
      }
    } catch(e) {}
    return false
  }

  const deleteContact = async (id) => {
    if (!window.confirm('¿Eliminar este contacto?')) return
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'contacts_delete', token: getAuthToken(), id })
      })
      const data = await response.json()
      if (data.success) setContacts(prev => prev.filter(c => c.id != id))
    } catch(e) { alert('Error al eliminar') }
  }

  const filteredContacts = useMemo(() => {
    return contacts.filter(c => {
      if (contactFilter !== 'all' && c.status !== contactFilter) return false
      if (contactSearch) {
        const term = contactSearch.toLowerCase()
        return (c.name||'').toLowerCase().includes(term) || (c.email||'').toLowerCase().includes(term) || (c.phone||'').includes(term) || (c.message||'').toLowerCase().includes(term)
      }
      return true
    })
  }, [contacts, contactFilter, contactSearch])

  const contactStats = useMemo(() => ({
    total: contacts.length,
    nuevo: contacts.filter(c => c.status === 'nuevo').length,
    contactado: contacts.filter(c => c.status === 'contactado').length,
    en_proceso: contacts.filter(c => c.status === 'en_proceso').length,
    cerrado: contacts.filter(c => c.status === 'cerrado').length,
  }), [contacts])

  const handleSave = async (data) => {
    setIsSaving(true)
    setSaveMsg('')
    try {
      await onSave(data)
      setEditingArticle(null)
      setAdminView('articles')
      setSaveMsg('✅ Artículo guardado y sincronizado con el servidor')
    } catch(e) {
      setSaveMsg(`❌ Error: ${e.message || 'No se pudo guardar. Revise la conexión o permisos del servidor.'}`)
    } finally {
      setIsSaving(false)
      setTimeout(() => setSaveMsg(''), 8000)
    }
  }

  // Filtered list for dashboard
  const dashArticles = (() => {
    let list = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (dashFilter === 'featured') return list.filter(a => a.featured)
    if (dashFilter === 'published') return list.filter(a => a.published)
    if (dashFilter === 'draft') return list.filter(a => !a.published)
    return list.slice(0, 8)
  })()

  // Filtered list for articles view
  const filteredAdminArticles = (() => {
    let list = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (articleFilter === 'featured') return list.filter(a => a.featured)
    if (articleFilter !== 'all') return list.filter(a => a.category === articleFilter)
    return list
  })()

  return (
    <AnimatePresence>
      {show && isAuthenticated && (
        <m.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }} 
          className="fixed inset-0 overflow-hidden bg-slate-100"
          style={{ fontFamily: 'inherit', zIndex: 10001 }}
        >
          <div className="flex h-full">
            {/* Sidebar */}
            {/* Mobile overlay */}
            {sidebarOpen && (
              <div className="fixed inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}
            <m.aside 
              initial={{ x: -20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              className={`bg-gradient-to-b from-[#0A1628] to-[#0F2744] border-r border-slate-700/30 flex flex-col z-20 shadow-2xl h-full overflow-y-auto flex-shrink-0 transition-all duration-300
                lg:relative lg:translate-x-0 lg:w-64
                ${sidebarOpen ? 'fixed left-0 top-0 w-72 translate-x-0' : 'hidden lg:flex'}`}
            >
              <div className="p-8 pb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex-shrink-0" style={{width:'48px',height:'48px',borderRadius:'12px',overflow:'hidden',border:'1px solid rgba(255,255,255,0.12)',boxShadow:'0 4px 16px rgba(0,0,0,0.4)'}}>
                    <img src="/favicon.webp" alt="LITESCO" width={96} height={96} style={{width:'100%',height:'100%',objectFit:'cover',imageRendering:'auto'}} />
                  </div>
                  <div>
                    <h1 className="text-white font-bold text-2xl tracking-tight">LITESCO</h1>
                    <p className="text-[#f59e0b] text-xs font-semibold uppercase tracking-wider">Panel Administrativo</p>
                  </div>
                </div>
              </div>

              <nav className="flex-1 px-5 space-y-2">
                <div className="text-xs font-bold text-slate-400 px-4 py-3 uppercase tracking-wider">Menú Principal</div>
                {menuItems.map(item => {
                  const Icon = item.icon
                  const isActive = adminView === item.id || (item.id === 'new' && adminView === 'editor' && !editingArticle?.id)
                  return (
                    <button 
                      key={item.id} 
                      onClick={() => item.id === 'new' ? (setEditingArticle(null), setEditorKey(k => k+1), setAdminView('editor')) : setAdminView(item.id)}
                      className={`relative w-full flex items-center gap-3 px-5 py-4 rounded-xl font-semibold transition-all duration-300 group ${isActive ? 'text-white bg-white/10 shadow-lg' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}
                    >
                      {isActive && (
                        <m.div 
                          layoutId="activeTab" 
                          className="absolute inset-0 bg-gradient-to-r from-[#f59e0b]/30 to-transparent border-l-4 border-[#f59e0b] rounded-xl" 
                        />
                      )}
                      <Icon className={`relative z-10 text-lg ${isActive ? 'text-[#f59e0b]' : 'text-slate-400 group-hover:text-white'}`} /> 
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="p-5 m-5 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm space-y-2">
                <button 
                  onClick={onClose} 
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                >
                  <FaHome /> Ver Blog Público
                </button>
                <button 
                  onClick={onLogout} 
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:text-red-200 hover:bg-red-500/10 transition-all text-sm font-medium"
                >
                  <FaSignOutAlt /> Cerrar Sesión
                </button>
              </div>
            </m.aside>

            {/* Main Content */}
            <main className="flex-1 h-full overflow-y-auto" style={{background:'#f0f4f8'}}>
              {/* Mobile header bar */}
              <div className="lg:hidden flex items-center gap-3 px-4 py-3 sticky top-0 z-10" style={{background:'#0A1628',borderBottom:'1px solid rgba(245,158,11,0.15)'}}>
                <button onClick={() => setSidebarOpen(v => !v)}
                  className="p-2 rounded-lg transition-colors flex-shrink-0"
                  style={{color:'#94a3b8',background:'rgba(255,255,255,0.05)'}}>
                  <FaBars size={16} />
                </button>
                <div style={{width:'30px',height:'30px',borderRadius:'8px',overflow:'hidden',flexShrink:0,border:'1px solid rgba(255,255,255,0.1)'}}>
                  <img src="/favicon.webp" alt="LITESCO" width={60} height={60} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                </div>
                <span className="text-white font-bold text-sm tracking-tight">LITESCO</span>
                <span className="ml-auto text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md" style={{color:'#f59e0b',background:'rgba(245,158,11,0.1)'}}>
                  {adminView === 'dashboard' ? 'Dashboard' : adminView === 'articles' ? 'Artículos' : adminView === 'contacts' ? 'CRM' : 'Editor'}
                </span>
              </div>
              <header className="hidden lg:flex sticky top-0 z-30 px-8 py-5 items-center justify-between" style={{background:'#fff', borderBottom:'1px solid #e8edf4', boxShadow:'0 2px 12px rgba(10,22,40,0.06)'}}>
                <div>
                  <h2 style={{color:'#0A1628', fontWeight:900, fontSize:'1.5rem', margin:0, letterSpacing:'-0.5px'}}>
                    {adminView === 'dashboard' && 'Resumen General'}
                    {adminView === 'articles' && 'Gestión de Contenido'}
                    {adminView === 'contacts' && 'Gestión de Contactos'}
                    {adminView === 'editor' && (editingArticle?.id ? 'Editando Artículo' : 'Creando Nuevo Artículo')}
                  </h2>
                  <p style={{color:'#64748b', fontSize:'13px', margin:'3px 0 0', fontWeight:500}}>
                    {adminView === 'dashboard' && `Hoy es ${new Date().toLocaleDateString('es-CO', {weekday:'long', day:'numeric', month:'long'})}`}
                    {adminView === 'articles' && `${articles.length} publicaciones en total`}
                    {adminView === 'contacts' && `${contacts.length} contactos en total`}
                    {adminView === 'editor' && 'Complete los campos y optimice para motores de búsqueda'}
                  </p>
                </div>
                {adminView === 'articles' && (
                  <button onClick={() => { setEditingArticle({}); setAdminView('editor') }}
                    style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px 20px',background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#0A1628',border:'none',borderRadius:'10px',fontWeight:800,fontSize:'13px',cursor:'pointer',boxShadow:'0 4px 16px rgba(245,158,11,0.3)'}}>
                    <FaPlus /> Nuevo Artículo
                  </button>
                )}
              </header>

              <div className="admin-main-content">
              <style>{`.admin-main-content{padding:32px}@media(max-width:768px){.admin-main-content{padding:16px}}`}</style>
                {/* TOAST DE CONFIRMACIÓN */}
              {saveMsg && (
                <div style={{ position:'fixed', bottom:'32px', left:'50%', transform:'translateX(-50%)', zIndex:9999, background:'linear-gradient(135deg,#065f46,#047857)', color:'#fff', padding:'14px 28px', borderRadius:'14px', fontWeight:700, fontSize:'14px', boxShadow:'0 8px 32px rgba(6,95,70,0.45)', display:'flex', alignItems:'center', gap:'10px', whiteSpace:'nowrap' }}>
                  {saveMsg}
                </div>
              )}

              {adminView === 'dashboard' && (
                  <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-7xl mx-auto">
                    
                    <div className="ae-stats-grid">
                    <style>{`.ae-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}@media(max-width:900px){.ae-stats-grid{grid-template-columns:repeat(2,1fr)}}@media(max-width:480px){.ae-stats-grid{grid-template-columns:repeat(2,1fr);gap:10px}}`}</style>
                      {stats.map((stat, i) => {
                        const Icon = stat.icon
                        const isActive = dashFilter === stat.filter
                        return (
                          <m.button key={stat.label} type="button"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                            onClick={() => setDashFilter(isActive ? 'all' : stat.filter)}
                            style={{
                              position:'relative', overflow:'hidden', textAlign:'left', width:'100%', cursor:'pointer',
                              borderRadius:'16px', padding:'20px 22px', outline:'none',
                              background: isActive ? 'linear-gradient(135deg,#0A1628 0%,#0d1f3c 100%)' : '#fff',
                              border: `2px solid ${isActive ? stat.accent : '#e8edf4'}`,
                              boxShadow: isActive ? `0 10px 30px rgba(10,22,40,0.28)` : '0 2px 12px rgba(10,22,40,0.06)',
                              transition: 'all 0.2s',
                            }}
                          >
                            {isActive && <div style={{position:'absolute',top:-20,right:-20,width:'100px',height:'100px',background:`radial-gradient(circle,${stat.accent}28,transparent)`,borderRadius:'50%'}} />}
                            <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'14px'}}>
                              <div style={{width:'38px',height:'38px',borderRadius:'10px',background:isActive?`rgba(245,158,11,0.15)`:'#f8fafc',border:`1px solid ${isActive?'rgba(245,158,11,0.25)':'#e8edf4'}`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                                <Icon style={{fontSize:'15px',color:stat.accent}} />
                              </div>
                              <span style={{fontSize:'2.2rem',fontWeight:900,color:isActive?'#fff':stat.accent,lineHeight:1}}>{stat.value}</span>
                            </div>
                            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                              <span style={{fontSize:'12px',fontWeight:600,color:isActive?'rgba(255,255,255,0.6)':'#64748b'}}>{stat.label}</span>
                              {isActive && <span style={{fontSize:'9px',fontWeight:800,padding:'2px 8px',borderRadius:'10px',background:stat.accent,color:'#0A1628',letterSpacing:'0.5px'}}>ACTIVO</span>}
                            </div>
                          </m.button>
                        )
                      })}
                    </div>

                    <div style={{background:'#fff', borderRadius:'16px', border:'1px solid #e8edf4', boxShadow:'0 2px 16px rgba(10,22,40,0.06)', overflow:'hidden'}}>
                      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 22px',borderBottom:'1px solid #f1f5f9',background:'linear-gradient(to right,rgba(10,22,40,0.025),transparent)'}}>
                        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                          <h3 style={{color:'#0A1628',fontWeight:800,fontSize:'14px',margin:0}}>
                            {dashFilter === 'all' && 'Artículos recientes'}
                            {dashFilter === 'featured' && '⭐ Destacados'}
                            {dashFilter === 'published' && '✅ Publicados'}
                            {dashFilter === 'draft' && '🕐 Borradores'}
                          </h3>
                          <span style={{padding:'2px 10px',background:'#f1f5f9',color:'#64748b',borderRadius:'20px',fontSize:'11px',fontWeight:700}}>
                            {dashArticles.length}
                          </span>
                        </div>
                        {dashFilter !== 'all' && (
                          <button onClick={() => setDashFilter('all')}
                            style={{fontSize:'11px',color:'#f59e0b',fontWeight:700,background:'none',border:'none',cursor:'pointer',padding:0}}>
                            Ver todos →
                          </button>
                        )}
                      </div>

                      {dashArticles.length === 0 ? (
                        <div className="text-center py-16 text-slate-400">
                          <FaFileAlt className="text-4xl mx-auto mb-3 opacity-30" />
                          <p className="font-medium">No hay artículos en esta categoría</p>
                        </div>
                      ) : (
                        <div className="divide-y divide-slate-100">
                          {dashArticles.map((article, i) => {
                            const cat = CATEGORIES.find(c => c.id === article.category)
                            const CatIcon = cat?.icon || FaBalanceScale
                            return (
                              <m.div
                                key={article.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-all cursor-pointer group"
                                onClick={() => { setEditingArticle(article); setAdminView('editor') }}
                              >
                                <div className="relative flex-shrink-0">
                                  <img src={article.image} alt="" className="w-16 h-16 rounded-xl object-cover border border-slate-200" />
                                  {article.featured && (
                                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow">
                                      <FaStar className="text-white text-[8px]" />
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-semibold">
                                      <CatIcon className="text-amber-500 text-[10px]" /> {cat?.name}
                                    </span>
                                    {article.published ? (
                                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-semibold">Publicado</span>
                                    ) : (
                                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-md text-[11px] font-semibold">Borrador</span>
                                    )}
                                  </div>
                                  <h4 className="font-semibold text-slate-900 text-sm truncate group-hover:text-[#f59e0b] transition">{article.title}</h4>
                                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                    <FaCalendarAlt className="text-[10px]" /> {formatDate(article.date)}
                                    <span className="mx-1">·</span>
                                    <FaUser className="text-[10px]" /> {article.author}
                                  </p>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                                  <button
                                    onClick={e => { e.stopPropagation(); setEditingArticle(article); setAdminView('editor') }}
                                    className="p-2 bg-[#0A1628] text-white rounded-lg hover:bg-[#0F2744] transition text-sm"
                                    title="Editar"
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    onClick={e => { e.stopPropagation(); onDuplicate(article) }}
                                    className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition text-sm"
                                    title="Duplicar artículo"
                                  >
                                    <FaCopy />
                                  </button>
                                  <button
                                    onClick={e => { e.stopPropagation(); onToggleFeatured(article.id) }}
                                    className={`p-2 rounded-lg transition text-sm ${article.featured ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                                    title={article.featured ? 'Quitar destacado' : 'Destacar'}
                                  >
                                    <FaStar />
                                  </button>
                                  <button
                                    onClick={e => { e.stopPropagation(); onDelete(article.id) }}
                                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition text-sm"
                                    title="Eliminar"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>

                                <FaChevronRight className="text-slate-300 text-xs flex-shrink-0 group-hover:text-[#f59e0b] transition" />
                              </m.div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  </m.div>
                )}

                {adminView === 'articles' && (
                  <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-6">
                    
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filtrar:</span>
                        {[
                          { id: 'all', label: 'Todos', icon: FaFileAlt, count: articles.length },
                          { id: 'featured', label: 'Destacados', icon: FaStar, count: articles.filter(a => a.featured).length },
                          ...CATEGORIES.map(cat => ({ ...cat, count: articles.filter(a => a.category === cat.id).length }))
                            .filter(cat => cat.count > 0)
                        ].map(opt => {
                          const OptIcon = opt.icon
                          const isActive = articleFilter === opt.id
                          return (
                            <button
                              key={opt.id}
                              onClick={() => setArticleFilter(opt.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                                isActive
                                  ? 'bg-[#0A1628] text-white shadow-md'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              <OptIcon className={isActive ? 'text-[#f59e0b]' : 'text-slate-400'} />
                              {opt.label}
                              <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-white/20' : 'bg-slate-200 text-slate-500'}`}>
                                {opt.count}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {filteredAdminArticles.length === 0 ? (
                      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                        <FaSearch className="text-4xl text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">No hay artículos con este filtro</p>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {filteredAdminArticles.map((article, i) => {
                          const cat = CATEGORIES.find(c => c.id === article.category)
                          const Icon = cat?.icon || FaBalanceScale
                          return (
                            <m.div
                              key={article.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.04 }}
                              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#f59e0b] hover:shadow-lg transition-all"
                            >
                              <div className="flex gap-0">
                                <div className="w-48 flex-shrink-0 hidden sm:block">
                                  <img src={article.image} alt={article.altText} className="w-full h-full object-cover" style={{ minHeight: '160px', maxHeight: '200px' }} />
                                </div>
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                                        <Icon className="text-amber-500" /> {cat?.name}
                                      </span>
                                      {article.published ? (
                                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold">✓ Publicado</span>
                                      ) : (
                                        <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold">⏳ Borrador</span>
                                      )}
                                      {article.featured && (
                                        <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold flex items-center gap-1">
                                          <FaStar className="text-[10px]" /> Destacado
                                        </span>
                                      )}
                                    </div>
                                    <h3 className="text-lg font-bold text-[#0A1628] mb-1 leading-snug">{article.title}</h3>
                                    <p className="text-slate-500 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                                    <div className="flex items-center gap-4 text-xs text-slate-400">
                                      <span className="flex items-center gap-1"><FaCalendarAlt className="text-amber-400" /> {formatDate(article.date)}</span>
                                      <span className="flex items-center gap-1"><FaUser className="text-amber-400" /> {article.author}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 flex-wrap">
                                    <button 
                                      onClick={() => { setEditingArticle(article); setAdminView('editor') }}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A1628] text-white rounded-xl text-sm font-semibold hover:bg-[#0F2744] transition-all shadow-sm"
                                    >
                                      <FaEdit /> Editar
                                    </button>
                                    <button 
                                      onClick={() => onDuplicate(article)}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-blue-50 hover:text-blue-700 transition-all"
                                      title="Crear una copia de este artículo"
                                    >
                                      <FaCopy /> Duplicar
                                    </button>
                                    <button 
                                      onClick={() => onTogglePublish(article.id)}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-200 transition-all"
                                    >
                                      {article.published ? <FaEyeSlash /> : <FaEye />}
                                      {article.published ? 'Despublicar' : 'Publicar'}
                                    </button>
                                    <button 
                                      onClick={() => onToggleFeatured(article.id)}
                                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${article.featured ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                    >
                                      <FaStar /> {article.featured ? 'Quitar Destacado' : 'Destacar'}
                                    </button>
                                    <button 
                                      onClick={() => onDelete(article.id)}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-all ml-auto"
                                    >
                                      <FaTrash /> Eliminar
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </m.div>
                          )
                        })}
                      </div>
                    )}
                  </m.div>
                )}

                {adminView === 'editor' && (
                  <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
                    <ArticleEditor 
                      key={editorKey + (editingArticle?.id || 'new')}
                      article={editingArticle} 
                      onSave={handleSave}
                      isSaving={isSaving}
                      onCancel={() => { setEditingArticle(null); setAdminView('articles') }} 
                    />
                  </m.div>
                )}

                {/* ── CRM CONTACTS VIEW ─────────────────── */}
                {adminView === 'contacts' && (
                  <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto space-y-6">
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        { label:'Total', count: contactStats.total, color:'#0A1628', bg:'#f1f5f9' },
                        { label:'Nuevos', count: contactStats.nuevo, color:'#f59e0b', bg:'rgba(245,158,11,0.1)' },
                        { label:'Contactados', count: contactStats.contactado, color:'#3b82f6', bg:'rgba(59,130,246,0.1)' },
                        { label:'En proceso', count: contactStats.en_proceso, color:'#8b5cf6', bg:'rgba(139,92,246,0.1)' },
                        { label:'Cerrados', count: contactStats.cerrado, color:'#10b981', bg:'rgba(16,185,129,0.1)' },
                      ].map(s => (
                        <div key={s.label} style={{background:'#fff',borderRadius:'12px',padding:'16px 20px',border:'1px solid #e8edf4',boxShadow:'0 2px 8px rgba(10,22,40,0.04)',cursor:'pointer'}}
                          onClick={() => setContactFilter(s.label === 'Total' ? 'all' : s.label === 'Nuevos' ? 'nuevo' : s.label === 'Contactados' ? 'contactado' : s.label === 'En proceso' ? 'en_proceso' : 'cerrado')}>
                          <div style={{fontSize:'1.5rem',fontWeight:900,color:s.color}}>{s.count}</div>
                          <div style={{fontSize:'11px',color:'#64748b',fontWeight:600,marginTop:'2px'}}>{s.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Filters + Search */}
                    <div style={{display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'center'}}>
                      <div style={{flex:1,minWidth:'200px',position:'relative'}}>
                        <FaSearch style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'#94a3b8',fontSize:'13px'}} />
                        <input
                          type="text"
                          placeholder="Buscar por nombre, email, teléfono..."
                          value={contactSearch}
                          onChange={e => setContactSearch(e.target.value)}
                          style={{width:'100%',padding:'10px 12px 10px 36px',borderRadius:'10px',border:'1px solid #e2e8f0',fontSize:'13px',outline:'none',color:'#1e293b'}}
                        />
                      </div>
                      <select value={contactFilter} onChange={e => setContactFilter(e.target.value)}
                        style={{padding:'10px 16px',borderRadius:'10px',border:'1px solid #e2e8f0',fontSize:'13px',color:'#1e293b',outline:'none',cursor:'pointer'}}>
                        <option value="all">Todos</option>
                        <option value="nuevo">Nuevos</option>
                        <option value="contactado">Contactados</option>
                        <option value="en_proceso">En proceso</option>
                        <option value="cerrado">Cerrados</option>
                      </select>
                      <button onClick={loadContacts} style={{padding:'10px 16px',borderRadius:'10px',border:'1px solid #e2e8f0',background:'#fff',fontSize:'13px',cursor:'pointer',color:'#64748b',fontWeight:600}}>
                        ↻ Actualizar
                      </button>
                    </div>

                    {/* Contact list */}
                    {contactsLoading ? (
                      <div style={{textAlign:'center',padding:'40px',color:'#94a3b8'}}>Cargando contactos...</div>
                    ) : filteredContacts.length === 0 ? (
                      <div style={{textAlign:'center',padding:'40px',color:'#94a3b8',background:'#fff',borderRadius:'14px',border:'1px solid #e8edf4'}}>
                        No hay contactos {contactFilter !== 'all' ? `con estado "${contactFilter}"` : ''}
                      </div>
                    ) : (
                      <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
                        {filteredContacts.map(contact => {
                          const isEditing = editingContact?.id == contact.id
                          const statusColors = {
                            nuevo: { bg:'rgba(245,158,11,0.12)', color:'#92400e', label:'Nuevo' },
                            contactado: { bg:'rgba(59,130,246,0.12)', color:'#1e40af', label:'Contactado' },
                            en_proceso: { bg:'rgba(139,92,246,0.12)', color:'#5b21b6', label:'En proceso' },
                            cerrado: { bg:'rgba(16,185,129,0.12)', color:'#065f46', label:'Cerrado' },
                          }
                          const st = statusColors[contact.status] || statusColors.nuevo
                          const date = contact.created_at ? new Date(contact.created_at).toLocaleDateString('es-CO', {day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}) : ''

                          return (
                            <div key={contact.id} style={{background:'#fff',borderRadius:'14px',border:'1px solid #e8edf4',overflow:'hidden',boxShadow:'0 2px 8px rgba(10,22,40,0.04)'}}>
                              <div style={{padding:'16px 20px',display:'flex',alignItems:'flex-start',gap:'16px',flexWrap:'wrap'}}>
                                {/* Avatar */}
                                <div style={{width:'42px',height:'42px',borderRadius:'12px',background:'linear-gradient(135deg,#0A1628,#0F2744)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:'#f59e0b',fontWeight:900,fontSize:'15px'}}>
                                  {(contact.name||'?')[0].toUpperCase()}
                                </div>
                                {/* Info */}
                                <div style={{flex:1,minWidth:'200px'}}>
                                  <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap',marginBottom:'4px'}}>
                                    <span style={{fontWeight:800,fontSize:'14px',color:'#0A1628'}}>{contact.name}</span>
                                    <span style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'20px',background:st.bg,color:st.color}}>{st.label}</span>
                                    <span style={{fontSize:'11px',color:'#94a3b8',marginLeft:'auto'}}>{date}</span>
                                  </div>
                                  <div style={{display:'flex',gap:'16px',flexWrap:'wrap',fontSize:'12px',color:'#64748b',marginBottom:'6px'}}>
                                    <a href={`mailto:${contact.email}`} style={{color:'#b45309',textDecoration:'none',fontWeight:600}}>{contact.email}</a>
                                    <a href={`tel:${contact.phone}`} style={{color:'#64748b',textDecoration:'none'}}>{contact.phone}</a>
                                    {contact.source && <span style={{color:'#94a3b8'}}>vía {contact.source}</span>}
                                  </div>
                                  <div style={{fontSize:'13px',color:'#374151',lineHeight:'1.6',background:'#f8fafc',padding:'10px 14px',borderRadius:'8px',borderLeft:'3px solid #e2e8f0'}}>
                                    {contact.message}
                                  </div>
                                  {contact.notes && !isEditing && (
                                    <div style={{marginTop:'8px',fontSize:'12px',color:'#6366f1',background:'rgba(99,102,241,0.06)',padding:'8px 12px',borderRadius:'8px',borderLeft:'3px solid #6366f1'}}>
                                      <strong>Notas:</strong> {contact.notes}
                                    </div>
                                  )}
                                </div>
                                {/* Actions */}
                                <div style={{display:'flex',gap:'6px',flexShrink:0}}>
                                  <button onClick={() => setEditingContact(isEditing ? null : {...contact})}
                                    style={{width:'32px',height:'32px',borderRadius:'8px',border:'1px solid #e2e8f0',background:isEditing?'#0A1628':'#fff',color:isEditing?'#f59e0b':'#64748b',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'12px'}}>
                                    <FaEdit />
                                  </button>
                                  <button onClick={() => deleteContact(contact.id)}
                                    style={{width:'32px',height:'32px',borderRadius:'8px',border:'1px solid #fee2e2',background:'#fff',color:'#ef4444',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:'12px'}}>
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>

                              {/* Edit panel */}
                              {isEditing && (
                                <div style={{padding:'16px 20px',background:'#f8fafc',borderTop:'1px solid #e8edf4',display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'flex-end'}}>
                                  <div style={{minWidth:'140px'}}>
                                    <label style={{fontSize:'11px',fontWeight:700,color:'#64748b',display:'block',marginBottom:'4px'}}>Estado</label>
                                    <select value={editingContact.status||'nuevo'} onChange={e => setEditingContact(p=>({...p, status:e.target.value}))}
                                      style={{width:'100%',padding:'8px 12px',borderRadius:'8px',border:'1px solid #e2e8f0',fontSize:'13px',color:'#1e293b'}}>
                                      <option value="nuevo">Nuevo</option>
                                      <option value="contactado">Contactado</option>
                                      <option value="en_proceso">En proceso</option>
                                      <option value="cerrado">Cerrado</option>
                                    </select>
                                  </div>
                                  <div style={{flex:1,minWidth:'200px'}}>
                                    <label style={{fontSize:'11px',fontWeight:700,color:'#64748b',display:'block',marginBottom:'4px'}}>Notas</label>
                                    <input type="text" value={editingContact.notes||''} onChange={e => setEditingContact(p=>({...p, notes:e.target.value}))}
                                      placeholder="Agregar notas sobre este contacto..."
                                      style={{width:'100%',padding:'8px 12px',borderRadius:'8px',border:'1px solid #e2e8f0',fontSize:'13px',color:'#1e293b',outline:'none'}} />
                                  </div>
                                  <button onClick={async () => {
                                    const ok = await updateContact(editingContact.id, { status: editingContact.status, notes: editingContact.notes || '' })
                                    if (ok) { setEditingContact(null); setSaveMsg('✅ Contacto actualizado') ; setTimeout(()=>setSaveMsg(''),3000) }
                                  }}
                                    style={{padding:'8px 20px',borderRadius:'8px',border:'none',background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#0A1628',fontWeight:800,fontSize:'12px',cursor:'pointer',whiteSpace:'nowrap'}}>
                                    Guardar
                                  </button>
                                  <button onClick={() => setEditingContact(null)}
                                    style={{padding:'8px 14px',borderRadius:'8px',border:'1px solid #e2e8f0',background:'#fff',color:'#64748b',fontSize:'12px',cursor:'pointer'}}>
                                    Cancelar
                                  </button>
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </m.div>
                )}
              </div>
            </main>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
})

// ─── BACK TO TOP ─────────────────────────────────────────────────────────────
// BackToTop eliminado

// ─────────────────────────────────────────────
// HELPERS GLOBALES
// ─────────────────────────────────────────────
const slugId = (text) => text.toLowerCase().trim()
  .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i')
  .replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n')
  .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')

const readTime = (html) => {
  const text = (html||'').replace(/<[^>]+>/g,' ')
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// CARRUSEL ARTÍCULOS RELACIONADOS — rediseño 2.0
// ─────────────────────────────────────────────
const RelatedCarousel = ({ articles, onSelect, currentCat }) => {
  const [page, setPage] = useState(0)
  const [hovered, setHovered] = useState(null)
  const VISIBLE = 3
  if (!articles.length) return null
  const pool = articles.slice(0, 8)
  const totalPages = Math.ceil(pool.length / VISIBLE)
  const visible = pool.slice(page * VISIBLE, page * VISIBLE + VISIBLE)

  useEffect(() => {
    if (hovered !== null) return
    const timer = setInterval(() => setPage(p => (p + 1) % totalPages), 5000)
    return () => clearInterval(timer)
  }, [totalPages, hovered])

  return (
    <div style={{ marginTop:'8px' }}>
      <div style={{ height:'1px', background:'linear-gradient(to right,transparent,#e2e8f0 20%,#e2e8f0 80%,transparent)', marginBottom:'32px' }} />
      <style>{`
        @keyframes rcFade { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .rc3-card { animation: rcFade 0.35s cubic-bezier(0.22,1,0.36,1) both; transition: all 0.28s cubic-bezier(0.22,1,0.36,1); }
        .rc3-card:hover { transform: translateY(-4px) !important; border-color: #f59e0b !important; box-shadow: 0 16px 48px rgba(10,22,40,0.16), 0 0 0 2px rgba(245,158,11,0.15) !important; }
        .rc3-card:hover .rc3-img { transform: scale(1.06); filter: brightness(0.8); }
        .rc3-card:hover .rc3-title { color: #b45309 !important; }
        .rc3-card:hover .rc3-cta { gap: 10px !important; color: #d97706 !important; }
        .rc3-card:hover .rc3-bar { width: 100% !important; }
        .rc3-img { transition: transform 0.55s ease, filter 0.35s ease; }
        .rc3-bar { transition: width 0.35s ease; }
        .rc3-nav { transition: all 0.2s ease; border: 1.5px solid rgba(245,158,11,0.25); background: transparent; cursor: pointer; display:flex; align-items:center; justify-content:center; color:#f59e0b; border-radius:10px; }
        .rc3-nav:hover { background: #f59e0b !important; color: #020617 !important; border-color: #f59e0b !important; transform: scale(1.08); }
      `}</style>

      {/* ── Cabecera sección ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'12px', marginBottom:'24px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 14px rgba(245,158,11,0.38)' }}>
            <FaNewspaper style={{ color:'#020617', fontSize:'16px' }} />
          </div>
          <div>
            <p style={{ color:'#f59e0b', fontSize:'10px', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.2em', margin:'0 0 3px' }}>Lectura recomendada</p>
            <h3 style={{ color:'#0A1628', fontWeight:900, fontSize:'1.15rem', margin:0, letterSpacing:'-0.02em' }}>
              {currentCat ? `Más sobre ${currentCat.name}` : 'También te puede interesar'}
            </h3>
          </div>
        </div>
        {totalPages > 1 && (
          <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
            <span style={{ color:'#94a3b8', fontSize:'12px', fontWeight:600 }}>{page + 1} / {totalPages}</span>
            {[
              { fn:()=>setPage(p=>(p-1+totalPages)%totalPages), icon:<FaChevronLeft style={{fontSize:'10px'}}/> },
              { fn:()=>setPage(p=>(p+1)%totalPages), icon:<FaChevronRight style={{fontSize:'10px'}}/> }
            ].map(({fn,icon},k) => (
              <button key={k} onClick={fn} className="rc3-nav" style={{ width:'36px', height:'36px' }}>{icon}</button>
            ))}
          </div>
        )}
      </div>

      {/* ── Divisor ── */}
      <div style={{ height:'2px', background:'linear-gradient(to right,#f59e0b,rgba(245,158,11,0.15),transparent)', borderRadius:'2px', marginBottom:'24px' }} />

      {/* ── Cards ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap:'20px' }}>
        {visible.map((art, idx) => {
          const artCat = CATEGORIES.find(c => c.id === art.category)
          const ArtIcon = artCat?.icon || FaBalanceScale
          return (
            <div key={art.id} className="rc3-card"
              onClick={() => onSelect(art)}
              onMouseEnter={() => setHovered(art.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ borderRadius:'16px', overflow:'hidden', cursor:'pointer', background:'#fff', border:'1.5px solid #e8edf4', boxShadow:'0 2px 16px rgba(10,22,40,0.07)', display:'flex', flexDirection:'column', animationDelay:`${idx*0.07}s` }}
            >
              {/* Imagen */}
              <div style={{ position:'relative', height:'180px', overflow:'hidden', flexShrink:0, background:'linear-gradient(135deg,#0A1628,#0F2744)' }}>
                {art.image
                  ? <img src={art.image} alt={art.altText||''} loading="lazy" className="rc3-img" style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
                  : <div style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}><FaGavel style={{ fontSize:'36px', color:'rgba(245,158,11,0.12)' }} /></div>
                }
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 45%,rgba(10,22,40,0.7) 100%)' }} />
                <div style={{ position:'absolute', top:'10px', left:'10px', display:'flex', gap:'6px' }}>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'4px', padding:'4px 9px', borderRadius:'6px', fontSize:'10px', fontWeight:800, background:'rgba(10,22,40,0.72)', backdropFilter:'blur(8px)', color:'#fff', border:'1px solid rgba(255,255,255,0.1)' }}>
                    <FaClock style={{ fontSize:'8px', color:'#f59e0b' }} /> {readTime(art.content)} min
                  </span>
                </div>
                {artCat && (
                  <div style={{ position:'absolute', bottom:'10px', left:'10px', display:'inline-flex', alignItems:'center', gap:'5px', padding:'4px 10px', borderRadius:'6px', fontSize:'10px', fontWeight:800, background:'linear-gradient(135deg,#f59e0b,#d97706)', color:'#020617' }}>
                    <ArtIcon style={{ fontSize:'9px' }} /> {artCat.name}
                  </div>
                )}
                <div style={{ position:'absolute', bottom:'10px', right:'10px', fontSize:'10px', color:'rgba(255,255,255,0.7)', fontWeight:500, display:'flex', alignItems:'center', gap:'4px' }}>
                  <FaCalendarAlt style={{ fontSize:'8px', color:'#f59e0b' }} /> {formatDate(art.date)}
                </div>
              </div>

              {/* Contenido */}
              <div style={{ padding:'18px 18px 16px', display:'flex', flexDirection:'column', flex:1 }}>
                <h4 className="rc3-title" style={{ color:'#0A1628', fontWeight:800, fontSize:'0.95rem', lineHeight:1.5, margin:'0 0 8px', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', letterSpacing:'-0.01em', transition:'color 0.2s' }}>
                  {art.title}
                </h4>
                <p style={{ color:'#64748b', fontSize:'12.5px', lineHeight:1.7, margin:'0 0 auto', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                  {art.excerpt}
                </p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'14px', paddingTop:'12px', borderTop:'1px solid #f1f5f9' }}>
                  <span style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'11px', color:'#94a3b8' }}>
                    <div style={{ width:'20px', height:'20px', borderRadius:'50%', overflow:'hidden', flexShrink:0, border:'2px solid #f1f5f9' }}>
                      <img src="/favicon.webp" alt="LITESCO" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    </div>
                    {art.author}
                  </span>
                  <span className="rc3-cta" style={{ display:'inline-flex', alignItems:'center', gap:'5px', color:'#f59e0b', fontSize:'11.5px', fontWeight:800, transition:'all 0.2s' }}>
                    Leer <FaArrowRight style={{ fontSize:'9px' }} />
                  </span>
                </div>
                {/* Barra de acento inferior animada */}
                <div className="rc3-bar" style={{ height:'2px', background:'linear-gradient(to right,#f59e0b,#d97706)', borderRadius:'2px', marginTop:'12px', width:'0%' }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Dots ── */}
      {totalPages > 1 && (
        <div style={{ display:'flex', justifyContent:'center', gap:'7px', marginTop:'24px' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{ width: i===page?'28px':'8px', height:'8px', borderRadius:'5px', border:'none', cursor:'pointer', padding:0, transition:'all 0.3s', background: i===page?'#f59e0b':'#e2e8f0' }} />
          ))}
        </div>
      )}
    </div>
  )
}

const ArticleRenderer = ({ content, excerpt, title }) => {
  const contentRef   = useRef(null)
  const [toc, setToc]             = useState([])
  const [faqState, setFaqState]   = useState({})
  const [active, setActive]       = useState(null)
  const [readPct, setReadPct]     = useState(0)

  const processedHtml = useMemo(() => {
    if (!content) return ''

    // ── CONTENT NORMALIZER ──────────────────────────────────────────────────
    // Case 1: HTML was stored HTML-escaped (&lt;h2&gt; etc.)
    // Detect by looking for &lt; followed by known block tags
    let html = content
    const hasEscapedTags = /&lt;(h[1-6]|p|div|ul|ol|li|table|blockquote|strong|em|a)/i.test(html)
    if (hasEscapedTags) {
      // Unescape all HTML entities to get back real HTML
      const tmp = document.createElement('textarea')
      tmp.innerHTML = html
      html = tmp.value
    }

    // Case 2: HTML tags stored as literal text inside <p> tags
    // e.g. <p><h2>Title</h2></p> — extract inner content
    // Unwrap block tags that are wrongly nested inside <p>
    html = html.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (match, inner) => {
      // If a <p> contains block-level tags, just return the inner content unwrapped
      if (/<(h[1-6]|div|ul|ol|table|blockquote)/i.test(inner)) {
        return inner
      }
      return match
    })

    // Case 3: Whole content is plain HTML string (no wrapper, starts with <h2> etc.)
    // — already handled correctly by dangerouslySetInnerHTML
    // ────────────────────────────────────────────────────────────────────────

    let h2cnt = 0
    html = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_, a, inner) => {
      h2cnt++
      const id = slugId(inner.replace(/<[^>]+>/g,''))
      return `<h2${a} id="${id}" data-num="${h2cnt}">${inner}</h2>`
    })
    html = html.replace(/<h3([^>]*)>([\s\S]*?)<\/h3>/gi, (_, a, inner) => {
      const id = slugId(inner.replace(/<[^>]+>/g,'')) + '-s'
      return `<h3${a} id="${id}">${inner}</h3>`
    })
    return html
  }, [content])

  useEffect(() => {
    if (!contentRef.current) return
    const hs = contentRef.current.querySelectorAll('h2[id],h3[id]')
    setToc(Array.from(hs).map(h => ({
      id: h.id, text: h.textContent.replace(/^\d+\.\s*/,'').trim(),
      tag: h.tagName.toLowerCase(), num: h.dataset.num || null,
    })))
  }, [processedHtml])

  useEffect(() => {
    if (!contentRef.current) return
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-15% 0px -75% 0px' }
    )
    contentRef.current.querySelectorAll('h2[id],h3[id]').forEach(h => obs.observe(h))
    return () => obs.disconnect()
  }, [toc])

  useEffect(() => {
    const handler = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      setReadPct(Math.min(100, Math.round((scrollTop / (scrollHeight - clientHeight)) * 100)))
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!contentRef.current) return
    const faqIds = []
    contentRef.current.querySelectorAll('h3[id]').forEach(h3 => {
      const txt = h3.textContent.trim()
      if (txt.startsWith('¿') || txt.endsWith('?')) {
        faqIds.push(h3.id)
        h3.setAttribute('data-faq','true')
        let sib = h3.nextElementSibling
        while (sib && !['H2','H3','H4'].includes(sib.tagName)) {
          sib.setAttribute('data-faq-body', h3.id)
          sib = sib.nextElementSibling
        }
      }
    })
    if (faqIds.length)
      setFaqState(p => { const s={...p}; faqIds.forEach(id=>{ if(s[id]===undefined) s[id]=false }); return s })
  }, [toc])

  useEffect(() => {
    if (!contentRef.current) return
    Object.entries(faqState).forEach(([id, open]) => {
      contentRef.current.querySelectorAll(`[data-faq-body="${id}"]`)
        .forEach(el => { el.style.display = open ? '' : 'none'; el.style.marginTop = open ? '' : '0' })
      const h3 = contentRef.current.querySelector(`h3[id="${id}"]`)
      if (h3) {
        h3.style.cursor = 'pointer'
        const m = h3.querySelector('.fq-icon')
        if (m) { m.textContent = open ? '−' : '+'; m.style.background = open ? '#f59e0b' : 'transparent' }
      }
    })
  }, [faqState])

  useEffect(() => {
    if (!contentRef.current) return
    const faqH3s = contentRef.current.querySelectorAll('h3[data-faq="true"]')
    const hs = []
    faqH3s.forEach(h3 => {
      if (!h3.querySelector('.fq-icon')) {
        const ic = document.createElement('span')
        ic.className = 'fq-icon'
        ic.textContent = '+'
        ic.style.cssText = 'float:right;width:22px;height:22px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#f59e0b;border:2px solid #f59e0b;line-height:1;flex-shrink:0;transition:all 0.2s'
        h3.appendChild(ic)
      }
      const fn = () => setFaqState(p => ({...p, [h3.id]: !p[h3.id]}))
      h3.addEventListener('click', fn)
      hs.push({ el: h3, fn })
    })
    return () => hs.forEach(({ el, fn }) => el.removeEventListener('click', fn))
  }, [toc])

  return (
    <div>
      <style>{`@media print { .article-page-scroll { overflow: visible !important; } .article-page-scroll > div:first-child { display: none !important; } .article-two-col { grid-template-columns: 1fr !important; } .article-two-col > div:last-child { display: none !important; } }`}</style>
      {/* BARRA DE PROGRESO DE LECTURA */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:'3px', zIndex:9999, background:'rgba(226,232,240,0.5)' }}>
        <div style={{ height:'100%', width:`${readPct}%`, background:'linear-gradient(to right,#f59e0b,#d97706,#f59e0b)', transition:'width 0.1s', borderRadius:'0 3px 3px 0', boxShadow:'0 0 8px rgba(245,158,11,0.6)' }} />
      </div>

      {excerpt && (
        <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(135deg,#0A1628 0%,#0F2744 100%)', borderRadius:'20px', padding:'clamp(20px,4vw,32px) clamp(20px,4vw,36px)', marginBottom:'40px', boxShadow:'0 8px 32px rgba(10,22,40,0.18)' }}>
          <div style={{ position:'absolute', top:0, right:0, width:'220px', height:'100%', background:'linear-gradient(to left,rgba(245,158,11,0.1),transparent)', pointerEvents:'none' }} />
          <div style={{ position:'absolute', top:'16px', right:'24px', opacity:0.06, fontSize:'clamp(50px,10vw,90px)', lineHeight:1, pointerEvents:'none' }}>⚖</div>
          <div style={{ position:'absolute', top:'-20px', left:'-20px', width:'120px', height:'120px', borderRadius:'50%', background:'rgba(245,158,11,0.04)', pointerEvents:'none' }} />
          <p style={{ position:'relative', color:'rgba(255,255,255,0.93)', fontSize:'clamp(0.95rem,2vw,1.08rem)', lineHeight:1.85, margin:0, fontStyle:'italic', letterSpacing:'0.01em', overflowWrap:'break-word' }}>{excerpt}</p>
          <div style={{ position:'relative', marginTop:'16px', paddingTop:'14px', borderTop:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'flex-start', gap:'8px' }}>
            <span style={{ fontSize:'12px', flexShrink:0 }}>⚠️</span>
            <p style={{ margin:0, fontSize:'11px', color:'rgba(245,158,11,0.75)', fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', lineHeight:1.5 }}>Este contenido es informativo y no reemplaza asesoría jurídica personalizada</p>
          </div>
        </div>
      )}

      {/* TOC MOBILE INLINE - visible solo en móvil */}
      {toc.length > 0 && (
        <div className="article-toc-mobile" style={{ display:'none', marginBottom:'28px' }}>
          <details style={{ background:'#fff', border:'1px solid #e2e8f0', borderRadius:'16px', overflow:'hidden', boxShadow:'0 4px 16px rgba(10,22,40,0.08)' }}>
            <summary style={{ padding:'14px 20px', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px', background:'linear-gradient(135deg,#0A1628,#0d1f3c)', color:'#f59e0b', fontWeight:800, fontSize:'13px', listStyle:'none', userSelect:'none' }}>
              <div style={{ width:'26px', height:'26px', borderRadius:'8px', background:'rgba(245,158,11,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <FaAlignLeft style={{ fontSize:'11px' }} />
              </div>
              <span>Índice del artículo</span>
              <span style={{ marginLeft:'auto', background:'rgba(245,158,11,0.15)', color:'#f59e0b', fontSize:'10px', fontWeight:800, padding:'2px 10px', borderRadius:'10px' }}>{toc.length} secciones</span>
            </summary>
            <div style={{ padding:'10px 14px 14px', display:'flex', flexDirection:'column', gap:'2px' }}>
              {toc.map((item, i) => (
                <button key={i} type="button"
                  onClick={() => { scrollToSection(item.id); document.querySelector('.article-toc-mobile details')?.removeAttribute('open') }}
                  style={{ background:'none', border:'none', borderLeft:'2px solid transparent', cursor:'pointer', padding:'9px 10px 9px 12px', borderRadius:'0 10px 10px 0', display:'flex', alignItems:'center', gap:'10px', textAlign:'left', width:'100%', transition:'all 0.15s' }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='rgba(245,158,11,0.05)'; e.currentTarget.style.borderLeftColor='#f59e0b' }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='none'; e.currentTarget.style.borderLeftColor='transparent' }}>
                  <span style={{ minWidth:'22px', height:'22px', borderRadius:'7px', background:'#0A1628', color:'#f59e0b', fontSize:'10px', fontWeight:900, display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{item.num}</span>
                  <span style={{ fontSize:'13px', color:'#374151', fontWeight:600, lineHeight:1.45 }}>{item.text}</span>
                </button>
              ))}
            </div>
          </details>
        </div>
      )}
      <div>
        <div ref={contentRef} className="ac" dangerouslySetInnerHTML={{ __html: processedHtml }} />
      </div>

      <style>{`
        /* ═══════════════════════════════════════
           ARTICLE CONTENT — PROFESSIONAL READING
           ═══════════════════════════════════════ */
        html { scroll-behavior: smooth; }
        :focus-visible { outline: 2px solid #f59e0b; outline-offset: 2px; border-radius: 4px; }
        ::selection { background: rgba(245,158,11,0.2); color: #0A1628; }
        .ac ::selection { background: rgba(245,158,11,0.25); }
        @media (max-width: 900px) { .article-toc-mobile { display: block !important; } }
        .ac { font-family:inherit; counter-reset:sec; max-width:min(720px,100%); overflow-wrap:break-word; word-wrap:break-word; }
        @media(max-width:640px){
          .ac { font-size:0.96rem; line-height:1.85; }
          .ac h2 { font-size:1.25rem !important; margin:2.5rem 0 1rem !important; padding-bottom:12px !important; }
          .ac h2::before { min-width:28px !important; height:28px !important; font-size:0.72rem !important; border-radius:8px !important; }
          .ac h3 { font-size:1rem !important; padding:9px 14px !important; margin:1.75rem 0 0.75rem !important; }
          .ac p { font-size:0.95rem; line-height:1.8; margin-bottom:1.25rem; text-align:left; hyphens:none; }
          .ac ul, .ac ol { padding-left:20px !important; }
          .ac ul li, .ac ol li { text-align:left !important; font-size:0.95rem !important; }
          .ac blockquote { padding:16px 16px 16px 44px !important; margin:1.5rem 0 !important; }
          .ac blockquote::before { left:12px !important; font-size:20px !important; }
          .ac blockquote p { text-align:left !important; font-size:0.93rem !important; }
          .ac [data-callout="dorado"],
          .ac [data-callout="verde"] { padding:14px 14px 14px 44px !important; margin:1.5rem 0 !important; }
          .ac [data-callout="dorado"]::before,
          .ac [data-callout="verde"]::before { left:12px !important; font-size:18px !important; }
          .ac [data-callout="dorado"] [data-callout-body],
          .ac [data-callout="verde"] [data-callout-body] { text-align:left !important; font-size:0.88rem !important; }
          .ac [data-checklist-items] { grid-template-columns:1fr !important; }
          .ac table { font-size:0.82rem !important; min-width:480px; }
          .ac th { padding:10px 12px !important; font-size:10px !important; white-space:nowrap; }
          .ac td { padding:9px 12px !important; font-size:0.84rem !important; }
          .ac [data-faq-item] { padding:14px 16px !important; }
          .ac [data-faq-q] { font-size:0.88rem !important; }
          .ac [data-faq-a] { font-size:0.85rem !important; text-align:left !important; padding-left:12px !important; }
          .ac [data-block="checklist"] { padding:16px !important; }
          .ac [data-block="faq"] > div:first-child { padding:12px 16px !important; }
          .ac div[style*="overflow-x:auto"] {
            margin:1.25rem 0 !important;
            -webkit-overflow-scrolling: touch;
            overflow-x: auto !important;
          }
        }

        /* ── HEADINGS ── */
        .ac h2 {
          counter-increment:sec; color:#0A1628; font-size:clamp(1.2rem,2.5vw,1.5rem); font-weight:900;
          margin:3.5rem 0 1.25rem; line-height:1.2; display:flex; align-items:center; gap:14px;
          padding:0 0 16px; border-bottom:2px solid #f1f5f9; scroll-margin-top:100px;
          letter-spacing:-0.3px; overflow-wrap:break-word; word-break:break-word;
        }
        .ac h2::before {
          content:counter(sec); display:inline-flex; align-items:center; justify-content:center;
          min-width:34px; height:34px; border-radius:10px;
          background:linear-gradient(135deg,#0A1628,#0F2744);
          color:#f59e0b; font-size:0.8rem; font-weight:900; flex-shrink:0;
          box-shadow:0 3px 10px rgba(10,22,40,0.3);
        }
        .ac h2:first-of-type { margin-top:0; }

        .ac h3 {
          color:#0A1628; font-size:clamp(1rem,2vw,1.15rem); font-weight:800; margin:2.25rem 0 0.9rem;
          padding:11px 18px; border-radius:12px; background:rgba(10,22,40,0.03);
          border-left:4px solid #f59e0b; scroll-margin-top:88px; transition:background 0.2s;
          line-height:1.4; overflow-wrap:break-word; word-break:break-word;
        }
        .ac h3[data-faq="true"] {
          cursor:pointer; user-select:none; display:flex; align-items:center;
          justify-content:space-between; background:rgba(245,158,11,0.05);
          border-left-color:#f59e0b;
        }
        .ac h3[data-faq="true"]:hover { background:rgba(245,158,11,0.1); }
        .ac h4 {
          color:#1e3a5f; font-size:1.02rem; font-weight:800; margin:1.75rem 0 0.6rem;
          padding-left:12px; border-left:3px solid #e2e8f0;
        }

        /* ── PÁRRAFOS — núcleo de la legibilidad ── */
        .ac p {
          color:#1a2332; margin-bottom:1.65rem; line-height:1.9; text-align:left;
          font-size:1.05rem; hyphens:none; -webkit-hyphens:none; letter-spacing:0.01em;
          overflow-wrap:break-word; word-break:normal;
        }
        .ac h2 + p, .ac h3 + p {
          color:#111827; font-size:1.06rem;
        }
        .ac strong { color:#92400e; font-weight:700; }
        .ac em { color:#374151; font-style:italic; }

        /* ── LISTAS ── */
        .ac ul { margin-bottom:1.75rem; padding:0; list-style:none; }
        .ac ul li {
          color:#1a2332; margin-bottom:0.85rem; padding-left:1.75rem;
          position:relative; line-height:1.85; text-align:left; font-size:1.02rem;
          overflow-wrap:break-word; word-break:normal;
        }
        .ac ul li::before {
          content:"▸"; color:#f59e0b; font-weight:900; position:absolute; left:0; top:2px;
        }
        .ac ol { margin-bottom:1.75rem; padding-left:0; list-style:none; counter-reset:ol; }
        .ac ol li {
          counter-increment:ol; color:#1a2332; margin-bottom:0.85rem; padding-left:2.25rem;
          position:relative; line-height:1.85; text-align:left; font-size:1.02rem;
        }
        .ac ol li::before {
          content:counter(ol); position:absolute; left:0; width:24px; height:24px;
          background:linear-gradient(135deg,#0A1628,#1a3560); color:#f59e0b;
          border-radius:50%; display:inline-flex; align-items:center; justify-content:center;
          font-size:10px; font-weight:900; top:2px; box-shadow:0 2px 6px rgba(10,22,40,0.2);
        }

        /* ── BLOCKQUOTE / CALLOUT CTA ── */
        .ac blockquote {
          position:relative; overflow:hidden; border-left:5px solid #f59e0b;
          background:linear-gradient(135deg,#fffbeb 0%,#fef3c7 60%,#fffbeb 100%);
          padding:22px 24px 22px 58px; margin:2.5rem 0; border-radius:0 16px 16px 0;
          box-shadow:0 4px 20px rgba(245,158,11,0.12);
        }
        .ac blockquote::before {
          content:"💡"; position:absolute; left:16px; top:50%;
          transform:translateY(-50%); font-size:24px; line-height:1;
        }
        .ac blockquote p {
          color:#374151; font-style:italic; margin:0; font-weight:500;
          text-align:left; font-size:1.02rem; line-height:1.85;
        }
        .ac blockquote p strong { color:#92400e; }

        /* ── LINKS ── */
        .ac a {
          color:#b45309; text-decoration:underline; font-weight:600;
          text-underline-offset:3px; text-decoration-thickness:1.5px;
          transition:color 0.15s, background 0.15s;
          border-radius:3px; padding:0 2px;
        }
        .ac a:hover { color:#0A1628; background:rgba(245,158,11,0.08); }

        /* ── TABLAS ── */
        .ac table {
          width:100%; border-collapse:collapse; margin:2rem 0; font-size:0.92rem;
          border-radius:14px; overflow:hidden; box-shadow:0 4px 24px rgba(10,22,40,0.1);
        }
        .ac thead tr { background:linear-gradient(135deg,#0A1628,#0F2744); }
        .ac th {
          color:#f59e0b; padding:13px 18px; text-align:left; font-weight:700;
          font-size:11px; text-transform:uppercase; letter-spacing:0.8px;
        }
        .ac td { padding:12px 18px; border-bottom:1px solid #f1f5f9; color:#1f2937; font-size:0.93rem; }
        .ac tr:nth-child(even) td { background:#f8fafc; }
        .ac tr:hover td { background:#fefce8; transition:background 0.15s; }

        /* ── SEPARADOR ── */
        .ac hr {
          border:none; margin:3rem 0; height:1px;
          background:linear-gradient(to right,transparent,#f59e0b 30%,#f59e0b 70%,transparent);
        }

        /* ── CÓDIGO ── */
        .ac code {
          background:#f1f5f9; color:#0A1628; padding:3px 8px; border-radius:6px;
          font-size:0.875rem; font-family:monospace; border:1px solid #e2e8f0;
        }

        /* ── IMÁGENES ── */
        .ac img {
          max-width:100%; height:auto; border-radius:16px; margin:2.5rem auto;
          display:block; box-shadow:0 12px 40px rgba(0,0,0,0.14);
        }

        /* ── CALLOUT DORADO ── */
        .ac [data-callout="dorado"] {
          position:relative; border-left:5px solid #f59e0b;
          background:linear-gradient(135deg,#fffbeb,#fef3c7 60%,#fffbeb);
          padding:18px 24px 18px 58px; margin:2rem 0; border-radius:0 16px 16px 0;
          overflow:hidden; box-shadow:0 4px 20px rgba(245,158,11,0.1);
        }
        .ac [data-callout="dorado"]::before {
          content:"💡"; position:absolute; left:16px; top:50%;
          transform:translateY(-50%); font-size:22px; line-height:1;
        }
        .ac [data-callout="dorado"] [data-callout-title] {
          font-weight:900; font-size:0.97rem; color:#92400e; margin-bottom:8px;
          font-style:normal; display:block; letter-spacing:0.01em;
        }
        .ac [data-callout="dorado"] [data-callout-body] {
          color:#374151; font-size:0.93rem; line-height:1.8; font-style:normal;
          text-align:left; display:block;
        }

        /* ── CALLOUT VERDE ── */
        .ac [data-callout="verde"] {
          position:relative; border-left:5px solid #10b981;
          background:linear-gradient(135deg,#ecfdf5,#d1fae5 60%,#ecfdf5);
          padding:18px 24px 18px 58px; margin:2rem 0; border-radius:0 16px 16px 0;
          overflow:hidden; box-shadow:0 4px 20px rgba(16,185,129,0.1);
        }
        .ac [data-callout="verde"]::before {
          content:"✅"; position:absolute; left:16px; top:50%;
          transform:translateY(-50%); font-size:20px; line-height:1;
        }
        .ac [data-callout="verde"] [data-callout-title] {
          font-weight:900; font-size:0.97rem; color:#065f46; margin-bottom:8px;
          font-style:normal; display:block;
        }
        .ac [data-callout="verde"] [data-callout-body] {
          color:#064e3b; font-size:0.93rem; line-height:1.8; font-style:normal;
          text-align:left; display:block;
        }

        /* ── CHECKLIST CARDS ── */
        .ac [data-block="checklist"] {
          margin:2rem 0; padding:22px 24px; background:linear-gradient(135deg,#f8fafc,#f1f5f9);
          border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 2px 12px rgba(10,22,40,0.06);
        }
        .ac [data-checklist-items] {
          display:grid; grid-template-columns:repeat(auto-fill,minmax(min(210px,100%),1fr)); gap:14px;
        }
        .ac [data-item] {
          background:#fff; border-radius:14px; padding:16px 18px;
          border:1px solid #e8edf4; box-shadow:0 2px 10px rgba(10,22,40,0.05);
          transition:box-shadow 0.25s, transform 0.25s;
        }
        .ac [data-item]:hover {
          box-shadow:0 8px 28px rgba(10,22,40,0.14); transform:translateY(-3px);
          border-color:rgba(245,158,11,0.3);
        }
        .ac [data-item-title] {
          font-weight:900; font-size:0.88rem; color:#0A1628; margin-bottom:5px; display:block;
        }
        .ac [data-item-tag] {
          display:inline-block; background:rgba(245,158,11,0.12); color:#92400e;
          font-size:0.7rem; font-weight:700; padding:3px 10px; border-radius:20px;
          margin-bottom:8px; letter-spacing:0.3px;
        }
        .ac [data-item-desc] {
          font-size:0.83rem; color:#64748b; line-height:1.6; text-align:left; display:block;
        }
        .ac [data-block="checklist"] > button { display:none; }

        /* ── FAQ BLOCK INCRUSTADO ── */
        .ac [data-block="faq"] {
          margin:2rem 0; border-radius:16px; overflow:hidden;
          border:1px solid #e2e8f0; box-shadow:0 4px 20px rgba(10,22,40,0.08);
        }
        .ac [data-block="faq"] > div:first-child {
          background:linear-gradient(135deg,#0A1628,#0d1f3c);
          padding:14px 22px; font-weight:800; font-size:0.9rem; color:#f59e0b;
          letter-spacing:0.02em;
        }
        .ac [data-faq-item] {
          border-bottom:1px solid #f1f5f9; padding:18px 22px;
          background:#fff; transition:background 0.15s;
        }
        .ac [data-faq-item]:last-of-type { border-bottom:none; }
        .ac [data-faq-item]:hover { background:#fffbeb; }
        .ac [data-faq-q] {
          font-weight:800; font-size:0.92rem; color:#0A1628; margin-bottom:10px; display:block;
          line-height:1.4;
        }
        .ac [data-faq-a] {
          font-size:0.9rem; color:#475569; line-height:1.75;
          border-left:3px solid #f59e0b; padding-left:16px; text-align:left; display:block;
        }
        .ac [data-block="faq"] > button { display:none; }

        /* ── TABLA WRAPPER ── */
        .ac div[style*="overflow-x:auto"] {
          border-radius:14px; overflow:hidden;
          box-shadow:0 6px 24px rgba(10,22,40,0.1); margin:2rem 0;
        }
        .ac div[style*="overflow-x:auto"] table { margin:0; border-radius:0; box-shadow:none; }

        /* ── PRIMER PÁRRAFO DESTACADO ── */
        .ac > p:first-of-type {
          font-size:1.1rem; color:#111827; line-height:1.9;
          font-weight:400;
        }

        /* ── OVERRIDE GLOBAL: sin corte de palabras en ningún elemento ── */
        .ac * {
          hyphens:none !important;
          -webkit-hyphens:none !important;
          word-break:normal !important;
        }
        .ac [data-callout-body], .ac [data-faq-a], .ac [data-faq-q] {
          text-align:left !important;
          hyphens:none !important;
        }

        /* ── SEPARADORES DE SECCIÓN ── */
        .ac h2:not(:first-of-type) {
          padding-top:0;
        }
      `}</style>
    </div>
  )
}

// ─── SMART SIDEBAR ───────────────────────────────────────────────────────────
const SmartSidebar = ({ content, article }) => {
  const [openFaqs, setOpenFaqs] = useState({})
  const [activeId, setActiveId] = useState(null)

  // Observar qué sección está visible para resaltar en el TOC
  useEffect(() => {
    const headings = document.querySelectorAll('.ac h2[id]')
    if (!headings.length) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id) })
      },
      { rootMargin: '-10% 0px -70% 0px' }
    )
    headings.forEach(h => obs.observe(h))
    return () => obs.disconnect()
  }, [content])

  const { toc, faqs } = useMemo(() => {
    if (!content) return { toc: [], faqs: [] }
    const tmp = document.createElement('div')
    tmp.innerHTML = content

    const toc = []
    tmp.querySelectorAll('h2').forEach((h, i) => {
      const text = h.textContent.replace(/^\d+\.\s*/, '').trim()
      const id = text.toLowerCase().trim()
        .replace(/[áàä]/g,'a').replace(/[éèë]/g,'e').replace(/[íìï]/g,'i')
        .replace(/[óòö]/g,'o').replace(/[úùü]/g,'u').replace(/ñ/g,'n')
        .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
      if (text) toc.push({ id, text, num: i + 1 })
    })

    const faqs = []
    tmp.querySelectorAll('[data-faq-item]').forEach(item => {
      const q = item.querySelector('[data-faq-q]')?.textContent?.trim()
      const a = item.querySelector('[data-faq-a]')?.textContent?.trim()
      if (q && a) faqs.push({ q, a })
    })
    if (faqs.length === 0) {
      tmp.querySelectorAll('h3').forEach(h3 => {
        const txt = h3.textContent.trim()
        if (txt.startsWith('¿') || txt.endsWith('?')) {
          const parts = []
          let sib = h3.nextElementSibling
          while (sib && !['H2','H3','H4'].includes(sib.tagName)) {
            parts.push(sib.textContent.trim())
            sib = sib.nextElementSibling
          }
          if (parts.length) faqs.push({ q: txt, a: parts.join(' ') })
        }
      })
    }

    return { toc, faqs }
  }, [content])

  const toggleFaq = (i) => setOpenFaqs(p => ({ ...p, [i]: !p[i] }))

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' })
  }

  // JSON-LD FAQPage Schema para SEO
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null

  // Article Schema
  const articleSchema = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.seoTitle || article.title,
    "description": article.metaDesc || article.excerpt,
    "author": { "@type": "Organization", "name": "LITESCO" },
    "publisher": {
      "@type": "Organization",
      "name": "LITESCO",
      "logo": { "@type": "ImageObject", "url": "https://www.litesco.com.co/favicon.webp" }
    },
    "datePublished": article.date,
    "image": article.image,
    "url": `https://www.litesco.com.co/blog/${article.slug}`
  } : null

  const readTimeMin = article?.content ? Math.max(1, Math.round(article.content.replace(/<[^>]+>/g,' ').trim().split(/\s+/).length / 200)) : null

  // slate-950 = #020617 | slate-900 = #0f172a | slate-800 = #1e293b | slate-700 = #334155
  // slate-400 = #94a3b8 | slate-300 = #cbd5e1 | amber-500 = #f59e0b | amber-600 = #d97706
  const S = {
    card:  { borderRadius:'16px', overflow:'hidden', border:'1px solid #1e293b', boxShadow:'0 4px 24px rgba(2,6,23,0.55)', background:'#0f172a' },
    icon:  { width:'30px', height:'30px', borderRadius:'9px', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.22)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 },
    badge: { display:'inline-flex', alignItems:'center', justifyContent:'center', minWidth:'20px', height:'20px', borderRadius:'6px', fontSize:'9px', fontWeight:900, flexShrink:0 },
  }

  const [sideTab, setSideTab] = useState('toc')

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'16px' }}>

      {/* JSON-LD Schemas */}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      {articleSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />}

      {/* ── TABBED TOC + FAQ ────────────────────────────────── */}
      {(toc.length > 0 || faqs.length > 0) && (
        <div style={S.card}>

          {/* Tab bar header */}
          <div style={{ background:'#020617', borderBottom:'1px solid #1e293b', display:'flex' }}>
            {/* TOC tab */}
            {toc.length > 0 && (
              <button type="button" onClick={() => setSideTab('toc')}
                style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'7px', padding:'14px 12px', background:'none', border:'none', cursor:'pointer', borderBottom: sideTab==='toc' ? '2px solid #f59e0b' : '2px solid transparent', transition:'all 0.2s', position:'relative', bottom:'-1px' }}>
                <FaAlignLeft style={{ color: sideTab==='toc' ? '#f59e0b' : '#334155', fontSize:'11px', transition:'color 0.2s' }} />
                <span style={{ color: sideTab==='toc' ? '#f59e0b' : '#475569', fontSize:'11px', fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', transition:'color 0.2s' }}>Contenido</span>
                {readTimeMin && (
                  <span style={{ display:'inline-flex', alignItems:'center', gap:'3px', background: sideTab==='toc' ? 'rgba(245,158,11,0.15)' : '#1e293b', color: sideTab==='toc' ? '#f59e0b' : '#475569', fontSize:'9px', fontWeight:700, padding:'2px 7px', borderRadius:'10px', transition:'all 0.2s' }}>
                    <FaClock style={{ fontSize:'7px' }} />{readTimeMin}m
                  </span>
                )}
              </button>
            )}
            {/* FAQ tab */}
            {faqs.length > 0 && (
              <button type="button" onClick={() => setSideTab('faq')}
                style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'7px', padding:'14px 12px', background:'none', border:'none', cursor:'pointer', borderBottom: sideTab==='faq' ? '2px solid #f59e0b' : '2px solid transparent', transition:'all 0.2s', position:'relative', bottom:'-1px' }}>
                <span style={{ color: sideTab==='faq' ? '#f59e0b' : '#334155', fontSize:'13px', fontWeight:900, lineHeight:1, transition:'color 0.2s' }}>?</span>
                <span style={{ color: sideTab==='faq' ? '#f59e0b' : '#475569', fontSize:'11px', fontWeight:700, letterSpacing:'0.04em', textTransform:'uppercase', transition:'color 0.2s' }}>FAQ</span>
                <span style={{ background: sideTab==='faq' ? 'rgba(245,158,11,0.2)' : '#1e293b', color: sideTab==='faq' ? '#f59e0b' : '#475569', fontSize:'9px', fontWeight:800, padding:'2px 7px', borderRadius:'10px', transition:'all 0.2s' }}>{faqs.length}</span>
              </button>
            )}
          </div>

          {/* TOC panel */}
          {sideTab === 'toc' && toc.length > 0 && (
            <div style={{ padding:'0 0 10px' }}>
              {/* Reading time + sections count header */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px 10px', borderBottom:'1px solid rgba(255,255,255,0.05)', gap:'8px' }}>
                {readTimeMin && (
                  <div style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.18)', borderRadius:'8px', padding:'4px 10px' }}>
                    <FaClock style={{ color:'#f59e0b', fontSize:'9px', flexShrink:0 }} />
                    <span style={{ color:'#f59e0b', fontSize:'11px', fontWeight:700 }}>{readTimeMin} min lectura</span>
                  </div>
                )}
                <span style={{ color:'#334155', fontSize:'10px', fontWeight:600, marginLeft:'auto' }}>{toc.length} secciones</span>
              </div>
              {/* TOC items */}
              <div style={{ padding:'6px 10px 0', display:'flex', flexDirection:'column', gap:'1px' }}>
                {toc.map((item, i) => {
                  const active = activeId === item.id
                  return (
                    <button key={i} type="button" onClick={() => scrollToSection(item.id)}
                      style={{ width:'100%', background: active ? 'rgba(245,158,11,0.11)' : 'transparent', border:'none', borderLeft: active ? '2.5px solid #f59e0b' : '2.5px solid transparent', cursor:'pointer', padding:'9px 10px 9px 12px', borderRadius:'0 12px 12px 0', transition:'all 0.18s', display:'flex', alignItems:'center', gap:'10px', textAlign:'left' }}
                      onMouseEnter={e=>{ if(!active){ e.currentTarget.style.background='rgba(245,158,11,0.05)'; e.currentTarget.style.borderLeftColor='rgba(245,158,11,0.35)' }}}
                      onMouseLeave={e=>{ if(!active){ e.currentTarget.style.background='transparent'; e.currentTarget.style.borderLeftColor='transparent' }}}>
                      <span style={{ ...S.badge, minWidth:'22px', height:'22px', borderRadius:'7px', fontSize:'10px', background: active ? 'linear-gradient(135deg,#f59e0b,#d97706)' : 'rgba(255,255,255,0.06)', color: active ? '#020617' : '#475569', boxShadow: active ? '0 2px 8px rgba(245,158,11,0.4)' : 'none', transition:'all 0.2s' }}>{item.num}</span>
                      <span style={{ fontSize:'12.5px', color: active ? '#f8fafc' : '#94a3b8', lineHeight:1.55, fontWeight: active ? 700 : 500, flex:1, transition:'color 0.18s' }}>{item.text}</span>
                      {active && <FaChevronRight style={{ color:'#f59e0b', fontSize:'8px', flexShrink:0 }} />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* FAQ panel */}
          {sideTab === 'faq' && faqs.length > 0 && (
            <div style={{ display:'flex', flexDirection:'column' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: i < faqs.length-1 ? '1px solid #1e293b' : 'none' }}>
                  <button type="button" onClick={() => toggleFaq(i)}
                    style={{ width:'100%', background: openFaqs[i] ? 'rgba(245,158,11,0.05)' : 'transparent', border:'none', cursor:'pointer', padding:'13px 16px', display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'10px', textAlign:'left', transition:'background 0.15s' }}
                    onMouseEnter={e=>{ if(!openFaqs[i]) e.currentTarget.style.background='rgba(255,255,255,0.02)' }}
                    onMouseLeave={e=>{ if(!openFaqs[i]) e.currentTarget.style.background='transparent' }}>
                    <span style={{ fontSize:'12.5px', fontWeight:600, color: openFaqs[i] ? '#f59e0b' : '#cbd5e1', lineHeight:1.5, flex:1, transition:'color 0.15s' }}>{faq.q}</span>
                    <span style={{ width:'22px', height:'22px', borderRadius:'50%', border:'1.5px solid', borderColor: openFaqs[i] ? '#f59e0b' : '#334155', display:'inline-flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px', transition:'all 0.2s', background: openFaqs[i] ? '#f59e0b' : 'transparent', boxShadow: openFaqs[i] ? '0 0 12px rgba(245,158,11,0.4)' : 'none' }}>
                      <span style={{ color: openFaqs[i] ? '#020617' : '#475569', fontSize:'13px', fontWeight:900, lineHeight:1, transition:'all 0.2s' }}>{openFaqs[i] ? '−' : '+'}</span>
                    </span>
                  </button>
                  {openFaqs[i] && (
                    <div style={{ padding:'0 16px 14px 16px' }}>
                      <div style={{ background:'rgba(245,158,11,0.04)', borderLeft:'2px solid #f59e0b', borderRadius:'0 8px 8px 0', padding:'11px 14px' }}>
                        <p style={{ fontSize:'12px', color:'#94a3b8', lineHeight:1.8, margin:0 }}>{faq.a}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── CTA ASESORÍA ────────────────────────────────────── */}
      <div style={{ borderRadius:'18px', overflow:'hidden', border:'1px solid #1e293b', boxShadow:'0 8px 36px rgba(2,6,23,0.65)', background:'#020617', position:'relative' }}>
        {/* Ambient glows */}
        <div style={{ position:'absolute', top:'-40px', right:'-40px', width:'140px', height:'140px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-30px', left:'-20px', width:'100px', height:'100px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />

        {/* Header stripe */}
        <div style={{ background:'linear-gradient(90deg,#f59e0b,#d97706)', height:'3px', width:'100%' }} />

        <div style={{ padding:'20px 20px 22px', position:'relative' }}>
          {/* Title */}
          <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'12px' }}>
            <div style={{ width:'34px', height:'34px', borderRadius:'10px', background:'rgba(245,158,11,0.12)', border:'1px solid rgba(245,158,11,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <FaGavel style={{ color:'#f59e0b', fontSize:'13px' }} />
            </div>
            <div>
              <div style={{ color:'#f1f5f9', fontWeight:800, fontSize:'14px', letterSpacing:'-0.01em' }}>¿Necesita asesoría?</div>
              <div style={{ color:'#475569', fontSize:'10px', marginTop:'1px' }}>Respuesta en menos de 24h</div>
            </div>
          </div>

          <p style={{ color:'#64748b', fontSize:'12px', lineHeight:1.75, margin:'0 0 16px' }}>
            Nuestros abogados especializados están listos para analizar su caso sin compromiso.
          </p>

          {/* Primary CTA */}
          <a href="https://calendly.com/gerencialitigioestrategicocolombiano" target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', padding:'12px 16px', background:'linear-gradient(135deg,#f59e0b 0%,#d97706 100%)', borderRadius:'11px', color:'#020617', fontWeight:800, fontSize:'12.5px', textDecoration:'none', boxShadow:'0 4px 16px rgba(245,158,11,0.3)', transition:'all 0.2s', letterSpacing:'0.01em', border:'none' }}
            onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 6px 22px rgba(245,158,11,0.5)'; e.currentTarget.style.transform='translateY(-1px)' }}
            onMouseLeave={e=>{ e.currentTarget.style.boxShadow='0 4px 16px rgba(245,158,11,0.3)'; e.currentTarget.style.transform='translateY(0)' }}>
            <FaCalendarAlt style={{ fontSize:'11px' }} />
            Agendar consulta gratuita
          </a>

          {/* WhatsApp only */}
          <a href="https://wa.me/573132037572?text=Hola%2C%20vi%20su%20artículo%20y%20necesito%20asesoría" target="_blank" rel="noopener noreferrer"
            style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'9px', padding:'11px 16px', borderRadius:'11px', background:'rgba(37,211,102,0.09)', border:'1px solid rgba(37,211,102,0.2)', color:'#4ade80', fontSize:'12.5px', textDecoration:'none', fontWeight:700, transition:'all 0.2s', marginTop:'10px' }}
            onMouseEnter={e=>{ e.currentTarget.style.background='rgba(37,211,102,0.16)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.38)'; e.currentTarget.style.boxShadow='0 0 18px rgba(37,211,102,0.14)' }}
            onMouseLeave={e=>{ e.currentTarget.style.background='rgba(37,211,102,0.09)'; e.currentTarget.style.borderColor='rgba(37,211,102,0.2)'; e.currentTarget.style.boxShadow='none' }}>
            <FaWhatsapp style={{ color:'#25D366', fontSize:'14px' }} />
            Consultar por WhatsApp
          </a>
        </div>
      </div>

    </div>
  )
}

const ArticleView = React.memo(({ selectedId, articles, onClose, onSelect }) => {
  const article = articles.find(a => String(a.id) === String(selectedId))

  // ⚠️ TODOS los hooks deben estar ANTES de cualquier return condicional — regla de React
  const [copyToast, setCopyToast] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopyToast(true)
      setTimeout(() => setCopyToast(false), 2500)
    } catch (err) {}
  }

  // Early return DESPUÉS de todos los hooks
  if (!article) return (
    <div style={{ position:'fixed', inset:0, background:'#f8fafc', zIndex:10001, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'20px' }}>
      <div style={{ fontSize:'64px', opacity:0.2 }}>⚖️</div>
      <h2 style={{ color:'#0A1628', fontWeight:800, fontSize:'1.4rem', margin:0 }}>Artículo no encontrado</h2>
      <p style={{ color:'#64748b', margin:0 }}>El artículo que buscas no existe o fue eliminado.</p>
      <button onClick={onClose} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 22px 10px 12px', background:'linear-gradient(135deg,#f59e0b,#d97706)', border:'none', borderRadius:'50px', color:'#0A1628', fontWeight:800, cursor:'pointer', fontSize:'14px', boxShadow:'0 4px 16px rgba(245,158,11,0.35)' }}>
        <span style={{ width:'28px', height:'28px', borderRadius:'50%', background:'rgba(10,22,40,0.12)', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
          <FaChevronLeft style={{ fontSize:'11px' }} />
        </span>
        Volver al Blog
      </button>
    </div>
  )

  const cat = CATEGORIES.find(c => c.id === article.category)

  const shareSocial = (platform) => {
    const url = window.location.href
    const text = article.title
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    }
    window.open(urls[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="article-page-scroll" style={{ position:'relative', overflowX:'clip', fontFamily:'inherit', background:'#0A1628' }}>


      {/* Toast: Enlace copiado */}
      {copyToast && (
        <div style={{ position:'fixed', bottom:'32px', left:'50%', transform:'translateX(-50%)', zIndex:9999, background:'#0f172a', border:'1px solid rgba(245,158,11,0.4)', borderRadius:'12px', padding:'12px 22px', display:'flex', alignItems:'center', gap:'10px', boxShadow:'0 8px 32px rgba(2,6,23,0.6)', animation:'fadeInUp 0.25s ease', whiteSpace:'nowrap' }}>
          <style>{`@keyframes fadeInUp { from { opacity:0; transform:translate(-50%,10px); } to { opacity:1; transform:translate(-50%,0); } }`}</style>
          <span style={{ width:'20px', height:'20px', borderRadius:'50%', background:'rgba(245,158,11,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <FaCheck style={{ color:'#f59e0b', fontSize:'9px' }} />
          </span>
          <span style={{ color:'#f1f5f9', fontSize:'13px', fontWeight:600 }}>¡Enlace copiado al portapapeles!</span>
        </div>
      )}

      <SEO title={article.seoTitle || article.title} description={article.metaDesc || article.excerpt} keywords={article.keyword} ogImage={article.image} ogType="article" articlePublishedTime={article.date} articleAuthor={article.author} canonical={`https://www.litesco.com.co/blog/${article.slug}`} />

      {/* ─── HERO CABECERA FULL-WIDTH ────────────────────────── */}
      <style>{`
        .art-hero{position:relative;width:100%;min-height:clamp(420px,52vw,580px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;padding-top:clamp(64px,8vw,80px)}
        .art-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
        .art-hero-overlay-top{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(10,22,40,0.55) 0%,rgba(10,22,40,0.15) 40%,transparent 70%)}
        .art-hero-overlay-bot{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,22,40,1) 0%,rgba(10,22,40,0.88) 30%,rgba(10,22,40,0.45) 60%,transparent 100%)}
        .art-hero-content{position:relative;z-index:2;padding:clamp(28px,5vw,64px) clamp(20px,6vw,80px);max-width:900px}
        .art-hero-back{position:absolute;top:clamp(70px,8.5vw,86px);left:clamp(20px,6vw,80px);z-index:4;display:inline-flex;align-items:center;gap:0;background:none;border:none;cursor:pointer;padding:0;color:rgba(255,255,255,0.75);font-size:13px;font-weight:700;letter-spacing:0.01em;transition:color 0.2s;}
        .art-hero-back:hover{color:#fff;}
        .art-hero-back-icon{width:32px;height:32px;border-radius:50%;background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.4);display:flex;align-items:center;justify-content:center;margin-right:10px;transition:all 0.2s;flex-shrink:0;}
        .art-hero-back:hover .art-hero-back-icon{background:rgba(245,158,11,0.28);border-color:#f59e0b;transform:translateX(-2px);}
        .art-hero-back-icon svg{color:#f59e0b;font-size:10px;}
        .art-hero-cat{display:flex;align-items:center;gap:10px;margin-bottom:16px}
        .art-hero-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;margin-top:20px}
        .art-hero-meta-item{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.55);font-size:12.5px}
        .art-hero-meta-item strong{color:rgba(255,255,255,0.8);font-weight:600}
        @media(max-width:600px){.art-hero{min-height:clamp(380px,90vw,480px)}.art-hero-content{padding:22px 18px 28px}}
      `}</style>

      <div className="art-hero">
        {article.image ? (
          <>
            <img className="art-hero-img" src={article.image} alt={article.altText || article.title} width="1400" height="580" loading="eager" decoding="sync" />
            <div className="art-hero-overlay-top" />
            <div className="art-hero-overlay-bot" />
          </>
        ) : (
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,#0d1e3a,#0A1628)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <FaGavel style={{ fontSize:'120px', color:'rgba(245,158,11,0.04)' }} />
          </div>
        )}

        <button className="art-hero-back" onClick={onClose} aria-label="Volver al Blog">
          <span className="art-hero-back-icon"><FaChevronLeft /></span>
          Volver al Blog
        </button>

        <div className="art-hero-content">
          <div className="art-hero-cat">
            <div style={{ width:'28px', height:'2px', background:'#f59e0b', flexShrink:0 }} />
            <span style={{ color:'#f59e0b', fontSize:'10.5px', fontWeight:800, textTransform:'uppercase', letterSpacing:'2.5px' }}>{cat?.name || 'Artículo'}</span>
          </div>

          <h1 style={{ color:'#fff', fontSize:'clamp(1.45rem,3.2vw,2.75rem)', fontWeight:900, lineHeight:1.13, margin:0, letterSpacing:'-0.4px', overflowWrap:'break-word', textShadow:'0 2px 20px rgba(2,6,23,0.6)' }}>
            {article.title}
          </h1>

          <div style={{ width:'44px', height:'3px', background:'linear-gradient(to right,#f59e0b,#d97706)', borderRadius:'2px', marginTop:'16px' }} />

          <div className="art-hero-meta">
            <span className="art-hero-meta-item">
              <FaUser style={{ color:'#f59e0b', fontSize:'10px', flexShrink:0 }} />
              <strong>{article.author}</strong>
            </span>
            <span className="art-hero-meta-item">
              <FaCalendarAlt style={{ color:'#f59e0b', fontSize:'10px', flexShrink:0 }} />
              {formatDate(article.date)}
            </span>
            <span className="art-hero-meta-item">
              <FaClock style={{ color:'#f59e0b', fontSize:'10px', flexShrink:0 }} />
              {readTime(article.content)} min de lectura
            </span>
          </div>
        </div>
      </div>

      <div style={{ height:'2px', background:'linear-gradient(to right,#f59e0b,rgba(245,158,11,0.2),transparent)' }} />

      <div style={{ background:'#f8fafc' }}>
        {/* BREADCRUMBS + JSON-LD BreadcrumbList */}
        <div style={{ maxWidth:'1320px', margin:'0 auto', padding:'clamp(12px,2vw,18px) clamp(14px,2.5vw,24px) 0' }}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context":"https://schema.org","@type":"BreadcrumbList",
            "itemListElement":[
              {"@type":"ListItem","position":1,"name":"Inicio","item":"https://www.litesco.com.co"},
              {"@type":"ListItem","position":2,"name":"Blog","item":"https://www.litesco.com.co/blog"},
              {"@type":"ListItem","position":3,"name":article.title,"item":`https://www.litesco.com.co/blog/${article.slug}`}
            ]
          })}} />
          <nav aria-label="Breadcrumb" style={{ display:'flex', alignItems:'center', gap:'6px', flexWrap:'wrap', minWidth:0 }}>
            <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:'#64748b', fontSize:'13px', padding:'2px 0', fontWeight:600, transition:'color 0.15s', flexShrink:0 }}
              onMouseEnter={e=>e.currentTarget.style.color='#f59e0b'} onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>Blog</button>
            <FaChevronRight style={{ color:'#cbd5e1', fontSize:'8px', flexShrink:0 }} />
            {cat && <><span style={{ color:'#64748b', fontSize:'13px', flexShrink:0 }}>{cat.name}</span><FaChevronRight style={{ color:'#cbd5e1', fontSize:'8px', flexShrink:0 }} /></>}
            <span style={{ color:'#0A1628', fontSize:'13px', fontWeight:700, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', minWidth:0, flex:'1 1 0' }}>{article.title}</span>
          </nav>
        </div>
        {/* LAYOUT DOS COLUMNAS */}
        <div
          className="article-two-col">
        <style>{`
          .article-two-col{display:grid;grid-template-columns:1fr 360px;gap:40px;max-width:1320px;margin:0 auto;padding:48px 24px 32px;align-items:start}
          @media(max-width:1100px){.article-two-col{grid-template-columns:1fr 320px;gap:28px}}
          @media(max-width:1023px){.article-two-col{grid-template-columns:1fr;padding:28px 20px 0;gap:0}}
          @media(max-width:640px){.article-two-col{padding:20px 14px 0}}
          .article-two-col>div:last-child{position:sticky;top:88px}
          @media(min-width:1024px){.article-two-col>div:last-child{top:96px}}
          @media(max-width:1023px){.article-two-col>div:last-child{order:-1;position:static;margin-bottom:28px;top:auto}}
          @media(max-width:1023px){.article-two-col>div:first-child{min-width:0}}
        `}</style>
          <div style={{minWidth:0}}>
            <ArticleRenderer content={article.content} excerpt={article.excerpt} title={article.title} />
          </div>
          <div>
            <SmartSidebar content={article.content} article={article} />
          </div>
        </div>

        {/* SECCIÓN INFERIOR */}
        <div style={{ maxWidth:'1320px', margin:'0 auto', padding:'0 clamp(14px,2.5vw,24px) clamp(40px,6vw,80px)' }}>
          {(() => {
            const related = articles.filter(a => a.id !== article.id && a.published && a.category === article.category).sort((a,b) => new Date(b.date)-new Date(a.date))
            const pool = (related.length ? related : articles.filter(a => a.id !== article.id && a.published)).slice(0,8)
            if (!pool.length) return null
            return <RelatedCarousel articles={pool} onSelect={onSelect} currentCat={cat} />
          })()}

          {/* AVISO LEGAL */}
          <div style={{ marginTop:'40px', padding:'14px 20px', background:'linear-gradient(135deg,rgba(245,158,11,0.06),rgba(245,158,11,0.03))', border:'1px solid rgba(245,158,11,0.22)', borderLeft:'4px solid #f59e0b', borderRadius:'12px', display:'flex', gap:'12px', alignItems:'flex-start' }}>
            <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'rgba(245,158,11,0.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:'1px' }}>
              <FaExclamationTriangle style={{ color:'#f59e0b', fontSize:'11px' }} />
            </div>
            <p style={{ margin:0, fontSize:'12.5px', color:'#78716c', lineHeight:1.7 }}>
              <strong style={{ color:'#b45309', fontWeight:800 }}>Aviso Legal:</strong> Este contenido es informativo y no reemplaza asesoría jurídica personalizada.
            </p>
          </div>

          {/* ── CONTACTO Y COMPARTIR — Rediseño ─────────────────── */}
          <style>{`
            .art-bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px}
            @media(max-width:640px){.art-bottom-grid{grid-template-columns:1fr}}
            .art-cta-row{display:flex;align-items:center;gap:14px;text-decoration:none;padding:14px 18px;border-radius:14px;border:none;width:100%;cursor:pointer;transition:all 0.18s;background:transparent;}
            .art-cta-row:not(:last-child){border-bottom:1px solid #f1f5f9;}
            .art-share-row{display:flex;align-items:center;gap:14px;padding:13px 18px;border-radius:14px;cursor:pointer;font-size:14px;font-weight:700;transition:all 0.18s;width:100%;border:none;background:transparent;}
            .art-share-row:not(:last-child){border-bottom:1px solid rgba(255,255,255,0.07);}
            .art-share-row:hover{background:rgba(255,255,255,0.05);}
          `}</style>
          <div className="art-bottom-grid">

            {/* ── CARD CONTACTO ───────────────────────────────── */}
            <div style={{ borderRadius:'20px', border:'1px solid #e2e8f0', background:'#fff', boxShadow:'0 2px 20px rgba(10,22,40,0.07)', overflow:'hidden' }}>
              {/* Franja superior */}
              <div style={{ height:'4px', background:'linear-gradient(to right,#f59e0b,#d97706,#f59e0b)' }} />
              <div style={{ padding:'20px 22px 8px' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
                  <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#22c55e', display:'inline-block', boxShadow:'0 0 8px rgba(34,197,94,0.6)', flexShrink:0 }} />
                  <span style={{ fontSize:'11px', color:'#22c55e', fontWeight:700, letterSpacing:'0.04em' }}>EN LÍNEA</span>
                  <span style={{ fontSize:'11px', color:'#94a3b8', marginLeft:'auto' }}>Resp. &lt; 24h</span>
                </div>
                <h3 style={{ color:'#0A1628', fontWeight:900, fontSize:'18px', margin:'8px 0 0', letterSpacing:'-0.02em' }}>¿Tiene dudas?</h3>
                <p style={{ color:'#94a3b8', fontSize:'12.5px', margin:'4px 0 0', lineHeight:1.5 }}>Contáctenos directamente por el canal de su preferencia.</p>
              </div>
              <div style={{ padding:'8px 12px 16px' }}>
                <a href="mailto:gerencia@litesco.com.co" className="art-cta-row"
                  onMouseEnter={e=>{ e.currentTarget.style.background='#fffbeb'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; }}>
                  <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:'linear-gradient(135deg,#fef3c7,#fde68a)', border:'1px solid rgba(245,158,11,0.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <FaEnvelope style={{ color:'#d97706', fontSize:'14px' }} />
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:'10px', color:'#94a3b8', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>Correo electrónico</div>
                    <div style={{ fontSize:'13.5px', color:'#0A1628', fontWeight:800, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', marginTop:'2px' }}>gerencia@litesco.com.co</div>
                  </div>
                  <FaArrowRight style={{ color:'#f59e0b', fontSize:'11px', flexShrink:0 }} />
                </a>
                <a href="https://wa.me/573132037572" target="_blank" rel="noopener noreferrer" className="art-cta-row"
                  onMouseEnter={e=>{ e.currentTarget.style.background='#f0fdf4'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='transparent'; }}>
                  <div style={{ width:'40px', height:'40px', borderRadius:'12px', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 4px 12px rgba(37,211,102,0.3)' }}>
                    <FaWhatsapp style={{ color:'#fff', fontSize:'17px' }} />
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:'10px', color:'#94a3b8', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.08em' }}>WhatsApp</div>
                    <div style={{ fontSize:'13.5px', color:'#0A1628', fontWeight:800, marginTop:'2px' }}>Contactanos</div>
                  </div>
                  <FaArrowRight style={{ color:'#25D366', fontSize:'11px', flexShrink:0 }} />
                </a>
              </div>
            </div>

            {/* ── CARD COMPARTIR ──────────────────────────────── */}
            <div style={{ borderRadius:'20px', background:'linear-gradient(160deg,#0A1628 0%,#0d1f3c 50%,#071020 100%)', boxShadow:'0 2px 20px rgba(2,6,23,0.35)', overflow:'hidden', border:'1px solid rgba(245,158,11,0.12)' }}>
              {/* Franja superior */}
              <div style={{ height:'4px', background:'linear-gradient(to right,rgba(245,158,11,0.3),#f59e0b,rgba(245,158,11,0.3))' }} />
              <div style={{ padding:'20px 22px 8px' }}>
                <h3 style={{ color:'#fff', fontWeight:900, fontSize:'18px', margin:'0 0 4px', letterSpacing:'-0.02em' }}>Compartir artículo</h3>
                <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'12.5px', margin:0, lineHeight:1.5 }}>Comparte este contenido con quien lo necesite.</p>
              </div>
              <div style={{ padding:'8px 12px 16px' }}>
                {[
                  { onClick:()=>shareSocial('linkedin'), icon:<FaLinkedinIn style={{fontSize:'14px'}}/>, label:'LinkedIn', iconBg:'#0077B5', color:'#93c5fd' },
                  { onClick:()=>shareSocial('facebook'), icon:<FaFacebookF style={{fontSize:'14px'}}/>, label:'Facebook', iconBg:'#1877F2', color:'#a5b4fc' },
                  { onClick:()=>shareSocial('whatsapp'), icon:<FaWhatsapp style={{fontSize:'15px'}}/>, label:'WhatsApp', iconBg:'#25D366', color:'#86efac' },
                  { onClick:handleCopyLink, icon:<FaLink style={{fontSize:'12px'}}/>, label:'Copiar enlace', iconBg:'#334155', color:'#94a3b8' },
                ].map(b => (
                  <button key={b.label} onClick={b.onClick} className="art-share-row">
                    <div style={{ width:'38px', height:'38px', borderRadius:'11px', background:b.iconBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 3px 10px ${b.iconBg}55` }}>
                      {React.cloneElement(b.icon, { style:{ ...b.icon.props.style, color:'#fff' } })}
                    </div>
                    <span style={{ color:'rgba(255,255,255,0.85)', fontWeight:700, fontSize:'14px', flex:1, textAlign:'left' }}>{b.label}</span>
                    <FaChevronRight style={{ color:'rgba(255,255,255,0.2)', fontSize:'10px' }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

const BlogPage = () => {
  const { slug: rawSlug } = useParams()
  const slug = rawSlug ? decodeURIComponent(String(rawSlug)).replace(/\/+$/, '').trim() : null
  const router = useRouter();
  
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false)
  const [visibleCount, setVisibleCount] = useState(9)
  const [selectedArticleId, setSelectedArticleId] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const savingRef = useRef(false)

  const loadArticles = useCallback(async (signal) => {
    try {
      const response = await fetch(`${API_URL}?action=list`, { signal })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
        const dedupedApi = deduplicateArticles(data.articles)
        setArticles(dedupedApi)
        // Actualizar cache local solo cuando API responde bien
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(dedupedApi)) } catch(e) {}
      } else {
        throw new Error('API devolvió datos vacíos')
      }
    } catch (error) {
      if (error.name === 'AbortError') return
      console.warn('API no disponible, usando fallback:', error.message)
      // Fallback: localStorage → DEFAULT_ARTICLES
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setArticles(deduplicateArticles(parsed))
            return
          }
        }
      } catch (e) {}
      setArticles(deduplicateArticles(DEFAULT_ARTICLES))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadArticles(controller.signal)
    return () => controller.abort()
  }, [loadArticles])

  useEffect(() => {
    if (slug && articles.length > 0) {
      const found = articles.find(a => (a.slug || generateSlug(a.title)) === slug)
      if (found) setSelectedArticleId(String(found.id))
    } else if (!slug) {
      setSelectedArticleId(null)
    }
  }, [slug, articles])

  const handleOpenArticle = (art) => {
    const safeSlug = art.slug || generateSlug(art.title)
    // Navegar directamente al PHP que sirve el artículo desde MySQL
    // Esto evita la duplicación entre Next.js y blog-article.php
    window.location.href = `/blog/${safeSlug.replace(/\/+$/, '')}`
  }

  const handleCloseArticle = () => {
    window.location.href = '/blog'
  }

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', token })
      })
        .then(r => r.json())
        .then(data => {
          if (data.success) {
            setIsAuthenticated(true)
          } else {
            // Token expirado o inválido — limpiar
            try { sessionStorage.removeItem(SESSION_TOKEN_KEY) } catch(e) {}
          }
        })
        .catch(() => {
          try { sessionStorage.removeItem(SESSION_TOKEN_KEY) } catch(e) {}
        })
    }
  }, [])

  // Reset pagination when search/filter changes
  useEffect(() => { setVisibleCount(9) }, [selectedCategory, searchTerm, showOnlyFeatured])

  const filteredArticles = useMemo(() => {
    return deduplicateArticles(articles)
      .filter(a => {
        if (!a.published && !isAuthenticated) return false
        if (showOnlyFeatured && !a.featured) return false
        if (selectedCategory && a.category !== selectedCategory) return false
        if (searchTerm) {
          const term = searchTerm.toLowerCase()
          const contentText = (a.content || '').replace(/<[^>]+>/g,' ').toLowerCase()
          return a.title.toLowerCase().includes(term) || 
                 a.excerpt.toLowerCase().includes(term) ||
                 contentText.includes(term)
        }
        return true
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [articles, isAuthenticated, selectedCategory, searchTerm, showOnlyFeatured])

  const featuredArticle = useMemo(() => {
    return filteredArticles.find(a => a.featured && a.published)
  }, [filteredArticles])

  const saveArticle = useCallback(async (data) => {
    if (savingRef.current) return;
    savingRef.current = true;
    const backup = [...articles];
    const articleToSave = {
      ...data,
      id: data.id || Date.now(),
    };

    // Optimistic update — deduplicar para evitar repetidos
    const newArticles = data.id 
      ? articles.map(a => String(a.id) === String(data.id) ? articleToSave : a)
      : [articleToSave, ...articles]; 

    setArticles(deduplicateArticles(newArticles));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', token: getAuthToken(), article: articleToSave })
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || 'El servidor no pudo guardar el artículo')
      }
      // Recargar del API para sincronizar estado real
      await loadArticles()
    } catch (error) {
      // Rollback al estado anterior
      setArticles(backup);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(backup)) } catch(e) {}
      throw error; // Re-lanzar para que handleSave muestre el error
    } finally {
      savingRef.current = false;
    }
  }, [articles, loadArticles]);

  const duplicateArticle = useCallback(async (article) => {
    if (savingRef.current) return;
    savingRef.current = true;
    const backup = [...articles];
    const copy = {
      ...article,
      id: Date.now(),
      title: `${article.title} (copia)`,
      seoTitle: article.seoTitle ? `${article.seoTitle} (copia)` : '',
      slug: `${article.slug || generateSlug(article.title)}-copia-${Date.now()}`,
      published: false,
      featured: false,
      date: new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0],
    }
    const newArticles = [copy, ...articles]
    setArticles(deduplicateArticles(newArticles))
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save', token: getAuthToken(), article: copy })
      })
      const result = await response.json()
      if (!result.success) throw new Error(result.message || 'Error al duplicar')
      await loadArticles()
    } catch(e) {
      setArticles(backup)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(backup)) } catch(ex) {}
      alert('Error al duplicar artículo: ' + e.message)
    } finally {
      savingRef.current = false;
    }
  }, [articles, loadArticles])

  const deleteArticle = useCallback(async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este artículo?')) return;
    const backup = [...articles];
    const newArticles = articles.filter(a => String(a.id) !== String(id));
    setArticles(newArticles);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', token: getAuthToken(), id: id })
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Error al eliminar en servidor');
      await loadArticles(); // Recargar del API para confirmar eliminación
    } catch (error) {
      setArticles(backup); // Rollback
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(backup)) } catch(e) {}
      alert('Error al eliminar: ' + error.message);
    }
  }, [articles, loadArticles]);

  const togglePublish = useCallback(async (id) => {
    const backup = [...articles];
    const newArticles = articles.map(a => String(a.id) === String(id) ? { ...a, published: !a.published } : a);
    setArticles(newArticles);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_publish', token: getAuthToken(), id: id })
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Error al actualizar estado');
      await loadArticles();
    } catch (error) {
      setArticles(backup);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(backup)) } catch(e) {}
      alert('Error al cambiar publicación: ' + error.message);
    }
  }, [articles, loadArticles]);

  const toggleFeatured = useCallback(async (id) => {
    const backup = [...articles];
    const newArticles = articles.map(a => String(a.id) === String(id) ? { ...a, featured: !a.featured } : a);
    setArticles(newArticles);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_featured', token: getAuthToken(), id: id })
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Error al actualizar destacado');
      await loadArticles();
    } catch (error) {
      setArticles(backup);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(backup)) } catch(e) {}
      alert('Error al cambiar destacado: ' + error.message);
    }
  }, [articles, loadArticles]);

  const handleLoginSuccess = useCallback((token) => {
    setIsAuthenticated(true)
    try { sessionStorage.setItem(SESSION_TOKEN_KEY, token) } catch(e) {}
    setShowAdminLogin(false)
    setShowAdminPanel(true)
  }, [])

  const handleLogout = useCallback(async () => {
    const token = getAuthToken()
    setIsAuthenticated(false)
    try { sessionStorage.removeItem(SESSION_TOKEN_KEY) } catch(e) {}
    setShowAdminPanel(false)
    // Destruir sesión en el servidor
    if (token) {
      try {
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'logout', token })
        })
      } catch(e) {}
    }
  }, [])

  return (
    <>
      <style>{`body.article-open { overflow: hidden !important; }`}</style>
      <SEO title="Blog Legal | Noticias Jurídicas y Análisis | LITESCO" description="Blog de LITESCO con análisis jurídico, noticias legales actualizadas y reformas 2025. Mantén tu empresa protegida con información legal especializada." />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog Jurídico LITESCO",
        "description": "Análisis legal, noticias jurídicas y guías especializadas en derecho colombiano.",
        "url": "https://www.litesco.com.co/blog",
        "publisher": {
          "@type": "Organization",
          "name": "LITESCO — Litigio Estratégico Colombiano",
          "url": "https://www.litesco.com.co",
          "logo": { "@type": "ImageObject", "url": "https://www.litesco.com.co/favicon.webp" },
          "contactPoint": { "@type": "ContactPoint", "telephone": "+57-313-203-7572", "contactType": "customer service", "areaServed": "CO" }
        }
      })}} />
      <LazyMotion features={domAnimation}>
        <LoginModal show={showAdminLogin} onClose={() => setShowAdminLogin(false)} onSuccess={handleLoginSuccess} />
        <AdminPanel show={showAdminPanel} isAuthenticated={isAuthenticated} articles={articles} onClose={() => setShowAdminPanel(false)} onLogout={handleLogout} onSave={saveArticle} onDelete={deleteArticle} onTogglePublish={togglePublish} onToggleFeatured={toggleFeatured} onDuplicate={duplicateArticle} />

        {selectedArticleId && (
          <ArticleView
            selectedId={selectedArticleId}
            articles={articles}
            onClose={handleCloseArticle}
            onSelect={(art) => { const s = art.slug || generateSlug(art.title); window.location.href = `/blog/${s}` }}
          />
        )}

        {slug && !selectedArticleId && (
          <div style={{ minHeight:'100vh', background:'#0A1628' }} />
        )}

        {!slug && <main className="relative min-h-screen bg-white overflow-x-hidden">
          <section style={{position:'relative',minHeight:'min(100svh,100vh)',height:'min(100svh,700px)',overflow:'hidden'}}>
            <div className="absolute inset-0 z-0">
              <img src={heroImage} alt="Fondo Blog" className="h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0" style={{background:'linear-gradient(135deg,rgba(2,6,23,0.92) 0%,rgba(2,6,23,0.72) 55%,rgba(2,6,23,0.5) 100%)'}} />
              <div className="absolute inset-0" style={{background:'linear-gradient(to top,rgba(2,6,23,1) 0%,transparent 35%,rgba(2,6,23,0.3) 100%)'}} />
            </div>
            <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center px-4 sm:px-6 lg:px-8" style={{paddingTop:'clamp(60px,10vh,120px)',paddingBottom:'clamp(40px,8vh,80px)'}}>
              <div className="text-center" style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'clamp(12px,2.5vw,20px)'}}>
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 backdrop-blur-sm">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
                  <span style={{fontSize:'clamp(11px,2.5vw,14px)',fontWeight:500,color:'#fbbf24'}}>ACTUALIDAD LEGAL · {articles.filter(a=>a.published).length} artículos publicados</span>
                </div>
                <h1 style={{fontSize:'clamp(2rem,6vw,4.5rem)',fontWeight:900,color:'#fff',lineHeight:1.1,letterSpacing:'-0.03em',margin:0}}>Blog <span style={{color:'#f59e0b'}}>Jurídico</span></h1>
                <p style={{fontSize:'clamp(0.95rem,2.2vw,1.2rem)',color:'#cbd5e1',maxWidth:'560px',lineHeight:1.6,margin:0}}>Manténgase informado sobre las últimas novedades en derecho colombiano</p>
                <m.a href="https://calendly.com/gerencialitigioestrategicocolombiano" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'clamp(10px,2vw,16px) clamp(20px,4vw,32px)',background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#020617',borderRadius:'14px',fontWeight:800,fontSize:'clamp(13px,2vw,16px)',textDecoration:'none',boxShadow:'0 8px 32px rgba(245,158,11,0.35)',marginTop:'4px'}}>
                  <FaCalendarAlt /> Agenda tu Consulta <FaArrowRight />
                </m.a>
              </div>
            </div>
          </section>

          {/* SKELETON LOADING */}
          {loading && (
            <section className="bg-white" style={{paddingTop:'clamp(40px,6vw,64px)',paddingBottom:'clamp(40px,6vw,64px)'}}>
              <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 clamp(16px,4vw,32px)'}}>
                <div className="articles-grid-skel">
                <style>{`.articles-grid-skel{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}@media(max-width:900px){.articles-grid-skel{grid-template-columns:repeat(2,1fr);gap:20px}}@media(max-width:540px){.articles-grid-skel{grid-template-columns:1fr;gap:16px}}`}</style>
                  {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{background:'#fff',border:'1px solid #e8edf4',boxShadow:'0 2px 12px rgba(10,22,40,0.05)'}}>
                      <div style={{height:'220px',background:'linear-gradient(135deg,#f1f5f9,#e2e8f0)'}} />
                      <div className="p-6 space-y-3">
                        <div style={{height:'12px',background:'#f1f5f9',borderRadius:'8px',width:'35%'}} />
                        <div style={{height:'18px',background:'#f1f5f9',borderRadius:'8px'}} />
                        <div style={{height:'18px',background:'#f1f5f9',borderRadius:'8px',width:'85%'}} />
                        <div style={{height:'13px',background:'#f8fafc',borderRadius:'8px'}} />
                        <div style={{height:'13px',background:'#f8fafc',borderRadius:'8px',width:'70%'}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="bg-white" style={{paddingTop:'clamp(40px,6vw,64px)',paddingBottom:'clamp(40px,6vw,64px)',display: loading ? 'none' : 'block'}}>
            <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 clamp(16px,4vw,32px)'}}>
              <div className="mb-12">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
                  <div style={{minWidth:0}}>
                    <h2 style={{fontSize:'clamp(1.4rem,3vw,2rem)',fontWeight:900,marginBottom:'4px',color:'#0A1628',letterSpacing:'-0.3px'}}>
                    Artículos Legales
                    <button onClick={() => isAuthenticated ? setShowAdminPanel(true) : setShowAdminLogin(true)} className="text-slate-200 hover:text-amber-500 text-xs ml-3 opacity-0 hover:opacity-100 transition-all align-middle" title="Panel Admin">⚙</button>
                  </h2>
                  <p style={{color:'#64748b',fontSize:'14px',margin:0}}>Explore nuestro contenido jurídico especializado — {articles.filter(a=>a.published).length} artículos publicados</p>
                  </div>
                  <div style={{position:'relative',width:'100%',maxWidth:'360px',flexShrink:0}}>
                    <FaSearch style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'#94a3b8',fontSize:'13px',pointerEvents:'none'}} />
                    <input type="text" placeholder="Buscar artículos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{width:'100%',paddingLeft:'42px',paddingRight:'16px',paddingTop:'12px',paddingBottom:'12px',background:'#f8fafc',border:'1.5px solid #e2e8f0',borderRadius:'12px',color:'#1e293b',fontSize:'14px',outline:'none',transition:'border-color 0.2s',boxSizing:'border-box'}} onFocus={e=>e.target.style.borderColor='#f59e0b'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
                  </div>
                </div>

                <div style={{display:'flex',gap:'8px',flexWrap:'wrap',paddingBottom:'4px'}} className="category-scroll-hide category-bar">
                  <style>{`.category-scroll-hide::-webkit-scrollbar{display:none}@media(max-width:640px){.category-bar{flex-wrap:nowrap!important;overflow-x:auto!important;-webkit-overflow-scrolling:touch;padding-bottom:8px}}`}</style>
                  <button onClick={() => { setSelectedCategory(null); setShowOnlyFeatured(false); }} style={{flexShrink:0,padding:'8px 16px',borderRadius:'50px',fontWeight:600,fontSize:'clamp(11px,2vw,13px)',transition:'all 0.2s',whiteSpace:'nowrap',...(!selectedCategory?{background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#0A1628',boxShadow:'0 4px 16px rgba(245,158,11,0.25)'}:{background:'#f1f5f9',color:'#64748b'})}}>Todos <span style={{marginLeft:'4px',padding:'1px 7px',borderRadius:'50px',fontSize:'11px',...(!selectedCategory?{background:'rgba(255,255,255,0.2)',color:'#0A1628'}:{background:'#e2e8f0',color:'#64748b'})}}>{articles.filter(a => a.published).length}</span></button>
                  {CATEGORIES.map(cat => {
                    const Icon = cat.icon; const count = articles.filter(a => a.category === cat.id && a.published).length; const isActive = selectedCategory === cat.id
                    return (
                      <button key={cat.id} onClick={() => { setSelectedCategory(isActive ? null : cat.id); setShowOnlyFeatured(false); }} style={{flexShrink:0,display:'inline-flex',alignItems:'center',gap:'6px',padding:'8px 16px',borderRadius:'50px',fontWeight:600,fontSize:'clamp(11px,2vw,13px)',transition:'all 0.2s',whiteSpace:'nowrap',...(isActive?{background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#0A1628',boxShadow:'0 4px 16px rgba(245,158,11,0.25)'}:{background:'#f1f5f9',color:'#64748b'})}}>
                        <Icon style={{fontSize:'11px',flexShrink:0}} />{cat.name} <span style={{padding:'1px 7px',borderRadius:'50px',fontSize:'11px',...(isActive?{background:'rgba(255,255,255,0.2)',color:'#0A1628'}:{background:'#e2e8f0',color:'#64748b'})}}>{count}</span>
                      </button>
                    )
                  })}
                </div>
                {(selectedCategory || searchTerm) && (
                  <div className="flex items-center gap-3 mt-6 flex-wrap">
                    <span className="text-slate-500 text-sm">Filtros activos:</span>
                    {selectedCategory && <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">{CATEGORIES.find(c => c.id === selectedCategory)?.name} <button onClick={() => setSelectedCategory(null)} className="hover:text-amber-900"><FaTimes className="text-xs" /></button></span>}
                    {searchTerm && <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">"{searchTerm}" <button onClick={() => setSearchTerm('')} className="hover:text-blue-900"><FaTimes className="text-xs" /></button></span>}
                    <button onClick={() => { setSelectedCategory(null); setSearchTerm(''); setShowOnlyFeatured(false); }} className="text-slate-500 hover:text-slate-700 text-sm underline">Limpiar todo</button>
                  </div>
                )}
              </div>

              {featuredArticle && !selectedCategory && !searchTerm && !showOnlyFeatured && (
                <article style={{marginBottom:'48px',cursor:'pointer'}} onClick={() => handleOpenArticle(featuredArticle)} className="group">
                  <div style={{background:'#0A1628',borderRadius:'24px',overflow:'hidden',boxShadow:'0 16px 64px rgba(10,22,40,0.3)',transition:'box-shadow 0.3s'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='0 24px 80px rgba(10,22,40,0.45)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='0 16px 64px rgba(10,22,40,0.3)'}>
                    <div className="featured-grid">
                    <style>{`.featured-grid{display:grid;grid-template-columns:1fr 1fr}@media(max-width:767px){.featured-grid{grid-template-columns:1fr}}.featured-img{height:320px}@media(max-width:767px){.featured-img{height:220px}}.featured-body{padding:clamp(24px,4vw,48px);display:flex;flex-direction:column;justify-content:center}`}</style>
                      <div className="featured-img" style={{position:'relative',overflow:'hidden'}}>
                        <img src={featuredArticle.image} alt={featuredArticle.altText || ""} width="800" height="500" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.7s ease'}} className="group-hover:scale-105" loading="lazy" decoding="async" />
                        <div style={{position:'absolute',inset:0,background:'linear-gradient(to right,rgba(10,22,40,0.4) 0%,transparent 70%)'}} />
                        <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(10,22,40,0.6) 0%,transparent 50%)'}} />
                      </div>
                      <div className="featured-body">
                        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
                          <span style={{padding:'5px 14px',fontSize:'11px',fontWeight:800,borderRadius:'50px',textTransform:'uppercase',letterSpacing:'0.08em',background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#0A1628'}}>Destacado</span>
                          <span style={{color:'#94a3b8',fontSize:'13px',display:'flex',alignItems:'center',gap:'6px'}}><FaCalendarAlt style={{color:'#f59e0b',fontSize:'10px'}} /> {formatDate(featuredArticle.date)}</span>
                          <span style={{color:'#94a3b8',fontSize:'13px',display:'flex',alignItems:'center',gap:'5px'}}><FaClock style={{color:'#f59e0b',fontSize:'10px'}} /> {readTime(featuredArticle.content)} min</span>
                        </div>
                        <h2 style={{fontSize:'clamp(1.25rem,2.5vw,2.2rem)',fontWeight:900,color:'#fff',marginBottom:'16px',lineHeight:1.2,letterSpacing:'-0.02em',transition:'color 0.2s'}} className="group-hover:text-amber-400">{featuredArticle.title}</h2>
                        <p style={{color:'#94a3b8',marginBottom:'24px',lineHeight:1.7,fontSize:'clamp(13px,1.8vw,16px)',display:'-webkit-box',WebkitLineClamp:3,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{featuredArticle.excerpt}</p>
                        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:'10px',color:'#64748b',fontSize:'13px'}}>
                            <span>{featuredArticle.author}</span>
                          </div>
                          <span style={{color:'#f59e0b',fontWeight:700,display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',transition:'gap 0.2s'}} className="group-hover:gap-3">Leer artículo <FaArrowRight style={{fontSize:'12px'}} /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {!selectedCategory && !searchTerm && !showOnlyFeatured && filteredArticles.filter(a => a.featured && a.published && a.id !== featuredArticle?.id).length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0" style={{background:'linear-gradient(135deg,#0A1628,#1a3560)',border:'1px solid rgba(245,158,11,0.3)'}}><FaStar style={{color:'#f59e0b',fontSize:'18px'}} /></div>
                    <div><h2 className="text-2xl font-bold" style={{color:'#0A1628'}}>Artículos Destacados</h2><p className="text-sm" style={{color:'#94a3b8'}}>Selección especial de nuestro equipo editorial</p></div>
                    <div className="ml-auto hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl" style={{background:'linear-gradient(135deg,#0A1628,#0F2744)',border:'1px solid rgba(245,158,11,0.25)'}}><FaStar style={{color:'#f59e0b',fontSize:'11px'}} /><span className="text-sm font-semibold" style={{color:'#f59e0b'}}>{filteredArticles.filter(a => a.featured && a.published).length} destacados</span></div>
                  </div>
                  <div className="featured-sec-grid">
                  <style>{`.featured-sec-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}@media(max-width:900px){.featured-sec-grid{grid-template-columns:repeat(2,1fr);gap:16px}}@media(max-width:540px){.featured-sec-grid{grid-template-columns:1fr;gap:12px}}`}</style>
                    {filteredArticles.filter(a => a.featured && a.published && a.id !== featuredArticle?.id).map((art, i) => {
                      const fcat = CATEGORIES.find(c => c.id === art.category); const FIcon = fcat?.icon || FaBalanceScale
                      return (
                        <m.article key={art.id} whileHover={{ y: -6 }} className="relative rounded-2xl overflow-hidden cursor-pointer group" style={{ background: 'linear-gradient(135deg,#0A1628 0%,#0F2744 100%)', boxShadow: '0 4px 24px rgba(10,22,40,0.18)' }} onClick={(e) => { e.stopPropagation(); handleOpenArticle(art); }}>
                          <div className="relative overflow-hidden" style={{height:'clamp(160px,18vw,210px)'}}>
                            <img src={art.image} alt={art.altText || ''} className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
                            <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(10,22,40,0.3) 0%,rgba(10,22,40,0.85) 100%)'}} />
                            <div className="absolute top-3 left-3 flex items-center gap-2"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg shadow-lg" style={{background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#0A1628'}}><FaStar className="text-[9px]" /> Destacado</span></div>
                            <div className="absolute bottom-3 left-3"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg" style={{background:'rgba(255,255,255,0.12)',backdropFilter:'blur(8px)',border:'1px solid rgba(245,158,11,0.3)',color:'#f59e0b'}}><FIcon className="text-[10px]" /> {fcat?.name}</span></div>
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 mb-3"><FaCalendarAlt style={{color:'#f59e0b',fontSize:'10px'}} /><span className="text-xs font-medium" style={{color:'rgba(245,158,11,0.8)'}}>{formatDate(art.date)}</span></div>
                            <h3 className="font-bold mb-2 line-clamp-2 leading-snug transition-colors duration-300" style={{fontSize:'0.95rem',color:'#ffffff',lineHeight:'1.45'}} onMouseEnter={e=>e.currentTarget.style.color='#f59e0b'} onMouseLeave={e=>e.currentTarget.style.color='#ffffff'}>{art.title}</h3>
                            <p className="text-xs line-clamp-2 mb-4" style={{color:'rgba(148,163,184,0.9)',lineHeight:'1.6'}}>{art.excerpt}</p>
                            <div className="flex items-center justify-between pt-3" style={{borderTop:'1px solid rgba(245,158,11,0.15)'}}>
                              <span className="flex items-center gap-1.5 text-xs" style={{color:'rgba(148,163,184,0.7)'}}><FaUser style={{fontSize:'9px',color:'rgba(245,158,11,0.6)'}} /> {art.author}</span>
                              <span className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300 group-hover:gap-2.5" style={{color:'#f59e0b'}}>Leer artículo <FaArrowRight style={{fontSize:'9px'}} /></span>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500 group-hover:opacity-100 opacity-0" style={{background:'linear-gradient(to right,transparent,#f59e0b,transparent)'}} />
                        </m.article>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-12">
                    <div className="flex-1 h-px" style={{background:'linear-gradient(to right,transparent,#e2e8f0)'}} /><span className="text-xs font-semibold px-4 py-2 rounded-full tracking-wider uppercase" style={{background:'linear-gradient(135deg,#0A1628,#0F2744)',color:'rgba(245,158,11,0.85)',border:'1px solid rgba(245,158,11,0.2)'}}>Todos los artículos</span><div className="flex-1 h-px" style={{background:'linear-gradient(to left,transparent,#e2e8f0)'}} />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
                <p className="text-slate-500 text-sm">
                  Mostrando <strong className="text-slate-700">{Math.min(visibleCount, filteredArticles.filter(a => !a.featured || selectedCategory || searchTerm).length)}</strong> de <strong className="text-slate-700">{filteredArticles.filter(a => !a.featured || selectedCategory || searchTerm).length}</strong> artículos
                  {searchTerm && <span className="ml-1 text-amber-600">que coinciden con "<em>{searchTerm}</em>"</span>}
                </p>
              </div>

              {filteredArticles.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner" style={{background:'linear-gradient(135deg,#f8fafc,#f1f5f9)',border:'1px solid #e2e8f0'}}><FaSearch className="text-slate-300 text-3xl" /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">No se encontraron artículos</h3>
                  <p className="text-slate-500 mb-6 max-w-md mx-auto">No hay artículos que coincidan con "<strong>{searchTerm}</strong>". Intente con otros términos o explore por categorías.</p>
                  <button onClick={() => { setSearchTerm(''); setSelectedCategory(null); }} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all" style={{background:'linear-gradient(135deg,#0A1628,#0F2744)',color:'#f59e0b',border:'1px solid rgba(245,158,11,0.2)'}}>
                    <FaTimes style={{fontSize:'10px'}} /> Limpiar filtros
                  </button>
                </div>
              ) : (
                <div className="articles-grid">
                <style>{`.articles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}@media(max-width:900px){.articles-grid{grid-template-columns:repeat(2,1fr);gap:20px}}@media(max-width:540px){.articles-grid{grid-template-columns:1fr;gap:16px}}`}</style>
                  {filteredArticles.filter(a => !a.featured || selectedCategory || searchTerm).slice(0, visibleCount).map((article, i) => {
                    const cat = CATEGORIES.find(c => c.id === article.category); const Icon = cat?.icon || FaBalanceScale
                    return (
                      <m.article key={article.id} whileHover={{ y: -6 }} className="group cursor-pointer rounded-2xl overflow-hidden flex flex-col" style={{ background: '#ffffff', border: '1px solid #e8edf4', boxShadow: '0 2px 16px rgba(10,22,40,0.07)', transition: 'box-shadow 0.3s, border-color 0.3s' }} onMouseEnter={e => { e.currentTarget.style.boxShadow='0 16px 48px rgba(10,22,40,0.16)'; e.currentTarget.style.borderColor='rgba(245,158,11,0.45)' }} onMouseLeave={e => { e.currentTarget.style.boxShadow='0 2px 16px rgba(10,22,40,0.07)'; e.currentTarget.style.borderColor='#e8edf4' }} onClick={() => handleOpenArticle(article)}>
                        <div className="relative overflow-hidden" style={{height:'clamp(180px,22vw,240px)'}}>
                          <img src={article.image} alt={article.altText || ""} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" decoding="async" />
                          <div className="absolute inset-0" style={{background:'linear-gradient(to bottom,rgba(10,22,40,0) 35%,rgba(10,22,40,0.85) 100%)'}} />
                          <div className="absolute bottom-4 left-4"><span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl" style={{background:'rgba(245,158,11,0.15)',backdropFilter:'blur(10px)',border:'1px solid rgba(245,158,11,0.45)',color:'#f59e0b',letterSpacing:'0.01em'}}><Icon style={{fontSize:'10px'}} /> {cat?.name}</span></div>
                          <div className="absolute top-3 right-3 flex gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-medium rounded-lg" style={{background:'rgba(10,22,40,0.65)',backdropFilter:'blur(6px)',color:'rgba(255,255,255,0.8)'}}><FaCalendarAlt style={{fontSize:'8px',color:'#f59e0b'}} /> {formatDate(article.date)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                          <h3 className="font-bold mb-3 line-clamp-2 leading-snug transition-colors duration-300" style={{fontSize:'1.02rem',color:'#0A1628',lineHeight:'1.45',letterSpacing:'-0.1px'}} onMouseEnter={e=>e.currentTarget.style.color='#d97706'} onMouseLeave={e=>e.currentTarget.style.color='#0A1628'}>{article.title}</h3>
                          <p className="text-sm line-clamp-3 mb-4 flex-1" style={{color:'#64748b',lineHeight:'1.7'}}>{article.excerpt}</p>
                          <div className="flex items-center justify-between pt-4" style={{borderTop:'1px solid #f1f5f9'}}>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0"><img src="/favicon.webp" alt="LITESCO" className="w-full h-full object-cover" /></div>
                              <span className="text-xs font-medium" style={{color:'#94a3b8'}}>{article.author}</span>
                              <span style={{color:'#e2e8f0',fontSize:'10px'}}>·</span>
                              <span className="text-xs" style={{color:'#cbd5e1'}}>{readTime(article.content)} min</span>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold transition-all duration-300 group-hover:gap-2.5" style={{color:'#f59e0b'}}>Leer <FaArrowRight style={{fontSize:'9px'}} /></span>
                          </div>
                        </div>
                        <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500" style={{background:'linear-gradient(to right,#f59e0b,#d97706)'}} />
                      </m.article>
                    )
                  })}
                </div>
              )}

              {/* BOTÓN CARGAR MÁS */}
              {filteredArticles.filter(a => !a.featured || selectedCategory || searchTerm).length > visibleCount && (
                <div className="text-center mt-10">
                  <button onClick={() => setVisibleCount(v => v + 6)}
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl font-bold text-sm transition-all"
                    style={{background:'linear-gradient(135deg,#0A1628,#0F2744)',color:'#f59e0b',border:'1px solid rgba(245,158,11,0.2)',boxShadow:'0 4px 16px rgba(10,22,40,0.15)'}}
                    onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 6px 24px rgba(10,22,40,0.25)'; e.currentTarget.style.transform='translateY(-1px)' }}
                    onMouseLeave={e=>{ e.currentTarget.style.boxShadow='0 4px 16px rgba(10,22,40,0.15)'; e.currentTarget.style.transform='translateY(0)' }}>
                    <FaChevronRight style={{transform:'rotate(90deg)',fontSize:'10px'}} />
                    Cargar más artículos
                    <span style={{background:'rgba(245,158,11,0.12)',padding:'2px 10px',borderRadius:'20px',fontSize:'12px'}}>
                      {filteredArticles.filter(a => !a.featured || selectedCategory || searchTerm).length - visibleCount} más
                    </span>
                  </button>
                </div>
              )}

              <div className="mt-20 rounded-3xl text-center relative overflow-hidden"
                style={{background:'#020617', border:'1px solid #1e293b', boxShadow:'0 24px 80px rgba(2,6,23,0.5)'}}>

                {/* Amber top bar */}
                <div style={{height:'3px',background:'linear-gradient(90deg,transparent,#f59e0b,#d97706,transparent)',width:'100%'}} />

                {/* Ambient glows */}
                <div style={{position:'absolute',top:'-60px',right:'-60px',width:'240px',height:'240px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,0.07) 0%,transparent 70%)',pointerEvents:'none'}} />
                <div style={{position:'absolute',bottom:'-40px',left:'-40px',width:'180px',height:'180px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,0.04) 0%,transparent 70%)',pointerEvents:'none'}} />

                <div style={{position:'relative',padding:'clamp(28px,5vw,56px) clamp(20px,4vw,56px)'}}>
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                    style={{background:'rgba(245,158,11,0.08)',border:'1px solid rgba(245,158,11,0.18)'}}>
                    <FaGavel style={{color:'#f59e0b',fontSize:'10px'}} />
                    <span style={{color:'#f59e0b',fontSize:'10px',fontWeight:800,letterSpacing:'0.1em',textTransform:'uppercase'}}>Asesoría Especializada</span>
                  </div>

                  <h3 style={{color:'#f1f5f9',fontWeight:900,fontSize:'clamp(1.3rem,3vw,2rem)',letterSpacing:'-0.03em',margin:'0 0 16px',lineHeight:1.15}}>
                    ¿Necesita Asesoría Legal?
                  </h3>
                  <p style={{color:'#475569',fontSize:'clamp(14px,2vw,16px)',lineHeight:1.75,maxWidth:'480px',margin:'0 auto 28px'}}>
                    Nuestro equipo de abogados especializados está listo para proteger sus intereses con estrategia y experiencia.
                  </p>

                  {/* Primary CTA */}
                  <a href="https://calendly.com/gerencialitigioestrategicocolombiano" target="_blank" rel="noopener noreferrer"
                    style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'clamp(11px,2vw,14px) clamp(20px,4vw,32px)',borderRadius:'14px',background:'linear-gradient(135deg,#f59e0b,#d97706)',color:'#020617',fontWeight:900,fontSize:'clamp(13px,2vw,15px)',textDecoration:'none',boxShadow:'0 6px 28px rgba(245,158,11,0.35)',transition:'all 0.2s',letterSpacing:'-0.01em'}}
                    onMouseEnter={e=>{ e.currentTarget.style.boxShadow='0 10px 40px rgba(245,158,11,0.55)'; e.currentTarget.style.transform='translateY(-2px)' }}
                    onMouseLeave={e=>{ e.currentTarget.style.boxShadow='0 6px 28px rgba(245,158,11,0.35)'; e.currentTarget.style.transform='translateY(0)' }}>
                    <FaCalendarAlt style={{fontSize:'13px'}} /> Agendar Consulta Gratuita <FaArrowRight style={{fontSize:'11px'}} />
                  </a>

                  {/* Secondary contacts */}
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'24px',paddingTop:'20px',borderTop:'1px solid #0f172a'}}>
                    <a href="https://wa.me/573132037572" target="_blank" rel="noopener noreferrer"
                      style={{display:'flex',alignItems:'center',gap:'8px',color:'#475569',fontSize:'13px',fontWeight:600,textDecoration:'none',transition:'color 0.15s',padding:'8px 16px',borderRadius:'10px',border:'1px solid rgba(37,211,102,0.15)',background:'rgba(37,211,102,0.05)'}}
                      onMouseEnter={e=>{ e.currentTarget.style.color='#4ade80'; e.currentTarget.style.borderColor='rgba(37,211,102,0.35)'; e.currentTarget.style.background='rgba(37,211,102,0.1)' }}
                      onMouseLeave={e=>{ e.currentTarget.style.color='#475569'; e.currentTarget.style.borderColor='rgba(37,211,102,0.15)'; e.currentTarget.style.background='rgba(37,211,102,0.05)' }}>
                      <FaWhatsapp style={{color:'#25D366',fontSize:'14px'}} />
                      Consultar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* BACK TO TOP */}

        </main>}
      </LazyMotion>
    </>
  )
}

export default BlogPage
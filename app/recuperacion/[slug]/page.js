/**
 * Ruta placeholder para subpáginas de Recuperación.
 * FLUJO: /recuperacion/[slug] → .htaccess → servicios-articulo.php?linea=recuperacion&slug=[slug]
 */

export async function generateStaticParams() {
  return [{ slug: '_placeholder' }]
}

export async function generateMetadata() {
  return { robots: { index: false, follow: false } }
}

export default function RecuperacionServicioPage() {
  return null
}

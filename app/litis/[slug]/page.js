/**
 * Ruta placeholder para subpáginas de Litis.
 *
 * FLUJO EN PRODUCCIÓN:
 *   /litis/[slug] → .htaccess → servicios-articulo.php?linea=litis&slug=[slug]
 *
 * Next.js genera out/litis/_placeholder/index.html pero el .htaccess
 * intercepta cualquier slug real antes de que Apache sirva el archivo estático.
 */

export async function generateStaticParams() {
  return [{ slug: '_placeholder' }]
}

export async function generateMetadata() {
  return { robots: { index: false, follow: false } }
}

export default function LitisServicioPage() {
  return null
}

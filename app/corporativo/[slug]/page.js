/**
 * Ruta placeholder para subpáginas de Corporativo.
 * FLUJO: /corporativo/[slug] → .htaccess → servicios-articulo.php?linea=corporativo&slug=[slug]
 */

export async function generateStaticParams() {
  return [{ slug: '_placeholder' }]
}

export async function generateMetadata() {
  return { robots: { index: false, follow: false } }
}

export default function CorporativoServicioPage() {
  return null
}

// Cliente ligero para leer servicios publicados desde servicios-api.php en las
// páginas estáticas de línea de negocio (Corporativo, Litis, Recuperación).
// Al venir de la base de datos que ya alimenta el CMS (ver views/ServiciosCMSPage.jsx),
// agregar o quitar un servicio de un área es un cambio de contenido, no de código.

const SERVICIOS_API_URL = 'https://www.litesco.com.co/servicios-api.php'

// Agrupa los servicios publicados de una línea de negocio por su subcategoría
// (el mismo campo `subcategoria` que se asigna en el paso 1 del wizard del CMS).
export async function fetchServiciosPorLinea(linea) {
  const res = await fetch(`${SERVICIOS_API_URL}?action=list`)
  const data = await res.json()
  if (!data.success) throw new Error(data.message || 'No se pudieron cargar los servicios')

  const servicios = (data.servicios || []).filter(
    (s) => s.linea_negocio === linea && Number(s.published) === 1
  )

  const porArea = {}
  for (const s of servicios) {
    const area = s.subcategoria || 'Otro'
    if (!porArea[area]) porArea[area] = []
    porArea[area].push(s)
  }
  return { servicios, porArea }
}

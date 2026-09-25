<?php
/**
 * LITESCO - Renderizador de páginas de servicios legales
 *
 * FLUJO EN PRODUCCIÓN:
 *   /litis/proceso-ejecutivo      → .htaccess → servicios-articulo.php?linea=litis&slug=proceso-ejecutivo
 *   /corporativo/contratos        → .htaccess → servicios-articulo.php?linea=corporativo&slug=contratos
 *   /recuperacion/cobranza-bpo    → .htaccess → servicios-articulo.php?linea=recuperacion&slug=cobranza-bpo
 */

// ─── META PIXEL ID ───────────────────────────────────────────────────────────
if (is_file(__DIR__ . '/lib/meta-capi.php')) {
    require_once __DIR__ . '/lib/meta-capi.php';
}
if (!function_exists('env')) {
    function env($key, $default = null) {
        $v = getenv($key);
        return ($v === false || $v === '') ? $default : $v;
    }
}
define('META_PIXEL_ID', env('META_PIXEL_ID', ''));

// ─── CACHÉ: páginas de servicio publicadas (30 minutos) ───────────────────────
header('Cache-Control: public, max-age=1800, stale-while-revalidate=3600');
header('Vary: Accept-Encoding');

// ─── CONFIG DB ───────────────────────────────────────────────────────────────
// Credenciales en .env (vía db-config.php); nunca embebidas en el código.
$db_config = require __DIR__ . '/db-config.php';

// ─── EXTRAER PARÁMETROS ───────────────────────────────────────────────────────
$linea = $_GET['linea'] ?? '';
$slug  = $_GET['slug']  ?? '';

// Fallback desde PATH_INFO / REQUEST_URI
if (empty($slug) || empty($linea)) {
    $path = $_SERVER['PATH_INFO'] ?? parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
    if (preg_match('#/(litis|corporativo|recuperacion)/([^/]+)#', $path, $m)) {
        $linea = $m[1];
        $slug  = $m[2];
    }
}

$lineasValidas = ['litis', 'corporativo', 'recuperacion'];
if (!$slug || !in_array($linea, $lineasValidas, true)) {
    // Redirección solo a un destino conocido (evita open redirect vía ?linea=...)
    $dest = in_array($linea, $lineasValidas, true) ? '/' . $linea : '/';
    header('Location: ' . $dest, true, 302);
    exit();
}

// ─── CACHÉ DE PÁGINA COMPLETA EN DISCO ────────────────────────────────────────
// Equivalente a ISR fuera de Next.js: la primera visita construye el HTML contra
// MySQL y lo guarda; las siguientes (dentro del TTL) se sirven directo del archivo,
// sin tocar la base de datos. servicios-api.php invalida el archivo al guardar/
// publicar/despublicar/eliminar el servicio. El tracking (Meta Pixel/CAPI) es
// 100% client-side (ver más abajo), así que el HTML cacheado es idéntico y seguro
// para cualquier visitante sin importar su cookie de consentimiento.
$cacheDir     = __DIR__ . '/cache/servicios';
// Sufijo hash del par exacto linea/slug: sin él, slugs distintos que colapsan al
// quitar mayúsculas/puntos/guiones bajos compartirían archivo de caché y se
// serviría la página equivocada. DEBE coincidir con invalidateServiceCache() en
// servicios-api.php.
$cacheKey     = preg_replace('/[^a-z0-9\-]/', '', "{$linea}-{$slug}") . '-' . substr(sha1("{$linea}/{$slug}"), 0, 10);
$cacheFile    = "$cacheDir/{$cacheKey}.html";
$cacheTtlSecs = 1800; // igual al Cache-Control de arriba
$cacheable    = empty($_GET['preview'] ?? ''); // nunca cachear/servir caché en vista previa

if ($cacheable && is_file($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtlSecs) {
    header('X-Cache: HIT'); // diagnóstico: curl -I para confirmar que no se tocó MySQL
    readfile($cacheFile);
    exit();
}
header('X-Cache: MISS');
if ($cacheable) {
    ob_start();
}

// ─── BUSCAR SERVICIO ─────────────────────────────────────────────────────────
$srv = null;
$previewMode = false;
try {
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO($dsn, $db_config['user'], $db_config['password'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Verificar si viene un token de admin para modo preview
    $previewToken = $_GET['preview'] ?? '';
    if ($previewToken) {
        $ts = $pdo->prepare("SELECT id FROM servicios_sesiones WHERE token = ? AND expires_at > NOW()");
        $ts->execute([$previewToken]);
        $previewMode = (bool)$ts->fetch();
    }

    // Publicar automáticamente servicios programados cuya fecha ya llegó
    $pdo->exec("UPDATE servicios SET published = 1, status = 'publicado' WHERE status = 'programado' AND publish_at IS NOT NULL AND publish_at <= NOW()");

    $publishedClause = $previewMode ? '' : 'AND published = 1';
    $stmt = $pdo->prepare("SELECT * FROM servicios WHERE slug = ? AND linea_negocio = ? $publishedClause LIMIT 1");
    $stmt->execute([$slug, $linea]);
    $srv = $stmt->fetch();
} catch (PDOException $e) {
    error_log('[servicios-articulo] DB error: ' . $e->getMessage());
}

if (!$srv) {
    http_response_code(404);
    readfile(__DIR__ . '/out/404.html') || readfile(__DIR__ . '/404.html') || http_response_code(404);
    exit();
}

// ─── SERVICIOS RELACIONADOS (misma línea de negocio) ──────────────────────────
$related = [];
try {
    $stmt = $pdo->prepare("SELECT h1, slug, nombre_servicio, meta_desc, imagen_url FROM servicios WHERE linea_negocio = ? AND slug != ? AND published = 1 ORDER BY updated_at DESC LIMIT 3");
    $stmt->execute([$linea, $slug]);
    $related = $stmt->fetchAll();
} catch (PDOException $e) {}

// ─── ARTÍCULOS DEL BLOG RELACIONADOS (elegidos en el CMS, ver servicio_articulos) ──
$relatedArticulos = [];
try {
    $stmt = $pdo->prepare("
        SELECT ar.title, ar.seo_title, ar.slug, ar.image, ar.alt_text, ar.excerpt
        FROM servicio_articulos sa
        INNER JOIN articles ar ON ar.id = sa.articulo_id
        WHERE sa.servicio_id = ? AND ar.published = 1
        ORDER BY sa.orden ASC
    ");
    $stmt->execute([$srv['id']]);
    $relatedArticulos = $stmt->fetchAll();
} catch (PDOException $e) {}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
$e = fn($s) => htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8');

$lineasNombres = [
    'litis'        => 'Litis',
    'corporativo'  => 'Corporativo',
    'recuperacion' => 'Recuperación de Cartera',
];
$lineaNombre = $lineasNombres[$linea] ?? ucfirst($linea);

$seoTitle     = $srv['seo_title']      ?: $srv['h1'];
$seoTitleSuffix = (stripos($seoTitle, 'LITESCO') === false) ? ' | LITESCO' : '';
$metaDesc     = $srv['meta_desc']      ?: '';
$h1           = $srv['h1']             ?: '';
$content      = $srv['content']        ?: '';
$resumen      = $srv['resumen_rapido'] ?: '';
$imagenUrl    = $srv['imagen_url']     ?: 'https://litesco.com.co/images/hero-poster.webp';
$imagenAlt    = $srv['imagen_alt']     ?: $h1;
$nombreSrv    = $srv['nombre_servicio']?: $h1;
$areaCob      = $srv['area_cobertura'] ?: 'Bogotá, Colombia';
$ctaTipo      = $srv['cta_tipo']       ?: 'whatsapp';
$canonical    = "https://litesco.com.co/{$linea}/{$slug}";

// Título del hero: resalta en dorado la parte final del título, como el hero del
// inicio (donde un tramo va en ámbar). Sobre una sola cadena de la BD partimos
// por palabras y coloreamos desde cerca de la mitad, procurando que el tramo
// dorado no empiece en una preposición/artículo.
$h1Html  = $e($h1);
$h1Words = preg_split('/\s+/', trim($h1), -1, PREG_SPLIT_NO_EMPTY);
$h1n     = count($h1Words);
if ($h1n >= 3) {
    $stop  = ['de','del','la','el','los','las','en','con','y','o','a','para','por','un','una','al','su','sus','que'];
    $split = (int)ceil($h1n / 2);
    while ($split < $h1n - 1 && in_array(mb_strtolower(trim($h1Words[$split], " \t\n\r\0\x0B.,;:")), $stop, true)) {
        $split++;
    }
    $h1White  = implode(' ', array_slice($h1Words, 0, $split));
    $h1Accent = implode(' ', array_slice($h1Words, $split));
    $h1Html   = $e($h1White) . ' <span class="svc-hero-accent">' . $e($h1Accent) . '</span>';
}

// FAQs
$faqs = [];
if (!empty($srv['faqs'])) {
    $decoded = json_decode($srv['faqs'], true);
    if (is_array($decoded)) $faqs = $decoded;
}

// Tabla de contenidos desde H2
$toc = [];
preg_match_all('/<h2[^>]*>(.*?)<\/h2>/is', $content, $hMatches);
foreach ($hMatches[1] as $i => $heading) {
    $toc[] = ['id' => 'sec-' . ($i + 1), 'text' => strip_tags($heading), 'num' => $i + 1];
}
$tocCounter = 0;
$content = preg_replace_callback('/<h2([^>]*)>/i', function($m) use (&$tocCounter, $toc) {
    $id = $toc[$tocCounter]['id'] ?? 'sec-' . ($tocCounter + 1);
    $tocCounter++;
    return "<h2{$m[1]} id=\"{$id}\">";
}, $content);

// Tiempo de lectura estimado (para el panel de índice en la barra lateral)
$wordCount = str_word_count(strip_tags($content));
$readTime  = max(1, (int)ceil($wordCount / 250));

// Partir el contenido por cada H2 para mostrar el encabezado numerado con una
// guía lateral bajo su propio texto (en vez de todo el artículo en un solo bloque)
$contentBlocks = array_values(array_filter(
    preg_split('/(?=<h2)/i', $content),
    fn($block) => trim(strip_tags($block)) !== ''
));

// ─── JSON-LD SCHEMAS ─────────────────────────────────────────────────────────
$schemaOrg = [
    '@context' => 'https://schema.org',
    '@type'    => ['LegalService', 'Organization'],
    'name'     => 'LITESCO',
    'legalName'=> 'LITESCO S.A.S.',
    'url'      => 'https://litesco.com.co',
    'logo'     => ['@type'=>'ImageObject','url'=>'https://litesco.com.co/logo.webp','width'=>512,'height'=>512],
    'image'    => 'https://litesco.com.co/images/hero-poster.webp',
    'telephone'=> '+573132037572',
    'priceRange'=> '$$',
    'address'  => ['@type'=>'PostalAddress','streetAddress'=>'CRA 7 #17-01','addressLocality'=>'Bogotá','addressRegion'=>'Bogotá D.C.','postalCode'=>'110321','addressCountry'=>'CO'],
    'geo'      => ['@type'=>'GeoCoordinates','latitude'=>'4.5978','longitude'=>'-74.0762'],
    'sameAs'   => ['https://www.linkedin.com/company/litesco/','https://instagram.com/litesco.co','https://www.facebook.com/share/1a1fApiY65/'],
    'areaServed'=> [['@type'=>'City','name'=>'Bogotá'],['@type'=>'Country','name'=>'Colombia']],
];

$schemaService = [
    '@context'    => 'https://schema.org',
    '@type'       => 'LegalService',
    'name'        => $nombreSrv,
    'description' => $metaDesc,
    'url'         => $canonical,
    'image'       => $imagenUrl,
    'telephone'   => '+573132037572',
    'priceRange'  => '$$',
    'address'     => ['@type'=>'PostalAddress','streetAddress'=>'CRA 7 #17-01','addressLocality'=>'Bogotá','addressRegion'=>'Bogotá D.C.','postalCode'=>'110321','addressCountry'=>'CO'],
    'serviceType' => $nombreSrv,
    'provider'    => [
        '@type'=>'Organization','name'=>'LITESCO','url'=>'https://litesco.com.co',
        'telephone'=>'+573132037572',
        'image'=>'https://litesco.com.co/images/hero-poster.webp',
        'address'=>['@type'=>'PostalAddress','streetAddress'=>'CRA 7 #17-01','addressLocality'=>'Bogotá','addressRegion'=>'Bogotá D.C.','postalCode'=>'110321','addressCountry'=>'CO'],
    ],
    'areaServed'  => $areaCob,
    'availableChannel' => [
        '@type'            => 'ServiceChannel',
        'serviceUrl'       => 'https://litesco.com.co/contacto',
        'servicePhone'     => '+573132037572',
        'availableLanguage'=> 'Spanish',
    ],
    'offers' => [
        '@type'           => 'Offer',
        'description'     => 'Primera consulta gratuita',
        'priceCurrency'   => 'COP',
    ],
];

$schemaBreadcrumb = [
    '@context'      => 'https://schema.org',
    '@type'         => 'BreadcrumbList',
    'name'          => $h1,
    'itemListElement' => [
        ['@type'=>'ListItem','position'=>1,'name'=>'Inicio','item'=>'https://litesco.com.co'],
        ['@type'=>'ListItem','position'=>2,'name'=>$lineaNombre,'item'=>"https://litesco.com.co/{$linea}"],
        ['@type'=>'ListItem','position'=>3,'name'=>$h1,'item'=>$canonical],
    ],
];

$schemaFaq = !empty($faqs) ? [
    '@context'   => 'https://schema.org',
    '@type'      => 'FAQPage',
    'mainEntity' => array_map(fn($f) => [
        '@type'         => 'Question',
        'name'          => $f['q'] ?? '',
        'acceptedAnswer'=> ['@type'=>'Answer','text'=>$f['a']??''],
    ], $faqs),
] : null;

$jEnc = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES;

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= $e($seoTitle) ?><?= $seoTitleSuffix ?></title>
<meta name="description" content="<?= $e($metaDesc) ?>">
<meta name="author" content="LITESCO S.A.S.">
<link rel="canonical" href="<?= $e($canonical) ?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?= $e($seoTitle) ?>">
<meta property="og:description" content="<?= $e($metaDesc) ?>">
<meta property="og:url" content="<?= $e($canonical) ?>">
<meta property="og:image" content="<?= $e($imagenUrl) ?>">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="LITESCO">
<meta property="og:locale" content="es_CO">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= $e($seoTitle) ?>">
<meta name="twitter:description" content="<?= $e($metaDesc) ?>">
<meta name="twitter:image" content="<?= $e($imagenUrl) ?>">
<link rel="icon" href="/favicon.webp" type="image/webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@300;400;600;700&family=Playfair+Display:wght@600;700;800&display=swap">
<script type="application/ld+json"><?= json_encode($schemaOrg, $jEnc) ?></script>
<script type="application/ld+json"><?= json_encode($schemaService, $jEnc) ?></script>
<script type="application/ld+json"><?= json_encode($schemaBreadcrumb, $jEnc) ?></script>
<?php if ($schemaFaq): ?>
<script type="application/ld+json"><?= json_encode($schemaFaq, $jEnc) ?></script>
<?php endif; ?>
<?php
// Meta Pixel: bloque estático (mismo HTML para todos los visitantes, cache-safe —
// esta página se sirve desde caché de archivo en servidor, ver más abajo). El
// consentimiento y el event_id se resuelven en el navegador, nunca en PHP, para que
// el mismo HTML cacheado sirva correctamente a cada visitante según su propia cookie.
if (!$previewMode && META_PIXEL_ID !== ''):
    $pid = htmlspecialchars(META_PIXEL_ID, ENT_QUOTES, 'UTF-8');
    $pageName = htmlspecialchars($nombreSrv, ENT_QUOTES, 'UTF-8');
    $pageCategory = htmlspecialchars($lineaNombre, ENT_QUOTES, 'UTF-8');
?>
<script>
(function(){
  if (document.cookie.indexOf('litesco_cookie_consent=1') === -1) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '<?= $pid ?>');
  fbq('track', 'PageView');
  var eventId = 'vc_' + Date.now() + '_' + Math.random().toString(16).slice(2);
  var contentName = '<?= $pageName ?>', contentCategory = '<?= $pageCategory ?>';
  fbq('track', 'ViewContent', { content_name: contentName, content_category: contentCategory }, { eventID: eventId });
  fetch('https://litesco.com.co/meta-capi-endpoint.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'ViewContent', event_id: eventId, page_url: location.href, content_name: contentName, content_category: contentCategory }),
    keepalive: true
  }).catch(function(){});
})();
</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<?= $pid ?>&ev=PageView&noscript=1" alt=""></noscript>
<?php endif; ?>
<style>
/* ── RESET ─────────────────────────────────────────── */
*{margin:0;padding:0;box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{font-family:'Open Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;color:#1e293b;-webkit-font-smoothing:antialiased;overflow-x:hidden;padding-top:<?= $previewMode ? '0' : '64px' ?>}
<?php if (!$previewMode): ?>
@media(min-width:640px){body{padding-top:72px}}
@media(min-width:1024px){body{padding-top:80px}}
<?php endif; ?>
a{text-decoration:none}

/* ── CONTENEDORES RESPONSIVOS: crecen en pantallas grandes en vez de
   quedarse fijos en 1300px con márgenes enormes en monitores anchos ── */
:root{--wide:1300px}
@media(min-width:1440px){:root{--wide:1420px}}
@media(min-width:1680px){:root{--wide:1500px}}

/* ── NAVBAR ──────────────────────────────────────── */
.nav{background:#020617;position:fixed;top:0;left:0;right:0;z-index:10000;border-bottom:1px solid #1e293b;box-shadow:0 1px 20px rgba(0,0,0,.5)}
.nav-inner{max-width:var(--wide);margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:64px;gap:8px}
@media(min-width:640px){.nav-inner{height:72px}}
@media(min-width:1024px){.nav-inner{height:80px}}
.nav-logo{display:flex;align-items:center;gap:10px;color:#fff;font-weight:900;font-size:18px;text-decoration:none;flex-shrink:0}
.nav-logo img{width:40px;height:40px;border-radius:50%;border:2px solid #334155;box-shadow:0 0 0 2px #1e293b}
.nav-logo-title{font-size:17px;font-weight:900;letter-spacing:-0.3px;color:#fff;transition:color .3s}
.nav-logo:hover .nav-logo-title{color:#f59e0b}
.nav-logo-sub{font-size:9px;font-weight:700;color:#64748b;letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:5px;margin-top:2px}
.nav-logo-sub::before{content:'';width:12px;height:1px;background:#f59e0b;border-radius:2px;display:inline-block;transition:width .5s}
.nav-logo:hover .nav-logo-sub::before{width:24px}
.nav-logo:hover .nav-logo-sub{color:#fde68a}
.nav-links{display:flex;align-items:center;gap:2px}
.nav-links>a{color:#94a3b8;font-size:14px;font-weight:600;transition:color .2s,background .2s;padding:6px 14px;border-radius:9999px;position:relative}
.nav-links>a:hover{color:#fff;background:#1e293b}
.nav-links>a.nav-active{color:#f59e0b}
.nav-links>a.nav-active::after{content:'';position:absolute;bottom:5px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:#f59e0b;border-radius:50%}
.nav-cta{background:linear-gradient(135deg,#d97706,#f59e0b)!important;color:#fff!important;padding:8px 18px!important;border-radius:9999px!important;font-weight:800!important;font-size:13px!important;display:inline-flex!important;align-items:center!important;gap:7px!important;box-shadow:0 4px 16px rgba(245,158,11,.3)!important;transition:all .2s!important;margin-left:8px}
.nav-cta:hover{box-shadow:0 6px 24px rgba(245,158,11,.45)!important;transform:translateY(-1px)!important}
.nav-services-wrap{position:relative}
.nav-services-btn{display:flex;align-items:center;gap:6px;color:#94a3b8;font-size:14px;font-weight:600;background:none;border:1px solid transparent;cursor:pointer;padding:6px 14px;border-radius:9999px;transition:color .2s,background .2s,border-color .2s}
.nav-services-btn:hover{color:#fff;background:#1e293b}
.nav-services-btn.nav-active,.nav-services-wrap.open .nav-services-btn{background:#0f172a;color:#f59e0b;border-color:#334155}
.nav-services-btn svg{transition:transform .25s}
.nav-services-wrap.open .nav-services-btn svg{transform:rotate(-180deg);color:#f59e0b}
.nav-dropdown{position:absolute;top:calc(100% + 16px);left:50%;transform:translateX(-50%) scale(.95);width:320px;background:#020617;border:1px solid #1e293b;border-radius:16px;padding:8px;box-shadow:0 16px 48px rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s,transform .2s,top .2s;pointer-events:none;overflow:hidden}
.nav-services-wrap.open .nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;top:calc(100% + 12px);transform:translateX(-50%) scale(1)}
.nav-dropdown-arrow{position:absolute;top:-8px;left:50%;transform:translateX(-50%) rotate(45deg);width:16px;height:16px;background:#020617;border-top:1px solid #1e293b;border-left:1px solid #1e293b;z-index:0}
.nav-dropdown-glow{position:absolute;top:0;right:0;width:190px;height:190px;background:rgba(245,158,11,.05);border-radius:50%;filter:blur(24px);transform:translate(50%,-50%);pointer-events:none}
.nav-dropdown-list{position:relative;display:flex;flex-direction:column;gap:2px;z-index:1}
.nav-dropdown a{position:relative;display:flex;align-items:flex-start;gap:12px;padding:12px;border-radius:12px;color:#94a3b8!important;transition:all .2s;border:1px solid transparent}
.nav-dropdown a:hover{background:#0f172a;border-color:#1e293b;transform:translateX(3px)}
.nav-dropdown-icon{flex-shrink:0;width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:10px;background:#1e293b;color:#94a3b8;transition:all .25s}
.nav-dropdown a:hover .nav-dropdown-icon{background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff;box-shadow:0 0 15px rgba(245,158,11,.4)}
.nav-dropdown-text{display:flex;flex-direction:column;min-width:0}
.nav-dropdown-title{font-size:13.5px;font-weight:700;color:#e2e8f0;transition:color .2s}
.nav-dropdown a:hover .nav-dropdown-title{color:#fde68a}
.nav-dropdown-desc{font-size:11px;line-height:1.45;color:#64748b;margin-top:2px;transition:color .2s}
.nav-dropdown a:hover .nav-dropdown-desc{color:#94a3b8}
.nav-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;flex-shrink:0;z-index:10001}
.nav-hamburger span{display:block;width:22px;height:2px;background:#f59e0b;border-radius:2px;transition:all .2s}
@media(max-width:1024px){
  .nav-links{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#020617;flex-direction:column;align-items:center;justify-content:center;gap:20px;z-index:10000}
  .nav-links.open{display:flex}
  .nav-services-wrap{flex-direction:column;align-items:center}
  .nav-dropdown{position:static;transform:none!important;width:auto;max-width:280px;opacity:1!important;visibility:visible!important;pointer-events:auto!important;top:0!important;margin-top:8px;background:transparent;border:none;box-shadow:none;padding:4px}
  .nav-dropdown-arrow,.nav-dropdown-glow{display:none}
  .nav-dropdown a{justify-content:center}
  .nav-dropdown-desc{display:none}
  .nav-hamburger{display:flex}
}

/* ── BREADCRUMB ───────────────────────────────────── */
.bc{background:#fff;border-bottom:1px solid #f1f5f9}
.bc-inner{max-width:var(--wide);margin:0 auto;padding:12px 24px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:13px;color:#64748b}
.bc-inner a{color:#64748b;transition:color .15s}
.bc-inner a:hover{color:#f59e0b}
.bc-sep{color:#cbd5e1;font-size:10px}
.bc-cur{color:#0A1628;font-weight:600}

/* ── SECCIÓN: eyebrow + título genéricos ─────────── */
.svc-section-eyebrow{font-size:11px;font-weight:800;color:#d97706;text-transform:uppercase;letter-spacing:2px;font-family:'Montserrat',sans-serif;margin-bottom:10px}
.svc-section-eyebrow-light{color:#f59e0b}
.svc-section-title{color:#0A1628;font-size:clamp(1.4rem,3vw,2rem);font-weight:700;letter-spacing:-0.01em;margin:0 0 36px;font-family:'Playfair Display',Georgia,serif}
.svc-section-title-light{color:#fff}

/* ── REVEAL ON SCROLL ─────────────────────────────── */
.reveal{opacity:0;transform:translateY(22px);transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1)}
.reveal.in-view{opacity:1;transform:translateY(0)}
@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}

/* ── HERO (dividido: texto sobre azul animado, imagen a la derecha) ── */
.svc-hero{position:relative;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,0.92fr);min-height:clamp(380px,56vh,600px);background:#020617;overflow:hidden;isolation:isolate}
.svc-hero-copy{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:center;padding:clamp(34px,5.5vw,76px) clamp(24px,5vw,72px);z-index:1;background:#020617}
.svc-badge{display:inline-flex;align-items:center;gap:9px;margin-bottom:18px;padding:7px 15px 7px 13px;border-radius:9999px;background:rgba(245,158,11,.09);border:1px solid rgba(245,158,11,.28);font-size:11.5px;font-weight:800;color:#fcd34d;text-transform:uppercase;letter-spacing:2px;font-family:'Montserrat',sans-serif}
.svc-badge-dot{width:7px;height:7px;border-radius:50%;background:#f59e0b;flex-shrink:0;animation:svcPulse 2.6s ease-in-out infinite}
@keyframes svcPulse{0%,100%{box-shadow:0 0 0 0 rgba(245,158,11,.55)}55%{box-shadow:0 0 0 8px rgba(245,158,11,0)}}
.svc-hero h1{color:#fff;font-family:'Open Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-weight:700;font-size:clamp(2rem,5vw,3.6rem);line-height:1.12;letter-spacing:normal;text-transform:none;margin:0 0 clamp(14px,2vw,22px);text-wrap:balance;text-shadow:0 2px 26px rgba(0,0,0,.45)}
.svc-hero h1 .svc-hero-accent{color:#f59e0b}
.svc-hero-lead{color:rgba(255,255,255,.8);font-size:clamp(0.95rem,1.15vw,1.02rem);line-height:1.7;max-width:54ch;margin:0}
.svc-hero-media{position:relative;min-height:100%;overflow:hidden;background:#020617}
.svc-hero-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:contrast(1.05) saturate(1.05) brightness(.95);transform:scale(1.06);animation:svcKen 26s ease-in-out infinite alternate;will-change:transform}
@keyframes svcKen{from{transform:scale(1.06) translate3d(0,0,0)}to{transform:scale(1.16) translate3d(-2.5%,-2%,0)}}
/* corte diagonal: cuña del color del navbar sobre el borde izquierdo de la foto, con filo dorado en la misma diagonal */
.svc-hero-media::before{content:'';position:absolute;top:0;bottom:0;left:0;width:100%;z-index:2;pointer-events:none;background:#020617;clip-path:polygon(0 0,110px 0,0 100%)}
.svc-hero-media::after{content:'';position:absolute;top:0;bottom:0;left:0;width:100%;z-index:3;pointer-events:none;background:linear-gradient(180deg,#f59e0b,#d97706);clip-path:polygon(110px 0,115px 0,5px 100%,0 100%)}
@media(max-width:860px){
  .svc-hero{grid-template-columns:1fr;min-height:0}
  .svc-hero-copy{order:2;padding:clamp(28px,7vw,44px) 24px}
  .svc-hero-media{order:1;min-height:0;height:clamp(210px,44vw,340px)}
  .svc-hero-media::before{top:auto;bottom:0;left:0;right:0;width:auto;height:100%;clip-path:polygon(0 100%,100% calc(100% - 54px),100% 100%)}
  .svc-hero-media::after{top:auto;bottom:0;left:0;right:0;width:auto;height:100%;background:linear-gradient(90deg,#f59e0b,#d97706);clip-path:polygon(0 100%,100% calc(100% - 54px),100% calc(100% - 49px),0 calc(100% - 5px))}
}
@media(prefers-reduced-motion:reduce){.svc-badge-dot,.svc-hero-media img{animation:none}.svc-hero-media img{transform:scale(1.04)}}

/* ── BARRA DE COMPROMISOS (valores del servicio, no cifras sin verificar) ── */
.svc-values{background:#0A1628;padding:26px 24px}
.svc-values-inner{max-width:var(--wide);margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
@media(max-width:800px){.svc-values-inner{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.svc-values-inner{grid-template-columns:1fr}}
.svc-value-item{display:flex;align-items:center;gap:12px;padding:10px 12px;border-radius:12px;transition:background .25s}
.svc-value-item:hover{background:rgba(255,255,255,.05)}
.svc-value-icon{width:36px;height:36px;border-radius:10px;background:rgba(245,158,11,.12);border:1px solid rgba(245,158,11,.22);color:#f59e0b;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .25s}
.svc-value-item:hover .svc-value-icon{transform:scale(1.1) rotate(-4deg)}
.svc-value-text{color:#e2e8f0;font-size:13px;font-weight:700;line-height:1.4;font-family:'Montserrat',sans-serif}

/* ── BENEFICIOS ("Por qué elegirnos") — panel editorial, no grid de íconos ── */
.svc-benefits{background:#fff;padding:clamp(36px,5.5vw,56px) 24px;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9}
.svc-benefits-inner{max-width:var(--wide);margin:0 auto}
.svc-benefits-layout{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:center}
@media(max-width:900px){.svc-benefits-layout{grid-template-columns:1fr;gap:24px}}
.svc-benefits-quote{background:linear-gradient(150deg,#0A1628,#0F2744);border-radius:16px;padding:clamp(22px,3vw,32px) clamp(20px,2.5vw,28px);position:relative;overflow:hidden}
.svc-benefits-quote-mark{font-family:Georgia,'Times New Roman',serif;font-size:56px;line-height:.4;color:rgba(245,158,11,.4);margin-bottom:14px}
.svc-benefits-quote-text{color:#e2e8f0;font-size:clamp(1rem,1.6vw,1.15rem);line-height:1.75;font-style:italic;margin-bottom:20px}
.svc-benefits-quote-sign{display:flex;align-items:center;gap:10px}
.svc-benefits-quote-sign-line{width:22px;height:2px;background:#f59e0b;border-radius:2px}
.svc-benefits-quote-sign-text{color:#f59e0b;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:1px;font-family:'Montserrat',sans-serif}
.svc-benefits-list{display:flex;flex-direction:column;gap:20px}
.svc-benefits-item{display:flex;gap:14px;align-items:flex-start}
.svc-benefits-check{width:24px;height:24px;border-radius:50%;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.25);color:#b45309;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
.svc-benefits-text{color:#334155;font-size:14.5px;line-height:1.65}
.svc-benefits-text strong{color:#0A1628;font-weight:700}

/* ── CONTENIDO + SIDEBAR (estilo editorial, como el blog) ─────────── */
.svc-content-section{background:#f8fafc}
.content-wrap{max-width:var(--wide);margin:0 auto;padding:clamp(32px,5vw,48px) 24px;display:grid;grid-template-columns:1fr 360px;gap:36px;align-items:start}
@media(max-width:1100px){.content-wrap{grid-template-columns:1fr 320px;gap:28px}}
@media(max-width:1023px){
  .content-wrap{grid-template-columns:1fr;padding:32px 24px 8px;gap:0}
  .sidebar{order:-1;margin-bottom:28px;position:static!important;top:auto}
}
@media(max-width:640px){.content-wrap{padding:24px 16px 8px}}

/* Índice colapsable (solo tablet/móvil) */
.toc-mobile{display:none;margin-bottom:24px}
.toc-mobile summary{padding:13px 18px;cursor:pointer;display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,#0A1628,#0d1f3c);color:#f59e0b;font-weight:800;font-size:13px;list-style:none;border-radius:12px;user-select:none}
.toc-mobile summary::-webkit-details-marker{display:none}
.toc-mobile-body{background:#fff;border:1px solid #e8edf4;border-top:none;border-radius:0 0 12px 12px;padding:8px 12px}
.toc-mobile-item{display:flex;align-items:center;gap:8px;width:100%;background:none;border:none;cursor:pointer;padding:8px 10px;border-radius:8px;text-align:left;font-family:inherit;font-size:13px;color:#374151}
.toc-mobile-item:hover{background:#f8fafc;color:#f59e0b}
@media(max-width:1023px){.toc-mobile{display:block}}

/* Artículo: flujo continuo con encabezados numerados, sin tarjetas por sección */
.ac{overflow-wrap:break-word;word-break:break-word;min-width:0;counter-reset:sec}
.ac h2{counter-increment:sec;color:#0A1628;font-size:clamp(1.15rem,2.3vw,1.4rem);font-weight:700;margin:0 0 .85rem;line-height:1.3;display:flex;align-items:center;gap:12px;letter-spacing:-0.01em;scroll-margin-top:80px;font-family:'Playfair Display',Georgia,serif}
.ac h2::before{content:counter(sec);display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;border-radius:50%;background:#0A1628;color:#f59e0b;font-size:.8rem;font-weight:700;font-family:'Montserrat',sans-serif;flex-shrink:0}
.ac-block{border-bottom:1px solid #f1f5f9;padding-bottom:1.6rem;margin-bottom:1.6rem}
.ac-block:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0}
.ac-block-body{margin-left:38px;padding-left:16px;border-left:2px solid #f1f5f9}
@media(max-width:640px){.ac-block-body{margin-left:0;padding-left:16px}}
.ac h3{color:#0A1628;font-size:clamp(1rem,2vw,1.1rem);font-weight:800;margin:1.75rem 0 0.7rem;padding:10px 16px;border-radius:10px;background:rgba(10,22,40,0.03);border-left:4px solid #f59e0b;line-height:1.4;font-family:'Montserrat',sans-serif}
.ac p{color:#334155;margin-bottom:1.15rem;line-height:1.8;font-size:clamp(0.95rem,2vw,1.02rem);letter-spacing:.01em;overflow-wrap:break-word;text-align:left}
@media(min-width:641px){.ac p{text-align:justify}}
.ac strong{color:#92400e;font-weight:700}
.ac ul{margin-bottom:1.5rem;padding:0;list-style:none}
.ac ul li{color:#334155;margin-bottom:.75rem;padding-left:1.75rem;position:relative;line-height:1.85;font-size:clamp(.93rem,2vw,1rem)}
.ac ul li::before{content:"▸";color:#f59e0b;font-weight:900;position:absolute;left:0;top:2px}
.ac ol{margin-bottom:1.5rem;padding:0;list-style:none;counter-reset:ol}
.ac ol li{counter-increment:ol;color:#334155;margin-bottom:.75rem;padding-left:2.2rem;position:relative;line-height:1.85}
.ac ol li::before{content:counter(ol);position:absolute;left:0;width:22px;height:22px;background:linear-gradient(135deg,#0A1628,#1a3560);color:#f59e0b;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;top:3px}
.ac blockquote{border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7 60%,#fffbeb);padding:18px 18px 18px 50px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative;box-shadow:0 4px 18px rgba(245,158,11,.1)}
.ac blockquote::before{content:"💡";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:20px}
.ac blockquote p{color:#374151;font-style:italic;margin:0;font-weight:500;text-align:left!important}
.ac table{width:100%;border-collapse:collapse;font-size:.86rem;margin:1.75rem 0;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(10,22,40,0.08)}
.ac th{background:linear-gradient(135deg,#0A1628,#0F2744);color:#f59e0b;padding:10px 14px;text-align:left;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.8px}
.ac td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#1f2937}
.ac tr:nth-child(even) td{background:#f8fafc}
.ac hr{border:none;margin:2.5rem 0;height:1px;background:linear-gradient(to right,transparent,#f59e0b 30%,#f59e0b 70%,transparent)}
.ac img{max-width:100%;height:auto;border-radius:14px;margin:1.75rem auto;display:block;box-shadow:0 10px 36px rgba(0,0,0,0.1)}
.ac [data-callout="dorado"]{border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7 60%,#fffbeb);padding:16px 18px 16px 50px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative}
.ac [data-callout="dorado"]::before{content:"💡";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:19px}
.ac [data-callout="verde"]{border-left:5px solid #10b981;background:linear-gradient(135deg,#ecfdf5,#d1fae5 60%,#ecfdf5);padding:16px 18px 16px 50px;margin:1.75rem 0;border-radius:0 14px 14px 0;position:relative}
.ac [data-callout="verde"]::before{content:"✅";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:17px}
.ac [data-callout-title]{font-weight:900;font-size:.92rem;margin-bottom:6px;display:block}
.ac [data-callout-body]{font-size:.87rem;line-height:1.65;display:block}
.ac [data-callout-link]{display:inline-flex;align-items:center;gap:6px;color:#b45309;font-weight:700;font-size:.85rem;margin-top:12px}
.ac [data-callout-link]:hover{text-decoration:underline}

/* Chip de referencia legal (cita de artículo/norma dentro de un párrafo) */
.ac [data-legal-ref]{display:inline-block;background:rgba(245,158,11,.12);color:#b45309;padding:2px 10px;border-radius:20px;font-size:.85em;font-weight:700;white-space:nowrap;line-height:1.6}

/* Tarjetas comparativas (ej. plazos: Ordinaria vs Extraordinaria) */
.ac [data-block="compare"]{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:1.75rem 0}
@media(max-width:560px){.ac [data-block="compare"]{grid-template-columns:1fr}}
.ac [data-compare-item]{background:#f8fafc;border:1px solid #f1f5f9;border-radius:14px;padding:20px}
.ac [data-compare-icon]{width:32px;height:32px;border-radius:9px;background:rgba(245,158,11,.12);color:#b45309;display:flex;align-items:center;justify-content:center;margin-bottom:12px}
.ac [data-compare-title]{color:#0A1628;font-weight:800;font-size:.98rem;margin-bottom:6px;font-family:'Montserrat',sans-serif}
.ac [data-compare-desc]{color:#64748b;font-size:.85rem;line-height:1.6}
.ac [data-compare-desc] strong{color:#0A1628}

/* Imagen con caption dentro del contenido */
.ac figure{margin:1.75rem 0}
.ac figure img{margin:0 0 10px}
.ac figcaption{color:#64748b;font-size:.82rem;font-style:italic;text-align:center;line-height:1.5}
@media(max-width:640px){
  .ac p{text-align:left!important;font-size:.97rem!important;line-height:1.8!important}
  .ac h2{font-size:1.2rem!important;gap:10px!important;margin:0 0 .9rem!important}
  .ac h2::before{min-width:28px!important;height:28px!important;font-size:.72rem!important}
  .ac-block{padding-bottom:1.75rem!important;margin-bottom:1.75rem!important}
  .ac h3{font-size:.98rem!important;padding:9px 13px!important;margin:1.75rem 0 .7rem!important}
}

/* Barra lateral fija: índice + FAQ (en pestañas) + CTA */
.sidebar{position:sticky;top:96px}
.side-card{border-radius:16px;overflow:hidden;border:1px solid #1e293b;box-shadow:0 4px 24px rgba(2,6,23,.55);background:#0f172a;margin-bottom:16px}
.side-tabs{background:#020617;border-bottom:1px solid #1e293b;display:flex}
.side-tab{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:14px 12px;background:none;border:none;cursor:pointer;border-bottom:2px solid transparent;transition:all .2s;position:relative;bottom:-1px;font-family:inherit}
.side-tab.active{border-bottom-color:#f59e0b}
.side-tab-label{font-size:11px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#475569;transition:color .2s}
.side-tab.active .side-tab-label{color:#f59e0b}
.side-tab-badge{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;border-radius:6px;font-size:9px;font-weight:800;padding:0 7px;background:#1e293b;color:#475569;transition:all .2s}
.side-tab.active .side-tab-badge{background:rgba(245,158,11,.15);color:#f59e0b}
.toc-meta{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,.05);gap:8px}
.toc-readtime{display:inline-flex;align-items:center;gap:6px;background:rgba(245,158,11,.1);border:1px solid rgba(245,158,11,.18);border-radius:8px;padding:4px 10px;color:#f59e0b;font-size:11px;font-weight:700}
.toc-seccount{color:#334155;font-size:10px;font-weight:600;margin-left:auto}
.toc-list{padding:6px 10px 10px;display:flex;flex-direction:column;gap:1px}
.toc-item{width:100%;background:transparent;border:none;border-left:2px solid transparent;cursor:pointer;padding:9px 14px;transition:all .18s;display:block;text-align:left;font-family:inherit}
.toc-item:hover{background:rgba(245,158,11,.05);border-left-color:rgba(245,158,11,.35)}
.toc-item.active{border-left-color:#f59e0b}
.toc-num{font-weight:700;color:#64748b;transition:color .18s}
.toc-item.active .toc-num{color:#f59e0b}
.toc-text{font-size:12.5px;color:#94a3b8;line-height:1.55;font-weight:500;transition:color .18s}
.toc-item.active .toc-text{color:#f8fafc;font-weight:700}
.faq-item{border-bottom:1px solid #1e293b}
.faq-item:last-child{border-bottom:none}
.faq-q{width:100%;background:transparent;border:none;cursor:pointer;padding:13px 16px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;text-align:left;transition:background .15s;font-family:inherit}
.faq-q:hover{background:rgba(255,255,255,.02)}
.faq-q-text{font-size:12.5px;font-weight:600;color:#cbd5e1;line-height:1.5;flex:1;transition:color .15s}
.faq-q.open .faq-q-text{color:#f59e0b}
.faq-icon{width:22px;height:22px;border-radius:50%;border:1.5px solid #334155;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all .2s;font-size:13px;font-weight:900;color:#475569}
.faq-q.open .faq-icon{background:#f59e0b;border-color:#f59e0b;color:#020617;box-shadow:0 0 12px rgba(245,158,11,.4)}
.faq-a{display:none;padding:0 16px 14px}
.faq-a.open{display:block}
.faq-a-inner{background:rgba(245,158,11,.04);border-left:2px solid #f59e0b;border-radius:0 8px 8px 0;padding:11px 14px;font-size:12px;color:#94a3b8;line-height:1.8}
.side-cta{border-radius:18px;overflow:hidden;border:1px solid #1e293b;box-shadow:0 8px 36px rgba(2,6,23,.5);background:#0A1628;position:relative;margin-bottom:16px}
.side-cta::before{content:'';position:absolute;inset:0;opacity:.07;pointer-events:none;background-image:radial-gradient(circle at 1px 1px, #fff 1px, transparent 0);background-size:18px 18px}
.side-cta-stripe{background:linear-gradient(90deg,#f59e0b,#d97706);height:3px;width:100%;position:relative}
.side-cta-body{padding:18px 18px 20px;position:relative}
.side-cta-title-row{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.side-cta-avatars{display:flex;flex-shrink:0}
.side-cta-avatar{position:relative;width:32px;height:32px;border-radius:50%;background:rgba(245,158,11,.12);border:2px solid #0A1628;box-shadow:0 0 0 1px rgba(245,158,11,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.side-cta-avatar+.side-cta-avatar{margin-left:-11px}
.side-cta-online{position:absolute;bottom:-1px;right:-1px;width:9px;height:9px;border-radius:50%;background:#25D366;border:2px solid #0A1628}
.side-cta-team{color:#f1f5f9;font-weight:700;font-size:12.5px;font-family:'Montserrat',sans-serif}
.side-cta-status{color:#64748b;font-size:10.5px;margin-top:2px}
.side-cta-headline{font-family:'Playfair Display',Georgia,serif;color:#fff;font-size:19px;font-weight:700;line-height:1.35;margin:0 0 10px}
.side-articles{padding:16px}
.side-articles-head{color:#f1f5f9;font-weight:700;font-size:12.5px;text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px;font-family:'Montserrat',sans-serif}
.side-articles-item{display:flex;gap:10px;align-items:center;text-decoration:none;padding:8px;border-radius:12px;transition:background .15s}
.side-articles-item+.side-articles-item{margin-top:2px}
.side-articles-item:hover{background:rgba(245,158,11,.08)}
.side-articles-img{width:56px;height:56px;border-radius:9px;overflow:hidden;flex-shrink:0;background:#1e293b}
.side-articles-img img{width:100%;height:100%;object-fit:cover;display:block}
.side-articles-body{min-width:0}
.side-articles-title{color:#e2e8f0;font-size:12.5px;font-weight:700;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;margin-bottom:4px}
.side-articles-link{color:#f59e0b;font-size:11px;font-weight:800;display:inline-flex;align-items:center;gap:5px}
.cta-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:11px;color:#020617;font-weight:800;font-size:12.5px;text-decoration:none;box-shadow:0 4px 16px rgba(245,158,11,.3);transition:all .2s;letter-spacing:.01em}
.cta-btn:hover{box-shadow:0 6px 22px rgba(245,158,11,.5);transform:translateY(-1px)}
.wa-btn{display:flex;align-items:center;justify-content:center;gap:9px;padding:11px 16px;border-radius:11px;background:transparent;border:1px solid rgba(255,255,255,.16);color:#e2e8f0;font-size:12.5px;text-decoration:none;font-weight:700;transition:all .2s;margin-top:10px}
.wa-btn:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.28)}
.wa-btn+.cta-btn,.cta-btn+.wa-btn{margin-top:10px}

/* ── SERVICIOS RELACIONADOS ───────────────────────── */
.svc-related{background:#fff;padding:clamp(36px,5.5vw,56px) 24px;border-top:1px solid #f1f5f9}
.svc-related-inner{max-width:var(--wide);margin:0 auto}
.svc-related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
@media(max-width:900px){.svc-related-grid{grid-template-columns:1fr}}
.svc-related-card{display:block;background:#f8fafc;border:1px solid #f1f5f9;border-radius:18px;overflow:hidden;transition:all .2s}
.svc-related-card:hover{border-color:#f59e0b;box-shadow:0 12px 32px rgba(10,22,40,0.1);transform:translateY(-3px)}
.svc-related-img{height:150px;overflow:hidden;background:#0A1628}
.svc-related-img img{width:100%;height:100%;object-fit:cover;display:block}
.svc-related-body{padding:18px 20px 20px}
.svc-related-title{color:#0A1628;font-weight:800;font-size:14.5px;margin-bottom:6px;font-family:'Montserrat',sans-serif}
.svc-related-desc{color:#64748b;font-size:12.5px;line-height:1.6;margin-bottom:12px;display:-webkit-box;-webkit-line-clamp:2;line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.svc-related-cta{display:inline-flex;align-items:center;gap:6px;color:#b45309;font-size:12px;font-weight:800}

/* ── INFO DE CONTACTO ─────────────────────────────── */
.svc-contact-strip{background:#fff;border-top:1px solid #f1f5f9;padding:22px 24px}
.svc-contact-strip-inner{max-width:var(--wide);margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:16px 32px}
.svc-contact-item{display:flex;align-items:center;gap:8px;font-size:13px;color:#475569;font-weight:600}
.svc-contact-item svg{flex-shrink:0;fill:#f59e0b}
.svc-contact-item a{color:#0A1628;font-weight:700}

/* ── FOOTER ──────────────────────────────────────── */
.footer{background:#020617;padding:40px 24px;text-align:center;border-top:1px solid #0f172a}
.footer-top{max-width:min(var(--wide),1100px);margin:0 auto}
.footer-logo{color:#fff;font-weight:900;font-size:20px;margin-bottom:8px;font-family:'Montserrat',sans-serif}
.footer-sub{color:#f59e0b;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px}
.footer-links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 20px;margin-bottom:20px}
.footer-links a{color:#475569;font-size:13px;transition:color .2s}
.footer-links a:hover{color:#f59e0b}
.footer-legal{color:#334155;font-size:12px;line-height:1.7;border-top:1px solid #0f172a;padding-top:20px;margin-top:4px}

/* ── WHATSAPP FLOAT + SCROLL TOP ─────────────────── */
.wa-float{position:fixed;bottom:24px;right:20px;width:54px;height:54px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(37,211,102,0.4);z-index:99;transition:transform .2s}
.wa-float:hover{transform:scale(1.1)}
.scroll-top{position:fixed;bottom:90px;right:20px;width:44px;height:44px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;box-shadow:0 4px 16px rgba(245,158,11,0.4);z-index:98;opacity:0;transform:translateY(10px);transition:all .3s;pointer-events:none}
.scroll-top.visible{opacity:1;transform:translateY(0);pointer-events:auto}
@media(max-width:640px){
  .wa-float{width:48px;height:48px;bottom:calc(14px + env(safe-area-inset-bottom,0px));right:14px}
  .scroll-top{width:40px;height:40px;bottom:calc(70px + env(safe-area-inset-bottom,0px));right:14px}
}

/* ── PANTALLAS GRANDES: un poco más de aire, sin inflar tipografía ── */
@media(min-width:1440px){
  .svc-benefits-layout{gap:44px}
  .svc-related-grid{gap:22px}
}

/* ── PANTALLAS MUY PEQUEÑAS: recuperar aire lateral ── */
@media(max-width:380px){
  .nav-inner{padding:0 14px}
  .bc-inner,.svc-hero-inner,.svc-benefits,.svc-content-section,.svc-faq-section,.svc-related,.svc-values,.svc-contact-strip,.footer{padding-left:16px;padding-right:16px}
}
</style>
</head>
<body>

<?php if ($previewMode && !$srv['published']): ?>
<div style="position:fixed;top:0;left:0;right:0;z-index:99999;background:#d97706;color:#020617;text-align:center;padding:8px 16px;font-weight:800;font-size:13px;letter-spacing:.05em">
  VISTA PREVIA — Este servicio está en borrador y no es visible al público. <a href="/cms-servicios" style="color:#020617;text-decoration:underline;margin-left:8px">Volver al CMS</a>
</div>
<div style="height:36px"></div>
<?php endif; ?>

<?php
$_np = strtok($_SERVER['REQUEST_URI'], '?');
$_ns = in_array(explode('/', trim($_np, '/'))[0], ['litis','corporativo','recuperacion']);
?>
<?php if (!$previewMode): ?>
<!-- NAV -->
<nav class="nav" id="mainNav">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="LITESCO — inicio">
      <img src="/favicon.webp" alt="" aria-hidden="true" width="40" height="40" loading="eager">
      <div>
        <div class="nav-logo-title">LITESCO</div>
        <div class="nav-logo-sub">Litigio Estratégico Colombiano</div>
      </div>
    </a>
    <button class="nav-hamburger" id="navHamburger" aria-label="Abrir menú" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <div class="nav-links" id="navLinks">
      <a href="/" class="<?= $_np==='/' ? 'nav-active' : '' ?>">Inicio</a>
      <a href="/sobre-nosotros" class="<?= $_np==='/sobre-nosotros' ? 'nav-active' : '' ?>">Nosotros</a>
      <div class="nav-services-wrap" id="navServicesWrap">
        <button class="nav-services-btn<?= $_ns ? ' nav-active' : '' ?>" id="navServicesBtn" aria-haspopup="true" aria-expanded="false">
          Servicios <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <div class="nav-dropdown" id="navDropdown">
          <span class="nav-dropdown-arrow" aria-hidden="true"></span>
          <span class="nav-dropdown-glow" aria-hidden="true"></span>
          <div class="nav-dropdown-list">
            <a href="/corporativo">
              <span class="nav-dropdown-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6-2v2h-4V5h4z"/></svg></span>
              <span class="nav-dropdown-text">
                <span class="nav-dropdown-title">Corporativo</span>
                <span class="nav-dropdown-desc">Blindaje jurídico y consultoría para grandes empresas.</span>
              </span>
            </a>
            <a href="/litis">
              <span class="nav-dropdown-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></span>
              <span class="nav-dropdown-text">
                <span class="nav-dropdown-title">Litis</span>
                <span class="nav-dropdown-desc">Representación experta en resolución de conflictos.</span>
              </span>
            </a>
            <a href="/recuperacion">
              <span class="nav-dropdown-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></span>
              <span class="nav-dropdown-text">
                <span class="nav-dropdown-title">Recuperación</span>
                <span class="nav-dropdown-desc">Estrategias efectivas para la gestión de cartera.</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      <a href="/blog" class="<?= strpos($_np,'/blog')===0 ? 'nav-active' : '' ?>">Blog</a>
      <a href="/faq" class="<?= $_np==='/faq' ? 'nav-active' : '' ?>">FAQ</a>
      <a href="/contacto" class="nav-cta">Contáctanos <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
  </div>
</nav>
<?php endif; ?>

<!-- BREADCRUMB -->
<div class="bc">
  <nav class="bc-inner" aria-label="Breadcrumb">
    <a href="/">Inicio</a>
    <span class="bc-sep">›</span>
    <a href="/<?= $linea ?>"><?= $e($lineaNombre) ?></a>
    <span class="bc-sep">›</span>
    <span class="bc-cur"><?= $e($h1) ?></span>
  </nav>
</div>

<!-- HERO -->
<section class="svc-hero">
  <div class="svc-hero-copy">
    <div class="svc-badge">
      <span class="svc-badge-dot"></span>
      <?= $e($lineaNombre) ?>
    </div>
    <h1><?= $h1Html ?></h1>
    <?php if ($resumen): ?>
    <p class="svc-hero-lead"><?= $e($resumen) ?></p>
    <?php endif; ?>
  </div>
  <div class="svc-hero-media">
    <img src="<?= $e($imagenUrl) ?>" alt="<?= $e($imagenAlt) ?>" width="1200" height="900" loading="eager">
  </div>
</section>

<?php if (!empty($toc)): ?>
<!-- ÍNDICE MÓVIL (colapsable, solo tablet/móvil) -->
<div style="max-width:var(--wide);margin:0 auto;padding:16px 24px 0">
  <details class="toc-mobile">
    <summary>📋 Índice del servicio (<?= count($toc) ?> secciones)</summary>
    <div class="toc-mobile-body">
      <?php foreach ($toc as $item): ?>
      <button class="toc-mobile-item" onclick="scrollToSection('<?= $item['id'] ?>');this.closest('details').removeAttribute('open')">
        <span style="min-width:20px;height:20px;border-radius:6px;background:#0A1628;color:#f59e0b;font-size:9px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0"><?= $item['num'] ?></span>
        <span><?= $e($item['text']) ?></span>
      </button>
      <?php endforeach; ?>
    </div>
  </details>
</div>
<?php endif; ?>

<!-- CONTENIDO -->
<section class="svc-content-section">
  <div class="content-wrap">
    <div style="min-width:0">
      <article class="ac">
        <?php foreach ($contentBlocks as $block): ?>
          <?php if (preg_match('/^(<h2[^>]*>.*?<\/h2>)(.*)$/is', trim($block), $bm)): ?>
          <div class="ac-block">
            <?= $bm[1] ?>
            <div class="ac-block-body"><?= $bm[2] ?></div>
          </div>
          <?php else: ?>
            <?= $block ?>
          <?php endif; ?>
        <?php endforeach; ?>
      </article>
    </div>

    <!-- SIDEBAR -->
    <aside class="sidebar">

      <?php if (!empty($toc) || !empty($faqs)): ?>
      <div class="side-card">
        <div class="side-tabs">
          <?php if (!empty($toc)): ?>
          <button class="side-tab active" id="tab-toc" onclick="switchTab('toc')">
            <span class="side-tab-label">Contenido</span>
            <span class="side-tab-badge"><?= $readTime ?>m</span>
          </button>
          <?php endif; ?>
          <?php if (!empty($faqs)): ?>
          <button class="side-tab<?= empty($toc) ? ' active' : '' ?>" id="tab-faq" onclick="switchTab('faq')">
            <span style="color:#334155;font-size:13px;font-weight:900;line-height:1;transition:color .2s" id="faq-tab-q">?</span>
            <span class="side-tab-label">FAQ</span>
            <span class="side-tab-badge"><?= count($faqs) ?></span>
          </button>
          <?php endif; ?>
        </div>

        <?php if (!empty($toc)): ?>
        <div id="panel-toc">
          <div class="toc-meta">
            <div class="toc-readtime">
              <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <?= $readTime ?> min lectura
            </div>
            <span class="toc-seccount"><?= count($toc) ?> secciones</span>
          </div>
          <div class="toc-list">
            <?php foreach ($toc as $item): ?>
            <button class="toc-item" id="toc-<?= $item['id'] ?>" onclick="scrollToSection('<?= $item['id'] ?>')">
              <span class="toc-text"><span class="toc-num"><?= $item['num'] ?>.</span> <?= $e($item['text']) ?></span>
            </button>
            <?php endforeach; ?>
          </div>
        </div>
        <?php endif; ?>

        <?php if (!empty($faqs)): ?>
        <div id="panel-faq" style="display:<?= empty($toc) ? 'flex' : 'none' ?>;flex-direction:column">
          <?php foreach ($faqs as $i => $faq): ?>
          <div class="faq-item">
            <button class="faq-q" id="faq-btn-<?= $i ?>" onclick="toggleFaq(<?= $i ?>)">
              <span class="faq-q-text"><?= $e($faq['q'] ?? '') ?></span>
              <span class="faq-icon">+</span>
            </button>
            <div class="faq-a" id="faq-a-<?= $i ?>">
              <div class="faq-a-inner"><?= $e($faq['a'] ?? '') ?></div>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
        <?php endif; ?>
      </div>
      <?php endif; ?>

      <?php if (!empty($relatedArticulos)): ?>
      <div class="side-card side-articles">
        <div class="side-articles-head">Artículos relacionados</div>
        <?php foreach ($relatedArticulos as $art): ?>
        <a class="side-articles-item" href="/blog/<?= $e($art['slug']) ?>">
          <?php if (!empty($art['image'])): ?>
          <div class="side-articles-img">
            <img src="<?= $e($art['image']) ?>" alt="<?= $e($art['alt_text'] ?: $art['title']) ?>" loading="lazy">
          </div>
          <?php endif; ?>
          <div class="side-articles-body">
            <div class="side-articles-title"><?= $e($art['seo_title'] ?: $art['title']) ?></div>
            <span class="side-articles-link">Leer artículo
              <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </a>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>

    </aside>
  </div>
</section>

<?php if (!empty($related)): ?>
<!-- SERVICIOS RELACIONADOS -->
<section class="svc-related">
  <div class="svc-related-inner">
    <div class="svc-section-eyebrow">También puede interesarle</div>
    <h2 class="svc-section-title">Otros servicios en <?= $e($lineaNombre) ?></h2>
    <div class="svc-related-grid">
      <?php foreach ($related as $r): ?>
      <a href="/<?= $linea ?>/<?= $e($r['slug']) ?>" class="svc-related-card reveal">
        <div class="svc-related-img">
          <img src="<?= $e($r['imagen_url'] ?: 'https://litesco.com.co/images/hero-poster.webp') ?>" alt="<?= $e($r['h1']) ?>" width="400" height="150" loading="lazy">
        </div>
        <div class="svc-related-body">
          <div class="svc-related-title"><?= $e($r['h1']) ?></div>
          <div class="svc-related-desc"><?= $e($r['meta_desc'] ?? '') ?></div>
          <span class="svc-related-cta">Ver servicio <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></span>
        </div>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>
<?php endif; ?>

<!-- POR QUÉ ELEGIRNOS -->
<section class="svc-benefits">
  <div class="svc-benefits-inner">
    <div class="svc-section-eyebrow">Por qué elegirnos</div>
    <h2 class="svc-section-title">La tranquilidad de un equipo especializado</h2>
    <div class="svc-benefits-layout">
      <div class="svc-benefits-quote reveal">
        <div class="svc-benefits-quote-mark">“</div>
        <p class="svc-benefits-quote-text">Sabemos que llegar hasta aquí no fue casual: algo pasó y necesita resolverlo. Le explicamos su caso en palabras simples, le decimos con honestidad qué tan viable es, y solo avanzamos cuando usted tiene claridad — no antes.</p>
        <div class="svc-benefits-quote-sign">
          <span class="svc-benefits-quote-sign-line"></span>
          <span class="svc-benefits-quote-sign-text">Equipo legal LITESCO</span>
        </div>
      </div>
      <div class="svc-benefits-list reveal">
        <div class="svc-benefits-item">
          <span class="svc-benefits-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="svc-benefits-text"><strong>Trato directo con su abogado</strong>, no con un call center ni intermediarios.</span>
        </div>
        <div class="svc-benefits-item">
          <span class="svc-benefits-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="svc-benefits-text"><strong>Evaluamos su caso con honestidad</strong>, incluso cuando eso signifique decirle que no conviene litigar.</span>
        </div>
        <div class="svc-benefits-item">
          <span class="svc-benefits-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="svc-benefits-text"><strong>Primera consulta sin costo</strong>, para que decida con información y sin presión.</span>
        </div>
        <div class="svc-benefits-item">
          <span class="svc-benefits-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>
          <span class="svc-benefits-text"><strong>Le explicamos cada paso</strong> en lenguaje claro, sin sorpresas en la factura ni en el proceso.</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- INFO DE CONTACTO -->
<div class="svc-contact-strip">
  <div class="svc-contact-strip-inner">
    <div class="svc-contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
      CRA 7 #17-01, Bogotá
    </div>
    <div class="svc-contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
      L–V 8am–6pm · Sáb cita previa
    </div>
    <div class="svc-contact-item">
      <svg width="14" height="14" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
      <a href="tel:+573132037572">+57 313 203 7572</a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-top">
    <div class="footer-logo">LITESCO</div>
    <div class="footer-sub">Litigio Estratégico Colombiano · S.A.S.</div>
    <div class="footer-links">
      <a href="/">Inicio</a>
      <a href="/litis">Litis</a>
      <a href="/corporativo">Corporativo</a>
      <a href="/recuperacion">Recuperación</a>
      <a href="/blog">Blog</a>
      <a href="/faq">FAQ</a>
      <a href="/contacto">Contacto</a>
    </div>
    <div class="footer-legal">
      © <?= date('Y') ?> LITESCO S.A.S. · CRA 7 #17-01, Bogotá, Colombia · NIT: xxxxxxxxx<br>
      La información en esta página es de carácter informativo y no constituye asesoría jurídica.
    </div>
  </div>
</footer>

<?php if (!$previewMode): ?>
<!-- WhatsApp flotante -->
<a href="https://wa.me/573132037572?text=Hola%2C+me+interesa+<?= urlencode($nombreSrv) ?>" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>
<?php endif; ?>

<!-- Scroll top -->
<button class="scroll-top" id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Volver arriba">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<script>
// ── Nav: hamburger + services dropdown
(function(){
  var hbg = document.getElementById('navHamburger');
  var lnk = document.getElementById('navLinks');
  var swrap = document.getElementById('navServicesWrap');
  var sbtn = document.getElementById('navServicesBtn');
  if(hbg && lnk){
    hbg.addEventListener('click', function(){
      var open = lnk.classList.toggle('open');
      hbg.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }
  if(sbtn && swrap){
    sbtn.addEventListener('click', function(e){
      e.stopPropagation();
      var open = swrap.classList.toggle('open');
      sbtn.setAttribute('aria-expanded', open);
    });
    document.addEventListener('click', function(e){
      if(!swrap.contains(e.target)){
        swrap.classList.remove('open');
        sbtn.setAttribute('aria-expanded','false');
      }
    });
  }
})();

// ── Meta Pixel + CAPI: track Lead en clics de WhatsApp y formulario
// (solo metadatos del servicio, nunca contenido de mensajes ni datos del caso)
document.querySelectorAll('a[href*="wa.me"], a[href="/contacto"]').forEach(function(el) {
  el.addEventListener('click', function() {
    if (!window.fbq) return;
    var eventId = 'lead_' + Date.now() + '_' + Math.random().toString(16).slice(2);
    var contentName = <?= json_encode($nombreSrv, JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) ?>;
    fbq('track', 'Lead', { content_name: contentName }, { eventID: eventId });
    fetch('https://litesco.com.co/meta-capi-endpoint.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'Lead', event_id: eventId, page_url: location.href, content_name: contentName }),
      keepalive: true
    }).catch(function () {});
  });
});

// ── Scroll top (visibilidad del botón)
(function(){
  const btn = document.getElementById('scrollTop');
  function update() {
    btn.classList.toggle('visible', window.scrollY > 300);
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Reveal on scroll
(function(){
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }
})();

// ── TOC scroll
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Pestañas de la barra lateral: Índice / FAQ
function switchTab(tab) {
  const tocPanel = document.getElementById('panel-toc');
  const faqPanel = document.getElementById('panel-faq');
  const tocTab   = document.getElementById('tab-toc');
  const faqTab   = document.getElementById('tab-faq');
  const faqQ     = document.getElementById('faq-tab-q');
  if (tocPanel) tocPanel.style.display = tab === 'toc' ? 'block' : 'none';
  if (faqPanel) faqPanel.style.display = tab === 'faq' ? 'flex' : 'none';
  if (tocTab)   tocTab.classList.toggle('active', tab === 'toc');
  if (faqTab)   faqTab.classList.toggle('active', tab === 'faq');
  if (faqQ)     faqQ.style.color = tab === 'faq' ? '#f59e0b' : '#334155';
}

// ── Resalta la sección activa del índice al hacer scroll
(function () {
  const items = document.querySelectorAll('.toc-item');
  if (!items.length || !('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      items.forEach(b => b.classList.remove('active'));
      const t = document.getElementById('toc-' + entry.target.id);
      if (t) t.classList.add('active');
    });
  }, { rootMargin: '-10% 0px -70% 0px' });
  document.querySelectorAll('.ac h2[id]').forEach(h => obs.observe(h));
})();

// ── FAQ acordeón (barra lateral)
function toggleFaq(i) {
  const btn  = document.getElementById('faq-btn-' + i);
  const ans  = document.getElementById('faq-a-' + i);
  const icon = btn.querySelector('.faq-icon');
  const open = ans.classList.toggle('open');
  btn.classList.toggle('open', open);
  icon.textContent = open ? '−' : '+';
}
</script>
</body>
</html>
<?php
if ($cacheable) {
    $html = ob_get_clean();
    echo $html;
    if (!is_dir($cacheDir)) @mkdir($cacheDir, 0755, true);
    @file_put_contents($cacheFile, $html, LOCK_EX);
}

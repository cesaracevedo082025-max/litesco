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
require_once __DIR__ . '/lib/meta-capi.php';
define('META_PIXEL_ID', env('META_PIXEL_ID', ''));

// ─── CACHÉ: páginas de servicio publicadas (30 minutos) ───────────────────────
header('Cache-Control: public, max-age=1800, stale-while-revalidate=3600');
header('Vary: Accept-Encoding');

// ─── CONFIG DB ───────────────────────────────────────────────────────────────
$db_config = [
    'host'     => 'localhost',
    'dbname'   => 'myloptic1_litesco_blog',
    'user'     => 'myloptic1_litesco_usr',
    'password' => 'j}34Ik49W@10',
    'charset'  => 'utf8mb4',
];

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
if (!$slug || !in_array($linea, $lineasValidas)) {
    header('Location: /' . ($linea ?: ''), true, 302);
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
$cacheKey     = preg_replace('/[^a-z0-9\-]/', '', "{$linea}-{$slug}");
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
<link rel="canonical" href="<?= $canonical ?>">
<meta property="og:type" content="website">
<meta property="og:title" content="<?= $e($seoTitle) ?>">
<meta property="og:description" content="<?= $e($metaDesc) ?>">
<meta property="og:url" content="<?= $canonical ?>">
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800;900&family=Open+Sans:wght@300;400;600;700&display=swap">
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
  fetch('https://www.litesco.com.co/meta-capi-endpoint.php', {
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
body{font-family:'Open Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;color:#1e293b;-webkit-font-smoothing:antialiased;overflow-x:hidden;padding-top:64px}
a{text-decoration:none}

/* ── NAVBAR ──────────────────────────────────────── */
.nav{background:#020617;position:fixed;top:0;left:0;right:0;z-index:10000;border-bottom:1px solid #1e293b;box-shadow:0 1px 20px rgba(0,0,0,.5)}
.nav-inner{max-width:1280px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:64px;gap:8px}
.nav-logo{display:flex;align-items:center;gap:10px;color:#fff;font-weight:900;font-size:18px;text-decoration:none;flex-shrink:0}
.nav-logo img{width:40px;height:40px;border-radius:50%;border:2px solid #334155;box-shadow:0 0 0 2px #1e293b}
.nav-logo-title{font-size:17px;font-weight:900;letter-spacing:-0.3px;font-family:'Montserrat',sans-serif;color:#fff;transition:color .3s}
.nav-logo:hover .nav-logo-title{color:#f59e0b}
.nav-logo-sub{font-size:9px;font-weight:700;color:#64748b;letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:5px;margin-top:2px}
.nav-logo-sub::before{content:'';width:12px;height:1px;background:#f59e0b;border-radius:2px;display:inline-block;transition:width .5s}
.nav-logo:hover .nav-logo-sub::before{width:24px}
.nav-logo:hover .nav-logo-sub{color:#fde68a}
.nav-links{display:flex;align-items:center;gap:2px}
.nav-links>a{color:#94a3b8;font-size:14px;font-weight:600;transition:color .2s,background .2s;padding:6px 14px;border-radius:9999px;font-family:'Montserrat',sans-serif;position:relative}
.nav-links>a:hover{color:#fff;background:#1e293b}
.nav-links>a.nav-active{color:#f59e0b}
.nav-links>a.nav-active::after{content:'';position:absolute;bottom:5px;left:50%;transform:translateX(-50%);width:4px;height:4px;background:#f59e0b;border-radius:50%}
.nav-cta{background:linear-gradient(135deg,#d97706,#f59e0b)!important;color:#fff!important;padding:8px 18px!important;border-radius:9999px!important;font-weight:800!important;font-size:13px!important;display:inline-flex!important;align-items:center!important;gap:7px!important;box-shadow:0 4px 16px rgba(245,158,11,.3)!important;transition:all .2s!important;margin-left:8px}
.nav-cta:hover{box-shadow:0 6px 24px rgba(245,158,11,.45)!important;transform:translateY(-1px)!important}
.nav-services-wrap{position:relative}
.nav-services-btn{display:flex;align-items:center;gap:6px;color:#94a3b8;font-size:14px;font-weight:600;font-family:'Montserrat',sans-serif;background:none;border:none;cursor:pointer;padding:6px 14px;border-radius:9999px;transition:color .2s,background .2s}
.nav-services-btn:hover,.nav-services-wrap.open .nav-services-btn{color:#fff;background:#1e293b}
.nav-services-btn.nav-active{color:#f59e0b}
.nav-services-btn svg{transition:transform .25s}
.nav-services-wrap.open .nav-services-btn svg{transform:rotate(-180deg)}
.nav-dropdown{position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%);background:#020617;border:1px solid #1e293b;border-radius:16px;padding:8px;min-width:200px;box-shadow:0 16px 48px rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s,top .2s;pointer-events:none}
.nav-services-wrap.open .nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;top:calc(100% + 8px)}
.nav-dropdown a{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;color:#94a3b8!important;font-size:13px;font-weight:600;font-family:'Montserrat',sans-serif;transition:all .15s;border:1px solid transparent}
.nav-dropdown a:hover{background:#0f172a;border-color:#1e293b;color:#fff!important}
.nav-dropdown-icon{width:30px;height:30px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#1e293b;color:#94a3b8;flex-shrink:0;transition:all .2s}
.nav-dropdown a:hover .nav-dropdown-icon{background:linear-gradient(135deg,#d97706,#f59e0b);color:#fff}
.nav-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;flex-shrink:0;z-index:10001}
.nav-hamburger span{display:block;width:22px;height:2px;background:#f59e0b;border-radius:2px;transition:all .2s}
@media(max-width:1024px){
  .nav-links{display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:#020617;flex-direction:column;align-items:center;justify-content:center;gap:20px;z-index:10000}
  .nav-links.open{display:flex}
  .nav-services-wrap{flex-direction:column;align-items:center}
  .nav-dropdown{position:static;transform:none;opacity:1!important;visibility:visible!important;pointer-events:auto!important;top:0!important;margin-top:8px;background:transparent;border:none;box-shadow:none;text-align:center;padding:4px}
  .nav-dropdown a{justify-content:center}
  .nav-hamburger{display:flex}
}

/* ── BREADCRUMB ───────────────────────────────────── */
.bc{background:#fff;border-bottom:1px solid #f1f5f9}
.bc-inner{max-width:1300px;margin:0 auto;padding:12px 24px;display:flex;gap:6px;flex-wrap:wrap;align-items:center;font-size:13px;color:#64748b}
.bc-inner a{color:#64748b;transition:color .15s}
.bc-inner a:hover{color:#f59e0b}
.bc-sep{color:#cbd5e1;font-size:10px}
.bc-cur{color:#0A1628;font-weight:600}

/* ── SECCIÓN: eyebrow + título genéricos ─────────── */
.svc-section-eyebrow{font-size:11px;font-weight:800;color:#d97706;text-transform:uppercase;letter-spacing:2px;font-family:'Montserrat',sans-serif;margin-bottom:10px}
.svc-section-eyebrow-light{color:#f59e0b}
.svc-section-title{color:#0A1628;font-size:clamp(1.35rem,3vw,1.9rem);font-weight:900;letter-spacing:-0.02em;margin:0 0 36px;font-family:'Montserrat',sans-serif}
.svc-section-title-light{color:#fff}

/* ── HERO (split, landing) ────────────────────────── */
.svc-hero{background:linear-gradient(180deg,#f8fafc 0%,#fff 100%);padding:clamp(28px,5vw,48px) 0 clamp(40px,6vw,64px)}
.svc-hero-inner{max-width:1300px;margin:0 auto;padding:0 24px;display:grid;grid-template-columns:1.1fr 0.9fr;gap:clamp(28px,5vw,56px);align-items:center}
@media(max-width:900px){.svc-hero-inner{grid-template-columns:1fr;gap:28px}}
.svc-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.28);border-radius:20px;padding:6px 14px;margin-bottom:18px;font-size:11.5px;font-weight:800;color:#b45309;text-transform:uppercase;letter-spacing:1.2px;font-family:'Montserrat',sans-serif}
.svc-badge-dot{width:6px;height:6px;border-radius:50%;background:#f59e0b;flex-shrink:0}
.svc-hero h1{color:#0A1628;font-size:clamp(1.7rem,4vw,2.85rem);font-weight:900;line-height:1.14;letter-spacing:-0.02em;margin:0 0 18px;font-family:'Montserrat',sans-serif}
.svc-hero-lead{color:#475569;font-size:clamp(1rem,2vw,1.15rem);line-height:1.75;margin:0 0 28px;max-width:56ch}
.svc-hero-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:26px}
.svc-btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:14px 24px;border-radius:12px;font-weight:800;font-size:14px;text-decoration:none;transition:all .2s;font-family:'Montserrat',sans-serif;letter-spacing:.01em}
.svc-btn-primary{background:linear-gradient(135deg,#0A1628,#0F2744);color:#fff;box-shadow:0 6px 20px rgba(10,22,40,0.25)}
.svc-btn-primary:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(10,22,40,0.32)}
.svc-btn-wa{background:#25D366;color:#fff;box-shadow:0 6px 20px rgba(37,211,102,0.3)}
.svc-btn-wa:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(37,211,102,0.38)}
.svc-hero-trust{display:flex;flex-wrap:wrap;gap:10px 22px}
.svc-trust-item{display:flex;align-items:center;gap:7px;font-size:12.5px;color:#64748b;font-weight:600}
.svc-trust-item svg{flex-shrink:0}
.svc-hero-media{position:relative}
.svc-hero-media-frame{position:relative;border-radius:24px;overflow:hidden;box-shadow:0 24px 64px rgba(10,22,40,0.18);aspect-ratio:6/5}
.svc-hero-media-frame::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(10,22,40,0.35),transparent 45%)}
.svc-hero-media-frame img{width:100%;height:100%;object-fit:cover;display:block}
.svc-hero-media-badge{position:absolute;bottom:-14px;left:20px;background:#fff;border-radius:14px;padding:10px 16px;box-shadow:0 10px 30px rgba(10,22,40,0.15);font-weight:800;font-size:13px;color:#0A1628;display:flex;align-items:center;gap:8px;font-family:'Montserrat',sans-serif}
@media(max-width:900px){.svc-hero-media-badge{left:50%;transform:translateX(-50%)}}

/* ── BENEFICIOS ("Por qué elegirnos") ─────────────── */
.svc-benefits{background:#fff;padding:clamp(48px,7vw,72px) 24px;border-top:1px solid #f1f5f9;border-bottom:1px solid #f1f5f9}
.svc-benefits-inner{max-width:1300px;margin:0 auto;text-align:center}
.svc-benefits .svc-section-eyebrow,.svc-benefits .svc-section-title{text-align:center}
.svc-benefits-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:left}
@media(max-width:1000px){.svc-benefits-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.svc-benefits-grid{grid-template-columns:1fr}}
.svc-benefit-card{background:#f8fafc;border:1px solid #f1f5f9;border-radius:18px;padding:24px 22px}
.svc-benefit-icon{width:46px;height:46px;border-radius:12px;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;margin-bottom:16px;box-shadow:0 6px 18px rgba(245,158,11,0.3)}
.svc-benefit-title{color:#0A1628;font-weight:800;font-size:15px;margin-bottom:8px;font-family:'Montserrat',sans-serif}
.svc-benefit-desc{color:#64748b;font-size:13px;line-height:1.65}

/* ── CONTENIDO ───────────────────────────────────── */
.svc-content-section{padding:clamp(48px,7vw,72px) 24px;background:#f8fafc}
.svc-content-wrap{max-width:820px;margin:0 auto}
.svc-quicknav{display:flex;gap:8px;overflow-x:auto;padding-bottom:14px;margin-bottom:28px;-webkit-overflow-scrolling:touch}
.svc-quicknav a{flex-shrink:0;background:#fff;border:1px solid #e2e8f0;border-radius:9999px;padding:8px 16px;font-size:12.5px;font-weight:700;color:#475569;white-space:nowrap;transition:all .15s}
.svc-quicknav a:hover{border-color:#f59e0b;color:#b45309;background:#fffbeb}
.svc-content-card{background:#fff;border-radius:24px;border:1px solid #f1f5f9;box-shadow:0 4px 24px rgba(10,22,40,0.05);padding:clamp(24px,4vw,48px)}
.ac{overflow-wrap:break-word;word-break:break-word;min-width:0}
.ac h2{color:#0A1628;font-size:clamp(1.1rem,2.5vw,1.4rem);font-weight:900;margin:2.5rem 0 1.1rem;line-height:1.25;padding:0 0 12px;border-bottom:2px solid #f1f5f9;letter-spacing:-0.02em;scroll-margin-top:24px;font-family:'Montserrat',sans-serif}
.ac h2:first-child{margin-top:0}
.ac h3{color:#0A1628;font-size:clamp(1rem,2vw,1.1rem);font-weight:800;margin:1.75rem 0 0.7rem;padding:10px 16px;border-radius:10px;background:rgba(10,22,40,0.03);border-left:4px solid #f59e0b;line-height:1.4;font-family:'Montserrat',sans-serif}
.ac p{color:#334155;margin-bottom:1.35rem;line-height:1.85;font-size:clamp(0.95rem,2vw,1.02rem);overflow-wrap:break-word;text-align:left}
.ac strong{color:#0A1628;font-weight:700}
.ac ul{margin-bottom:1.35rem;padding:0;list-style:none}
.ac ul li{color:#334155;margin-bottom:.7rem;padding-left:1.65rem;position:relative;line-height:1.75;font-size:clamp(.93rem,2vw,1rem)}
.ac ul li::before{content:"▸";color:#f59e0b;font-weight:900;position:absolute;left:0;top:2px}
.ac ol{margin-bottom:1.35rem;padding:0;list-style:none;counter-reset:ol}
.ac ol li{counter-increment:ol;color:#334155;margin-bottom:.7rem;padding-left:2.1rem;position:relative;line-height:1.75}
.ac ol li::before{content:counter(ol);position:absolute;left:0;width:21px;height:21px;background:linear-gradient(135deg,#0A1628,#1a3560);color:#f59e0b;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;top:2px}
.ac blockquote{border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7 60%,#fffbeb);padding:16px 18px 16px 48px;margin:1.6rem 0;border-radius:0 14px 14px 0;position:relative}
.ac blockquote::before{content:"💡";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:19px}
.ac blockquote p{color:#374151;font-style:italic;margin:0;font-weight:500}
.ac table{width:100%;border-collapse:collapse;font-size:.86rem;margin:1.6rem 0;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(10,22,40,0.08)}
.ac th{background:linear-gradient(135deg,#0A1628,#0F2744);color:#f59e0b;padding:10px 14px;text-align:left;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.8px}
.ac td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#1f2937}
.ac tr:nth-child(even) td{background:#f8fafc}
.ac hr{border:none;margin:2.25rem 0;height:1px;background:linear-gradient(to right,transparent,#f59e0b 30%,#f59e0b 70%,transparent)}
.ac img{max-width:100%;height:auto;border-radius:14px;margin:1.6rem auto;display:block;box-shadow:0 10px 36px rgba(0,0,0,0.1)}
.ac [data-callout="dorado"]{border-left:5px solid #f59e0b;background:linear-gradient(135deg,#fffbeb,#fef3c7 60%,#fffbeb);padding:16px 18px 16px 48px;margin:1.6rem 0;border-radius:0 14px 14px 0;position:relative}
.ac [data-callout="dorado"]::before{content:"💡";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:19px}
.ac [data-callout="verde"]{border-left:5px solid #10b981;background:linear-gradient(135deg,#ecfdf5,#d1fae5 60%,#ecfdf5);padding:16px 18px 16px 48px;margin:1.6rem 0;border-radius:0 14px 14px 0;position:relative}
.ac [data-callout="verde"]::before{content:"✅";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:17px}
.ac [data-callout-title]{font-weight:900;font-size:.92rem;margin-bottom:6px;display:block}
.ac [data-callout-body]{font-size:.87rem;line-height:1.65;display:block}

/* ── PROCESO ──────────────────────────────────────── */
.svc-process{background:linear-gradient(160deg,#0A1628,#0d1f3c 60%,#071020);padding:clamp(48px,7vw,72px) 24px}
.svc-process-inner{max-width:1300px;margin:0 auto;text-align:center}
.svc-process .svc-section-eyebrow,.svc-process .svc-section-title{text-align:center}
.svc-process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;text-align:left;counter-reset:step}
@media(max-width:1000px){.svc-process-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:560px){.svc-process-grid{grid-template-columns:1fr}}
.svc-step{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:24px 22px;position:relative}
.svc-step-num{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#020617;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;font-family:'Montserrat',sans-serif}
.svc-step-title{color:#fff;font-weight:800;font-size:14.5px;margin-bottom:8px;font-family:'Montserrat',sans-serif}
.svc-step-desc{color:rgba(255,255,255,0.55);font-size:12.5px;line-height:1.65}

/* ── FAQs ─────────────────────────────────────────── */
.svc-faq-section{padding:0 24px clamp(48px,7vw,72px);background:#f8fafc}
.svc-faq-inner{max-width:820px;margin:0 auto}
.faq-item{border:1px solid #e2e8f0;border-radius:14px;margin-bottom:10px;overflow:hidden;transition:border-color .2s;background:#fff}
.faq-item.open{border-color:#f59e0b}
.faq-q{width:100%;background:#fff;border:none;cursor:pointer;padding:16px 20px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;text-align:left;transition:background .15s;font-family:inherit}
.faq-q:hover{background:#fffbeb}
.faq-q-text{font-size:15px;font-weight:700;color:#0A1628;line-height:1.5;flex:1}
.faq-icon{width:26px;height:26px;border-radius:50%;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all .2s;font-size:14px;font-weight:900;color:#94a3b8}
.faq-item.open .faq-icon{background:#f59e0b;border-color:#f59e0b;color:#020617}
.faq-a{display:none;padding:0 20px 16px;background:#fff}
.faq-a.open{display:block}
.faq-a-inner{background:rgba(245,158,11,0.05);border-left:3px solid #f59e0b;border-radius:0 8px 8px 0;padding:12px 16px;font-size:14px;color:#475569;line-height:1.8}

/* ── SERVICIOS RELACIONADOS ───────────────────────── */
.svc-related{background:#fff;padding:clamp(48px,7vw,72px) 24px;border-top:1px solid #f1f5f9}
.svc-related-inner{max-width:1300px;margin:0 auto}
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

/* ── CTA FINAL ────────────────────────────────────── */
.svc-final-cta{background:linear-gradient(135deg,#0A1628,#0F2744);padding:clamp(48px,7vw,72px) 24px;text-align:center}
.svc-final-cta-inner{max-width:680px;margin:0 auto}
.svc-final-cta h2{color:#fff;font-size:clamp(1.3rem,3vw,1.8rem);font-weight:900;letter-spacing:-0.02em;margin-bottom:12px;font-family:'Montserrat',sans-serif}
.svc-final-cta p{color:rgba(255,255,255,0.55);font-size:14.5px;margin-bottom:28px}
.svc-final-cta .svc-hero-ctas{justify-content:center;margin-bottom:0}

/* ── INFO DE CONTACTO ─────────────────────────────── */
.svc-contact-strip{background:#fff;border-top:1px solid #f1f5f9;padding:22px 24px}
.svc-contact-strip-inner{max-width:1300px;margin:0 auto;display:flex;flex-wrap:wrap;justify-content:center;gap:16px 32px}
.svc-contact-item{display:flex;align-items:center;gap:8px;font-size:13px;color:#475569;font-weight:600}
.svc-contact-item svg{flex-shrink:0;fill:#f59e0b}
.svc-contact-item a{color:#0A1628;font-weight:700}

/* ── FOOTER ──────────────────────────────────────── */
.footer{background:#020617;padding:40px 24px;text-align:center;border-top:1px solid #0f172a}
.footer-top{max-width:1000px;margin:0 auto}
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
          <a href="/corporativo"><span class="nav-dropdown-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6-2v2h-4V5h4z"/></svg></span>Corporativo</a>
          <a href="/litis"><span class="nav-dropdown-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></span>Litis</a>
          <a href="/recuperacion"><span class="nav-dropdown-icon"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg></span>Recuperación</a>
        </div>
      </div>
      <a href="/blog" class="<?= strpos($_np,'/blog')===0 ? 'nav-active' : '' ?>">Blog</a>
      <a href="/faq" class="<?= $_np==='/faq' ? 'nav-active' : '' ?>">FAQ</a>
      <a href="/contacto" class="nav-cta">Contáctanos <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
  </div>
</nav>

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
  <div class="svc-hero-inner">
    <div class="svc-hero-copy">
      <div class="svc-badge">
        <span class="svc-badge-dot"></span>
        <?= $e($lineaNombre) ?> · <?= $e($areaCob) ?>
      </div>
      <h1><?= $e($h1) ?></h1>
      <?php if ($resumen): ?>
      <p class="svc-hero-lead"><?= $e($resumen) ?></p>
      <?php endif; ?>
      <div class="svc-hero-ctas">
        <?php if (in_array($ctaTipo, ['whatsapp','ambos'])): ?>
        <a href="https://wa.me/573132037572?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20<?= urlencode($nombreSrv) ?>" class="svc-btn svc-btn-wa" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Escribir por WhatsApp
        </a>
        <?php endif; ?>
        <?php if (in_array($ctaTipo, ['formulario','ambos'])): ?>
        <a href="/contacto" class="svc-btn svc-btn-primary">
          Solicitar consulta gratuita
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <?php endif; ?>
      </div>
      <div class="svc-hero-trust">
        <div class="svc-trust-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>
          Primera consulta gratuita
        </div>
        <div class="svc-trust-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Respuesta en menos de 24h
        </div>
        <div class="svc-trust-item">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A1628" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +57 313 203 7572
        </div>
      </div>
    </div>
    <div class="svc-hero-media">
      <div class="svc-hero-media-frame">
        <img src="<?= $e($imagenUrl) ?>" alt="<?= $e($imagenAlt) ?>" width="600" height="500" loading="eager">
      </div>
      <div class="svc-hero-media-badge">⚖️ <?= $e($lineaNombre) ?></div>
    </div>
  </div>
</section>

<!-- POR QUÉ ELEGIRNOS -->
<section class="svc-benefits">
  <div class="svc-benefits-inner">
    <div class="svc-section-eyebrow">Por qué elegirnos</div>
    <h2 class="svc-section-title">La tranquilidad de un equipo especializado</h2>
    <div class="svc-benefits-grid">
      <div class="svc-benefit-card">
        <div class="svc-benefit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2.2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg></div>
        <div class="svc-benefit-title">Experiencia comprobada</div>
        <div class="svc-benefit-desc">Más de 10 años representando empresas y personas naturales en Colombia.</div>
      </div>
      <div class="svc-benefit-card">
        <div class="svc-benefit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
        <div class="svc-benefit-title">Respuesta ágil</div>
        <div class="svc-benefit-desc">Le contactamos en menos de 24 horas para entender su caso.</div>
      </div>
      <div class="svc-benefit-card">
        <div class="svc-benefit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2.2"><path d="M20 6L9 17l-5-5"/></svg></div>
        <div class="svc-benefit-title">Consulta inicial gratuita</div>
        <div class="svc-benefit-desc">Evaluamos su situación sin costo antes de iniciar cualquier proceso.</div>
      </div>
      <div class="svc-benefit-card">
        <div class="svc-benefit-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2.2"><path d="M12 22c-4.97 0-9-2.69-9-6v-1.5C3 11.46 7.03 9 12 9s9 2.46 9 5.5V16c0 3.31-4.03 6-9 6z"/><path d="M12 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg></div>
        <div class="svc-benefit-title">Acompañamiento transparente</div>
        <div class="svc-benefit-desc">Le mantenemos informado en cada etapa, sin sorpresas.</div>
      </div>
    </div>
  </div>
</section>

<!-- CONTENIDO -->
<section class="svc-content-section">
  <div class="svc-content-wrap">

    <?php if (!empty($toc)): ?>
    <nav class="svc-quicknav">
      <?php foreach ($toc as $item): ?>
      <a href="#<?= $item['id'] ?>" onclick="event.preventDefault();scrollToSection('<?= $item['id'] ?>')"><?= $e($item['text']) ?></a>
      <?php endforeach; ?>
    </nav>
    <?php endif; ?>

    <div class="svc-content-card">
      <article class="ac"><?= $content ?></article>
    </div>
  </div>
</section>

<!-- NUESTRO PROCESO -->
<section class="svc-process">
  <div class="svc-process-inner">
    <div class="svc-section-eyebrow svc-section-eyebrow-light">Cómo trabajamos</div>
    <h2 class="svc-section-title svc-section-title-light">Nuestro proceso en 4 pasos</h2>
    <div class="svc-process-grid">
      <div class="svc-step">
        <div class="svc-step-num">1</div>
        <div class="svc-step-title">Consulta inicial</div>
        <div class="svc-step-desc">Cuéntenos su caso por WhatsApp o el formulario de contacto, sin costo ni compromiso.</div>
      </div>
      <div class="svc-step">
        <div class="svc-step-num">2</div>
        <div class="svc-step-title">Análisis del caso</div>
        <div class="svc-step-desc">Evaluamos la viabilidad legal y definimos la mejor estrategia para su situación.</div>
      </div>
      <div class="svc-step">
        <div class="svc-step-num">3</div>
        <div class="svc-step-title">Estrategia legal</div>
        <div class="svc-step-desc">Actuamos: representación, negociación o litigio según lo que su caso requiera.</div>
      </div>
      <div class="svc-step">
        <div class="svc-step-num">4</div>
        <div class="svc-step-title">Resultado y seguimiento</div>
        <div class="svc-step-desc">Le mantenemos informado en cada etapa hasta resolver su caso.</div>
      </div>
    </div>
  </div>
</section>

<?php if (!empty($faqs)): ?>
<!-- FAQ -->
<section class="svc-faq-section">
  <div class="svc-faq-inner">
    <div class="svc-section-eyebrow">Preguntas frecuentes</div>
    <h2 class="svc-section-title">Dudas comunes sobre <?= $e($nombreSrv) ?></h2>
    <?php foreach ($faqs as $i => $faq): ?>
    <div class="faq-item" id="faq-<?= $i ?>">
      <button class="faq-q" onclick="toggleFaq(<?= $i ?>)">
        <span class="faq-q-text"><?= $e($faq['q'] ?? '') ?></span>
        <span class="faq-icon" id="faqicon-<?= $i ?>">+</span>
      </button>
      <div class="faq-a" id="faqa-<?= $i ?>">
        <div class="faq-a-inner"><?= $e($faq['a'] ?? '') ?></div>
      </div>
    </div>
    <?php endforeach; ?>
  </div>
</section>
<?php endif; ?>

<?php if (!empty($related)): ?>
<!-- SERVICIOS RELACIONADOS -->
<section class="svc-related">
  <div class="svc-related-inner">
    <div class="svc-section-eyebrow">También puede interesarle</div>
    <h2 class="svc-section-title">Otros servicios en <?= $e($lineaNombre) ?></h2>
    <div class="svc-related-grid">
      <?php foreach ($related as $r): ?>
      <a href="/<?= $linea ?>/<?= $e($r['slug']) ?>" class="svc-related-card">
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

<!-- CTA FINAL -->
<section class="svc-final-cta">
  <div class="svc-final-cta-inner">
    <h2>¿Necesita asesoría en <?= $e($nombreSrv) ?>?</h2>
    <p>Cuéntenos su caso, sin costo ni compromiso.</p>
    <div class="svc-hero-ctas">
      <?php if (in_array($ctaTipo, ['whatsapp','ambos'])): ?>
      <a href="https://wa.me/573132037572?text=Hola%2C+me+interesa+<?= urlencode($nombreSrv) ?>" class="svc-btn svc-btn-wa" target="_blank" rel="noopener">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        WhatsApp
      </a>
      <?php endif; ?>
      <a href="/contacto" class="svc-btn svc-btn-primary" style="background:linear-gradient(135deg,#f59e0b,#d97706)">
        Formulario de contacto
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </a>
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

<!-- WhatsApp flotante -->
<a href="https://wa.me/573132037572?text=Hola%2C+me+interesa+<?= urlencode($nombreSrv) ?>" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

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
    var contentName = '<?= addslashes($nombreSrv) ?>';
    fbq('track', 'Lead', { content_name: contentName }, { eventID: eventId });
    fetch('https://www.litesco.com.co/meta-capi-endpoint.php', {
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

// ── TOC scroll
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── FAQ acordeón
function toggleFaq(i) {
  const item = document.getElementById('faq-' + i);
  const body = document.getElementById('faqa-' + i);
  const icon = document.getElementById('faqicon-' + i);
  const open = item.classList.toggle('open');
  body.classList.toggle('open', open);
  icon.textContent = open ? '−' : '+';
  if (open) {
    // Cerrar otros
    document.querySelectorAll('.faq-item.open').forEach(el => {
      if (el.id !== 'faq-' + i) {
        const idx = el.id.replace('faq-','');
        el.classList.remove('open');
        document.getElementById('faqa-'+idx)?.classList.remove('open');
        const ic = document.getElementById('faqicon-'+idx);
        if (ic) ic.textContent = '+';
      }
    });
  }
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

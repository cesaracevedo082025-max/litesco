<?php
/**
 * LITESCO - Página de artículo dinámica
 * Con tabla de contenidos, fecha en español y botones de navegación
 */
// ===== META PIXEL ID =====
require_once __DIR__ . '/lib/meta-capi.php';
define('META_PIXEL_ID', env('META_PIXEL_ID', ''));

// ===== CACHÉ: artículos publicados (30 minutos) =====
header('Cache-Control: public, max-age=1800, stale-while-revalidate=3600');
header('Vary: Accept-Encoding');

// ===== CONFIG =====
$db_config = [
    'host'     => 'localhost',
    'dbname'   => 'myloptic1_litesco_blog',
    'user'     => 'myloptic1_litesco_usr',
    'password' => 'j}34Ik49W@10',
    'charset'  => 'utf8mb4',
];
// ===== EXTRAER SLUG =====
$slug = '';
if (!empty($_GET['slug'])) $slug = $_GET['slug'];
if (empty($slug) && !empty($_SERVER['PATH_INFO'])) $slug = trim($_SERVER['PATH_INFO'], '/');
if (empty($slug)) {
    $requestUri = $_SERVER['REQUEST_URI'] ?? '';
    $path = parse_url($requestUri, PHP_URL_PATH);
    if (preg_match('#/blog/([^/]+)#', $path, $m)) $slug = $m[1];
}
if (empty($slug)) { header('Location: /blog/', true, 302); exit(); }

// ===== BUSCAR ARTÍCULO =====
$article = null;
try {
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO($dsn, $db_config['user'], $db_config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $stmt = $pdo->prepare("SELECT * FROM articles WHERE slug = ? ORDER BY id DESC LIMIT 1");
    $stmt->execute([$slug]);
    $article = $stmt->fetch();
} catch (PDOException $e) {}

if (!$article) {
    http_response_code(404);
    if (file_exists(__DIR__ . '/404.html')) { readfile(__DIR__ . '/404.html'); }
    else { echo '<h1>Artículo no encontrado</h1><a href="/blog/">Volver</a>'; }
    exit();
}

// ===== ARTÍCULOS RELACIONADOS =====
$related = [];
try {
    $stmt = $pdo->prepare("SELECT id, title, slug, excerpt, image, category, author, date FROM articles WHERE category = ? AND slug != ? AND published = 1 ORDER BY date DESC LIMIT 3");
    $stmt->execute([$article['category'], $slug]);
    $related = $stmt->fetchAll();
} catch (Exception $e) {}

// ===== CATEGORÍAS =====
$categories = [
    'actualidad' => 'Actualidad Legal', 'civil' => 'Derecho Civil', 'laboral' => 'Derecho Laboral',
    'comercial' => 'Derecho Comercial', 'administrativo' => 'Derecho Administrativo',
    'familia' => 'Derecho de Familia', 'penal' => 'Derecho Penal', 'constitucional' => 'Derecho Constitucional'
];
$catName = $categories[$article['category'] ?? ''] ?? 'Artículo';

// ===== DATOS SEO =====
$e = function($s) { return htmlspecialchars($s ?? '', ENT_QUOTES, 'UTF-8'); };
$title       = $e($article['seo_title'] ?: $article['title']);
// Evita "... | LITESCO | LITESCO" si el seo_title ya incluye la marca
$titleSuffix = (stripos($title, 'LITESCO') === false) ? ' | LITESCO' : '';
$description = $e($article['meta_desc'] ?: $article['excerpt']);
$keyword     = $e($article['keyword'] ?? '');
$image       = $e($article['image'] ?? '');
$author      = $e($article['author'] ?? 'Equipo LITESCO');
$date        = $article['date'] ?? '';
$canonical   = "https://litesco.com.co/blog/{$slug}";

// Fecha ISO 8601 con zona horaria (requerida por Google para datePublished/dateModified)
function toIso8601Bogota($dateStr) {
    if (empty($dateStr)) return '';
    try {
        $dt = new DateTime($dateStr, new DateTimeZone('America/Bogota'));
        return $dt->format('c');
    } catch (Exception $e) {
        return '';
    }
}

// ===== FECHA EN ESPAÑOL =====
$meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
$dateFormatted = '';
if ($date) {
    $ts = strtotime($date);
    $dia = date('j', $ts);
    $mes = $meses[(int)date('n', $ts) - 1];
    $anio = date('Y', $ts);
    $dateFormatted = "$dia de $mes de $anio";
}

// ===== TIEMPO DE LECTURA =====
$wordCount = str_word_count(strip_tags($article['content'] ?? ''));
$readTime = max(1, ceil($wordCount / 250));

// ===== TABLA DE CONTENIDOS =====
$toc = [];
$content = $article['content'] ?? '';
preg_match_all('/<h2[^>]*>(.*?)<\/h2>/is', $content, $matches);
foreach ($matches[1] as $i => $heading) {
    $text = strip_tags($heading);
    $id   = 'sec-' . ($i + 1);
    $toc[] = ['id' => $id, 'text' => $text, 'num' => $i + 1];
}
// Inyectar IDs en los h2 del contenido
$counter = 0;
$content = preg_replace_callback('/<h2([^>]*)>/i', function($m) use (&$counter, $toc) {
    $id = $toc[$counter]['id'] ?? ('sec-' . ($counter + 1));
    $counter++;
    return "<h2{$m[1]} id=\"{$id}\">";
}, $content);

// ===== FAQs: detecta data-faq-q/a, details/summary, dt/dd y h3+p en bloques FAQ =====
$faqs = [];
$seen = [];
$addFaq = function($q, $a) use (&$faqs, &$seen) {
    $q = trim(strip_tags($q));
    $a = trim(strip_tags($a));
    if ($q && $a && !isset($seen[$q])) {
        $faqs[] = ['q' => $q, 'a' => $a];
        $seen[$q] = true;
    }
};

// Patrón 1: data-faq-q / data-faq-a (patrón original del CMS)
preg_match_all('/<div[^>]*data-faq-q[^>]*>(.*?)<\/div>\s*<div[^>]*data-faq-a[^>]*>(.*?)<\/div>/is', $content, $m);
foreach ($m[1] as $i => $q) { $addFaq($q, $m[2][$i] ?? ''); }

// Patrón 2: <details><summary>pregunta</summary>respuesta</details>
preg_match_all('/<details[^>]*>\s*<summary[^>]*>(.*?)<\/summary>(.*?)<\/details>/is', $content, $m);
foreach ($m[1] as $i => $q) { $addFaq($q, $m[2][$i] ?? ''); }

// Patrón 3: <dt>pregunta</dt><dd>respuesta</dd>
preg_match_all('/<dt[^>]*>(.*?)<\/dt>\s*<dd[^>]*>(.*?)<\/dd>/is', $content, $m);
foreach ($m[1] as $i => $q) { $addFaq($q, $m[2][$i] ?? ''); }

// Patrón 4: H3 seguido de P dentro de un bloque con clase faq o preguntas
preg_match_all('/<(?:div|section)[^>]*(?:faq|preguntas|frecuentes)[^>]*>(.*?)<\/(?:div|section)>/is', $content, $blocks);
foreach ($blocks[1] as $block) {
    preg_match_all('/<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/is', $block, $m);
    foreach ($m[1] as $i => $q) { $addFaq($q, $m[2][$i] ?? ''); }
}

header('Content-Type: text/html; charset=UTF-8');
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= $title ?><?= $titleSuffix ?></title>
<meta name="description" content="<?= $description ?>">
<?php if ($keyword): ?><meta name="keywords" content="<?= $keyword ?>"><?php endif; ?>
<meta name="author" content="<?= $author ?>">
<link rel="canonical" href="<?= $canonical ?>">
<meta property="og:type" content="article">
<meta property="og:title" content="<?= $title ?>">
<meta property="og:description" content="<?= $description ?>">
<meta property="og:url" content="<?= $canonical ?>">
<meta property="og:image" content="<?= $image ?>">
<meta property="og:site_name" content="LITESCO">
<meta property="og:locale" content="es_CO">
<?php if ($date): ?><meta property="article:published_time" content="<?= $date ?>"><?php endif; ?>
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<?= $title ?>">
<meta name="twitter:description" content="<?= $description ?>">
<meta name="twitter:image" content="<?= $image ?>">
<link rel="icon" href="/favicon.webp" type="image/webp">
<script type="application/ld+json"><?= json_encode([
    '@context'=>'https://schema.org','@type'=>'BlogPosting',
    'headline'=>$article['seo_title']?:$article['title'],
    'description'=>$article['meta_desc']?:$article['excerpt'],
    'image'=>[
        '@type'=>'ImageObject',
        'url'=>$article['image']??'',
        'contentUrl'=>$article['image']??'',
        'width'=>1200,
        'height'=>630,
    ],
    'author'=>(function() use ($article) {
        $authorName = trim($article['author'] ?? '');
        if ($authorName !== '' && $authorName !== 'Equipo LITESCO') {
            return [
                '@type'=>'Person',
                'name'=>$authorName,
                'worksFor'=>['@type'=>'Organization','name'=>'LITESCO','url'=>'https://litesco.com.co'],
            ];
        }
        return [
            '@type'=>'Organization',
            'name'=>$authorName !== '' ? $authorName : 'Equipo LITESCO',
            'url'=>'https://litesco.com.co',
        ];
    })(),
    'publisher'=>[
        '@type'=>'Organization',
        'name'=>'LITESCO',
        'url'=>'https://litesco.com.co',
        'logo'=>['@type'=>'ImageObject','url'=>'https://litesco.com.co/favicon.webp','width'=>512,'height'=>512],
    ],
    'datePublished'=>toIso8601Bogota($date),
    'dateModified'=>toIso8601Bogota($article['updated_at'] ?? $date),
    'inLanguage'=>'es-CO',
    'wordCount'=>$wordCount,
    'articleSection'=>$catName,
    'mainEntityOfPage'=>['@type'=>'WebPage','@id'=>$canonical],
    'isPartOf'=>['@type'=>'WebSite','name'=>'LITESCO','url'=>'https://litesco.com.co'],
], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) ?></script>
<?php if (!empty($faqs)): ?>
<script type="application/ld+json"><?= json_encode([
    '@context'=>'https://schema.org','@type'=>'FAQPage',
    'mainEntity'=>array_map(fn($f)=>['@type'=>'Question','name'=>$f['q'],'acceptedAnswer'=>['@type'=>'Answer','text'=>$f['a']]],$faqs),
], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) ?></script>
<?php endif; ?>
<script type="application/ld+json"><?= json_encode([
    '@context'=>'https://schema.org','@type'=>'BreadcrumbList',
    'itemListElement'=>[
        ['@type'=>'ListItem','position'=>1,'name'=>'Inicio','item'=>'https://litesco.com.co'],
        ['@type'=>'ListItem','position'=>2,'name'=>'Blog','item'=>'https://litesco.com.co/blog'],
        ['@type'=>'ListItem','position'=>3,'name'=>$article['seo_title']?:$article['title'],'item'=>$canonical],
    ],
], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) ?></script>
<script type="application/ld+json"><?= json_encode([
    '@context'=>'https://schema.org',
    '@type'=>['LegalService','Organization'],
    'name'=>'LITESCO',
    'legalName'=>'LITESCO S.A.S.',
    'alternateName'=>'Litigio Estratégico Colombiano',
    'url'=>'https://litesco.com.co',
    'logo'=>['@type'=>'ImageObject','url'=>'https://litesco.com.co/images/hero-poster.webp','width'=>1280,'height'=>720],
    'image'=>'https://litesco.com.co/images/hero-poster.webp',
    'description'=>'Servicios jurídicos para empresas de todos los sectores en Colombia. Litigio estratégico, derecho corporativo y recuperación de cartera en Bogotá.',
    'address'=>[
        '@type'=>'PostalAddress',
        'streetAddress'=>'CRA 7 #17-01, Edificio Colseguros',
        'addressLocality'=>'Bogotá',
        'addressRegion'=>'Bogotá D.C.',
        'postalCode'=>'110321',
        'addressCountry'=>'CO',
    ],
    'geo'=>['@type'=>'GeoCoordinates','latitude'=>'4.5978','longitude'=>'-74.0762'],
    'telephone'=>'+573132037572',
    'email'=>'gerencia@litesco.com.co',
    'priceRange'=>'$$',
    'areaServed'=>[
        ['@type'=>'City','name'=>'Bogotá'],
        ['@type'=>'Country','name'=>'Colombia'],
    ],
    'knowsAbout'=>[
        'Litigios civiles y comerciales','Procesos ejecutivos','Derecho societario',
        'Constitución de empresas','Contratos mercantiles','Recuperación de cartera',
        'Cobranza BPO','Derecho laboral empresarial','Insolvencia y reestructuración',
        'Asesoría legal corporativa',
    ],
    'hasOfferCatalog'=>[
        '@type'=>'OfferCatalog','name'=>'Servicios Jurídicos LITESCO',
        'itemListElement'=>[
            ['@type'=>'Offer','itemOffered'=>['@type'=>'LegalService','name'=>'Litis – Litigio Estratégico','description'=>'Representación legal en procesos civiles, comerciales y administrativos','url'=>'https://litesco.com.co/litis','telephone'=>'+573132037572','priceRange'=>'$$','image'=>'https://litesco.com.co/images/hero-poster.webp','address'=>['@type'=>'PostalAddress','streetAddress'=>'CRA 7 #17-01','addressLocality'=>'Bogotá','addressRegion'=>'Bogotá D.C.','postalCode'=>'110321','addressCountry'=>'CO']]],
            ['@type'=>'Offer','itemOffered'=>['@type'=>'LegalService','name'=>'Corporativo – Asesoría Empresarial','description'=>'Constitución de empresas, contratos y cumplimiento normativo','url'=>'https://litesco.com.co/corporativo','telephone'=>'+573132037572','priceRange'=>'$$','image'=>'https://litesco.com.co/images/hero-poster.webp','address'=>['@type'=>'PostalAddress','streetAddress'=>'CRA 7 #17-01','addressLocality'=>'Bogotá','addressRegion'=>'Bogotá D.C.','postalCode'=>'110321','addressCountry'=>'CO']]],
            ['@type'=>'Offer','itemOffered'=>['@type'=>'LegalService','name'=>'Recuperación de Cartera BPO','description'=>'Gestión integral de cobranza prejudicial y judicial','url'=>'https://litesco.com.co/recuperacion','telephone'=>'+573132037572','priceRange'=>'$$','image'=>'https://litesco.com.co/images/hero-poster.webp','address'=>['@type'=>'PostalAddress','streetAddress'=>'CRA 7 #17-01','addressLocality'=>'Bogotá','addressRegion'=>'Bogotá D.C.','postalCode'=>'110321','addressCountry'=>'CO']]],
        ],
    ],
    'openingHoursSpecification'=>[
        ['@type'=>'OpeningHoursSpecification','dayOfWeek'=>['Monday','Tuesday','Wednesday','Thursday','Friday'],'opens'=>'08:00','closes'=>'18:00'],
        ['@type'=>'OpeningHoursSpecification','dayOfWeek'=>'Saturday','opens'=>'09:00','closes'=>'13:00'],
    ],
    'hasMap'=>['https://share.google/yZDG6hqb23yWhZMrh','https://share.google/3vWRBs0lEnxSZUihT'],
    'contactPoint'=>['@type'=>'ContactPoint','telephone'=>'+573132037572','contactType'=>'customer service','availableLanguage'=>'Spanish'],
    'sameAs'=>[
        'https://www.linkedin.com/company/litesco/',
        'https://instagram.com/litesco.co',
        'https://www.facebook.com/share/1a1fApiY65/',
        'https://www.tiktok.com/@litesco.co',
        'https://linktr.ee/LITESCO',
        'https://share.google/yZDG6hqb23yWhZMrh',
        'https://share.google/3vWRBs0lEnxSZUihT',
    ],
], JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES) ?></script>
<?php
// Bloque estático: consentimiento y event_id se resuelven en el navegador (no en PHP)
// para que el mismo HTML sirva correctamente sin importar cachés intermedias futuras.
if (META_PIXEL_ID !== ''):
    $pid = htmlspecialchars(META_PIXEL_ID, ENT_QUOTES, 'UTF-8');
?>
<script>
(function(){
  if (document.cookie.indexOf('litesco_cookie_consent=1') === -1) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '<?= $pid ?>');
  fbq('track', 'PageView');
  var eventId = 'vc_' + Date.now() + '_' + Math.random().toString(16).slice(2);
  var contentName = '<?= addslashes($title) ?>', contentCategory = '<?= addslashes($catName) ?>';
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
/* ── RESET Y BASE ─────────────────────────────── */
*{margin:0;padding:0;box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8fafc;color:#1e293b;-webkit-font-smoothing:antialiased;overflow-x:hidden;max-width:100vw;padding-top:64px}
a{text-decoration:none}

/* ── NAV ──────────────────────────────────────── */
.nav{background:#020617;position:fixed;top:0;left:0;right:0;z-index:10000;border-bottom:1px solid #1e293b;box-shadow:0 1px 20px rgba(0,0,0,.5)}
.nav-inner{max-width:1280px;margin:0 auto;padding:0 20px;display:flex;align-items:center;justify-content:space-between;height:64px;gap:8px}
.nav-logo{display:flex;align-items:center;gap:10px;color:#fff;font-weight:900;font-size:18px;text-decoration:none;flex-shrink:0}
.nav-logo img{width:40px;height:40px;border-radius:50%;border:2px solid #334155;box-shadow:0 0 0 2px #1e293b}
.nav-logo-text{display:flex;flex-direction:column;line-height:1.2}
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
.nav-services-btn{display:flex;align-items:center;gap:6px;color:#94a3b8;font-size:14px;font-weight:600;background:none;border:none;cursor:pointer;padding:6px 14px;border-radius:9999px;transition:color .2s,background .2s}
.nav-services-btn:hover,.nav-services-wrap.open .nav-services-btn{color:#fff;background:#1e293b}
.nav-services-btn.nav-active{color:#f59e0b}
.nav-services-btn svg{transition:transform .25s}
.nav-services-wrap.open .nav-services-btn svg{transform:rotate(-180deg)}
.nav-dropdown{position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%);background:#020617;border:1px solid #1e293b;border-radius:16px;padding:8px;min-width:200px;box-shadow:0 16px 48px rgba(0,0,0,.6);opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s,top .2s;pointer-events:none}
.nav-services-wrap.open .nav-dropdown{opacity:1;visibility:visible;pointer-events:auto;top:calc(100% + 8px)}
.nav-dropdown a{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;color:#94a3b8!important;font-size:13px;font-weight:600;transition:all .15s;border:1px solid transparent}
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

/* ── HERO ─────────────────────────────────────── */
.art-hero{position:relative;width:100%;min-height:clamp(420px,52vw,580px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;padding-top:clamp(64px,8vw,80px);background:#0A1628}
.art-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
.art-hero-overlay-top{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(10,22,40,0.55) 0%,rgba(10,22,40,0.15) 40%,transparent 70%)}
.art-hero-overlay-bot{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,22,40,1) 0%,rgba(10,22,40,0.88) 30%,rgba(10,22,40,0.45) 60%,transparent 100%)}
.art-hero-content{position:relative;z-index:2;padding:clamp(28px,5vw,64px) clamp(20px,6vw,80px);max-width:900px}
.art-hero-back{position:absolute;top:clamp(70px,8.5vw,86px);left:clamp(20px,6vw,80px);z-index:4;display:inline-flex;align-items:center;gap:0;background:none;border:none;cursor:pointer;padding:0;color:rgba(255,255,255,0.75);font-size:13px;font-weight:700;letter-spacing:0.01em;transition:color 0.2s;text-decoration:none}
.art-hero-back:hover{color:#fff}
.art-hero-back-icon{width:32px;height:32px;border-radius:50%;background:rgba(245,158,11,0.15);border:1.5px solid rgba(245,158,11,0.4);display:flex;align-items:center;justify-content:center;margin-right:10px;transition:all 0.2s;flex-shrink:0}
.art-hero-back:hover .art-hero-back-icon{background:rgba(245,158,11,0.28);border-color:#f59e0b;transform:translateX(-2px)}
.art-hero-cat{display:flex;align-items:center;gap:10px;margin-bottom:16px}
.art-hero-meta{display:flex;flex-wrap:wrap;align-items:center;gap:8px 18px;margin-top:20px}
.art-hero-meta-item{display:flex;align-items:center;gap:6px;color:rgba(255,255,255,0.55);font-size:12.5px}
.art-hero-meta-item strong{color:rgba(255,255,255,0.8);font-weight:600}
@media(max-width:600px){.art-hero{min-height:clamp(380px,90vw,480px)}.art-hero-content{padding:22px 18px 28px}}

/* ── BREADCRUMB ───────────────────────────────── */
.breadcrumb{max-width:1300px;margin:0 auto;padding:16px 20px 0;font-size:13px;color:#64748b;display:flex;gap:6px;flex-wrap:wrap;align-items:center;min-width:0}
.breadcrumb a{color:#64748b;transition:color 0.15s;flex-shrink:0}
.breadcrumb a:hover{color:#f59e0b}
.breadcrumb .sep{color:#cbd5e1;font-size:9px;flex-shrink:0}
.breadcrumb .bc-title{color:#0A1628;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1 1 0}

/* ── LAYOUT PRINCIPAL ─────────────────────────── */
.content-wrap{max-width:1320px;margin:0 auto;padding:48px 24px 32px;display:grid;grid-template-columns:1fr 360px;gap:40px;align-items:start}
@media(max-width:1100px){.content-wrap{grid-template-columns:1fr 320px;gap:28px}}
@media(max-width:1023px){
  .content-wrap{grid-template-columns:1fr;padding:28px 20px 0;gap:0}
  .sidebar{order:-1;margin-bottom:28px;position:static!important;top:auto}
}
@media(max-width:640px){.content-wrap{padding:20px 14px 0}}

/* ── CONTENIDO DEL ARTÍCULO ───────────────────── */
.ac{max-width:min(720px,100%);overflow-wrap:break-word;word-break:break-word;counter-reset:sec;min-width:0;hyphens:none;-webkit-hyphens:none;-moz-hyphens:none}

/* Headings */
.ac h2{
  counter-increment:sec;color:#0A1628;font-size:clamp(1.15rem,2.5vw,1.45rem);font-weight:900;
  margin:3rem 0 1.2rem;line-height:1.2;display:flex;align-items:center;gap:12px;
  padding:0 0 14px;border-bottom:2px solid #f1f5f9;letter-spacing:-0.3px;
  scroll-margin-top:80px;overflow-wrap:break-word;word-break:break-word
}
.ac h2::before{
  content:counter(sec);display:inline-flex;align-items:center;justify-content:center;
  min-width:32px;height:32px;border-radius:10px;
  background:linear-gradient(135deg,#0A1628,#0F2744);
  color:#f59e0b;font-size:0.8rem;font-weight:900;flex-shrink:0;
  box-shadow:0 3px 10px rgba(10,22,40,0.3)
}
.ac h2:first-of-type{margin-top:0}
.ac h3{
  color:#0A1628;font-size:clamp(1rem,2vw,1.12rem);font-weight:800;margin:2rem 0 0.8rem;
  padding:10px 16px;border-radius:10px;background:rgba(10,22,40,0.03);
  border-left:4px solid #f59e0b;line-height:1.4;
  overflow-wrap:break-word;word-break:break-word
}
.ac h4{color:#1e3a5f;font-size:1rem;font-weight:800;margin:1.5rem 0 0.6rem;padding-left:12px;border-left:3px solid #e2e8f0}

/* Párrafos — el fix principal del desborde */
.ac p{
  color:#1a2332;margin-bottom:1.5rem;line-height:1.95;
  font-size:clamp(0.95rem,2vw,1.02rem);
  letter-spacing:0.01em;
  overflow-wrap:break-word;
  word-break:break-word;
  word-wrap:break-word;
  text-align:left;
  hyphens:none;
  -webkit-hyphens:none;
  -moz-hyphens:none
}
@media(min-width:641px){
  .ac p{
    text-align:justify;
    hyphens:none;
    -webkit-hyphens:none;
    -moz-hyphens:none
  }
}
/* Forzar hyphens:none en TODO el contenido, incluye estilos inline */
.ac *{hyphens:none!important;-webkit-hyphens:none!important;-moz-hyphens:none!important}
.ac h2+p,.ac h3+p{color:#111827}
.ac strong{color:#92400e;font-weight:700}
.ac em{color:#374151;font-style:italic}

/* Links */
.ac a{color:#b45309;text-decoration:underline;font-weight:600;text-underline-offset:3px;overflow-wrap:break-word;word-break:break-all}
.ac a:hover{color:#0A1628}

/* Listas */
.ac ul{margin-bottom:1.5rem;padding:0;list-style:none}
.ac ul li{
  color:#1a2332;margin-bottom:0.75rem;padding-left:1.75rem;
  position:relative;line-height:1.85;
  font-size:clamp(0.93rem,2vw,1rem);
  overflow-wrap:break-word;word-break:break-word;
  text-align:left
}
.ac ul li::before{content:"▸";color:#f59e0b;font-weight:900;position:absolute;left:0;top:2px}
.ac ol{margin-bottom:1.5rem;padding-left:0;list-style:none;counter-reset:ol}
.ac ol li{
  counter-increment:ol;color:#1a2332;margin-bottom:0.75rem;padding-left:2.2rem;
  position:relative;line-height:1.85;font-size:clamp(0.93rem,2vw,1rem);
  overflow-wrap:break-word;word-break:break-word;text-align:left
}
.ac ol li::before{
  content:counter(ol);position:absolute;left:0;width:22px;height:22px;
  background:linear-gradient(135deg,#0A1628,#1a3560);color:#f59e0b;border-radius:50%;
  display:inline-flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;top:3px
}

/* Blockquote */
.ac blockquote{
  border-left:5px solid #f59e0b;
  background:linear-gradient(135deg,#fffbeb,#fef3c7 60%,#fffbeb);
  padding:18px 18px 18px 50px;margin:1.75rem 0;
  border-radius:0 14px 14px 0;position:relative;
  box-shadow:0 4px 18px rgba(245,158,11,0.1);
  overflow-wrap:break-word;word-break:break-word
}
.ac blockquote::before{content:"💡";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:20px}
.ac blockquote p{color:#374151;font-style:italic;margin:0;font-weight:500;text-align:left!important}

/* Tablas */
.ac .table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:1.75rem 0;border-radius:12px;box-shadow:0 4px 20px rgba(10,22,40,0.08)}
.ac table{width:100%;border-collapse:collapse;font-size:clamp(0.8rem,2vw,0.9rem);min-width:480px}
.ac thead tr{background:linear-gradient(135deg,#0A1628,#0F2744)}
.ac th{color:#f59e0b;padding:11px 14px;text-align:left;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:0.8px;white-space:nowrap}
.ac td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#1f2937;overflow-wrap:break-word}
.ac tr:nth-child(even) td{background:#f8fafc}
/* Wrapper de tabla con overflow del HTML interno */
.ac div[style*="overflow-x:auto"]{
  overflow-x:auto!important;
  -webkit-overflow-scrolling:touch;
  border-radius:12px;
  box-shadow:0 4px 20px rgba(10,22,40,0.08);
  margin:1.75rem 0;
  max-width:100%
}
.ac div[style*="overflow-x:auto"] table{margin:0;border-radius:0;box-shadow:none}

/* HR */
.ac hr{border:none;margin:2.5rem 0;height:1px;background:linear-gradient(to right,transparent,#f59e0b 30%,#f59e0b 70%,transparent)}

/* Imágenes */
.ac img{max-width:100%;height:auto;border-radius:14px;margin:1.75rem auto;display:block;box-shadow:0 10px 36px rgba(0,0,0,0.12)}

/* Callouts */
.ac [data-callout="dorado"]{
  border-left:5px solid #f59e0b;
  background:linear-gradient(135deg,#fffbeb,#fef3c7 60%,#fffbeb);
  padding:16px 18px 16px 50px;margin:1.75rem 0;
  border-radius:0 14px 14px 0;position:relative;
  overflow-wrap:break-word;word-break:break-word
}
.ac [data-callout="dorado"]::before{content:"💡";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:20px;line-height:1}
.ac [data-callout="verde"]{
  border-left:5px solid #10b981;
  background:linear-gradient(135deg,#ecfdf5,#d1fae5 60%,#ecfdf5);
  padding:16px 18px 16px 50px;margin:1.75rem 0;
  border-radius:0 14px 14px 0;position:relative;
  overflow-wrap:break-word;word-break:break-word
}
.ac [data-callout="verde"]::before{content:"✅";position:absolute;left:14px;top:50%;transform:translateY(-50%);font-size:18px;line-height:1}
.ac [data-callout-title]{font-weight:900;font-size:0.93rem;margin-bottom:6px;display:block}
.ac [data-callout="dorado"] [data-callout-title]{color:#92400e}
.ac [data-callout="verde"] [data-callout-title]{color:#065f46}
.ac [data-callout-body]{font-size:0.88rem;line-height:1.7;display:block;text-align:left;overflow-wrap:break-word;word-break:break-word}
.ac [data-callout="dorado"] [data-callout-body]{color:#374151}
.ac [data-callout="verde"] [data-callout-body]{color:#064e3b}

/* FAQ block */
.ac [data-block="faq"]{margin:1.75rem 0;border-radius:14px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 18px rgba(10,22,40,0.06)}
.ac [data-block="faq"]>div:first-child{background:linear-gradient(135deg,#0A1628,#0d1f3c);padding:13px 20px;font-weight:800;font-size:0.9rem;color:#f59e0b}
.ac [data-faq-item]{border-bottom:1px solid #f1f5f9;padding:15px 18px;background:#fff}
.ac [data-faq-item]:last-of-type{border-bottom:none}
.ac [data-faq-q]{font-weight:800;font-size:0.88rem;color:#0A1628;margin-bottom:8px;display:block;overflow-wrap:break-word}
.ac [data-faq-a]{font-size:0.85rem;color:#475569;line-height:1.7;border-left:3px solid #f59e0b;padding-left:12px;display:block;text-align:left;overflow-wrap:break-word;word-break:break-word}

/* Checklist */
.ac [data-block="checklist"]{margin:1.75rem 0;padding:18px 20px;background:#f8fafc;border-radius:14px;border:1px solid #e2e8f0}
.ac [data-checklist-items]{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(210px,100%),1fr));gap:12px}
.ac [data-item]{background:#fff;border-radius:12px;padding:14px 16px;border:1px solid #e8edf4;overflow-wrap:break-word}
.ac [data-item-title]{font-weight:800;font-size:0.87rem;color:#0A1628;margin-bottom:4px;display:block}
.ac [data-item-tag]{display:inline-block;background:rgba(245,158,11,0.15);color:#92400e;font-size:0.72rem;font-weight:700;padding:2px 10px;border-radius:20px;margin-bottom:6px}
.ac [data-item-desc]{font-size:0.82rem;color:#64748b;line-height:1.5;display:block;overflow-wrap:break-word}

/* ── RESPONSIVE MÓVIL (≤640px) ────────────────── */
@media(max-width:640px){
  /* El fix más importante: texto izquierda, no justify */
  .ac p{
    text-align:left!important;
    font-size:0.97rem!important;
    line-height:1.8!important;
    hyphens:none!important;
    -webkit-hyphens:none!important;
  }
  .ac h2{font-size:1.15rem!important;gap:10px!important;margin:2.25rem 0 1rem!important;padding-bottom:12px!important}
  .ac h2::before{min-width:28px!important;height:28px!important;font-size:0.72rem!important}
  .ac h3{font-size:0.98rem!important;padding:9px 13px!important;margin:1.75rem 0 0.7rem!important}
  .ac blockquote{padding:14px 14px 14px 42px!important}
  .ac blockquote::before{font-size:17px!important;left:12px!important}
  .ac [data-callout="dorado"],.ac [data-callout="verde"]{padding:13px 13px 13px 42px!important}
  .ac [data-callout="dorado"]::before,.ac [data-callout="verde"]::before{left:12px!important;font-size:16px!important}
  .ac [data-callout-body]{font-size:0.85rem!important}
  .ac [data-checklist-items]{grid-template-columns:1fr!important}
  .ac [data-faq-item]{padding:13px 14px!important}
  .ac [data-faq-q]{font-size:0.86rem!important}
  .ac [data-faq-a]{font-size:0.83rem!important;padding-left:10px!important}
  .ac [data-block="checklist"]{padding:14px!important}
  .ac ul li,.ac ol li{font-size:0.93rem!important}
  .ac img{border-radius:10px!important;margin:1.25rem auto!important}
}

/* ── SIDEBAR ──────────────────────────────────── */
.sidebar{position:sticky;top:96px}

/* TOC+FAQ card */
.side-card{border-radius:16px;overflow:hidden;border:1px solid #1e293b;box-shadow:0 4px 24px rgba(2,6,23,0.55);background:#0f172a;margin-bottom:16px}
.side-tabs{background:#020617;border-bottom:1px solid #1e293b;display:flex}
.side-tab{flex:1;display:flex;align-items:center;justify-content:center;gap:7px;padding:14px 12px;background:none;border:none;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.2s;position:relative;bottom:-1px;font-family:inherit}
.side-tab.active{border-bottom-color:#f59e0b}
.side-tab-label{font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#475569;transition:color 0.2s}
.side-tab.active .side-tab-label{color:#f59e0b}
.side-tab-badge{display:inline-flex;align-items:center;justify-content:center;min-width:20px;height:20px;border-radius:6px;font-size:9px;font-weight:800;padding:0 7px;background:#1e293b;color:#475569;transition:all 0.2s}
.side-tab.active .side-tab-badge{background:rgba(245,158,11,0.15);color:#f59e0b}

/* TOC panel */
.toc-meta{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid rgba(255,255,255,0.05);gap:8px}
.toc-readtime{display:inline-flex;align-items:center;gap:6px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.18);border-radius:8px;padding:4px 10px;color:#f59e0b;font-size:11px;font-weight:700}
.toc-seccount{color:#334155;font-size:10px;font-weight:600;margin-left:auto}
.toc-list{padding:6px 10px 10px;display:flex;flex-direction:column;gap:1px}
.toc-item{width:100%;background:transparent;border:none;border-left:2.5px solid transparent;cursor:pointer;padding:9px 10px 9px 12px;border-radius:0 12px 12px 0;transition:all 0.18s;display:flex;align-items:center;gap:10px;text-align:left;font-family:inherit}
.toc-item:hover{background:rgba(245,158,11,0.05);border-left-color:rgba(245,158,11,0.35)}
.toc-item.active{background:rgba(245,158,11,0.11);border-left-color:#f59e0b}
.toc-num{min-width:22px;height:22px;border-radius:7px;font-size:10px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;background:rgba(255,255,255,0.06);color:#475569;transition:all 0.2s}
.toc-item.active .toc-num{background:linear-gradient(135deg,#f59e0b,#d97706);color:#020617;box-shadow:0 2px 8px rgba(245,158,11,0.4)}
.toc-text{font-size:12.5px;color:#94a3b8;line-height:1.55;font-weight:500;flex:1;transition:color 0.18s;text-align:left}
.toc-item.active .toc-text{color:#f8fafc;font-weight:700}

/* FAQ panel */
.faq-item{border-bottom:1px solid #1e293b}
.faq-item:last-child{border-bottom:none}
.faq-q{width:100%;background:transparent;border:none;cursor:pointer;padding:13px 16px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;text-align:left;transition:background 0.15s;font-family:inherit}
.faq-q:hover{background:rgba(255,255,255,0.02)}
.faq-q-text{font-size:12.5px;font-weight:600;color:#cbd5e1;line-height:1.5;flex:1;transition:color 0.15s}
.faq-q.open .faq-q-text{color:#f59e0b}
.faq-icon{width:22px;height:22px;border-radius:50%;border:1.5px solid #334155;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all 0.2s;font-size:13px;font-weight:900;color:#475569}
.faq-q.open .faq-icon{background:#f59e0b;border-color:#f59e0b;color:#020617;box-shadow:0 0 12px rgba(245,158,11,0.4)}
.faq-a{display:none;padding:0 16px 14px}
.faq-a.open{display:block}
.faq-a-inner{background:rgba(245,158,11,0.04);border-left:2px solid #f59e0b;border-radius:0 8px 8px 0;padding:11px 14px;font-size:12px;color:#94a3b8;line-height:1.8}

/* CTA sidebar */
.side-cta{border-radius:18px;overflow:hidden;border:1px solid #1e293b;box-shadow:0 8px 36px rgba(2,6,23,0.65);background:#020617;position:relative;margin-bottom:16px}
.side-cta-stripe{background:linear-gradient(90deg,#f59e0b,#d97706);height:3px;width:100%}
.side-cta-body{padding:20px 20px 22px;position:relative}
.side-cta-glow1{position:absolute;top:-40px;right:-40px;width:140px;height:140px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 70%);pointer-events:none}
.side-cta-glow2{position:absolute;bottom:-30px;left:-20px;width:100px;height:100px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,0.05) 0%,transparent 70%);pointer-events:none}
.side-cta-title-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.side-cta-icon{width:34px;height:34px;border-radius:10px;background:rgba(245,158,11,0.12);border:1px solid rgba(245,158,11,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cta-btn{display:flex;align-items:center;justify-content:center;gap:8px;padding:12px 16px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:11px;color:#020617;font-weight:800;font-size:12.5px;text-decoration:none;box-shadow:0 4px 16px rgba(245,158,11,0.3);transition:all 0.2s;letter-spacing:0.01em}
.cta-btn:hover{box-shadow:0 6px 22px rgba(245,158,11,0.5);transform:translateY(-1px)}
.wa-btn{display:flex;align-items:center;justify-content:center;gap:9px;padding:11px 16px;border-radius:11px;background:rgba(37,211,102,0.09);border:1px solid rgba(37,211,102,0.2);color:#4ade80;font-size:12.5px;text-decoration:none;font-weight:700;transition:all 0.2s;margin-top:10px}
.wa-btn:hover{background:rgba(37,211,102,0.16);border-color:rgba(37,211,102,0.38);box-shadow:0 0 18px rgba(37,211,102,0.14)}

/* ── RELACIONADOS ─────────────────────────────── */
.related{max-width:1320px;margin:0 auto;padding:32px 24px 60px}
.related-header{display:flex;align-items:center;gap:14px;margin-bottom:20px}
.related-header-icon{width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 14px rgba(245,158,11,0.38)}
.related-header-icon svg{width:16px;height:16px;fill:#020617}
.related-header-label{color:#f59e0b;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:0.2em;margin:0 0 3px}
.related-header-title{color:#0A1628;font-weight:900;font-size:1.15rem;margin:0;letter-spacing:-0.02em}
.related-divider{height:2px;background:linear-gradient(to right,#f59e0b,rgba(245,158,11,0.15),transparent);border-radius:2px;margin-bottom:24px}
.related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:20px}
.related-card{background:#fff;border-radius:16px;border:1.5px solid #e8edf4;overflow:hidden;transition:all 0.28s cubic-bezier(0.22,1,0.36,1);text-decoration:none;display:flex;flex-direction:column;box-shadow:0 2px 16px rgba(10,22,40,0.07)}
.related-card:hover{box-shadow:0 16px 48px rgba(10,22,40,0.16),0 0 0 2px rgba(245,158,11,0.15);transform:translateY(-4px);border-color:#f59e0b}
.related-card-img{position:relative;height:180px;overflow:hidden;flex-shrink:0;background:linear-gradient(135deg,#0A1628,#0F2744)}
.related-card-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.55s ease,filter 0.35s ease}
.related-card:hover .related-card-img img{transform:scale(1.06);filter:brightness(0.8)}
.related-card-img-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 45%,rgba(10,22,40,0.7) 100%)}
.related-card-cat{position:absolute;bottom:10px;left:10px;display:inline-flex;align-items:center;gap:4px;padding:4px 10px;border-radius:6px;font-size:10px;font-weight:800;background:linear-gradient(135deg,#f59e0b,#d97706);color:#020617}
.related-card-date{position:absolute;bottom:10px;right:10px;font-size:10px;color:rgba(255,255,255,0.7);font-weight:500;display:flex;align-items:center;gap:4px}
.related-card-body{padding:18px 18px 16px;display:flex;flex-direction:column;flex:1}
.related-card-title{color:#0A1628;font-weight:800;font-size:0.95rem;line-height:1.5;margin:0 0 8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;letter-spacing:-0.01em;transition:color 0.2s}
.related-card:hover .related-card-title{color:#b45309}
.related-card-excerpt{color:#64748b;font-size:12.5px;line-height:1.7;margin:0 0 auto;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.related-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:14px;padding-top:12px;border-top:1px solid #f1f5f9}
.related-card-author{display:flex;align-items:center;gap:6px;font-size:11px;color:#94a3b8}
.related-card-author img{width:20px;height:20px;border-radius:50%;border:2px solid #f1f5f9;object-fit:cover;flex-shrink:0}
.related-card-cta{display:inline-flex;align-items:center;gap:5px;color:#f59e0b;font-size:11.5px;font-weight:800;transition:gap 0.2s}
.related-card:hover .related-card-cta{gap:10px}
.related-card-bar{height:2px;background:linear-gradient(to right,#f59e0b,#d97706);border-radius:2px;margin-top:12px;width:0%;transition:width 0.35s ease}
.related-card:hover .related-card-bar{width:100%}

/* ── EXCERPT BOX ──────────────────────────────── */
.excerpt-box{position:relative;overflow:hidden;background:linear-gradient(135deg,#0A1628 0%,#0F2744 100%);border-radius:20px;padding:clamp(20px,4vw,32px) clamp(20px,4vw,36px);margin-bottom:40px;box-shadow:0 8px 32px rgba(10,22,40,0.18)}
.excerpt-box-glow{position:absolute;top:0;right:0;width:220px;height:100%;background:linear-gradient(to left,rgba(245,158,11,0.1),transparent);pointer-events:none}
.excerpt-box-icon{position:absolute;top:16px;right:24px;opacity:0.06;font-size:clamp(50px,10vw,90px);line-height:1;pointer-events:none}
.excerpt-box-circle{position:absolute;top:-20px;left:-20px;width:120px;height:120px;border-radius:50%;background:rgba(245,158,11,0.04);pointer-events:none}
.excerpt-text{position:relative;color:rgba(255,255,255,0.93);font-size:clamp(0.95rem,2vw,1.08rem);line-height:1.85;margin:0;font-style:italic;letter-spacing:0.01em;overflow-wrap:break-word}
.excerpt-disclaimer{position:relative;margin-top:16px;padding-top:14px;border-top:1px solid rgba(245,158,11,0.2);display:flex;align-items:flex-start;gap:8px}
.excerpt-disclaimer p{margin:0;font-size:11px;color:rgba(245,158,11,0.75);font-weight:700;letter-spacing:0.5px;text-transform:uppercase;line-height:1.5}

/* ── BOTTOM GRID (contacto + compartir) ───────── */
.art-bottom-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px}
@media(max-width:640px){.art-bottom-grid{grid-template-columns:1fr}}
.art-contact-card{border-radius:20px;border:1px solid #e2e8f0;background:#fff;box-shadow:0 2px 20px rgba(10,22,40,0.07);overflow:hidden}
.art-contact-stripe{height:4px;background:linear-gradient(to right,#f59e0b,#d97706,#f59e0b)}
.art-contact-head{padding:20px 22px 8px}
.art-online{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.art-online-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 8px rgba(34,197,94,0.6);flex-shrink:0}
.art-online-label{font-size:11px;color:#22c55e;font-weight:700;letter-spacing:0.04em}
.art-online-resp{font-size:11px;color:#94a3b8;margin-left:auto}
.art-contact-title{color:#0A1628;font-weight:900;font-size:18px;margin:8px 0 0;letter-spacing:-0.02em}
.art-contact-sub{color:#94a3b8;font-size:12.5px;margin:4px 0 0;line-height:1.5}
.art-contact-rows{padding:8px 12px 16px}
.art-cta-row{display:flex;align-items:center;gap:14px;text-decoration:none;padding:14px 18px;border-radius:14px;border:none;width:100%;cursor:pointer;transition:background 0.18s;background:transparent}
.art-cta-row:not(:last-child){border-bottom:1px solid #f1f5f9}
.art-cta-row:hover{background:#fffbeb}
.art-cta-row-wa:hover{background:#f0fdf4}
.art-cta-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.art-cta-label{font-size:10px;color:#94a3b8;font-weight:700;text-transform:uppercase;letter-spacing:0.08em}
.art-cta-value{font-size:13.5px;color:#0A1628;font-weight:800;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-top:2px}
.art-cta-arrow{flex-shrink:0}
.art-share-card{border-radius:20px;background:linear-gradient(160deg,#0A1628 0%,#0d1f3c 50%,#071020 100%);box-shadow:0 2px 20px rgba(2,6,23,0.35);overflow:hidden;border:1px solid rgba(245,158,11,0.12)}
.art-share-stripe{height:4px;background:linear-gradient(to right,rgba(245,158,11,0.3),#f59e0b,rgba(245,158,11,0.3))}
.art-share-head{padding:20px 22px 8px}
.art-share-title{color:#fff;font-weight:900;font-size:18px;margin:0 0 4px;letter-spacing:-0.02em}
.art-share-sub{color:rgba(255,255,255,0.35);font-size:12.5px;margin:0;line-height:1.5}
.art-share-rows{padding:8px 12px 16px}
.art-share-row{display:flex;align-items:center;gap:14px;padding:13px 18px;border-radius:14px;cursor:pointer;font-size:14px;font-weight:700;transition:background 0.18s;width:100%;border:none;background:transparent;font-family:inherit;text-decoration:none}
.art-share-row:not(:last-child){border-bottom:1px solid rgba(255,255,255,0.07)}
.art-share-row:hover{background:rgba(255,255,255,0.05)}
.art-share-icon{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.art-share-row-label{color:rgba(255,255,255,0.85);font-weight:700;font-size:14px;flex:1;text-align:left}
.art-share-row-arrow{color:rgba(255,255,255,0.2);font-size:10px}

/* ── AVISO LEGAL ──────────────────────────────── */
.aviso-legal{margin-top:40px;padding:14px 20px;background:linear-gradient(135deg,rgba(245,158,11,0.06),rgba(245,158,11,0.03));border:1px solid rgba(245,158,11,0.22);border-left:4px solid #f59e0b;border-radius:12px;display:flex;gap:12px;align-items:flex-start}
.aviso-legal-icon{width:28px;height:28px;border-radius:8px;background:rgba(245,158,11,0.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:11px}
.aviso-legal p{margin:0;font-size:12.5px;color:#78716c;line-height:1.7;overflow-wrap:break-word}

/* ── FOOTER ───────────────────────────────────── */
.footer{background:#020617;padding:40px 20px;text-align:center;border-top:1px solid #0f172a}
.footer p{color:#334155;font-size:13px}
.footer a{color:#f59e0b;font-weight:600}

/* ── BOTÓN VOLVER ─────────────────────────────── */

/* ── SCROLL TOP ───────────────────────────────── */
.scroll-top{position:fixed;bottom:90px;right:20px;width:44px;height:44px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:12px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;box-shadow:0 4px 16px rgba(245,158,11,0.4);z-index:98;opacity:0;transform:translateY(10px);transition:all 0.3s;pointer-events:none}
.scroll-top.visible{opacity:1;transform:translateY(0);pointer-events:auto}
.scroll-top:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(245,158,11,0.55)}
.scroll-top svg{width:18px;height:18px;fill:none;stroke:#020617;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}

/* ── WHATSAPP FLOTANTE ────────────────────────── */
.wa-float{position:fixed;bottom:24px;right:20px;width:54px;height:54px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(37,211,102,0.4);z-index:99;transition:transform 0.2s}
.wa-float:hover{transform:scale(1.1)}
.wa-float svg{width:26px;height:26px;fill:#fff}

/* ── PROGRESS BAR ─────────────────────────────── */
.read-progress{position:fixed;top:0;left:0;height:3px;background:linear-gradient(to right,#f59e0b,#d97706);z-index:10001;width:0%;transition:width 0.1s}

/* ── TOC MÓVIL (collapsible) ──────────────────── */
.toc-mobile{display:none;margin-bottom:24px}
.toc-mobile summary{
  padding:13px 18px;cursor:pointer;display:flex;align-items:center;gap:10px;
  background:linear-gradient(135deg,#0A1628,#0d1f3c);color:#f59e0b;
  font-weight:800;font-size:13px;list-style:none;border-radius:12px;
  user-select:none
}
.toc-mobile summary::-webkit-details-marker{display:none}
.toc-mobile-body{background:#fff;border:1px solid #e8edf4;border-top:none;border-radius:0 0 12px 12px;padding:8px 12px}
.toc-mobile-item{display:flex;align-items:center;gap:8px;width:100%;background:none;border:none;cursor:pointer;padding:8px 10px;border-radius:8px;text-align:left;font-family:inherit;font-size:13px;color:#374151}
.toc-mobile-item:hover{background:#f8fafc;color:#f59e0b}
@media(max-width:1023px){
  .toc-mobile{display:block}
}
</style>
</head>
<body>
<div class="read-progress" id="readProgress"></div>

<?php
$_np = strtok($_SERVER['REQUEST_URI'], '?');
$_ns = in_array(explode('/', trim($_np, '/'))[0], ['litis','corporativo','recuperacion']);
?>
<!-- NAV -->
<nav class="nav" id="mainNav">
  <div class="nav-inner">
    <a href="/" class="nav-logo" aria-label="LITESCO — inicio">
      <img src="/favicon.webp" alt="" aria-hidden="true" width="40" height="40" loading="eager">
      <div class="nav-logo-text">
        <span class="nav-logo-title">LITESCO</span>
        <span class="nav-logo-sub">Litigio Estratégico Colombiano</span>
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
      <a href="/blog" class="nav-active">Blog</a>
      <a href="/faq" class="<?= $_np==='/faq' ? 'nav-active' : '' ?>">FAQ</a>
      <a href="/contacto" class="nav-cta">Contáctanos <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>
    </div>
  </div>
</nav>

<!-- HERO -->
<div class="art-hero">
  <?php if (!empty($article['image'])): ?>
    <img class="art-hero-img" src="<?= $e($article['image']) ?>" alt="<?= $e($article['alt_text'] ?? $article['title']) ?>" width="1400" height="580" loading="eager">
    <div class="art-hero-overlay-top"></div>
    <div class="art-hero-overlay-bot"></div>
  <?php else: ?>
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,#0d1e3a,#0A1628)"></div>
  <?php endif; ?>

  <a href="/blog" class="art-hero-back" aria-label="Volver al Blog">
    <span class="art-hero-back-icon">
      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </span>
    Volver al Blog
  </a>

  <div class="art-hero-content">
    <div class="art-hero-cat">
      <div style="width:28px;height:2px;background:#f59e0b;flex-shrink:0"></div>
      <span style="color:#f59e0b;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:2.5px"><?= $e($catName) ?></span>
    </div>

    <h1 style="color:#fff;font-size:clamp(1.45rem,3.2vw,2.75rem);font-weight:900;line-height:1.13;margin:0;letter-spacing:-0.4px;overflow-wrap:break-word;text-shadow:0 2px 20px rgba(2,6,23,0.6)">
      <?= $e($article['title']) ?>
    </h1>

    <div style="width:44px;height:3px;background:linear-gradient(to right,#f59e0b,#d97706);border-radius:2px;margin-top:16px"></div>

    <div class="art-hero-meta" itemscope itemtype="https://schema.org/NewsArticle">
      <meta itemprop="headline" content="<?= $e($article['seo_title']?:$article['title']) ?>">
      <meta itemprop="url" content="<?= $canonical ?>">
      <?php if (!empty($article['image'])): ?><meta itemprop="image" content="<?= $e($article['image']) ?>"><?php endif; ?>
      <span class="art-hero-meta-item" itemprop="author" itemscope itemtype="https://schema.org/Organization">
        <svg viewBox="0 0 24 24" width="10" height="10" fill="#f59e0b"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <strong itemprop="name"><?= $author ?></strong>
        <meta itemprop="url" content="https://litesco.com.co">
      </span>
      <span class="art-hero-meta-item">
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#f59e0b" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
        <time itemprop="datePublished" datetime="<?= $date ?>"><?= $dateFormatted ?></time>
        <?php if (!empty($article['updated_at']) && $article['updated_at'] !== $date): ?>
          <meta itemprop="dateModified" content="<?= $e($article['updated_at']) ?>">
        <?php else: ?>
          <meta itemprop="dateModified" content="<?= $date ?>">
        <?php endif; ?>
      </span>
      <span class="art-hero-meta-item">
        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <?= $readTime ?> min de lectura
      </span>
    </div>
  </div>
</div>

<div style="height:2px;background:linear-gradient(to right,#f59e0b,rgba(245,158,11,0.2),transparent)"></div>

<!-- BREADCRUMB -->
<div style="background:#f8fafc">
<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="/blog">Blog</a>
  <span class="sep">›</span>
  <span style="color:#64748b;font-size:13px;flex-shrink:0"><?= $e($catName) ?></span>
  <span class="sep">›</span>
  <span class="bc-title"><?= $e($article['title']) ?></span>
</nav>

<!-- TOC MÓVIL (solo visible en tablet/móvil) -->
<?php if (!empty($toc)): ?>
<div style="max-width:1300px;margin:0 auto;padding:16px 20px 0">
  <details class="toc-mobile">
    <summary>📋 Índice del artículo (<?= count($toc) ?> secciones)</summary>
    <div class="toc-mobile-body">
      <?php foreach ($toc as $item): ?>
      <button class="toc-mobile-item" onclick="scrollToSection('<?= $item['id'] ?>');this.closest('details').removeAttribute('open')">
        <span style="min-width:20px;height:20px;border-radius:6px;background:#0A1628;color:#f59e0b;font-size:9px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0"><?= $item['num'] ?></span>
        <span><?= htmlspecialchars($item['text']) ?></span>
      </button>
      <?php endforeach; ?>
    </div>
  </details>
</div>
<?php endif; ?>

<!-- CONTENT -->
<div class="content-wrap">
  <div style="min-width:0">

    <?php if (!empty($article['excerpt'])): ?>
    <div class="excerpt-box">
      <div class="excerpt-box-glow"></div>
      <div class="excerpt-box-icon">⚖</div>
      <div class="excerpt-box-circle"></div>
      <p class="excerpt-text"><?= $e($article['excerpt']) ?></p>
      <div class="excerpt-disclaimer">
        <span style="font-size:12px;flex-shrink:0">⚠️</span>
        <p>Este contenido es informativo y no reemplaza asesoría jurídica personalizada</p>
      </div>
    </div>
    <?php endif; ?>

    <article class="ac">
      <?= $content ?>
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
        <button class="side-tab" id="tab-faq" onclick="switchTab('faq')">
          <span style="color:#334155;font-size:13px;font-weight:900;line-height:1;transition:color 0.2s" id="faq-tab-q">?</span>
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
            <span class="toc-num"><?= $item['num'] ?></span>
            <span class="toc-text"><?= htmlspecialchars($item['text']) ?></span>
          </button>
          <?php endforeach; ?>
        </div>
      </div>
      <?php endif; ?>

      <?php if (!empty($faqs)): ?>
      <div id="panel-faq" style="display:none;flex-direction:column">
        <?php foreach ($faqs as $i => $faq): ?>
        <div class="faq-item">
          <button class="faq-q" id="faq-btn-<?= $i ?>" onclick="toggleFaq(<?= $i ?>)">
            <span class="faq-q-text"><?= htmlspecialchars($faq['q']) ?></span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-a" id="faq-a-<?= $i ?>">
            <div class="faq-a-inner"><?= htmlspecialchars($faq['a']) ?></div>
          </div>
        </div>
        <?php endforeach; ?>
      </div>
      <?php endif; ?>
    </div>
    <?php endif; ?>

    <div class="side-cta">
      <div class="side-cta-glow1"></div>
      <div class="side-cta-glow2"></div>
      <div class="side-cta-stripe"></div>
      <div class="side-cta-body">
        <div class="side-cta-title-row">
          <div class="side-cta-icon">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"><path d="M12 22c-4.97 0-9-2.69-9-6v-1.5C3 11.46 7.03 9 12 9s9 2.46 9 5.5V16c0 3.31-4.03 6-9 6z"/><path d="M12 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>
          </div>
          <div>
            <div style="color:#f1f5f9;font-weight:800;font-size:14px;letter-spacing:-0.01em">¿Necesita asesoría?</div>
            <div style="color:#475569;font-size:10px;margin-top:1px">Respuesta en menos de 24h</div>
          </div>
        </div>
        <p style="color:#64748b;font-size:12px;line-height:1.75;margin:0 0 16px">Nuestros abogados especializados están listos para analizar su caso sin compromiso.</p>
        <a href="https://calendly.com/gerencialitigioestrategicocolombiano" target="_blank" rel="noopener" class="cta-btn">
          <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Agendar consulta gratuita
        </a>
        <a href="https://wa.me/573132037572?text=Hola%2C%20vi%20su%20artículo%20y%20necesito%20asesoría" target="_blank" rel="noopener" class="wa-btn">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar por WhatsApp
        </a>
      </div>
    </div>

  </aside>
</div>
</div><!-- /bg f8fafc -->

<!-- RELATED + BOTTOM -->
<div style="background:#f8fafc">
<?php if (!empty($related)): ?>
<div class="related">
  <div class="related-header">
    <div class="related-header-icon">
      <svg viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
    </div>
    <div>
      <p class="related-header-label">Lectura recomendada</p>
      <h3 class="related-header-title">Más sobre <?= $e($catName) ?></h3>
    </div>
  </div>
  <div class="related-divider"></div>
  <div class="related-grid">
    <?php foreach ($related as $r): ?>
    <a href="/blog/<?= $e($r['slug']) ?>" class="related-card">
      <div class="related-card-img">
        <?php if (!empty($r['image'])): ?>
          <img src="<?= $e($r['image']) ?>" alt="<?= $e($r['title']) ?>" width="400" height="180" loading="lazy">
          <div class="related-card-img-overlay"></div>
        <?php endif; ?>
        <span class="related-card-cat"><?= $e($categories[$r['category']] ?? 'Artículo') ?></span>
        <?php if (!empty($r['date'])): ?>
        <span class="related-card-date">
          <svg viewBox="0 0 24 24" width="8" height="8" fill="none" stroke="#f59e0b" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          <?php $ts2=strtotime($r['date']); echo date('d',$ts2).'/'.(int)date('n',$ts2).'/'.date('y',$ts2); ?>
        </span>
        <?php endif; ?>
      </div>
      <div class="related-card-body">
        <h4 class="related-card-title"><?= $e($r['title']) ?></h4>
        <p class="related-card-excerpt"><?= $e(mb_substr($r['excerpt'] ?? '', 0, 120)) ?></p>
        <div class="related-card-footer">
          <span class="related-card-author">
            <img src="/favicon.webp" alt="LITESCO" width="20" height="20">
            <?= $e($r['author'] ?? 'Equipo LITESCO') ?>
          </span>
          <span class="related-card-cta">
            Leer
            <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </div>
        <div class="related-card-bar"></div>
      </div>
    </a>
    <?php endforeach; ?>
  </div>
</div>
<?php endif; ?>

<!-- BOTTOM: AVISO + CONTACTO + COMPARTIR -->
<div style="max-width:1320px;margin:0 auto;padding:0 clamp(14px,2.5vw,24px) clamp(40px,6vw,80px)">

  <div class="aviso-legal">
    <div class="aviso-legal-icon">⚠️</div>
    <p><strong style="color:#b45309;font-weight:800">Aviso Legal:</strong> Este contenido es informativo y no reemplaza asesoría jurídica personalizada.</p>
  </div>

  <div class="art-bottom-grid">

    <!-- CONTACTO -->
    <div class="art-contact-card">
      <div class="art-contact-stripe"></div>
      <div class="art-contact-head">
        <div class="art-online">
          <div class="art-online-dot"></div>
          <span class="art-online-label">EN LÍNEA</span>
          <span class="art-online-resp">Resp. &lt; 24h</span>
        </div>
        <h3 class="art-contact-title">¿Tiene dudas?</h3>
        <p class="art-contact-sub">Contáctenos directamente por el canal de su preferencia.</p>
      </div>
      <div class="art-contact-rows">
        <a href="mailto:gerencia@litesco.com.co" class="art-cta-row">
          <div class="art-cta-icon" style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:1px solid rgba(245,158,11,0.25)">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#d97706" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div style="flex:1;min-width:0">
            <div class="art-cta-label">Correo electrónico</div>
            <div class="art-cta-value">gerencia@litesco.com.co</div>
          </div>
          <svg class="art-cta-arrow" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#f59e0b" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
        <a href="https://wa.me/573132037572" target="_blank" rel="noopener" class="art-cta-row art-cta-row-wa">
          <div class="art-cta-icon" style="background:#25D366;box-shadow:0 4px 12px rgba(37,211,102,0.3)">
            <svg viewBox="0 0 24 24" width="17" height="17" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <div style="flex:1">
            <div class="art-cta-label">WhatsApp</div>
            <div class="art-cta-value">Contáctanos</div>
          </div>
          <svg class="art-cta-arrow" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#25D366" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>

    <!-- COMPARTIR -->
    <div class="art-share-card">
      <div class="art-share-stripe"></div>
      <div class="art-share-head">
        <h3 class="art-share-title">Compartir artículo</h3>
        <p class="art-share-sub">Comparte este contenido con quien lo necesite.</p>
      </div>
      <div class="art-share-rows">
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?= urlencode($canonical) ?>" target="_blank" rel="noopener" class="art-share-row">
          <div class="art-share-icon" style="background:#0077B5;box-shadow:0 3px 10px #0077B555">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </div>
          <span class="art-share-row-label">LinkedIn</span>
          <svg class="art-share-row-arrow" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=<?= urlencode($canonical) ?>" target="_blank" rel="noopener" class="art-share-row">
          <div class="art-share-icon" style="background:#1877F2;box-shadow:0 3px 10px #1877F255">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#fff"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </div>
          <span class="art-share-row-label">Facebook</span>
          <svg class="art-share-row-arrow" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
        <a href="https://wa.me/?text=<?= urlencode($article['title'].' '.$canonical) ?>" target="_blank" rel="noopener" class="art-share-row">
          <div class="art-share-icon" style="background:#25D366;box-shadow:0 3px 10px #25D36655">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </div>
          <span class="art-share-row-label">WhatsApp</span>
          <svg class="art-share-row-arrow" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </a>
        <button class="art-share-row" onclick="copyArticleLink()">
          <div class="art-share-icon" style="background:#334155;box-shadow:0 3px 10px #33415555">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#fff" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </div>
          <span class="art-share-row-label" id="copy-label">Copiar enlace</span>
          <svg class="art-share-row-arrow" viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>

  </div><!-- /art-bottom-grid -->
</div><!-- /bottom wrapper -->
</div><!-- /bg f8fafc related -->

<!-- FOOTER -->
<div class="footer">
  <p>© <?= date('Y') ?> <a href="/">LITESCO — Litigio Estratégico Colombiano</a>. Todos los derechos reservados.</p>
</div>

<!-- SCROLL TOP -->
<button class="scroll-top" id="scrollTop" onclick="window.scrollTo({top:0,behavior:'smooth'})" aria-label="Volver arriba">
  <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
</button>

<!-- WA FLOAT -->
<a href="https://wa.me/573132037572" target="_blank" rel="noopener" class="wa-float" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
</a>

<script>
// ── Nav: hamburger + services dropdown ────────────────────────
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

// ── Progreso + scroll top ──────────────────────────────────────
const scrollBtn = document.getElementById('scrollTop');
const progress  = document.getElementById('readProgress');
window.addEventListener('scroll', function(){
  const scrollY = window.scrollY;
  const docH    = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (docH > 0 ? (scrollY/docH)*100 : 0) + '%';
  scrollY > 400 ? scrollBtn.classList.add('visible') : scrollBtn.classList.remove('visible');
},{passive:true});

// ── TOC scroll ────────────────────────────────────────────────
function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

// ── Tabs TOC / FAQ ─────────────────────────────────────────────
function switchTab(tab){
  const tocPanel = document.getElementById('panel-toc');
  const faqPanel = document.getElementById('panel-faq');
  const tocTab   = document.getElementById('tab-toc');
  const faqTab   = document.getElementById('tab-faq');
  const faqQ     = document.getElementById('faq-tab-q');
  if(tocPanel) tocPanel.style.display = tab==='toc' ? 'block' : 'none';
  if(faqPanel) faqPanel.style.display = tab==='faq' ? 'flex' : 'none';
  if(tocTab)   tocTab.classList.toggle('active', tab==='toc');
  if(faqTab)   faqTab.classList.toggle('active', tab==='faq');
  if(faqQ)     faqQ.style.color = tab==='faq' ? '#f59e0b' : '#334155';
}

// ── TOC highlight activo ───────────────────────────────────────
(function(){
  const items = document.querySelectorAll('.toc-item');
  if(!items.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        items.forEach(b=>b.classList.remove('active'));
        const t = document.getElementById('toc-'+e.target.id);
        if(t) t.classList.add('active');
      }
    });
  },{rootMargin:'-10% 0px -70% 0px'});
  document.querySelectorAll('.ac h2[id]').forEach(h=>obs.observe(h));
})();

// ── FAQ accordion ──────────────────────────────────────────────
function toggleFaq(i){
  const btn  = document.getElementById('faq-btn-'+i);
  const ans  = document.getElementById('faq-a-'+i);
  const icon = btn.querySelector('.faq-icon');
  const open = ans.classList.toggle('open');
  btn.classList.toggle('open', open);
  icon.textContent = open ? '−' : '+';
}

// ── Copiar enlace ──────────────────────────────────────────────
function copyArticleLink(){
  navigator.clipboard.writeText(window.location.href).then(()=>{
    const lbl = document.getElementById('copy-label');
    if(!lbl) return;
    lbl.textContent = '¡Enlace copiado!';
    setTimeout(()=>{ lbl.textContent = 'Copiar enlace'; }, 2500);
  });
}

// ── Meta Pixel + CAPI: track Lead en clics de WhatsApp y contacto
// (solo metadatos del artículo, nunca contenido de mensajes ni datos del caso)
document.querySelectorAll('a[href*="wa.me"], a[href="/contacto"]').forEach(function(el) {
  el.addEventListener('click', function() {
    if (!window.fbq) return;
    var eventId = 'lead_' + Date.now() + '_' + Math.random().toString(16).slice(2);
    var contentName = '<?= addslashes($title) ?>';
    fbq('track', 'Lead', { content_name: contentName }, { eventID: eventId });
    fetch('https://www.litesco.com.co/meta-capi-endpoint.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event: 'Lead', event_id: eventId, page_url: location.href, content_name: contentName }),
      keepalive: true
    }).catch(function () {});
  });
});
</script>
</body>
</html>
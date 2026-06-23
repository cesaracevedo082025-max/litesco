<?php
/**
 * LITESCO - Sitemap dinámico para páginas de servicios legales
 * Accesible en: https://litesco.com.co/servicios-sitemap.php
 * Referenciar en robots.txt y Google Search Console.
 */
$db_config = [
    'host'     => 'localhost',
    'dbname'   => 'myloptic1_litesco_blog',
    'user'     => 'myloptic1_litesco_usr',
    'password' => 'j}34Ik49W@10',
    'charset'  => 'utf8mb4',
];

$servicios = [];
try {
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO($dsn, $db_config['user'], $db_config['password'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $stmt = $pdo->query(
        "SELECT linea_negocio, slug, updated_at, created_at FROM servicios WHERE published = 1 ORDER BY updated_at DESC"
    );
    $servicios = $stmt->fetchAll();
} catch (PDOException $e) {
    // DB no disponible: devolver sitemap vacío válido
}

header('Content-Type: application/xml; charset=UTF-8');
header('X-Robots-Tag: noindex');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($servicios as $srv):
    $linea   = $srv['linea_negocio'];
    $slug    = htmlspecialchars($srv['slug'], ENT_XML1, 'UTF-8');
    $rawDate = $srv['updated_at'] ?? $srv['created_at'] ?? '';
    $lastmod = $rawDate ? date('Y-m-d', strtotime($rawDate)) : date('Y-m-d');
?>
  <url>
    <loc>https://litesco.com.co/<?= $linea ?>/<?= $slug ?></loc>
    <lastmod><?= $lastmod ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
  </url>
<?php endforeach; ?>
</urlset>

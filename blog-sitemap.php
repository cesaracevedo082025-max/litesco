<?php
/**
 * LITESCO - Sitemap dinámico para artículos del blog
 * Accesible en: https://litesco.com.co/blog-sitemap.php
 * Referenciado en robots.txt y enviado a Google Search Console.
 */
$db_config = [
    'host'     => 'localhost',
    'dbname'   => 'myloptic1_litesco_blog',
    'user'     => 'myloptic1_litesco_usr',
    'password' => 'j}34Ik49W@10',
    'charset'  => 'utf8mb4',
];

$articles = [];
try {
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO($dsn, $db_config['user'], $db_config['password'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $stmt = $pdo->query(
        "SELECT slug, date, updated_at FROM articles WHERE published = 1 ORDER BY date DESC"
    );
    $articles = $stmt->fetchAll();
} catch (PDOException $e) {
    // DB no disponible: devolver sitemap vacío válido
}

header('Content-Type: application/xml; charset=UTF-8');
header('X-Robots-Tag: noindex');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<?php foreach ($articles as $art):
    $slug    = htmlspecialchars($art['slug'], ENT_XML1, 'UTF-8');
    $rawDate = $art['updated_at'] ?? $art['date'] ?? '';
    // Formato W3C requerido por sitemaps: YYYY-MM-DD
    $lastmod = $rawDate ? date('Y-m-d', strtotime($rawDate)) : date('Y-m-d');
?>
  <url>
    <loc>https://litesco.com.co/blog/<?= $slug ?></loc>
    <lastmod><?= $lastmod ?></lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
<?php endforeach; ?>
</urlset>

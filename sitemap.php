<?php
// Configurar cabeceras para XML
header("Content-Type: text/xml;charset=UTF-8");

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";

$base_url = 'https://litesco.com.co';
$date_today = date('Y-m-d');

// 1. Imprimir las URLs estáticas
$static_urls = [
    '/',
    '/sobre-nosotros',
    '/corporativo',
    '/litis',
    '/recuperacion',
    '/blog',
    '/faq',
    '/contacto'
];

foreach ($static_urls as $url) {
    echo "  <url>\n";
    echo "      <loc>" . $base_url . $url . "</loc>\n";
    echo "      <lastmod>" . $date_today . "</lastmod>\n";
    echo "      <changefreq>weekly</changefreq>\n";
    echo "      <priority>0.8</priority>\n";
    echo "  </url>\n";
}

// 2. Leer los artículos desde tu archivo JSON
$articles_file = __DIR__ . '/blog-data/articles.json';

if (file_exists($articles_file)) {
    $content = file_get_contents($articles_file);
    $articles = json_decode($content, true);

    if (is_array($articles)) {
        foreach ($articles as $article) {
            // Solo agregar al sitemap si el artículo está publicado
            if (isset($article['published']) && $article['published'] === true) {
                $slug = htmlspecialchars($article['slug']);
                $date = isset($article['date']) ? $article['date'] : $date_today;

                echo "  <url>\n";
                echo "      <loc>" . $base_url . "/blog/" . $slug . "</loc>\n";
                echo "      <lastmod>" . date('Y-m-d', strtotime($date)) . "</lastmod>\n";
                echo "      <changefreq>monthly</changefreq>\n";
                echo "      <priority>0.9</priority>\n";
                echo "  </url>\n";
            }
        }
    }
}

echo '</urlset>';
?>

<?php
/**
 * LITESCO - API de servicios legales (CMS)
 * Maneja CRUD de páginas de servicios desde el panel administrativo.
 *
 * CAMBIAR LA CONTRASEÑA:
 *   php -r "echo password_hash('TuNuevaContraseña', PASSWORD_DEFAULT);"
 *   Luego reemplaza ADMIN_HASH abajo.
 */

// ─── CONTRASEÑA ADMIN ───────────────────────────────────────────────────────
// Hash de: Litesco2026!
define('ADMIN_EMAIL', 'gerencia@litesco.com.co');
define('ADMIN_HASH',  '$2b$10$tDjr04WKh4b2zHeBSO8CQO3dlCOmq2gyXaKCm.6XLaUOx4l4gY2B.'); // Litesco2026!

// ─── BASE DE DATOS ───────────────────────────────────────────────────────────
$db_config = [
    'host'     => 'localhost',
    'dbname'   => 'myloptic1_litesco_blog',
    'user'     => 'myloptic1_litesco_usr',
    'password' => 'j}34Ik49W@10',
    'charset'  => 'utf8mb4',
];

// ─── HEADERS ────────────────────────────────────────────────────────────────
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

// ─── CONEXIÓN DB ─────────────────────────────────────────────────────────────
function getDb($cfg) {
    $dsn = "mysql:host={$cfg['host']};dbname={$cfg['dbname']};charset={$cfg['charset']}";
    return new PDO($dsn, $cfg['user'], $cfg['password'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);
}

// Crear tablas si no existen
function ensureTables($pdo) {
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS servicios (
            id              INT AUTO_INCREMENT PRIMARY KEY,
            linea_negocio   ENUM('litis','corporativo','recuperacion') NOT NULL,
            subcategoria    VARCHAR(100) NOT NULL DEFAULT '',
            slug            VARCHAR(200) NOT NULL UNIQUE,
            seo_title       VARCHAR(60)  NOT NULL DEFAULT '',
            meta_desc       VARCHAR(160) NOT NULL DEFAULT '',
            resumen_rapido  TEXT,
            h1              VARCHAR(250) NOT NULL DEFAULT '',
            content         LONGTEXT,
            faqs            JSON,
            imagen_url      VARCHAR(500),
            imagen_alt      VARCHAR(250),
            nombre_servicio VARCHAR(250),
            area_cobertura  VARCHAR(200) DEFAULT 'Bogotá, Colombia',
            cta_tipo        ENUM('whatsapp','formulario','ambos') DEFAULT 'whatsapp',
            published       TINYINT(1)   DEFAULT 0,
            status          ENUM('borrador','programado','publicado') NOT NULL DEFAULT 'borrador',
            publish_at      DATETIME NULL,
            created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
            updated_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS servicios_sesiones (
            id         INT AUTO_INCREMENT PRIMARY KEY,
            token      VARCHAR(128) NOT NULL UNIQUE,
            expires_at DATETIME NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_token (token),
            INDEX idx_expires (expires_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");

    // Migración defensiva: agregar status/publish_at si la tabla ya existía sin ellas
    try {
        $pdo->exec("ALTER TABLE servicios ADD COLUMN status ENUM('borrador','programado','publicado') NOT NULL DEFAULT 'borrador' AFTER published");
        // Columna recién creada: heredar el estado desde el 'published' ya existente
        $pdo->exec("UPDATE servicios SET status = 'publicado' WHERE published = 1");
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'Duplicate column') === false) throw $e;
    }
    try {
        $pdo->exec("ALTER TABLE servicios ADD COLUMN publish_at DATETIME NULL AFTER status");
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'Duplicate column') === false) throw $e;
    }
}

// Publica automáticamente los servicios programados cuya fecha ya llegó
function promoteScheduled($pdo) {
    $pdo->exec("UPDATE servicios SET published = 1, status = 'publicado' WHERE status = 'programado' AND publish_at IS NOT NULL AND publish_at <= NOW()");
}

// Borra el HTML cacheado de un servicio (ver caché de página completa en servicios-articulo.php)
function invalidateServiceCache($linea, $slug) {
    if (!$linea || !$slug) return;
    $key  = preg_replace('/[^a-z0-9\-]/', '', "{$linea}-{$slug}");
    $file = __DIR__ . "/cache/servicios/{$key}.html";
    if (is_file($file)) @unlink($file);
}

// Adjunta parámetros de transformación ImageKit (tamaño Discover + auto formato) si faltan
function normalizeImageKitUrl($url) {
    $url = trim($url);
    if ($url === '' || stripos($url, 'ik.imagekit.io') === false) return $url;
    $parts = parse_url($url);
    parse_str($parts['query'] ?? '', $q);
    if (isset($q['tr'])) return $url;
    $sep = (!empty($parts['query'])) ? '&' : '?';
    return $url . $sep . 'tr=w-1200,h-630,f-auto';
}

// ─── AUTH ─────────────────────────────────────────────────────────────────────
function generateToken() {
    return bin2hex(random_bytes(32));
}

function validateToken($pdo, $token) {
    if (!$token) return false;
    $stmt = $pdo->prepare("SELECT id FROM servicios_sesiones WHERE token = ? AND expires_at > NOW()");
    $stmt->execute([$token]);
    return (bool)$stmt->fetch();
}

function createSession($pdo, $token) {
    $expires = date('Y-m-d H:i:s', strtotime('+24 hours'));
    $stmt = $pdo->prepare("INSERT INTO servicios_sesiones (token, expires_at) VALUES (?, ?)");
    $stmt->execute([$token, $expires]);
    // Limpiar sesiones expiradas
    $pdo->exec("DELETE FROM servicios_sesiones WHERE expires_at < NOW()");
}

function destroySession($pdo, $token) {
    $stmt = $pdo->prepare("DELETE FROM servicios_sesiones WHERE token = ?");
    $stmt->execute([$token]);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function ok($data = [])  { echo json_encode(array_merge(['success' => true],  $data), JSON_UNESCAPED_UNICODE); exit; }
function err($msg, $code = 400) { http_response_code($code); echo json_encode(['success' => false, 'message' => $msg], JSON_UNESCAPED_UNICODE); exit; }

// ─── ENTRADA ─────────────────────────────────────────────────────────────────
$method = $_SERVER['REQUEST_METHOD'];
$action = '';
$body   = [];

if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
} else {
    $raw    = file_get_contents('php://input');
    $body   = json_decode($raw, true) ?: [];
    $action = $body['action'] ?? '';
}

// ─── DB INIT ─────────────────────────────────────────────────────────────────
try {
    $pdo = getDb($db_config);
    ensureTables($pdo);
    promoteScheduled($pdo);
} catch (PDOException $e) {
    err('Error de base de datos: ' . $e->getMessage(), 500);
}

// ─── ACCIONES PÚBLICAS ───────────────────────────────────────────────────────

// GET ?action=list — devuelve servicios publicados (o todos si hay token válido)
if ($action === 'list' && $method === 'GET') {
    $token = $_GET['token'] ?? '';
    $isAdmin = $token && validateToken($pdo, $token);
    $where = $isAdmin ? '' : 'WHERE published = 1';
    $rows = $pdo->query("SELECT * FROM servicios $where ORDER BY linea_negocio, updated_at DESC")->fetchAll();
    foreach ($rows as &$r) {
        if (isset($r['faqs'])) $r['faqs'] = json_decode($r['faqs'], true) ?: [];
    }
    ok(['servicios' => $rows]);
}

// POST login
if ($action === 'login') {
    $email    = trim($body['email'] ?? '');
    $password = $body['password'] ?? '';
    if ($email !== ADMIN_EMAIL || !password_verify($password, ADMIN_HASH)) {
        err('Credenciales incorrectas', 401);
    }
    $token = generateToken();
    createSession($pdo, $token);
    ok(['token' => $token]);
}

// POST logout
if ($action === 'logout') {
    $token = $body['token'] ?? '';
    if ($token) destroySession($pdo, $token);
    ok();
}

// POST validate_session
if ($action === 'validate_session') {
    $token = $body['token'] ?? '';
    ok(['valid' => validateToken($pdo, $token)]);
}

// ─── ACCIONES PROTEGIDAS ─────────────────────────────────────────────────────
$token = $body['token'] ?? '';
if (!validateToken($pdo, $token)) {
    err('No autorizado', 401);
}

// POST save — crear o actualizar servicio
if ($action === 'save') {
    $id            = intval($body['id'] ?? 0);
    $linea         = $body['linea_negocio'] ?? '';
    $subcategoria  = trim($body['subcategoria'] ?? '');
    $slug          = trim($body['slug'] ?? '');
    $seo_title     = substr(trim($body['seo_title'] ?? ''), 0, 60);
    $meta_desc     = substr(trim($body['meta_desc'] ?? ''), 0, 160);
    $resumen       = trim($body['resumen_rapido'] ?? '');
    $h1            = trim($body['h1'] ?? '');
    $content       = $body['content'] ?? '';
    $faqs          = json_encode($body['faqs'] ?? [], JSON_UNESCAPED_UNICODE);
    $imagen_url    = normalizeImageKitUrl($body['imagen_url'] ?? '');
    $imagen_alt    = trim($body['imagen_alt'] ?? '');
    $nombre_srv    = trim($body['nombre_servicio'] ?? '');
    $area_cob      = trim($body['area_cobertura'] ?? 'Bogotá, Colombia');
    $cta_tipo      = $body['cta_tipo'] ?? 'whatsapp';
    $status        = $body['status'] ?? (!empty($body['published']) ? 'publicado' : 'borrador');
    $publish_at    = trim($body['publish_at'] ?? '');
    $publish_at    = $publish_at !== '' ? date('Y-m-d H:i:s', strtotime($publish_at)) : null;

    if (!in_array($linea, ['litis','corporativo','recuperacion'])) err('Línea de negocio inválida');
    if (!$slug) err('El slug es requerido');
    if (!$h1)   err('El título H1 es requerido');
    if ($imagen_url !== '' && $imagen_alt === '') err('El texto ALT es obligatorio cuando hay una imagen');
    if (!in_array($status, ['borrador','programado','publicado'])) err('Estado inválido');
    if ($status === 'programado' && !$publish_at) err('La fecha de publicación programada es requerida');

    // 'published' queda como espejo simple de status para las lecturas públicas existentes
    $published = ($status === 'publicado') ? 1 : 0;

    try {
        if ($id) {
            // Recuperar línea/slug previos: si cambiaron, hay que invalidar también el caché viejo
            $prev = $pdo->prepare("SELECT linea_negocio, slug FROM servicios WHERE id = ?");
            $prev->execute([$id]);
            $prevRow = $prev->fetch();

            $stmt = $pdo->prepare("
                UPDATE servicios SET
                    linea_negocio=?, subcategoria=?, slug=?, seo_title=?, meta_desc=?,
                    resumen_rapido=?, h1=?, content=?, faqs=?,
                    imagen_url=?, imagen_alt=?, nombre_servicio=?, area_cobertura=?,
                    cta_tipo=?, published=?, status=?, publish_at=?
                WHERE id=?
            ");
            $stmt->execute([$linea,$subcategoria,$slug,$seo_title,$meta_desc,
                $resumen,$h1,$content,$faqs,
                $imagen_url,$imagen_alt,$nombre_srv,$area_cob,
                $cta_tipo,$published,$status,$publish_at,$id]);

            if ($prevRow) invalidateServiceCache($prevRow['linea_negocio'], $prevRow['slug']);
            invalidateServiceCache($linea, $slug);
            ok(['id' => $id, 'slug' => $slug]);
        } else {
            $stmt = $pdo->prepare("
                INSERT INTO servicios
                    (linea_negocio,subcategoria,slug,seo_title,meta_desc,
                     resumen_rapido,h1,content,faqs,
                     imagen_url,imagen_alt,nombre_servicio,area_cobertura,
                     cta_tipo,published,status,publish_at)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            ");
            $stmt->execute([$linea,$subcategoria,$slug,$seo_title,$meta_desc,
                $resumen,$h1,$content,$faqs,
                $imagen_url,$imagen_alt,$nombre_srv,$area_cob,
                $cta_tipo,$published,$status,$publish_at]);
            ok(['id' => $pdo->lastInsertId(), 'slug' => $slug]);
        }
    } catch (PDOException $e) {
        if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
            err('Ya existe un servicio con ese slug. Elige otro.', 409);
        }
        error_log('[servicios-api save] ' . $e->getMessage());
        err('Error al guardar el servicio', 500);
    }
}

// POST delete
if ($action === 'delete') {
    $id = intval($body['id'] ?? 0);
    if (!$id) err('ID requerido');
    try {
        $row = $pdo->prepare("SELECT linea_negocio, slug FROM servicios WHERE id = ?");
        $row->execute([$id]);
        $row = $row->fetch();

        $stmt = $pdo->prepare("DELETE FROM servicios WHERE id = ?");
        $stmt->execute([$id]);

        if ($row) invalidateServiceCache($row['linea_negocio'], $row['slug']);
        ok();
    } catch (PDOException $e) {
        error_log('[servicios-api delete] ' . $e->getMessage());
        err('Error al eliminar el servicio', 500);
    }
}

// POST toggle_publish — alterna entre 'publicado' y 'borrador' (no aplica a 'programado')
if ($action === 'toggle_publish') {
    $id = intval($body['id'] ?? 0);
    if (!$id) err('ID requerido');
    try {
        $stmt = $pdo->prepare("SELECT published, linea_negocio, slug FROM servicios WHERE id = ?");
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        if (!$row) err('Servicio no encontrado', 404);
        $newPublished = $row['published'] ? 0 : 1;
        $newStatus    = $newPublished ? 'publicado' : 'borrador';
        $pdo->prepare("UPDATE servicios SET published = ?, status = ?, publish_at = NULL WHERE id = ?")
            ->execute([$newPublished, $newStatus, $id]);
        invalidateServiceCache($row['linea_negocio'], $row['slug']);
        ok(['published' => $newPublished, 'status' => $newStatus]);
    } catch (PDOException $e) {
        error_log('[servicios-api toggle_publish] ' . $e->getMessage());
        err('Error al cambiar el estado', 500);
    }
}

err('Acción desconocida: ' . $action);

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
    $imagen_url    = trim($body['imagen_url'] ?? '');
    $imagen_alt    = trim($body['imagen_alt'] ?? '');
    $nombre_srv    = trim($body['nombre_servicio'] ?? '');
    $area_cob      = trim($body['area_cobertura'] ?? 'Bogotá, Colombia');
    $cta_tipo      = $body['cta_tipo'] ?? 'whatsapp';
    $published     = intval($body['published'] ?? 0);

    if (!in_array($linea, ['litis','corporativo','recuperacion'])) err('Línea de negocio inválida');
    if (!$slug) err('El slug es requerido');
    if (!$h1)   err('El título H1 es requerido');

    if ($id) {
        $stmt = $pdo->prepare("
            UPDATE servicios SET
                linea_negocio=?, subcategoria=?, slug=?, seo_title=?, meta_desc=?,
                resumen_rapido=?, h1=?, content=?, faqs=?,
                imagen_url=?, imagen_alt=?, nombre_servicio=?, area_cobertura=?,
                cta_tipo=?, published=?
            WHERE id=?
        ");
        $stmt->execute([$linea,$subcategoria,$slug,$seo_title,$meta_desc,
            $resumen,$h1,$content,$faqs,
            $imagen_url,$imagen_alt,$nombre_srv,$area_cob,
            $cta_tipo,$published,$id]);
        ok(['id' => $id, 'slug' => $slug]);
    } else {
        $stmt = $pdo->prepare("
            INSERT INTO servicios
                (linea_negocio,subcategoria,slug,seo_title,meta_desc,
                 resumen_rapido,h1,content,faqs,
                 imagen_url,imagen_alt,nombre_servicio,area_cobertura,
                 cta_tipo,published)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ");
        $stmt->execute([$linea,$subcategoria,$slug,$seo_title,$meta_desc,
            $resumen,$h1,$content,$faqs,
            $imagen_url,$imagen_alt,$nombre_srv,$area_cob,
            $cta_tipo,$published]);
        ok(['id' => $pdo->lastInsertId(), 'slug' => $slug]);
    }
}

// POST delete
if ($action === 'delete') {
    $id = intval($body['id'] ?? 0);
    if (!$id) err('ID requerido');
    $stmt = $pdo->prepare("DELETE FROM servicios WHERE id = ?");
    $stmt->execute([$id]);
    ok();
}

// POST toggle_publish
if ($action === 'toggle_publish') {
    $id = intval($body['id'] ?? 0);
    if (!$id) err('ID requerido');
    $pdo->prepare("UPDATE servicios SET published = NOT published WHERE id = ?")->execute([$id]);
    ok();
}

err('Acción desconocida: ' . $action);

<?php
/**
 * LITESCO - Blog API con MySQL + Autenticación Segura
 * Fase 2: Login con bcrypt + sesiones con token
 */

// ===== CONFIGURACIÓN =====
$db_config = [
    'host'     => 'localhost',
    'dbname'   => 'myloptic1_litesco_blog',
    'user'     => 'myloptic1_litesco_usr',
    'password' => 'j}34Ik49W@10',
    'charset'  => 'utf8mb4',
];

$session_duration_hours = 24; // Sesiones expiran en 24 horas

// ===== CORS HEADERS =====
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ===== CONEXIÓN A BASE DE DATOS =====
function getDB() {
    global $db_config;
    static $pdo = null;
    if ($pdo !== null) return $pdo;
    try {
        $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
        $pdo = new PDO($dsn, $db_config['user'], $db_config['password'], [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci",
        ]);
        return $pdo;
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error de conexión a BD']);
        exit();
    }
}

// ===== FUNCIONES DE AUTENTICACIÓN =====

function generateToken() {
    return bin2hex(random_bytes(48)); // 96 caracteres hexadecimales
}

function createSession($userId) {
    global $session_duration_hours;
    $db = getDB();
    $token = generateToken();
    $expiresAt = date('Y-m-d H:i:s', strtotime("+{$session_duration_hours} hours"));
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $ua = substr($_SERVER['HTTP_USER_AGENT'] ?? '', 0, 500);

    $stmt = $db->prepare("INSERT INTO sessions (user_id, token, ip_address, user_agent, expires_at) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$userId, $token, $ip, $ua, $expiresAt]);

    // Limpiar sesiones expiradas de paso
    $db->exec("DELETE FROM sessions WHERE expires_at < NOW()");

    return $token;
}

function verifyToken($token) {
    if (empty($token)) return false;
    $db = getDB();
    $stmt = $db->prepare("SELECT s.id, s.user_id, u.username, u.role FROM sessions s JOIN admin_users u ON s.user_id = u.id WHERE s.token = ? AND s.expires_at > NOW() LIMIT 1");
    $stmt->execute([$token]);
    return $stmt->fetch(); // Devuelve datos del usuario o false
}

function destroySession($token) {
    if (empty($token)) return;
    $db = getDB();
    $stmt = $db->prepare("DELETE FROM sessions WHERE token = ?");
    $stmt->execute([$token]);
}

// ===== FUNCIONES DE ARTÍCULOS =====

function dbToFrontend($row) {
    if (!$row) return null;
    return [
        'id'            => (int) $row['id'],
        'title'         => $row['title'] ?? '',
        'seoTitle'      => $row['seo_title'] ?? '',
        'metaDesc'      => $row['meta_desc'] ?? '',
        'keyword'       => $row['keyword'] ?? '',
        'slug'          => $row['slug'] ?? '',
        'excerpt'       => $row['excerpt'] ?? '',
        'content'       => $row['content'] ?? '',
        'category'      => $row['category'] ?? 'civil',
        'author'        => $row['author'] ?? 'Equipo LITESCO',
        'date'          => $row['date'] ?? '',
        'image'         => $row['image'] ?? '',
        'altText'       => $row['alt_text'] ?? '',
        'imagePosition' => $row['image_position'] ?? 'top',
        'contentAlign'  => $row['content_align'] ?? 'center',
        'featured'      => (bool) $row['featured'],
        'published'     => (bool) $row['published'],
    ];
}

function frontendToDb($article) {
    return [
        'id'             => $article['id'] ?? 0,
        'title'          => $article['title'] ?? '',
        'seo_title'      => $article['seoTitle'] ?? '',
        'meta_desc'      => $article['metaDesc'] ?? '',
        'keyword'        => $article['keyword'] ?? '',
        'slug'           => $article['slug'] ?? '',
        'excerpt'        => $article['excerpt'] ?? '',
        'content'        => $article['content'] ?? '',
        'category'       => $article['category'] ?? 'civil',
        'author'         => $article['author'] ?? 'Equipo LITESCO',
        'date'           => $article['date'] ?? date('Y-m-d'),
        'image'          => $article['image'] ?? '',
        'alt_text'       => $article['altText'] ?? '',
        'image_position' => $article['imagePosition'] ?? 'top',
        'content_align'  => $article['contentAlign'] ?? 'center',
        'featured'       => !empty($article['featured']) ? 1 : 0,
        'published'      => !empty($article['published']) ? 1 : 0,
    ];
}

function generateSlug($title) {
    $slug = mb_strtolower($title, 'UTF-8');
    $slug = str_replace(['á','é','í','ó','ú','ñ','ü'], ['a','e','i','o','u','n','u'], $slug);
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    return trim($slug, '-');
}

// ===== MANEJAR PETICIONES =====
$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : 'list';

// ─── GET — Público ───────────────────────────────────
if ($method === 'GET') {
    $db = getDB();

    switch ($action) {
        case 'list':
            // Deduplicar por slug: conservar solo el de mayor id
            $stmt = $db->query("SELECT a.* FROM articles a INNER JOIN (SELECT slug, MAX(id) as max_id FROM articles GROUP BY slug) latest ON a.id = latest.max_id ORDER BY a.date DESC, a.id DESC");
            echo json_encode(['success' => true, 'articles' => array_map('dbToFrontend', $stmt->fetchAll())]);
            break;

        case 'published':
            $stmt = $db->query("SELECT a.* FROM articles a INNER JOIN (SELECT slug, MAX(id) as max_id FROM articles WHERE published = 1 GROUP BY slug) latest ON a.id = latest.max_id ORDER BY a.date DESC, a.id DESC");
            echo json_encode(['success' => true, 'articles' => array_map('dbToFrontend', $stmt->fetchAll())]);
            break;

        case 'featured':
            $stmt = $db->query("SELECT a.* FROM articles a INNER JOIN (SELECT slug, MAX(id) as max_id FROM articles WHERE published = 1 AND featured = 1 GROUP BY slug) latest ON a.id = latest.max_id ORDER BY a.date DESC, a.id DESC");
            echo json_encode(['success' => true, 'articles' => array_map('dbToFrontend', $stmt->fetchAll())]);
            break;

        case 'article':
            $slug = $_GET['slug'] ?? '';
            if (empty($slug)) { echo json_encode(['success' => false, 'message' => 'Slug requerido']); break; }
            $stmt = $db->prepare("SELECT * FROM articles WHERE slug = ? AND published = 1 ORDER BY id DESC LIMIT 1");
            $stmt->execute([$slug]);
            $row = $stmt->fetch();
            echo json_encode($row ? ['success' => true, 'article' => dbToFrontend($row)] : ['success' => false, 'message' => 'No encontrado']);
            break;

        case 'diagnostico':
            $db = getDB();
            $count = $db->query("SELECT COUNT(*) as total FROM articles")->fetch();
            $sesCount = $db->query("SELECT COUNT(*) as total FROM sessions WHERE expires_at > NOW()")->fetch();
            echo json_encode([
                'success'          => true,
                'php_version'      => phpversion(),
                'db_connected'     => true,
                'articles_total'   => (int) $count['total'],
                'active_sessions'  => (int) $sesCount['total'],
                'auth_mode'        => 'bcrypt + token sessions',
            ], JSON_PRETTY_PRINT);
            break;

        default:
            echo json_encode(['success' => false, 'message' => 'Acción no reconocida']);
    }
    exit();
}

// ─── POST — Login + Operaciones protegidas ───────────
if ($method === 'POST') {
    $input = file_get_contents('php://input');
    if (empty($input)) {
        echo json_encode(['success' => false, 'message' => 'Body vacío']);
        exit();
    }
    $data = json_decode($input, true);
    if (!$data) {
        echo json_encode(['success' => false, 'message' => 'JSON malformado: ' . json_last_error_msg()]);
        exit();
    }

    $action = $data['action'] ?? '';
    $db = getDB();

    // ── LOGIN (no requiere token) ────────────────────
    if ($action === 'login') {
        $username = $data['username'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($username) || empty($password)) {
            echo json_encode(['success' => false, 'message' => 'Usuario y contraseña requeridos']);
            exit();
        }

        $stmt = $db->prepare("SELECT id, username, password_hash, role FROM admin_users WHERE username = ? LIMIT 1");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            // Delay para prevenir fuerza bruta
            usleep(500000); // 0.5 segundos
            echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
            exit();
        }

        $token = createSession($user['id']);
        echo json_encode([
            'success'  => true,
            'message'  => 'Login exitoso',
            'token'    => $token,
            'user'     => [
                'id'       => $user['id'],
                'username' => $user['username'],
                'role'     => $user['role'],
            ]
        ]);
        exit();
    }

    // ── VERIFY (verificar token sin hacer nada más) ──
    if ($action === 'verify') {
        $token = $data['token'] ?? '';
        $session = verifyToken($token);
        if ($session) {
            echo json_encode(['success' => true, 'user' => ['username' => $session['username'], 'role' => $session['role']]]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Sesión inválida o expirada']);
        }
        exit();
    }

    // ── LOGOUT ───────────────────────────────────────
    if ($action === 'logout') {
        $token = $data['token'] ?? '';
        destroySession($token);
        echo json_encode(['success' => true, 'message' => 'Sesión cerrada']);
        exit();
    }

    // ── OPERACIONES PROTEGIDAS (requieren token) ─────
    $token = $data['token'] ?? '';
    $session = verifyToken($token);
    if (!$session) {
        echo json_encode(['success' => false, 'message' => 'No autorizado. Inicie sesión nuevamente.', 'auth_error' => true]);
        exit();
    }

    try {
        switch ($action) {
            case 'save':
                $article = $data['article'] ?? null;
                if (!$article) { echo json_encode(['success' => false, 'message' => 'No se recibió artículo']); break; }

                $dbData = frontendToDb($article);
                if (empty($dbData['slug'])) $dbData['slug'] = generateSlug($dbData['title']);
                if (empty($dbData['id'])) $dbData['id'] = (int)(microtime(true) * 1000);

                // ── Evitar slugs duplicados ──────────────────────
                $slugCheck = $db->prepare("SELECT id FROM articles WHERE slug = ? AND id != ?");
                $slugCheck->execute([$dbData['slug'], $dbData['id']]);
                if ($slugCheck->fetch()) {
                    // Slug ya existe para otro artículo → hacerlo único
                    $baseSlug = preg_replace('/-\d+$/', '', $dbData['slug']);
                    $dbData['slug'] = $baseSlug . '-' . substr((string)$dbData['id'], -6);
                }

                $stmt = $db->prepare("SELECT id FROM articles WHERE id = ?");
                $stmt->execute([$dbData['id']]);
                $exists = $stmt->fetch();

                if ($exists) {
                    $sql = "UPDATE articles SET title=:title, seo_title=:seo_title, meta_desc=:meta_desc, keyword=:keyword, slug=:slug, excerpt=:excerpt, content=:content, category=:category, author=:author, date=:date, image=:image, alt_text=:alt_text, image_position=:image_position, content_align=:content_align, featured=:featured, published=:published WHERE id=:id";
                } else {
                    $sql = "INSERT INTO articles (id,title,seo_title,meta_desc,keyword,slug,excerpt,content,category,author,date,image,alt_text,image_position,content_align,featured,published) VALUES (:id,:title,:seo_title,:meta_desc,:keyword,:slug,:excerpt,:content,:category,:author,:date,:image,:alt_text,:image_position,:content_align,:featured,:published)";
                }
                $stmt = $db->prepare($sql);
                $stmt->execute($dbData);
                echo json_encode(['success' => true, 'message' => $exists ? 'Actualizado' : 'Creado', 'slug' => $dbData['slug']]);
                break;

            case 'delete':
                $id = $data['id'] ?? 0;
                if (!$id) { echo json_encode(['success' => false, 'message' => 'ID requerido']); break; }
                $stmt = $db->prepare("DELETE FROM articles WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true, 'message' => 'Eliminado', 'deleted' => $stmt->rowCount()]);
                break;

            case 'toggle_publish':
                $id = $data['id'] ?? 0;
                if (!$id) { echo json_encode(['success' => false, 'message' => 'ID requerido']); break; }
                $stmt = $db->prepare("UPDATE articles SET published = NOT published WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true, 'message' => 'Estado actualizado']);
                break;

            case 'toggle_featured':
                $id = $data['id'] ?? 0;
                if (!$id) { echo json_encode(['success' => false, 'message' => 'ID requerido']); break; }
                $stmt = $db->prepare("UPDATE articles SET featured = NOT featured WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true, 'message' => 'Estado actualizado']);
                break;

            // ── LIMPIEZA DE DUPLICADOS ───────────────────
            case 'cleanup_duplicates':
                // 1) Detectar slugs duplicados
                $dupes = $db->query("SELECT slug, COUNT(*) as cnt, GROUP_CONCAT(id ORDER BY id DESC) as ids FROM articles GROUP BY slug HAVING cnt > 1")->fetchAll();
                $deleted = 0;
                foreach ($dupes as $d) {
                    $ids = explode(',', $d['ids']);
                    $keep = array_shift($ids); // Conservar el de mayor id
                    if (!empty($ids)) {
                        $placeholders = implode(',', array_fill(0, count($ids), '?'));
                        $stmt = $db->prepare("DELETE FROM articles WHERE id IN ($placeholders)");
                        $stmt->execute($ids);
                        $deleted += $stmt->rowCount();
                    }
                }
                // 2) Intentar crear índice único en slug (si no existe)
                try {
                    $db->exec("ALTER TABLE articles ADD UNIQUE INDEX idx_slug_unique (slug)");
                    $indexMsg = 'Índice único creado';
                } catch (PDOException $e) {
                    $indexMsg = (strpos($e->getMessage(), 'Duplicate') !== false)
                        ? 'No se pudo crear índice: aún hay duplicados'
                        : 'Índice ya existe o error: ' . $e->getMessage();
                }
                echo json_encode([
                    'success' => true,
                    'message' => "Limpieza completada: $deleted duplicados eliminados. $indexMsg",
                    'duplicates_found' => count($dupes),
                    'deleted' => $deleted
                ]);
                break;

            // ── CRM: CONTACTOS ───────────────────────────
            case 'contacts_list':
                $stmt = $db->query("SELECT * FROM contacts ORDER BY created_at DESC");
                $contacts = $stmt->fetchAll();
                echo json_encode(['success' => true, 'contacts' => $contacts]);
                break;

            case 'contacts_update':
                $id = $data['id'] ?? 0;
                if (!$id) { echo json_encode(['success' => false, 'message' => 'ID requerido']); break; }
                $fields = [];
                $params = [];
                if (isset($data['status'])) { $fields[] = 'status = ?'; $params[] = $data['status']; }
                if (isset($data['notes']))  { $fields[] = 'notes = ?';  $params[] = $data['notes']; }
                if (isset($data['assigned_to'])) { $fields[] = 'assigned_to = ?'; $params[] = $data['assigned_to']; }
                if (empty($fields)) { echo json_encode(['success' => false, 'message' => 'No hay campos para actualizar']); break; }
                $params[] = $id;
                $stmt = $db->prepare("UPDATE contacts SET " . implode(', ', $fields) . " WHERE id = ?");
                $stmt->execute($params);
                echo json_encode(['success' => true, 'message' => 'Contacto actualizado']);
                break;

            case 'contacts_delete':
                $id = $data['id'] ?? 0;
                if (!$id) { echo json_encode(['success' => false, 'message' => 'ID requerido']); break; }
                $stmt = $db->prepare("DELETE FROM contacts WHERE id = ?");
                $stmt->execute([$id]);
                echo json_encode(['success' => true, 'message' => 'Contacto eliminado']);
                break;

            case 'contacts_stats':
                $total = $db->query("SELECT COUNT(*) as c FROM contacts")->fetch()['c'];
                $nuevo = $db->query("SELECT COUNT(*) as c FROM contacts WHERE status = 'nuevo'")->fetch()['c'];
                $contactado = $db->query("SELECT COUNT(*) as c FROM contacts WHERE status = 'contactado'")->fetch()['c'];
                $proceso = $db->query("SELECT COUNT(*) as c FROM contacts WHERE status = 'en_proceso'")->fetch()['c'];
                $cerrado = $db->query("SELECT COUNT(*) as c FROM contacts WHERE status = 'cerrado'")->fetch()['c'];
                echo json_encode(['success' => true, 'stats' => compact('total', 'nuevo', 'contactado', 'proceso', 'cerrado')]);
                break;

            default:
                echo json_encode(['success' => false, 'message' => 'Acción no válida: ' . $action]);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error BD: ' . $e->getMessage()]);
    }
    exit();
}

echo json_encode(['success' => false, 'message' => 'Método no permitido']);
?>

<?php
/**
 * LITESCO - Formulario de Contacto
 * Envía email + guarda en MySQL (contacts + form_submissions)
 */

require_once __DIR__ . '/lib/meta-capi.php';

// ===== CONFIGURACIÓN =====
$db_config = [
    'host'     => 'localhost',
    'dbname'   => 'myloptic1_litesco_blog',
    'user'     => 'myloptic1_litesco_usr',
    'password' => 'j}34Ik49W@10',
    'charset'  => 'utf8mb4',
];

// Email de destino
$to_email = 'gerencia@litesco.com.co';
$from_email = 'no-reply@litesco.com.co';

// ===== CORS HEADERS =====
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Método no permitido']);
    exit();
}

// ===== LEER DATOS =====
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit();
}

// ===== EXTRAER CAMPOS =====
$nombre   = trim($data['nombre'] ?? '');
$email    = trim($data['email'] ?? '');
$telefono = trim($data['telefono'] ?? '');
$mensaje  = trim($data['mensaje'] ?? '');
$empresa  = trim($data['empresa'] ?? '');
$servicio = trim($data['servicio'] ?? '');
$source   = !empty($empresa) || !empty($servicio) ? 'home' : 'contacto';
// event_id generado en el navegador (ver ContactoPage.jsx/HomePage.jsx) para deduplicar
// con el Pixel de navegador en Meta. Si no llega, se genera aquí como respaldo.
$metaEventId = substr(trim((string) ($data['meta_event_id'] ?? '')), 0, 64) ?: generateMetaEventId('lead');

// ===== VALIDACIÓN =====
$errors = [];
if (empty($nombre))   $errors[] = 'El nombre es requerido';
if (empty($email))     $errors[] = 'El correo es requerido';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Correo electrónico inválido';
if (empty($telefono))  $errors[] = 'El teléfono es requerido';
if (empty($mensaje))   $errors[] = 'El mensaje es requerido';

// Anti-spam básico: verificar que no tenga links sospechosos
if (preg_match('/(http|https|www\.|\.ru|\.cn|viagra|casino|lottery)/i', $mensaje)) {
    $errors[] = 'Mensaje rechazado por filtro de spam';
}

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode('. ', $errors)]);
    exit();
}

// ===== GUARDAR EN BASE DE DATOS =====
$dbSaved = false;
$contactId = null;

try {
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    $pdo = new PDO($dsn, $db_config['user'], $db_config['password'], [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    // 1. Guardar en contacts (CRM)
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, message, source, status) VALUES (?, ?, ?, ?, ?, 'nuevo')");
    $stmt->execute([$nombre, $email, $telefono, $mensaje, $source]);
    $contactId = $pdo->lastInsertId();

    // 2. Guardar en form_submissions (log completo)
    $fullData = json_encode($data, JSON_UNESCAPED_UNICODE);
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $stmt = $pdo->prepare("INSERT INTO form_submissions (form_type, data, ip_address) VALUES (?, ?, ?)");
    $stmt->execute([$source, $fullData, $ip]);

    $dbSaved = true;
} catch (PDOException $e) {
    // Si falla la DB, igual intentamos enviar el email
    error_log('LITESCO DB Error: ' . $e->getMessage());
}

// ===== ENVIAR EMAIL =====
$emailSent = false;

try {
    $subject = "Nuevo contacto desde litesco.com.co" . ($source === 'home' ? ' (Inicio)' : ' (Contacto)');

    // Construir cuerpo del email
    $body = "<html><body style='font-family:Arial,sans-serif;'>";
    $body .= "<div style='max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;'>";

    // Header
    $body .= "<div style='background:#0A1628;padding:20px 24px;'>";
    $body .= "<h2 style='color:#f59e0b;margin:0;font-size:18px;'>Nuevo Contacto — LITESCO</h2>";
    $body .= "<p style='color:#94a3b8;margin:4px 0 0;font-size:13px;'>Formulario de " . ($source === 'home' ? 'página de inicio' : 'contacto') . "</p>";
    $body .= "</div>";

    // Datos
    $body .= "<div style='padding:24px;'>";
    $body .= "<table style='width:100%;border-collapse:collapse;'>";
    $body .= "<tr><td style='padding:10px 0;color:#64748b;font-size:13px;font-weight:700;width:120px;vertical-align:top;'>Nombre:</td><td style='padding:10px 0;color:#0A1628;font-size:14px;'>{$nombre}</td></tr>";
    $body .= "<tr><td style='padding:10px 0;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;'>Email:</td><td style='padding:10px 0;'><a href='mailto:{$email}' style='color:#b45309;'>{$email}</a></td></tr>";
    $body .= "<tr><td style='padding:10px 0;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;'>Teléfono:</td><td style='padding:10px 0;'><a href='tel:{$telefono}' style='color:#b45309;'>{$telefono}</a></td></tr>";

    if (!empty($empresa)) {
        $body .= "<tr><td style='padding:10px 0;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;'>Empresa:</td><td style='padding:10px 0;color:#0A1628;font-size:14px;'>{$empresa}</td></tr>";
    }
    if (!empty($servicio)) {
        $body .= "<tr><td style='padding:10px 0;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;'>Servicio:</td><td style='padding:10px 0;color:#0A1628;font-size:14px;'>{$servicio}</td></tr>";
    }

    $body .= "<tr><td style='padding:10px 0;color:#64748b;font-size:13px;font-weight:700;vertical-align:top;'>Mensaje:</td><td style='padding:10px 0;color:#0A1628;font-size:14px;line-height:1.6;'>" . nl2br(htmlspecialchars($mensaje)) . "</td></tr>";
    $body .= "</table>";
    $body .= "</div>";

    // Footer
    $body .= "<div style='background:#f8fafc;padding:14px 24px;border-top:1px solid #e2e8f0;'>";
    $body .= "<p style='margin:0;color:#94a3b8;font-size:11px;'>ID de contacto: #{$contactId} — IP: {$ip} — " . date('Y-m-d H:i:s') . "</p>";
    $body .= "</div>";

    $body .= "</div></body></html>";

    // Headers del email
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: LITESCO <{$from_email}>\r\n";
    $headers .= "Reply-To: {$nombre} <{$email}>\r\n";
    $headers .= "X-Mailer: LITESCO-ContactForm/2.0\r\n";

    $emailSent = mail($to_email, $subject, $body, $headers);

} catch (Exception $e) {
    error_log('LITESCO Email Error: ' . $e->getMessage());
}

// ===== META CONVERSIONS API (Lead) =====
// Solo metadatos no sensibles: nunca el mensaje del cliente ni datos del caso.
if ($emailSent || $dbSaved) {
    $pageUrl = $_SERVER['HTTP_REFERER'] ?? ('https://litesco.com.co/' . ($source === 'home' ? '' : $source));
    fireMetaCapiEventAsync('Lead', $metaEventId, $pageUrl, [
        'content_name' => $servicio ?: ($source === 'home' ? 'Formulario Inicio' : 'Formulario de contacto'),
    ], [
        'em' => $email ? sha256Lower($email) : null,
        'ph' => $telefono ? sha256Lower(preg_replace('/\D/', '', $telefono)) : null,
    ]);
}

// ===== RESPUESTA =====
if ($emailSent || $dbSaved) {
    echo json_encode([
        'success' => true,
        'message' => '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.',
        'contact_id' => $contactId
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'No se pudo enviar el mensaje. Por favor, intenta por WhatsApp o llámanos directamente.'
    ]);
}
?>

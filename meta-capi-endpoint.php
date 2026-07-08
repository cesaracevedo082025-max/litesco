<?php
/**
 * LITESCO - Endpoint público para eventos de Meta CAPI disparados desde el navegador:
 * 'ViewContent' (vistas de artículo/servicio — el navegador resuelve el consentimiento
 * para que el HTML de la página pueda servirse desde caché sin depender de PHP) y
 * 'Lead' (clics en WhatsApp/contacto, que no recargan la página).
 *
 * Solo se aceptan datos no sensibles (nombre/categoría de contenido).
 * Nunca reenviar aquí el cuerpo de mensajes de formularios ni datos de casos.
 */

require_once __DIR__ . '/lib/meta-capi.php';

header('Content-Type: application/json; charset=UTF-8');

// Mismo origen únicamente (mitiga abuso: eventos falsos inflando el Ads Manager)
$origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$allowedHost = 'litesco.com.co';
if (strpos($origin, $allowedHost) === false) {
    http_response_code(403);
    echo json_encode(['success' => false]);
    exit;
}
header("Access-Control-Allow-Origin: https://www.$allowedHost");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false]);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true) ?: [];

$eventName = $body['event'] ?? '';
if (!in_array($eventName, ['Lead', 'ViewContent'], true)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Evento no soportado']);
    exit;
}

$eventId         = substr(trim((string) ($body['event_id'] ?? '')), 0, 64);
$pageUrl         = filter_var($body['page_url'] ?? '', FILTER_VALIDATE_URL) ?: null;
$contentName     = substr(trim((string) ($body['content_name'] ?? 'Contacto general')), 0, 120);
$contentCategory = substr(trim((string) ($body['content_category'] ?? '')), 0, 120);

if (!$eventId || !$pageUrl || strpos($pageUrl, $allowedHost) === false) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Datos inválidos']);
    exit;
}

// Solo metadatos no sensibles: nombre/categoría de contenido, nunca texto libre de usuario
$customData = ['content_name' => $contentName];
if ($contentCategory !== '') $customData['content_category'] = $contentCategory;

$ok = sendMetaCapiEvent($eventName, $eventId, $pageUrl, $customData);

echo json_encode(['success' => $ok]);
